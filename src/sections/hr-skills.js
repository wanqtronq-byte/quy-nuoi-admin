// Phần "Thử sức năng lực HR" trên trang chính: 2 thẻ dẫn sang trang làm bài.
// Nội dung bộ đề nằm trong src/hr/.

import { esc } from '../lib/dom.js';
import { SETS } from '../hr/sets.js';

const content = {
  title: 'Thử sức năng lực HR',
  lead: 'Quà nè: hai bộ đánh giá năng lực cho dân nhân sự, tui soạn lại cho dễ đọc. Làm xong có biểu đồ nhện, biết ngay mình đang ở cấp nào.',
  cards: [
    { set: 'rut-gon', time: 'Cả bộ ~30 phút', count: '16 câu/đề', who: 'Muốn check nhanh trong giờ nghỉ trưa' },
    { set: 'day-du', time: 'Cả bộ ~1 tiếng', count: '24–28 câu/đề', who: 'Muốn soi kỹ để lên kế hoạch phát triển' },
  ],
};

const CHART = `<svg aria-hidden="true" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#17342B" stroke-width="3" stroke-linejoin="round"><polygon points="32,6 56,22 50,52 14,52 8,22" fill="#fff"/><polygon points="32,18 46,26 42,44 22,44 18,26" fill="#5FD3A8"/><path d="M32 6 V32 M56 22 L32 32 M50 52 L32 32 M14 52 L32 32 M8 22 L32 32" stroke-width="1.5"/></svg>`;

export default {
  id: 'nang-luc',
  nav: 'Thử sức HR',

  css: `
.hrs { padding-block: 64px 8px; display: flex; flex-direction: column; gap: 24px; }
.hrs-lead { font-size: 19px; line-height: 1.65; color: var(--muted); max-width: 64ch; }
.hrs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr)); gap: 24px; }
.hrs-card { padding: 24px; display: flex; gap: 20px; align-items: flex-start; text-decoration: none; color: var(--ink); }
.hrs-card:hover { color: var(--ink); }
.hrs-icon { flex: 0 0 auto; width: 96px; height: 96px; border-radius: 22px; background: var(--bg); border: 3px solid var(--ink); display: flex; align-items: center; justify-content: center; animation: tilt 3s ease-in-out infinite; }
.hrs-card:nth-child(even) .hrs-icon { animation-direction: reverse; }
.hrs-body { min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.hrs-body h3 { font-size: 26px; line-height: 1.2; }
.hrs-body p { font-size: 16px; line-height: 1.55; color: var(--muted); }
.hrs-meta { display: flex; flex-wrap: wrap; gap: 8px; font-size: 13.5px; font-weight: 700; }
.hrs-meta span { background: var(--bg); border: 2px solid var(--ink); border-radius: 999px; padding: 3px 10px; }
.hrs-cta { font-weight: 700; color: var(--deep); }
@media (max-width: 600px) { .hrs-card { flex-direction: column; } }
`,

  render() {
    const cards = content.cards.map((c) => {
      const s = SETS[c.set];
      return `
      <a class="card hrs-card pop" href="/danh-gia.html?bo=${esc(s.id)}">
        <span class="hrs-icon">${CHART}</span>
        <span class="hrs-body">
          <h3 class="display">${esc(s.name)}</h3>
          <p>${esc(c.who)}. 4 đề trắc nghiệm kiến thức + 4 bộ tự đánh giá hành vi.</p>
          <span class="hrs-meta"><span>${esc(c.count)}</span><span>${esc(c.time)}</span><span>Có biểu đồ nhện</span></span>
          <span class="hrs-cta">Vào làm thử →</span>
        </span>
      </a>`;
    }).join('');
    return `
<section id="nang-luc" class="wrap hrs">
  <h2 class="h2">${esc(content.title)}</h2>
  <p class="hrs-lead">${esc(content.lead)}</p>
  <div class="hrs-grid">${cards}</div>
</section>`;
  },
};
