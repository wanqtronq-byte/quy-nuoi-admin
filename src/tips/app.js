// Trang mẹo dùng chung: đọc chủ đề từ ?chu-de=…, hiện các module trong src/config/tips.js.

import TIPS from '../config/tips.js';
import { esc, injectCss } from '../lib/dom.js';
import { L } from '../lib/i18n.js';
import { togglesHtml, bindToggles } from '../lib/prefs.js';

injectCss('tips', `
#tips-app { padding-block: 40px 80px; }
.tips-stack { display: flex; flex-direction: column; gap: 28px; }
.tips-head { display: flex; flex-direction: column; gap: 12px; }
.tips-back { align-self: flex-start; font-weight: 700; color: var(--accent); text-decoration: none; }
.tips-head h1 { font-family: var(--font-display); font-size: clamp(38px, 6vw, 60px); line-height: 1.1; }
.tips-head p { font-size: 19px; line-height: 1.6; color: var(--muted); max-width: 62ch; }
.tips-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr)); gap: 22px; }
.tip-mod { padding: 24px; display: flex; flex-direction: column; gap: 10px; text-decoration: none; color: var(--ink); }
.tip-mod:hover { color: var(--ink); }
.tip-mod h2 { font-family: var(--font-display); font-size: 26px; line-height: 1.2; }
.tip-mod p { font-size: 16px; line-height: 1.55; color: var(--muted); }
.tip-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tip-tags span { font-size: 13.5px; font-weight: 700; background: var(--bg); border: 2px solid var(--ink); border-radius: 999px; padding: 3px 10px; }
.tips-grid.two { grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr)); }
.tip-go { font-weight: 700; color: var(--accent); margin-top: auto; }
.tip-num { align-self: flex-start; font-size: 13px; font-weight: 800; color: #17342B; background: var(--sun); border: 2px solid var(--ink); border-radius: 999px; padding: 2px 10px; }
.tip-mod p { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.tips-intro { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 4px; color: var(--muted); font-size: 16px; line-height: 1.6; max-width: 70ch; }
.tips-empty { padding: 40px 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; border-style: dashed; }
.tips-empty img { width: 150px; height: auto; }
.tips-empty p { font-size: 17px; color: var(--muted); max-width: 40ch; line-height: 1.6; }
`);

const params = new URLSearchParams(location.search);
const topic = TIPS[params.get('chu-de')] || TIPS.hr;
const app = document.getElementById('tips-app');

document.title = topic.title;
const slot = document.getElementById('prefs-slot');
if (slot) { slot.innerHTML = togglesHtml(); bindToggles(slot); }
document.querySelectorAll('[data-i18n-vi]').forEach((el) => { el.textContent = L(el.dataset.i18nVi, el.dataset.i18nEn); });

const mods = topic.modules || [];
const body = mods.length
  ? `<div class="tips-grid${topic.numbered ? ' two' : ''}">${mods.map((m) => `
      <a class="card tip-mod pop" href="${esc(m.href)}">
        ${m.num ? `<span class="tip-num">${L('Bài', 'Lesson')} ${esc(m.num)}</span>` : ''}
        <h2>${esc(m.title)}</h2>
        ${m.desc ? `<p>${esc(m.desc)}</p>` : ''}
        ${m.tags && m.tags.length ? `<div class="tip-tags">${m.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
        <span class="tip-go">${topic.numbered ? L('Vào học →', 'Start →') : L('Vào làm →', 'Open →')}</span>
      </a>`).join('')}</div>`
  : `<div class="card tips-empty">
      <img src="/assets/img/meme/lv2.webp" alt="${L('Cún cầm sổ ghi chép', 'Dog taking notes')}">
      <p>${L('Admin đang soạn, chưa có gì ở đây hết. Ghé lại sau nha!', 'The admin is still writing this one. Check back soon!')}</p>
    </div>`;

app.innerHTML = `
<div class="wrap tips-stack">
  <div class="tips-head">
    <a class="tips-back" href="/#qua">← ${L('Về trang chính', 'Back home')}</a>
    <h1>${esc(topic.title)}</h1>
    ${topic.lead ? `<p>${esc(topic.lead)}</p>` : ''}
    ${topic.intro ? `<ul class="tips-intro">${topic.intro.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
  </div>
  ${body}
</div>`;
