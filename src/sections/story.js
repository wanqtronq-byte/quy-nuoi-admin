// Phần "Chuyện là…": vài đoạn kể chuyện, sửa trong mảng `paragraphs`.

import { esc } from '../lib/dom.js';

const content = {
  title: 'Chuyện là…',
  paragraphs: [
    'Ban ngày tui làm HR, tối về ngồi vibe code mấy tool nhỏ. Cuối tháng tới thì ví mỏng như wifi quán cà phê.',
    'Không mục tiêu, không kế hoạch, không hứa hẹn gì hết. Đơn giản là tui xin tiền, bạn thấy vui thì cho. Vậy thôi á.',
  ],
};

export default {
  id: 'chuyen-la',
  nav: 'Chuyện là…',

  css: `
.story { padding-block: 64px 24px; }
.story-card { display: flex; flex-wrap: wrap; gap: 20px 40px; align-items: flex-start; border-radius: 28px; padding: 32px; box-shadow: 6px 6px 0 var(--mint); }
.story-card h2 { flex: 1 1 240px; }
.story-body { flex: 999 1 480px; min-width: 0; display: flex; flex-direction: column; gap: 12px; font-size: 19px; line-height: 1.7; color: var(--muted); max-width: 65ch; }
`,

  render() {
    return `
<section id="chuyen-la" class="wrap story">
  <div class="card story-card">
    <h2 class="h2">${esc(content.title)}</h2>
    <div class="story-body">${content.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
  </div>
</section>`;
  },
};
