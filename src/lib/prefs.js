// Hai nút trên thanh menu: đổi ngôn ngữ (VI/EN) và đổi sáng/tối.
// Chế độ màu: mặc định theo máy người xem; bấm nút thì ghi nhớ lựa chọn.

import { lang, setLang, L } from './i18n.js';
import { injectCss } from './dom.js';

const SUN = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>';
const MOON = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>';

injectCss('prefs', `
.prefs { display: inline-flex; gap: 6px; align-items: center; }
.pref-btn { min-width: 44px; min-height: 44px; padding: 0 12px; border-radius: 999px; border: 2px solid var(--ink); background: var(--paper); color: var(--ink); font: 700 14px var(--font-body); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
.pref-btn:hover { background: var(--bg); }
`);

const isDark = () => {
  const t = document.documentElement.dataset.theme;
  if (t) return t === 'dark';
  return matchMedia('(prefers-color-scheme: dark)').matches;
};

export function togglesHtml() {
  return `<span class="prefs">
  <button type="button" class="pref-btn" data-pref-lang aria-label="${L('Switch to English', 'Chuyển sang tiếng Việt')}">${lang === 'vi' ? 'EN' : 'VI'}</button>
  <button type="button" class="pref-btn" data-pref-theme aria-label="${L('Đổi chế độ sáng tối', 'Toggle light or dark mode')}">${isDark() ? SUN : MOON}</button>
</span>`;
}

export function bindToggles(root = document) {
  root.querySelectorAll('[data-pref-lang]').forEach((b) => b.addEventListener('click', () => setLang(lang === 'vi' ? 'en' : 'vi')));
  root.querySelectorAll('[data-pref-theme]').forEach((b) => b.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* bỏ qua */ }
    document.querySelectorAll('[data-pref-theme]').forEach((x) => { x.innerHTML = next === 'dark' ? SUN : MOON; });
  }));
}
