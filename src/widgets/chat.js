// Khung "Chat với admin": nút nổi góc phải + hộp chat gọi /api/chat (Gemini).
// Cấu hình chữ, câu gợi ý trong src/config/site.js → chat.

import { injectCss, fragment, esc } from '../lib/dom.js';
import { googly } from './googly.js';
import { leash } from './leash.js';
import { randomWish } from './wishes.js';
import { lang } from '../lib/i18n.js';

const css = `
.chat-fab { position: fixed; right: calc(20px + env(safe-area-inset-right, 0px)); bottom: calc(20px + env(safe-area-inset-bottom, 0px)); z-index: 50; display: flex; align-items: center; gap: 10px; min-height: 72px; padding: 5px; background: var(--deep); color: #fff; font: 700 17px var(--font-body); border: 3px solid var(--ink); border-radius: 999px; box-shadow: 5px 5px 0 var(--ink); cursor: pointer; animation: chat-bob 3s ease-in-out infinite; }
.chat-fab[aria-expanded="true"] { display: none; }
.chat-av { width: 40px; height: 40px; border-radius: 999px; background: #fff; border: 2.5px solid var(--ink); object-fit: contain; flex: 0 0 auto; }
.chat-fab .chat-av { width: 62px; height: 62px; }
.chat-head .chat-av { width: 52px; height: 52px; }
.chat-av { padding: 0; }
.chat-fab .googly { width: 62px; height: 62px; }
.chat-head .googly { width: 52px; height: 52px; }
.chat-panel { position: fixed; right: calc(20px + env(safe-area-inset-right, 0px)); bottom: calc(20px + env(safe-area-inset-bottom, 0px)); z-index: 60; width: min(390px, calc(100vw - 24px)); height: min(580px, calc(100dvh - 40px)); display: flex; flex-direction: column; background: var(--paper); border: 3px solid var(--ink); border-radius: 26px; box-shadow: 8px 8px 0 var(--ink); overflow: hidden; animation: rise .25s ease-out both; }
.chat-panel[hidden] { display: none; }
.chat-head { display: flex; align-items: center; gap: 12px; padding: 12px 12px 12px 16px; background: var(--mint); border-bottom: 3px solid var(--ink); }
.chat-head b { display: block; font-family: var(--font-display); font-size: 21px; line-height: 1.1; }
.chat-head small { display: flex; align-items: center; gap: 6px; font-size: 13px; }
.chat-head small::before { content: ""; width: 8px; height: 8px; border-radius: 999px; background: var(--deep); }
.chat-x { margin-left: auto; width: 44px; height: 44px; border-radius: 999px; border: 2.5px solid var(--ink); background: var(--paper); color: var(--ink); cursor: pointer; display: flex; align-items: center; justify-content: center; }
.chat-log { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; background: var(--bg); }
.chat-row { display: flex; gap: 8px; align-items: flex-end; }
.chat-row.me { justify-content: flex-end; }
.chat-row .chat-av { width: 32px; height: 32px; border-width: 2px; }
.chat-bubble { max-width: 78%; padding: 10px 14px; border: 2.5px solid var(--ink); border-radius: 18px; font-size: 15.5px; line-height: 1.5; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--paper); }
.chat-row.bot .chat-bubble, .chat-row.err .chat-bubble { border-bottom-left-radius: 6px; }
.chat-row.me .chat-bubble { background: var(--deep); color: #fff; border-bottom-right-radius: 6px; }
.chat-row.err .chat-bubble { background: #FFF1F3; color: #8A2238; }
.chat-meme { padding: 6px; }
.chat-meme img { display: block; width: 120px; max-width: 100%; height: auto; border-radius: 12px; }
.chat-typing { display: inline-flex; gap: 5px; align-items: center; height: 22px; }
.chat-typing i { width: 8px; height: 8px; border-radius: 999px; background: var(--ink); animation: chat-dot 1s ease-in-out infinite; }
.chat-typing i:nth-child(2) { animation-delay: .15s; }
.chat-typing i:nth-child(3) { animation-delay: .3s; }
.chat-chips { display: flex; flex-wrap: wrap; gap: 8px; padding: 10px 16px 0; background: var(--bg); }
.chat-chips button { min-height: 36px; padding: 0 12px; border: 2px solid var(--ink); border-radius: 999px; background: var(--paper); font: 600 13.5px var(--font-body); color: var(--ink); cursor: pointer; }
.chat-chips button:hover { background: var(--mint); }
.chat-form { display: flex; gap: 8px; padding: 12px; background: var(--bg); border-top: 2px dashed var(--ink); }
.chat-form input { flex: 1; min-width: 0; min-height: 48px; padding: 0 16px; border: 2.5px solid var(--ink); border-radius: 999px; font: 500 16px var(--font-body); color: var(--ink); background: var(--paper); }
.chat-form button { width: 48px; height: 48px; flex: 0 0 auto; border-radius: 999px; border: 2.5px solid var(--ink); background: var(--deep); cursor: pointer; display: flex; align-items: center; justify-content: center; }
.chat-form button:disabled, .chat-form input:disabled { opacity: .55; cursor: not-allowed; }
@keyframes chat-dot { 0%, 100% { transform: translateY(0); opacity: .4; } 50% { transform: translateY(-4px); opacity: 1; } }
@keyframes chat-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@media (max-width: 600px) {
  .chat-panel { right: 12px; bottom: 12px; height: calc(100dvh - 24px); }
  .chat-fab { right: 12px; bottom: 12px; }
}
`;

export default {
  mount(site) {
    const cfg = site.chat;
    injectCss('chat', css);

    const ui = fragment(`
<button id="chat-fab" class="chat-fab" type="button" aria-expanded="false" aria-controls="chat-panel" aria-label="${esc(cfg.text.open)}" title="${esc(cfg.text.open)}"><img class="chat-av" src="${esc(site.mascot)}" alt=""><span class="sr">${esc(cfg.text.open)}</span></button>
<section id="chat-panel" class="chat-panel" role="dialog" aria-label="${esc(cfg.text.open)}" hidden>
  <div class="chat-head">
    <img class="chat-av" src="${esc(site.mascot)}" alt="">
    <div><b>${esc(cfg.title)}</b><small>${esc(cfg.subtitle)}</small></div>
    <button class="chat-x" type="button" aria-label="${esc(cfg.text.close)}"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 3 L15 15 M15 3 L3 15"/></svg></button>
  </div>
  <div class="chat-log" aria-live="polite"></div>
  <div class="chat-chips">${(cfg.suggestions || []).map((s) => `<button type="button">${esc(s)}</button>`).join('')}</div>
  <form class="chat-form">
    <label class="sr" for="chat-input">${esc(cfg.text.inputLabel)}</label>
    <input id="chat-input" maxlength="600" placeholder="${esc(cfg.text.placeholder)}" autocomplete="off">
    <button type="submit" aria-label="${esc(cfg.text.send)}"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10 L17 3 L12 17 L10 11 Z"/></svg></button>
  </form>
</section>`);
    document.body.appendChild(ui);

    // Mắt tròn nhìn theo chuột cho cún ở nút chat và đầu khung chat
    document.querySelectorAll('#chat-fab .chat-av, #chat-panel .chat-head .chat-av').forEach((img) => googly(img, { zoom: true }));

    const fab = document.getElementById('chat-fab');
    const panel = document.getElementById('chat-panel');
    const log = panel.querySelector('.chat-log');
    const form = panel.querySelector('.chat-form');
    const input = panel.querySelector('#chat-input');
    const send = form.querySelector('button');
    let chips = panel.querySelector('.chat-chips');

    const history = [];
    let busy = false;

    function row(kind, text) {
      const r = document.createElement('div');
      r.className = `chat-row ${kind}`;
      if (kind !== 'me') {
        const av = document.createElement('img');
        av.className = 'chat-av';
        av.alt = '';
        av.src = site.mascot;
        r.appendChild(av);
      }
      const b = document.createElement('div');
      b.className = 'chat-bubble';
      if (text === null) {
        b.innerHTML = '<span class="chat-typing" aria-label="' + esc(cfg.text.typing) + '"><i></i><i></i><i></i></span>';
      } else {
        b.textContent = text;
      }
      r.appendChild(b);
      log.appendChild(r);
      log.scrollTop = log.scrollHeight;
      return r;
    }

    function memeRow(src, alt) {
      const r = row('bot', '');
      const b = r.querySelector('.chat-bubble');
      b.textContent = '';
      b.classList.add('chat-meme');
      const im = document.createElement('img');
      im.src = src; im.alt = alt;
      im.addEventListener('load', () => { log.scrollTop = log.scrollHeight; });
      b.appendChild(im);
    }

    row('bot', cfg.greeting);

    function setBusy(v) {
      busy = v;
      input.disabled = v;
      send.disabled = v;
      if (!v) input.focus();
    }

    async function ask(text) {
      text = (text || '').trim();
      if (!text || busy) return;
      if (chips) { chips.remove(); chips = null; }
      row('me', text);
      history.push({ role: 'user', text });
      input.value = '';
      setBusy(true);
      const wait = row('bot', null);
      try {
        const res = await fetch(cfg.endpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ messages: history.slice(-12) }),
        });
        const data = await res.json().catch(() => ({}));
        wait.remove();
        if (res.ok && data.reply) {
          const meme = /\[MEME:chi-tay\]/i.test(data.reply);
          const clean = data.reply.replace(/\[MEME:[^\]]*\]/gi, '').trim();
          history.push({ role: 'model', text: clean });
          if (clean) row('bot', clean);
          if (meme) memeRow('/assets/img/meme/husky-point.webp', cfg.text.memeAlt);
        } else {
          history.pop();
          row('err', (lang === 'en' ? cfg.text.lag : data.error || cfg.text.lag));
        }
      } catch {
        wait.remove();
        history.pop();
        row('err', cfg.text.offline);
      }
      setBusy(false);
    }

    let wished = false; // chỉ chúc ở lần mở đầu tiên mỗi lần vào trang
    function open() {
      panel.hidden = false;
      // Mỗi lần mở: gửi một lời chúc tiếng Anh ngẫu nhiên (không gọi AI, không tốn lượt)
      if (!busy && !wished) {
        wished = true;
        const w = row('bot', '');
        const bub = w.querySelector('.chat-bubble');
        bub.innerHTML = '<span class="chat-typing"><i></i><i></i><i></i></span>';
        setTimeout(() => { bub.textContent = randomWish(); log.scrollTop = log.scrollHeight; }, 550);
      }
      fab.setAttribute('aria-expanded', 'true');
      setTimeout(() => input.focus(), 50);
    }
    function close() {
      panel.hidden = true;
      fab.setAttribute('aria-expanded', 'false');
      fab.focus();
    }

    fab.addEventListener('click', open);
    leash(fab);
    panel.querySelector('.chat-x').addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
    document.addEventListener('click', (e) => {
      const a = e.target.closest('[data-open-chat]');
      if (a) { e.preventDefault(); open(); }
    });
    form.addEventListener('submit', (e) => { e.preventDefault(); ask(input.value); });
    if (chips) chips.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => ask(b.textContent)));
  },
};
