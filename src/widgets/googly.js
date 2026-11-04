// Gắn đôi mắt tròn to lên ảnh cún, con ngươi nhìn theo chuột / ngón tay, thỉnh thoảng chớp mắt.
// Vị trí mắt tính theo % của ảnh mascot.png (448×448).

import { injectCss } from '../lib/dom.js';

const EYES = [{ x: 44, y: 26 }, { x: 59.5, y: 26 }];
const SIZE = 15.5; // % chiều rộng ảnh

injectCss('googly', `
.googly { position: relative; display: inline-flex; flex: 0 0 auto; }
.googly-in { position: relative; display: block; width: 100%; height: 100%; }
.googly img { display: block; }
.googly.zoom { border-radius: 999px; overflow: hidden; background: #fff; border: 2.5px solid #17342B; }
.googly.zoom img { border: 0 !important; width: 100% !important; height: 100% !important; }
.googly.zoom .googly-in { transform: scale(2.5); transform-origin: 51.5% 18%; }
.googly .eye { position: absolute; width: ${SIZE}%; aspect-ratio: 1; transform: translate(-50%, -50%); background: #fff; border: 1.5px solid #17342B; border-radius: 50%; overflow: hidden; animation: blink 5s infinite; transform-origin: center; }
.googly .eye:nth-of-type(3) { animation-delay: .02s; }
.googly .pupil { position: absolute; left: 50%; top: 50%; width: 58%; height: 58%; margin: -29% 0 0 -29%; background: #17342B; border-radius: 50%; transition: transform .08s linear; }
.googly .pupil::after { content: ""; position: absolute; width: 32%; height: 32%; left: 18%; top: 16%; background: #fff; border-radius: 50%; }
@keyframes blink { 0%, 94%, 100% { transform: translate(-50%, -50%) scaleY(1); } 96% { transform: translate(-50%, -50%) scaleY(.1); } }
@media (prefers-reduced-motion: reduce) { .googly .eye { animation: none; } .googly .pupil { transition: none; } }
`);

const pupils = new Set();

function look(x, y) {
  pupils.forEach((p) => {
    if (!p.isConnected) { pupils.delete(p); return; }
    const eye = p.parentElement.getBoundingClientRect();
    if (!eye.width) return;
    const cx = eye.left + eye.width / 2;
    const cy = eye.top + eye.height / 2;
    const ang = Math.atan2(y - cy, x - cx);
    const dist = Math.min(1, Math.hypot(x - cx, y - cy) / 120);
    // Con ngươi chiếm 58% mắt: chỉ cho lệch tối đa 15% để luôn còn thấy lòng đen.
    const max = eye.width * 0.15;
    p.style.transform = `translate(${Math.cos(ang) * max * dist}px, ${Math.sin(ang) * max * dist}px)`;
  });
}

let bound = false;
function bindOnce() {
  if (bound) return;
  bound = true;
  window.addEventListener('pointermove', (e) => look(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => { const t = e.touches[0]; if (t) look(t.clientX, t.clientY); }, { passive: true });
}

// img: thẻ <img> của mascot. Trả về phần tử bọc ngoài.
// zoom: true → cắt sát vào mặt cún trong khung tròn (dùng cho avatar nhỏ).
export function googly(img, { zoom = false } = {}) {
  if (!img || img.closest('.googly')) return img?.closest('.googly');
  const wrap = document.createElement('span');
  wrap.className = zoom ? 'googly zoom' : 'googly';
  const inner = document.createElement('span');
  inner.className = 'googly-in';
  const w = img.getBoundingClientRect().width;
  if (zoom && w) { wrap.style.width = `${w}px`; wrap.style.height = `${w}px`; }
  img.replaceWith(wrap);
  wrap.appendChild(inner);
  inner.appendChild(img);
  EYES.forEach((e, i) => {
    const eye = document.createElement('span');
    eye.className = 'eye';
    eye.style.left = `${e.x}%`;
    eye.style.top = `${e.y}%`;
    eye.style.animationDelay = `${i * 0.03}s`;
    const pupil = document.createElement('span');
    pupil.className = 'pupil';
    eye.appendChild(pupil);
    inner.appendChild(eye);
    pupils.add(pupil);
  });
  bindOnce();
  return wrap;
}
