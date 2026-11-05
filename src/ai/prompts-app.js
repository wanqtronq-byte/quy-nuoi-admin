// Trang Kho prompt: lọc theo nhóm, tìm kiếm, copy một chạm. Dữ liệu trong src/ai/prompts.js.

import { GROUPS, PROMPTS } from './prompts.js';
import { esc, injectCss } from '../lib/dom.js';
import { L } from '../lib/i18n.js';
import { togglesHtml, bindToggles } from '../lib/prefs.js';

injectCss('prompts', `
#prompts-app { padding-block: 32px 80px; }
.pr { display: flex; flex-direction: column; gap: 22px; }
.pr-back { align-self: flex-start; font-weight: 700; color: var(--accent); text-decoration: none; }
.pr h1 { font-family: var(--font-display); font-size: clamp(36px, 5vw, 56px); line-height: 1.1; }
.pr-lead { font-size: 18px; line-height: 1.6; color: var(--muted); max-width: 66ch; }
.pr-tools { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.pr-chip { min-height: 40px; padding: 0 16px; border-radius: 999px; border: 2px solid var(--ink); background: var(--paper); color: var(--ink); font: 700 15px var(--font-body); cursor: pointer; }
.pr-chip[aria-pressed="true"] { background: var(--mint); box-shadow: 2px 2px 0 var(--ink); }
.pr-search { flex: 1 1 220px; min-width: 0; min-height: 44px; padding: 0 16px; border: 2.5px solid var(--ink); border-radius: 999px; background: var(--paper); color: var(--ink); font: 500 16px var(--font-body); }
.pr-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(460px, 100%), 1fr)); gap: 20px; align-items: start; }
.pr-card { padding: 20px; display: flex; flex-direction: column; gap: 10px; }
.pr-card small { font-size: 12.5px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); }
.pr-card h2 { font-family: var(--font-display); font-size: 22px; line-height: 1.25; }
.pr-card p { font-size: 15px; line-height: 1.55; color: var(--muted); }
.pr-text { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; font: 14.5px/1.6 var(--font-body); background: var(--bg); border: 2px solid var(--ink); border-radius: 14px; padding: 14px; max-height: 260px; overflow: auto; color: var(--ink); }
.pr-text mark { background: #FFD86B; color: #17342B; border-radius: 4px; padding: 0 2px; }
.pr-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.pr-copy { min-height: 44px; padding: 0 18px; border-radius: 12px; border: 2.5px solid var(--ink); background: var(--deep); color: #fff; font: 700 15px var(--font-body); cursor: pointer; box-shadow: 3px 3px 0 var(--ink); }
.pr-more { min-height: 44px; padding: 0 14px; border-radius: 12px; border: 2px solid var(--ink); background: var(--paper); color: var(--ink); font: 600 14px var(--font-body); cursor: pointer; }
.pr-text.open { max-height: none; }
.pr-empty { color: var(--muted); font-size: 16px; }
.pr-tip { font-size: 14.5px; line-height: 1.6; background: var(--warn); border: 2px dashed var(--ink); border-radius: 14px; padding: 12px 14px; }
`);

const slot = document.getElementById('prefs-slot');
if (slot) { slot.innerHTML = togglesHtml(); bindToggles(slot); }
document.querySelectorAll('[data-i18n-vi]').forEach((el) => { el.textContent = L(el.dataset.i18nVi, el.dataset.i18nEn); });
document.title = L('Kho prompt', 'Prompt library');

const app = document.getElementById('prompts-app');
const groupName = Object.fromEntries(GROUPS.map((g) => [g.id, g.name]));
let group = 'all';
let query = '';

// Tô màu chỗ cần điền [..]
const highlight = (t) => esc(t).replace(/\[([^\]\n]{1,80})\]/g, '<mark>[$1]</mark>');

app.innerHTML = `
<div class="wrap pr">
  <a class="pr-back" href="/meo.html?chu-de=vibe-code">← ${L('Về Góc AI', 'Back to AI corner')}</a>
  <h1>${L('Kho prompt', 'Prompt library')}</h1>
  <p class="pr-lead">${L(`${PROMPTS.length} prompt dùng được ngay cho HR, việc văn phòng, vibe code và tự học. Bấm Copy, dán vào ChatGPT, Claude hay Gemini, rồi thay mấy chỗ tô vàng bằng thông tin của bạn.`, `${PROMPTS.length} ready-to-use prompts for HR, office work, vibe coding and learning. Copy, paste into ChatGPT, Claude or Gemini, then replace the yellow parts with your details.`)}</p>
  <p class="pr-tip">${L('Nhớ: không dán tên thật, số điện thoại, CCCD, lương của người khác vào AI. Thay bằng tên giả hoặc ẩn đi trước khi dán.', 'Remember: do not paste real names, phone numbers, IDs or salaries into AI. Replace or remove them first.')}</p>
  <div class="pr-tools">
    <button type="button" class="pr-chip" data-g="all" aria-pressed="true">${L('Tất cả', 'All')}</button>
    ${GROUPS.map((g) => `<button type="button" class="pr-chip" data-g="${g.id}" aria-pressed="false">${esc(g.name)}</button>`).join('')}
    <label class="sr" for="pr-q">${L('Tìm prompt', 'Search prompts')}</label>
    <input id="pr-q" class="pr-search" type="search" placeholder="${L('Tìm: JD, email, Excel…', 'Search: JD, email, Excel…')}">
  </div>
  <div class="pr-list"></div>
</div>`;

const list = app.querySelector('.pr-list');

function render() {
  const q = query.trim().toLowerCase();
  const items = PROMPTS.filter((p) => (group === 'all' || p.group === group)
    && (!q || `${p.title} ${p.when} ${p.text}`.toLowerCase().includes(q)));
  if (!items.length) {
    list.innerHTML = `<p class="pr-empty">${L('Chưa có prompt nào khớp. Thử từ khác nha.', 'No prompts match. Try another word.')}</p>`;
    return;
  }
  list.innerHTML = items.map((p) => `
    <article class="card pr-card">
      <small>${esc(groupName[p.group] || '')}</small>
      <h2>${esc(p.title)}</h2>
      <p>${esc(p.when)}</p>
      <pre class="pr-text">${highlight(p.text)}</pre>
      <div class="pr-row">
        <button type="button" class="pr-copy" data-i="${PROMPTS.indexOf(p)}">${L('Copy prompt', 'Copy prompt')}</button>
        <button type="button" class="pr-more">${L('Xem hết', 'Show all')}</button>
      </div>
    </article>`).join('');
}

app.addEventListener('click', async (e) => {
  const chip = e.target.closest('.pr-chip');
  if (chip) {
    group = chip.dataset.g;
    app.querySelectorAll('.pr-chip').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    render();
    return;
  }
  const copy = e.target.closest('.pr-copy');
  if (copy) {
    const text = PROMPTS[Number(copy.dataset.i)].text;
    try {
      await navigator.clipboard.writeText(text);
      copy.textContent = L('Copy rồi nè!', 'Copied!');
    } catch {
      const pre = copy.closest('.pr-card').querySelector('.pr-text');
      const r = document.createRange(); r.selectNodeContents(pre);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      copy.textContent = L('Đã bôi đen, bấm Ctrl+C', 'Selected, press Ctrl+C');
    }
    setTimeout(() => { copy.textContent = L('Copy prompt', 'Copy prompt'); }, 1800);
    return;
  }
  const more = e.target.closest('.pr-more');
  if (more) {
    const pre = more.closest('.pr-card').querySelector('.pr-text');
    pre.classList.toggle('open');
    more.textContent = pre.classList.contains('open') ? L('Thu gọn', 'Collapse') : L('Xem hết', 'Show all');
  }
});
app.querySelector('#pr-q').addEventListener('input', (e) => { query = e.target.value; render(); });
render();
