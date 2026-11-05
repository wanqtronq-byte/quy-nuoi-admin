// Thư cảm ơn bật lên khi nhận được tiền: cún ăn mừng, pháo giấy, lá thư và một lời chúc ngẫu nhiên.

import { injectCss, esc } from '../lib/dom.js';
import { L } from '../lib/i18n.js';
import { randomWish } from './wishes.js';

injectCss('thanks', `
.ty-back { position: fixed; inset: 0; z-index: 80; background: rgba(15, 32, 26, .55); display: flex; align-items: center; justify-content: center; padding: 16px; animation: ty-fade .25s ease both; }
.ty-card { position: relative; width: min(460px, 100%); max-height: calc(100dvh - 32px); overflow: auto; background: #FFFBEF; color: #17342B; border: 3px solid #17342B; border-radius: 26px; box-shadow: 8px 8px 0 #17342B; padding: 28px 24px 24px; display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; animation: ty-pop .45s cubic-bezier(.2,1.4,.4,1) both; }
.ty-card img { width: 140px; height: auto; }
.ty-card h2 { font-family: var(--font-display); font-size: 30px; line-height: 1.15; }
.ty-amount { font-weight: 800; background: #9EE6C9; border: 2px solid #17342B; border-radius: 999px; padding: 4px 14px; }
.ty-letter { font-size: 16.5px; line-height: 1.7; text-align: left; border-top: 2px dashed #17342B; border-bottom: 2px dashed #17342B; padding: 12px 2px; }
.ty-wish { font-style: italic; font-size: 16px; line-height: 1.6; background: #FFD86B; border: 2px solid #17342B; border-radius: 14px; padding: 10px 14px; }
.ty-sign { align-self: flex-end; font-weight: 700; }
.ty-close { min-height: 48px; padding: 0 22px; border-radius: 14px; border: 2.5px solid #17342B; background: #0E7A5A; color: #fff; font: 700 16px var(--font-body); cursor: pointer; box-shadow: 4px 4px 0 #17342B; }
.ty-x { position: absolute; top: 10px; right: 10px; width: 40px; height: 40px; border-radius: 999px; border: 2px solid #17342B; background: #fff; color: #17342B; font-size: 20px; cursor: pointer; }
.ty-confetti { position: fixed; inset: 0; z-index: 81; pointer-events: none; overflow: hidden; }
.ty-confetti i { position: absolute; top: -20px; width: 10px; height: 14px; border: 1.5px solid #17342B; animation: ty-fall linear forwards; }
@keyframes ty-fade { from { opacity: 0; } }
@keyframes ty-pop { from { opacity: 0; transform: scale(.7) rotate(-4deg); } }
@keyframes ty-fall { to { transform: translateY(110vh) rotate(720deg); } }
@media (prefers-reduced-motion: reduce) { .ty-confetti { display: none; } .ty-card, .ty-back { animation: none; } }
`);

const fmt = (n) => (n ? `${n.toLocaleString('vi-VN')}đ` : '');

function confetti() {
  const box = document.createElement('div');
  box.className = 'ty-confetti';
  const colors = ['#FFD86B', '#9EE6C9', '#FFB5C2', '#5FD3A8', '#FFFFFF'];
  for (let i = 0; i < 70; i += 1) {
    const c = document.createElement('i');
    c.style.left = `${Math.random() * 100}%`;
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = `${2.2 + Math.random() * 2}s`;
    c.style.animationDelay = `${Math.random() * 0.6}s`;
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    box.appendChild(c);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 5000);
}

export function thankYou(amount) {
  const back = document.createElement('div');
  back.className = 'ty-back';
  back.setAttribute('role', 'dialog');
  back.setAttribute('aria-modal', 'true');
  back.setAttribute('aria-label', L('Thư cảm ơn', 'Thank-you note'));
  back.innerHTML = `
<div class="ty-card">
  <button type="button" class="ty-x" aria-label="${L('Đóng', 'Close')}">×</button>
  <img src="/assets/img/meme/lv4.webp" alt="${L('Cún bắn pháo giấy ăn mừng', 'Dog popping confetti')}">
  <h2>${L('Bánh tới rồi nè!', 'The snack has landed!')}</h2>
  ${amount ? `<span class="ty-amount">${esc(fmt(amount))}</span>` : ''}
  <div class="ty-letter">${L(
    'Gửi bạn iu,<br>Tui vừa nhận được miếng bánh của bạn, cảm động thiệt sự. Nhờ bạn mà hôm nay admin có thêm động lực ngồi soạn thêm mẹo HR với bài học AI. Cảm ơn bạn đã ghé, đã đọc và đã thương. Có gì cần thì cứ nhắn tui nha.',
    'Dear friend,<br>Your snack just arrived and I am genuinely touched. Thanks to you, the admin has fresh motivation to write more HR tips and AI lessons. Thank you for stopping by, reading and caring. Message me any time.',
  )}</div>
  <div class="ty-wish">${esc(randomWish())}</div>
  <span class="ty-sign">${L('Thương bạn, Admin', 'With love, the Admin')}</span>
  <button type="button" class="ty-close">${L('Nhận lời chúc', 'Got it, thanks!')}</button>
</div>`;
  document.body.appendChild(back);
  confetti();
  const close = () => back.remove();
  back.querySelector('.ty-x').addEventListener('click', close);
  back.querySelector('.ty-close').addEventListener('click', close);
  back.addEventListener('click', (e) => { if (e.target === back) close(); });
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
  back.querySelector('.ty-close').focus();
}
