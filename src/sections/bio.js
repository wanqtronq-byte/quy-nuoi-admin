// Phần "Tiểu sử Nhũn": giới thiệu linh vật của trang.

import { esc } from '../lib/dom.js';
import { localize } from '../lib/i18n.js';

const content = localize({
  kicker: { vi: 'Tiểu sử', en: 'Bio' },
  name: 'Nhũn',
  def: {
    vi: 'Nhũn (danh từ, tính từ): trạng thái bán mình cho tư bản đến không còn chút sức lực nào.',
    en: 'Nhũn (noun, adjective): the state of selling your soul to capitalism until there is no strength left.',
  },
  facts: [
    { k: { vi: 'Nghề nghiệp', en: 'Job' }, v: { vi: 'Ngày làm HR, tối vibe code, rảnh thì xin bánh', en: 'HR by day, vibe coder by night, snack beggar in between' } },
    { k: { vi: 'Trang phục', en: 'Outfit' }, v: { vi: 'Áo rách vá chằng vá đụp, mặc từ đầu tháng tới cuối tháng', en: 'A patched-up torn shirt, worn all month long' } },
    { k: { vi: 'Sở thích', en: 'Likes' }, v: { vi: 'Bánh mì, bông lan trứng muối, ngày lĩnh lương', en: 'Bánh mì, salted egg sponge cake, payday' } },
    { k: { vi: 'Sợ nhất', en: 'Fears' }, v: { vi: 'Deadline thứ Sáu và email "em xem gấp giúp anh"', en: 'Friday deadlines and "can you take a quick look"' } },
  ],
  alt: { vi: 'Nhũn, chú cún mặc áo rách vá chằng vá đụp', en: 'Nhũn, the dog in a patched-up torn shirt' },
});

export default {
  id: 'nhun',
  nav: { vi: 'Nhũn là ai?', en: 'Who is Nhũn?' },

  css: `
.bio { padding-block: 40px 8px; }
.bio-card { display: flex; flex-wrap: wrap; gap: 16px 28px; align-items: center; padding: 20px 22px; border-radius: 22px; box-shadow: 5px 5px 0 var(--mint); }
.bio-pic { flex: 0 0 auto; width: 150px; max-width: 100%; aspect-ratio: 1; border-radius: 18px; background: #fff; border: 3px solid var(--ink); display: flex; align-items: center; justify-content: center; padding: 8px; transform: rotate(-3deg); }
.bio-pic img { width: 100%; height: 100%; object-fit: contain; animation: dogbounce 2.8s ease-in-out infinite; }
.bio-body { flex: 999 1 340px; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.bio-body .h2 { font-size: clamp(26px, 3.4vw, 34px); }
.bio-kicker { align-self: flex-start; color: #17342B; background: var(--sun); border: 2.5px solid var(--ink); border-radius: 999px; padding: 3px 12px; font-weight: 700; font-size: 13px; }
.bio-def { font-size: 16px; line-height: 1.55; font-style: italic; border-left: 0; background: var(--bg); border: 2px dashed var(--ink); border-radius: 12px; padding: 10px 14px; }
.bio-facts { display: grid; grid-template-columns: max-content 1fr; gap: 4px 14px; margin: 0; font-size: 15px; line-height: 1.45; }
.bio-facts dt { font-weight: 700; }
.bio-facts dd { margin: 0; color: var(--muted); }
@media (max-width: 600px) { .bio-facts { grid-template-columns: 1fr; } .bio-facts dd { margin-bottom: 6px; } }
`,

  render() {
    return `
<section id="nhun" class="wrap bio">
  <div class="card bio-card">
    <div class="bio-pic"><img src="/assets/img/meme/home-1.webp" alt="${esc(content.alt)}"></div>
    <div class="bio-body">
      <span class="bio-kicker">${esc(content.kicker)}</span>
      <h2 class="h2">${esc(content.name)}</h2>
      <p class="bio-def">${esc(content.def)}</p>
      <dl class="bio-facts">${content.facts.map((f) => `<dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd>`).join('')}</dl>
    </div>
  </div>
</section>`;
  },
};
