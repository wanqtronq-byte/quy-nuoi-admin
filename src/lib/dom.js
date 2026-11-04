// Tiện ích nhỏ dùng chung cho các module.

const injected = new Set();

// Gắn CSS riêng của một module vào trang (mỗi module chỉ gắn một lần).
export function injectCss(id, css) {
  if (!css || injected.has(id)) return;
  injected.add(id);
  const style = document.createElement('style');
  style.dataset.module = id;
  style.textContent = css;
  document.head.appendChild(style);
}

// Chuyển chuỗi HTML thành các node.
export function fragment(markup) {
  const t = document.createElement('template');
  t.innerHTML = markup.trim();
  return t.content;
}

// Chống chèn mã khi đưa chữ vào HTML.
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
