// ============================================================
// MẪU CHO PHẦN MỚI
// 1. Copy file này, đổi tên (ví dụ faq.js).
// 2. Sửa id, nav, nội dung, CSS.
// 3. Mở src/config/sections.js, import file mới và thêm vào mảng.
// File này bắt đầu bằng dấu _ nên không tự hiện lên trang.
// ============================================================

import { esc } from '../lib/dom.js';

const content = {
  title: 'Tiêu đề phần mới',
  text: 'Nội dung phần mới.',
};

export default {
  id: 'phan-moi',          // dùng cho link #phan-moi, không dấu, không cách
  nav: 'Phần mới',         // chữ trên menu; để null nếu không muốn hiện trên menu

  // CSS riêng của phần này (dùng màu có sẵn: var(--ink), var(--mint), var(--deep)…)
  css: `
.phan-moi { padding-block: 48px; }
`,

  // Trả về HTML của phần
  render(site) {
    return `
<section id="phan-moi" class="wrap phan-moi">
  <div class="card" style="padding:32px;display:flex;flex-direction:column;gap:12px">
    <h2 class="h2">${esc(content.title)}</h2>
    <p class="muted">${esc(content.text)}</p>
  </div>
</section>`;
  },

  // (Không bắt buộc) chạy sau khi phần đã hiện ra, dùng để gắn nút bấm, hiệu ứng…
  mount(el, site) {},
};
