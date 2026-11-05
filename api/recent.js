// Vercel Function: GET /api/recent
// Danh sách người vừa nuôi Nhũn, ẩn danh, KHÔNG kèm số tiền.
// Chỉ lấy giao dịch có nội dung NUOINHUN… (chuyển từ trang này) để không lộ các khoản tiền khác.

import { sepayToken, recentTransactions, clean, json } from './_lib/sepay.js';

const DAYS = 7;
const MAX = 12;

export default {
  async fetch(request) {
    if (request.method !== 'GET') return json(405, { error: 'GET only' });
    const token = sepayToken();
    if (!token) return json(200, { items: [] });
    try {
      const list = await recentTransactions(token, DAYS * 24);
      const items = list
        .filter((t) => Number(t.amount_in) > 0)
        .map((t) => ({ t, m: clean(t.transaction_content).match(/NUOI(?:ADMIN|NHUN)([0-9A-Z]{6})/) }))
        .filter((x) => x.m)
        .map(({ t, m }) => ({
          // n*****Q: chữ cái đầu + sao + ký tự cuối của mã, không lộ tên hay tài khoản
          who: `n*****${m[1].slice(-1).toLowerCase()}`,
          // SePay trả giờ Việt Nam dạng "YYYY-MM-DD HH:mm:ss"
          at: Date.parse(`${String(t.transaction_date).replace(' ', 'T')}+07:00`) || null,
        }))
        .sort((a, b) => (b.at || 0) - (a.at || 0))
        .slice(0, MAX);
      return json(200, { items }, { 'cache-control': 'public, max-age=30' });
    } catch (err) {
      console.error('recent failed', err);
      return json(200, { items: [] });
    }
  },
};
