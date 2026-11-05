// Trang một bài học AI: /bai-hoc.html?bai=1
// Gồm: mục tiêu, các nguồn học (mở tab mới), bài thực hành dạng checklist, nút bài trước/sau.

import { LESSONS, INTRO } from './lessons.js';
import { esc, injectCss } from '../lib/dom.js';
import { L } from '../lib/i18n.js';
import { togglesHtml, bindToggles } from '../lib/prefs.js';

injectCss('lesson', `
#lesson-app { padding-block: 32px 80px; }
.ls { display: flex; flex-direction: column; gap: 24px; max-width: 900px; }
.ls-back { align-self: flex-start; font-weight: 700; color: var(--accent); text-decoration: none; }
.ls-kicker { align-self: flex-start; color: #17342B; background: var(--sun); border: 2.5px solid var(--ink); border-radius: 999px; padding: 5px 14px; font-weight: 700; font-size: 14px; }
.ls h1 { font-family: var(--font-display); font-size: clamp(34px, 5vw, 52px); line-height: 1.12; }
.ls-outcome { display: flex; gap: 10px; align-items: center; font-weight: 700; }
.ls-outcome span { background: var(--mint); border: 2px solid var(--ink); border-radius: 999px; padding: 4px 12px; font-size: 14px; }
.ls-box { padding: 24px; display: flex; flex-direction: column; gap: 14px; }
.ls-box h2 { font-family: var(--font-display); font-size: 26px; line-height: 1.2; }
.ls-box p { font-size: 17px; line-height: 1.65; color: var(--muted); }
.ls-group h3 { font-size: 15px; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); margin: 4px 0 10px; }
.ls-srcs { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: 14px; }
.ls-src { display: flex; flex-direction: column; gap: 8px; padding: 16px; border: 2.5px solid var(--ink); border-radius: 16px; background: var(--bg); text-decoration: none; color: var(--ink); }
.ls-src:hover { color: var(--ink); background: var(--mint); }
.ls-src b { font-size: 17px; line-height: 1.35; }
.ls-src small { font-size: 13px; font-weight: 700; color: var(--muted); }
.ls-src p { font-size: 15px !important; line-height: 1.55 !important; }
.ls-src em { font-style: normal; font-weight: 700; color: var(--accent); margin-top: auto; }
.ls-steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.ls-steps label { display: flex; gap: 12px; align-items: flex-start; padding: 10px 12px; border: 2px solid var(--ink); border-radius: 12px; background: var(--paper); cursor: pointer; font-size: 16px; line-height: 1.5; }
.ls-steps input { width: 20px; height: 20px; margin-top: 2px; accent-color: #0E7A5A; flex: 0 0 auto; }
.ls-steps input:checked + span { text-decoration: line-through; color: var(--muted); }
.ls-done { font-weight: 700; color: var(--accent); min-height: 24px; }
.ls-nav { display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; }
.ls-nav a { min-height: 48px; padding: 0 20px; border-radius: 14px; border: 2.5px solid var(--ink); background: var(--paper); font-weight: 700; color: var(--ink); text-decoration: none; display: inline-flex; align-items: center; }
.ls-nav a.next { background: var(--deep); color: #fff; box-shadow: 4px 4px 0 var(--ink); }
.ls-note { font-size: 14px !important; }
`);

const params = new URLSearchParams(location.search);
const idx = Math.max(0, LESSONS.findIndex((l) => l.id === params.get('bai')));
const lesson = LESSONS[idx];
const app = document.getElementById('lesson-app');
const KEY = `ai-lesson-${lesson.id}`;

const slot = document.getElementById('prefs-slot');
if (slot) { slot.innerHTML = togglesHtml(); bindToggles(slot); }
document.querySelectorAll('[data-i18n-vi]').forEach((el) => { el.textContent = L(el.dataset.i18nVi, el.dataset.i18nEn); });
document.title = `${L('Bài', 'Lesson')} ${lesson.id}: ${lesson.title}`;

let checked = [];
try { checked = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { checked = []; }

const groups = lesson.groups.map((g) => `
  <div class="ls-group">
    ${g.title ? `<h3>${esc(g.title)}</h3>` : ''}
    <div class="ls-srcs">${g.items.map((s) => `
      <a class="ls-src pop" href="${esc(s.url)}" target="_blank" rel="noopener">
        <small>${esc(s.kind)} · ${esc(s.by)}</small>
        <b>${esc(s.title)}</b>
        <p>${esc(s.desc)}</p>
        <em>${L('Mở nguồn ↗', 'Open source ↗')}</em>
      </a>`).join('')}</div>
  </div>`).join('');

const prev = LESSONS[idx - 1];
const next = LESSONS[idx + 1];

app.innerHTML = `
<div class="wrap"><div class="ls">
  <a class="ls-back" href="/meo.html?chu-de=vibe-code">← ${L('Về Góc AI', 'Back to AI corner')}</a>
  <span class="ls-kicker">${L('Bài', 'Lesson')} ${esc(lesson.id)}/${LESSONS.length}</span>
  <h1>${esc(lesson.title)}</h1>
  <div class="ls-outcome">${L('Học xong bạn có:', 'You will come away with:')} <span>${esc(lesson.outcome)}</span></div>

  <section class="card ls-box">
    <h2>${L('Mục tiêu', 'Goal')}</h2>
    <p>${esc(lesson.goal)}</p>
  </section>

  <section class="card ls-box">
    <h2>${L('Học từ đâu', 'Where to learn')}</h2>
    ${groups}
    <p class="ls-note">${esc(INTRO.note)}</p>
  </section>

  <section class="card ls-box">
    <h2>${L('Thực hành', 'Practice')}</h2>
    <p>${esc(lesson.practice.intro)}</p>
    <ul class="ls-steps">${lesson.practice.steps.map((s, i) => `
      <li><label><input type="checkbox" data-step="${i}" ${checked.includes(i) ? 'checked' : ''}><span>${esc(s)}</span></label></li>`).join('')}</ul>
    <p class="ls-done" aria-live="polite"></p>
  </section>

  <nav class="ls-nav" aria-label="${L('Chuyển bài', 'Lessons')}">
    ${prev ? `<a href="/bai-hoc.html?bai=${prev.id}">← ${L('Bài', 'Lesson')} ${prev.id}</a>` : '<span></span>'}
    ${next ? `<a class="next" href="/bai-hoc.html?bai=${next.id}">${L('Bài', 'Lesson')} ${next.id}: ${esc(next.title)} →</a>` : `<a class="next" href="/meo.html?chu-de=vibe-code">${L('Xong cả 4 bài, về Góc AI', 'All 4 done, back to AI corner')}</a>`}
  </nav>
</div></div>`;

const done = app.querySelector('.ls-done');
const boxes = [...app.querySelectorAll('[data-step]')];
function update() {
  checked = boxes.filter((b) => b.checked).map((b) => Number(b.dataset.step));
  try { localStorage.setItem(KEY, JSON.stringify(checked)); } catch { /* bỏ qua */ }
  done.textContent = checked.length === boxes.length
    ? L('Xong bài thực hành rồi! Áp dụng vào việc thật luôn nha.', 'Practice done! Now try it on real work.')
    : `${checked.length}/${boxes.length} ${L('bước', 'steps')}`;
}
boxes.forEach((b) => b.addEventListener('change', update));
update();
