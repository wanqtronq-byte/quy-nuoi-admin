// Kéo thả nút chat như dắt chó đi dạo:
// - Lúc kéo: nút biến thành chú cún đi bộ (chân bước, đuôi vẫy, quay mặt theo hướng đi),
//   có sợi dây nối từ tay (con trỏ) tới cổ.
// - Thả ra: dây biến mất ngay, cún đi nốt tới chỗ thả rồi hiện lại thành nút chat.
// - Bấm (không kéo) vẫn mở khung chat. Vị trí được nhớ cho lần sau.

import { injectCss } from '../lib/dom.js';

const KEY = 'chat-fab-pos';
const LEASH = 90;        // độ dài dây (px)
const DRAG_START = 6;    // kéo quá 6px mới tính là dắt đi
const W = 96;            // kích thước chú cún đi bộ
const H = 76;
const NECK = [62, 38];   // vị trí cổ trong hình (khi quay mặt sang phải)

const DOG = `<svg viewBox="0 0 96 76" width="${W}" height="${H}" aria-hidden="true" fill="none" stroke="#17342B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
<g class="w-tail"><path d="M18 36 C8 30 8 18 14 14" /></g>
<g class="w-leg w-a"><path d="M26 50 V68"/></g><g class="w-leg w-b"><path d="M34 50 V68"/></g>
<g class="w-body">
  <ellipse cx="42" cy="42" rx="27" ry="15" fill="#E7C98F"/>
  <path d="M24 36 L30 30 L36 35 L42 29 L48 34 L54 30 L58 38 L56 50 L50 46 L44 52 L38 46 L32 52 L26 46 Z" fill="#B7B9BE" stroke-width="2.5"/>
  <path d="M40 38 l6 4 M33 44 l4 -3" stroke-width="2"/>
  <ellipse cx="68" cy="26" rx="15" ry="14" fill="#E7C98F"/>
  <path d="M60 18 C52 20 52 36 58 38 C62 38 64 30 63 22 Z" fill="#D2AE70"/>
  <circle cx="72" cy="22" r="2.2" fill="#17342B" stroke="none"/>
  <ellipse cx="78" cy="30" rx="6" ry="4.5" fill="#B49A79" stroke-width="2"/>
  <ellipse cx="82" cy="28.5" rx="2.4" ry="1.8" fill="#17342B" stroke="none"/>
  <path d="M58 36 L66 40" stroke="#C8553D" stroke-width="4"/>
</g>
<g class="w-leg w-b"><path d="M54 50 V68"/></g><g class="w-leg w-a"><path d="M62 49 V68"/></g>
</svg>`;

injectCss('leash', `
.leash-layer { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 55; pointer-events: none; overflow: visible; }
.leash-layer[hidden] { display: none; }
.leash-layer path { fill: none; stroke: #C8553D; stroke-width: 3.5; stroke-linecap: round; }
.leash-layer circle { fill: #C8553D; stroke: var(--line); stroke-width: 2; }
.walker { position: fixed; left: 0; top: 0; z-index: 54; width: ${W}px; height: ${H}px; pointer-events: none; }
.walker[hidden] { display: none; }
.walker .flip { width: 100%; height: 100%; transition: transform .12s ease; }
.walker.left .flip { transform: scaleX(-1); }
.walker .w-leg { transform-box: fill-box; transform-origin: 50% 0; }
.walker .w-tail { transform-box: fill-box; transform-origin: 100% 100%; animation: w-wag .35s ease-in-out infinite alternate; }
.walker.moving .w-a { animation: w-step .32s ease-in-out infinite alternate; }
.walker.moving .w-b { animation: w-step .32s ease-in-out infinite alternate-reverse; }
.walker.moving .w-body { animation: w-bob .16s ease-in-out infinite alternate; }
@keyframes w-step { from { transform: rotate(24deg); } to { transform: rotate(-24deg); } }
@keyframes w-wag { from { transform: rotate(-14deg); } to { transform: rotate(16deg); } }
@keyframes w-bob { from { transform: translateY(0); } to { transform: translateY(-2px); } }
.chat-fab.walking { visibility: hidden; animation: none; }
.chat-fab.dragged { right: auto !important; bottom: auto !important; }
.chat-fab { user-select: none; -webkit-user-select: none; }
.chat-fab img, .chat-fab .googly { -webkit-user-drag: none; pointer-events: none; }
`);

export function leash(fab) {
  const layer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  layer.setAttribute('class', 'leash-layer');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.display = 'none';
  layer.innerHTML = '<path d=""/><circle r="6"/>';
  document.body.appendChild(layer);
  const path = layer.querySelector('path');
  const hand = layer.querySelector('circle');

  const walker = document.createElement('div');
  walker.className = 'walker';
  walker.hidden = true;
  walker.innerHTML = `<div class="flip">${DOG}</div>`;
  document.body.appendChild(walker);

  const clampFab = (x, y) => {
    const r = fab.getBoundingClientRect();
    return [Math.min(Math.max(8, x), innerWidth - r.width - 8), Math.min(Math.max(8, y), innerHeight - r.height - 8)];
  };
  const clampDog = (x, y) => [Math.min(Math.max(4, x), innerWidth - W - 4), Math.min(Math.max(4, y), innerHeight - H - 4)];
  const placeFab = (x, y) => {
    fab.classList.add('dragged');
    fab.style.left = `${x}px`;
    fab.style.top = `${y}px`;
  };

  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) requestAnimationFrame(() => placeFab(...clampFab(saved.x * innerWidth, saved.y * innerHeight)));
  } catch { /* bỏ qua */ }

  let start = null;
  let walking = false;
  let released = false;
  let cursor = [0, 0];
  let pos = [0, 0];       // góc trên trái của chú cún đi bộ
  let facingLeft = true;
  let raf = 0;
  let justDragged = false;

  const neck = () => [pos[0] + (facingLeft ? W - NECK[0] : NECK[0]), pos[1] + NECK[1]];

  function frame() {
    let target;
    if (released) {
      target = clampDog(cursor[0] - W / 2, cursor[1] - H / 2);
    } else {
      const [nx, ny] = neck();
      const dx = cursor[0] - nx;
      const dy = cursor[1] - ny;
      const d = Math.hypot(dx, dy);
      target = d > LEASH ? clampDog(pos[0] + dx * ((d - LEASH) / d), pos[1] + dy * ((d - LEASH) / d)) : pos;
    }
    const vx = (target[0] - pos[0]) * 0.16;
    const vy = (target[1] - pos[1]) * 0.16;
    pos = [pos[0] + vx, pos[1] + vy];

    if (Math.abs(vx) > 0.4) facingLeft = vx < 0;
    walker.classList.toggle('left', facingLeft);
    walker.classList.toggle('moving', Math.hypot(vx, vy) > 0.3);
    walker.style.transform = `translate(${pos[0]}px, ${pos[1]}px)`;

    if (!released) {
      const [nx, ny] = neck();
      const dist = Math.hypot(cursor[0] - nx, cursor[1] - ny);
      const sag = Math.max(0, LEASH - dist) * 0.6 + 8;
      path.setAttribute('d', `M${cursor[0]},${cursor[1]} Q${(nx + cursor[0]) / 2},${(ny + cursor[1]) / 2 + sag} ${nx},${ny}`);
      hand.setAttribute('cx', cursor[0]);
      hand.setAttribute('cy', cursor[1]);
    }

    if (released && Math.abs(target[0] - pos[0]) < 0.6 && Math.abs(target[1] - pos[1]) < 0.6) {
      arrive();
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  // Tới nơi: cún biến lại thành nút chat, đứng đúng chỗ thả
  function arrive() {
    cancelAnimationFrame(raf);
    walking = false;
    released = false;
    walker.hidden = true;
    walker.classList.remove('moving');
    const r = fab.getBoundingClientRect();
    const at = clampFab(pos[0] + W / 2 - r.height / 2, pos[1] + H - r.height);
    placeFab(at[0], at[1]);
    fab.classList.remove('walking');
    try { localStorage.setItem(KEY, JSON.stringify({ x: at[0] / innerWidth, y: at[1] / innerHeight })); } catch { /* bỏ qua */ }
  }

  fab.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    start = [e.clientX, e.clientY];
    cursor = start;
  });

  window.addEventListener('pointermove', (e) => {
    if (!start) return;
    cursor = [e.clientX, e.clientY];
    if (!walking && Math.hypot(cursor[0] - start[0], cursor[1] - start[1]) > DRAG_START) {
      walking = true;
      released = false;
      const r = fab.getBoundingClientRect();
      // Cún xuất hiện ngay chỗ avatar của nút
      pos = clampDog(r.left + r.height / 2 - W / 2, r.bottom - H);
      facingLeft = cursor[0] < r.left + r.height / 2;
      walker.style.transform = `translate(${pos[0]}px, ${pos[1]}px)`;
      walker.hidden = false;
      layer.style.display = 'block';
      fab.classList.add('walking');
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }
    if (walking) e.preventDefault();
  });

  window.addEventListener('pointerup', () => {
    if (!start) return;
    start = null;
    if (walking) {
      released = true;
      justDragged = true;
      layer.style.display = 'none'; // thả tay là mất dây
    }
  });

  window.addEventListener('click', (e) => {
    if (justDragged && fab.contains(e.target)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
    justDragged = false;
  }, true);

  window.addEventListener('resize', () => {
    if (!fab.classList.contains('dragged')) return;
    const r = fab.getBoundingClientRect();
    placeFab(...clampFab(r.left, r.top));
  });

  fab.style.touchAction = 'none';
  fab.querySelectorAll('img').forEach((i) => { i.draggable = false; });
  fab.addEventListener('dragstart', (e) => e.preventDefault());
}
