// Phần "Chuyện là…": vài đoạn kể chuyện, sửa trong mảng `paragraphs`.

import { esc } from '../lib/dom.js';

const content = {
  title: 'Chuyện là…',
  paragraphs: [
    'Ban ngày tui làm HR, tối về ngồi vibe code mấy tool nhỏ.',
    'Bán mình cho tư bản mà lương chỉ đủ uống nước cầm hơi. Xin thí chủ một miếng bánh để tui có thêm động lực chia sẻ nhiều điều thú vị hơn nha.',
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
