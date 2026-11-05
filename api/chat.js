// Vercel Function: POST /api/chat
// Nhận lịch sử chat từ trình duyệt, gọi Gemini, trả lời thay Nhũn.
// API key nằm trong biến môi trường GEMINI_API_KEY trên Vercel, không lộ ra trình duyệt.

import { SYSTEM_PROMPT } from './_lib/persona.js';
import { sepayToken, recentTransactions, clean } from './_lib/sepay.js';

const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
const MAX_TURNS = 12;               // chỉ gửi 12 tin gần nhất
const MAX_CHARS = 600;              // mỗi tin tối đa 600 ký tự
const RATE_LIMIT = 20;              // tối đa 20 tin / IP / 10 phút (mỗi máy chủ)
const WINDOW_MS = 10 * 60 * 1000;

const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > RATE_LIMIT;
}

// Mở khoá: ai đã chuyển tiền (bất kỳ số tiền nào) với mã NUOINHUN… thì được chat tiếp không giới hạn.
const UNLOCK_RE = /^NUOI(?:ADMIN|NHUN)[0-9A-Z]{6}$/;
const unlocked = new Set();
async function isUnlocked(code) {
  code = String(code || '').toUpperCase();
  if (!UNLOCK_RE.test(code)) return false;
  if (unlocked.has(code)) return true;
  const token = sepayToken();
  if (!token) return false;
  try {
    const list = await recentTransactions(token, 7 * 24);
    const ok = list.some((t) => Number(t.amount_in) > 0 && clean(t.transaction_content).includes(code));
    if (ok) unlocked.add(code);
    return ok;
  } catch {
    return false;
  }
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') return json(405, { error: 'Chỉ nhận POST.' });
    return handleChat(request);
  },
};

async function handleChat(request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return json(500, { error: 'Nhũn chưa cài API key, quay lại sau nha.' });

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Tin nhắn không hợp lệ.' });
  }

  if (rateLimited(ip) && !(await isUnlocked(body && body.unlock))) {
    return json(429, { error: 'Bạn đã chat quá nhiều rồi, cho Nhũn xin ít bánh đi rồi chat tiếp nha.', needSnack: true });
  }

  const raw = Array.isArray(body && body.messages) ? body.messages : [];
  const contents = raw
    .filter((m) => m && typeof m.text === 'string' && m.text.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text.trim().slice(0, MAX_CHARS) }],
    }));

  // Gemini cần tin đầu tiên là của người dùng
  while (contents.length && contents[0].role !== 'user') contents.shift();
  if (!contents.length || contents[contents.length - 1].role !== 'user') {
    return json(400, { error: 'Bạn chưa nhắn gì hết á.' });
  }

  // Gemini thỉnh thoảng quá tải (500/503): thử lại, lần cuối đổi sang model dự phòng.
  const FALLBACK = process.env.GEMINI_FALLBACK_MODEL || 'gemini-3.1-flash-lite';
  const plan = [MODEL, MODEL, FALLBACK];
  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { temperature: 0.9, maxOutputTokens: 1024 },
  });

  try {
    let res;
    let data = {};
    for (let i = 0; i < plan.length; i += 1) {
      if (i > 0) await new Promise((r) => setTimeout(r, 600 * i));
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(plan[i])}:generateContent`;
      res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': key }, body: payload });
      data = await res.json().catch(() => ({}));
      const empty = res.ok && !(data?.candidates?.[0]?.content?.parts || []).some((p) => typeof p.text === 'string' && !p.thought && p.text.trim());
      if (res.ok && !empty) break;
      console.error('Gemini try', i + 1, plan[i], res.status, JSON.stringify(data).slice(0, 300));
      if (res.status === 429 || res.status === 400 || res.status === 403) break; // không đáng thử lại
    }

    if (!res.ok) {
      if (res.status === 429) return json(503, { error: 'Nhũn hết lượt nói hôm nay rồi, mai ghé lại nha.' });
      return json(502, { error: 'Nhũn đang lag xíu, bạn thử lại sau nha.', code: res.status });
    }

    const parts = data?.candidates?.[0]?.content?.parts || [];
    const reply = parts
      .filter((p) => typeof p.text === 'string' && !p.thought)
      .map((p) => p.text)
      .join('')
      .trim();

    if (!reply) return json(502, { error: 'Nhũn đứng hình mất tiêu, bạn hỏi lại thử nha.' });
    return json(200, { reply });
  } catch (err) {
    console.error('Fetch failed', err);
    return json(502, { error: 'Không kết nối được với Nhũn, thử lại sau nha.' });
  }
}
