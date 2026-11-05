// Phần "Chuyện là…": vài đoạn kể chuyện, sửa trong mảng `paragraphs`.

import { esc } from '../lib/dom.js';
import { localize } from '../lib/i18n.js';

const content = localize({
  title: { vi: 'Chuyện là…', en: 'The story' },
  paragraphs: [
    { vi: 'Ban ngày tui làm HR, tối về ngồi vibe code mấy tool nhỏ.', en: 'By day I work in HR. By night I vibe code little tools.' },
    { vi: 'Bán mình cho tư bản mà lương chỉ đủ uống nước cầm hơi. Xin thí chủ một miếng bánh để tui có thêm động lực chia sẻ nhiều điều thú vị hơn nha.', en: 'Sold my soul to capitalism and the salary barely covers water. Spare a snack and I will be fueled to share more fun stuff.' },
  ],
});

export default {
  id: 'chuyen-la',
  nav: { vi: 'Chuyện là…', en: 'Story' },

  css: `
.story { padding-block: 40px 16px; }
.story-card { display: flex; flex-wrap: wrap; gap: 12px 32px; align-items: flex-start; border-radius: 22px; padding: 22px 24px; box-shadow: 5px 5px 0 var(--mint); }
.story-card h2 { flex: 1 1 200px; font-size: clamp(24px, 3.2vw, 32px); }
.story-body { flex: 999 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 8px; font-size: 16px; line-height: 1.6; color: var(--muted); max-width: 62ch; }
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
