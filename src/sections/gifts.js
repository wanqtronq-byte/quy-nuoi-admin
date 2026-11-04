// Phần "Quà cảm ơn": danh sách quà, thêm/bớt quà trong mảng `items`.

import { esc } from '../lib/dom.js';

const ICONS = {
  hr: `<svg aria-hidden="true" width="68" height="68" viewBox="0 0 72 72" fill="none" stroke="#17342B" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="14" width="60" height="48" rx="9" fill="#fff"/><path d="M26 14 V8 H46 V14"/><circle cx="26" cy="35" r="7" fill="#FFD86B"/><path d="M15 54 C17 46 35 46 37 54"/><path d="M44 31 H58"/><path d="M44 41 H54"/></svg>`,
  code: `<svg aria-hidden="true" width="76" height="64" viewBox="0 0 80 64" fill="none" stroke="#17342B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 14 L6 32 L24 50"/><path d="M56 14 L74 32 L56 50"/><path d="M46 6 L34 58" stroke="#0E7A5A"/></svg>`,
  heart: `<svg aria-hidden="true" width="24" height="24" viewBox="0 0 40 40"><path d="M20 34 C6 24 2 16 8 10 C13 5 19 8 20 13 C21 8 27 5 32 10 C38 16 34 24 20 34 Z" fill="#FFB5C2" stroke="#17342B" stroke-width="3.5" stroke-linejoin="round"/></svg>`,
};

const content = {
  title: 'Quà cảm ơn của bạn ở đây nè',
  items: [
    {
      icon: 'hr', title: 'Mẹo HR bỏ túi', desc: 'CV · phỏng vấn · deal lương. Kèm bài thử sức năng lực HR có biểu đồ nhện:',
      links: [
        { label: 'Bản rút gọn · 16 câu/đề', href: '/danh-gia.html?bo=rut-gon' },
        { label: 'Bản đầy đủ · 24–28 câu/đề', href: '/danh-gia.html?bo=day-du' },
      ],
    },
    { icon: 'code', title: 'Prompt vibe code', desc: 'Mấy prompt tui hay xài' },
  ],
  noteBefore: 'Có cho hay không cũng lấy được, ',
  noteLink: 'nhắn tui',
  noteAfter: ' là có liền.',
};

export default {
  id: 'qua',
  nav: 'Quà cảm ơn',

  css: `
.gifts { background: var(--mint); }
.gifts .wrap { padding-block: 40px 56px; display: flex; flex-direction: column; gap: 28px; }
.gifts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr)); gap: 24px; }
.gift { display: flex; align-items: center; gap: 24px; padding: 24px; }
.gift-tile { flex: 0 0 auto; width: 120px; height: 120px; border-radius: 26px; background: var(--bg); border: 3px solid var(--ink); display: flex; align-items: center; justify-content: center; animation: tilt 3s ease-in-out infinite; }
.gift:nth-child(even) .gift-tile { animation-direction: reverse; }
.gift h3 { font-size: 28px; line-height: 1.2; }
.gift p { font-size: 17px; line-height: 1.5; color: var(--muted); margin-top: 6px; }
.gift-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.gift-links a { display: inline-flex; align-items: center; min-height: 40px; padding: 0 14px; border: 2.5px solid var(--ink); border-radius: 999px; background: var(--mint); font-weight: 700; font-size: 14.5px; text-decoration: none; box-shadow: 2px 2px 0 var(--ink); }
.gifts-note { align-self: flex-start; display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-size: 17px; background: var(--paper); border: 2.5px dashed var(--ink); border-radius: 16px; padding: 12px 18px; }
.gifts-note a { color: var(--deep); font-weight: 700; }
@media (max-width: 600px) { .gift { flex-direction: column; align-items: flex-start; } }
`,

  render(site) {
    const chatOn = site.chat && site.chat.enabled;
    const items = content.items.map((it) => `
      <div class="card gift">
        <div class="gift-tile">${ICONS[it.icon] || ''}</div>
        <div><h3 class="display">${esc(it.title)}</h3><p>${esc(it.desc)}</p>${it.links ? `<div class="gift-links">${it.links.map((l) => `<a class="pop" href="${esc(l.href)}">${esc(l.label)} →</a>`).join('')}</div>` : ''}</div>
      </div>`).join('');
    const note = chatOn
      ? `<p class="gifts-note">${ICONS.heart}<span>${esc(content.noteBefore)}<a href="#chat" data-open-chat>${esc(content.noteLink)}</a>${esc(content.noteAfter)}</span></p>`
      : '';
    return `
<section class="gifts">
  <div id="qua" class="wrap">
    <h2 class="h2">${esc(content.title)}</h2>
    <div class="gifts-grid">${items}</div>
    ${note}
  </div>
</section>`;
  },
};
