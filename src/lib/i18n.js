// Ngôn ngữ trang: 'vi' (mặc định) hoặc 'en'. Lưu trong trình duyệt người xem.
//   L('Xin chào', 'Hello')       → chọn theo ngôn ngữ hiện tại
//   pick({ vi: '...', en: '...' }) → như trên, dùng cho nội dung trong config

function read() {
  try { return localStorage.getItem('lang'); } catch { return null; }
}

export const lang = read() === 'en' ? 'en' : 'vi';
document.documentElement.lang = lang;

export const L = (vi, en) => (lang === 'en' && en != null ? en : vi);

export function pick(v) {
  if (v && typeof v === 'object' && !Array.isArray(v) && 'vi' in v) return lang === 'en' && v.en != null ? v.en : v.vi;
  return v;
}

export function setLang(next) {
  try { localStorage.setItem('lang', next); } catch { /* bỏ qua */ }
  location.reload();
}

// Chọn ngôn ngữ cho cả một cụm nội dung lồng nhau: mọi { vi, en } bên trong đều được thay bằng chuỗi đúng ngôn ngữ.
export function localize(v) {
  if (Array.isArray(v)) return v.map(localize);
  if (v && typeof v === 'object') {
    if ('vi' in v && Object.keys(v).every((k) => k === 'vi' || k === 'en')) return pick(v);
    const out = {};
    for (const [k, x] of Object.entries(v)) out[k] = localize(x);
    return out;
  }
  return v;
}
