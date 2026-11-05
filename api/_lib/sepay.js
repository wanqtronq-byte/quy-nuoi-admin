// Dùng chung cho /api/paid và /api/recent: lấy giao dịch gần đây từ SePay (có bộ nhớ tạm vài giây).

// Để trống thì lấy giao dịch của mọi tài khoản đã nối với SePay (hiện chỉ có 1).
export const ACCOUNT = process.env.SEPAY_ACCOUNT || '';
const CACHE_MS = 6000; // gom các lần hỏi gần nhau để không vượt giới hạn 3 lần/giây của SePay

let cache = { at: 0, hours: 0, list: [] };

export function sepayToken() {
  return (process.env.SEPAY_API_TOKEN || '').trim().replace(/^Bearer\s+/i, '');
}

function vnDate(ms) {
  // SePay dùng giờ Việt Nam (UTC+7)
  return new Date(ms + 7 * 3600 * 1000).toISOString().slice(0, 19).replace('T', ' ');
}

// Giao dịch trong `hours` giờ gần nhất
export async function recentTransactions(token, hours = 2) {
  if (Date.now() - cache.at < CACHE_MS && cache.hours >= hours) return cache.list;
  const qs = new URLSearchParams({
    ...(ACCOUNT ? { account_number: ACCOUNT } : {}),
    transaction_date_min: vnDate(Date.now() - hours * 3600 * 1000),
    limit: '200',
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
  cache = { at: Date.now(), hours, list: Array.isArray(data.transactions) ? data.transactions : [] };
  return cache.list;
}

export const clean = (s) => String(s || '').toUpperCase().replace(/[^0-9A-Z]/g, '');

export function json(status, body, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  });
}
