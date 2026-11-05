// Vercel Function: GET /api/paid?code=NUOIADMIN1A2B3C
// Hỏi SePay xem đã có giao dịch tiền vào chứa đúng nội dung chuyển khoản này chưa.
// Cần biến môi trường SEPAY_API_TOKEN (tạo ở my.sepay.vn → Cấu hình Công ty → API Access).
// SEPAY_ACCOUNT: số tài khoản cần dò (mặc định 0395797730).

const ACCOUNT = process.env.SEPAY_ACCOUNT || '0395797730';
const CODE_RE = /^NUOIADMIN[0-9A-Z]{6}$/;
const CACHE_MS = 6000; // gom các lần hỏi gần nhau để không vượt giới hạn 3 lần/giây của SePay

let cache = { at: 0, list: [] };

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

function vnDate(ms) {
  // SePay dùng giờ Việt Nam (UTC+7)
  const d = new Date(ms + 7 * 3600 * 1000);
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

async function recent(token) {
  if (Date.now() - cache.at < CACHE_MS) return cache.list;
  const qs = new URLSearchParams({
    account_number: ACCOUNT,
    transaction_date_min: vnDate(Date.now() - 2 * 3600 * 1000),
    limit: '100',
  });
  const res = await fetch(`https://my.sepay.vn/userapi/transactions/list?${qs}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    const e = new Error(`SePay ${res.status}`);
    e.detail = `${res.status} ${t.slice(0, 160)}`;
    throw e;
  }
  const data = await res.json();
  cache = { at: Date.now(), list: Array.isArray(data.transactions) ? data.transactions : [] };
  return cache.list;
}

export default {
  async fetch(request) {
    if (request.method !== 'GET') return json(405, { error: 'GET only' });
    const token = (process.env.SEPAY_API_TOKEN || '').trim().replace(/^Bearer\s+/i, '');
    if (!token) return json(503, { paid: false, error: 'not-configured' });

    const code = (new URL(request.url).searchParams.get('code') || '').toUpperCase();
    if (!CODE_RE.test(code)) return json(400, { paid: false, error: 'bad-code' });

    try {
      const list = await recent(token);
      const hit = list.find((t) => Number(t.amount_in) > 0
        && String(t.transaction_content || '').toUpperCase().replace(/[^0-9A-Z]/g, '').includes(code));
      if (!hit) return json(200, { paid: false });
      return json(200, { paid: true, amount: Math.round(Number(hit.amount_in)) });
    } catch (err) {
      console.error('paid check failed', err);
      return json(502, { paid: false, error: 'upstream', detail: err.detail || String(err.message || err) });
    }
  },
};
