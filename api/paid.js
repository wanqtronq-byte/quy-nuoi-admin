// Vercel Function: GET /api/paid?code=NUOIADMIN1A2B3C
// Hỏi SePay xem đã có giao dịch tiền vào chứa đúng nội dung chuyển khoản này chưa.
// Cần biến môi trường SEPAY_API_TOKEN (my.sepay.vn → Cấu hình Công ty → API Access).

import { sepayToken, recentTransactions, clean, json } from './_lib/sepay.js';

const CODE_RE = /^NUOIADMIN[0-9A-Z]{6}$/;

export default {
  async fetch(request) {
    if (request.method !== 'GET') return json(405, { error: 'GET only' });
    const token = sepayToken();
    if (!token) return json(503, { paid: false, error: 'not-configured' });

    const code = (new URL(request.url).searchParams.get('code') || '').toUpperCase();
    if (!CODE_RE.test(code)) return json(400, { paid: false, error: 'bad-code' });

    try {
      const list = await recentTransactions(token, 7 * 24);
      const hit = list.find((t) => Number(t.amount_in) > 0 && clean(t.transaction_content).includes(code));
      if (!hit) return json(200, { paid: false });
      return json(200, { paid: true, amount: Math.round(Number(hit.amount_in)) });
    } catch (err) {
      console.error('paid check failed', err);
      return json(502, { paid: false, error: 'upstream', detail: err.detail || String(err.message || err) });
    }
  },
};
