// Kéo thả nút chat như dắt chó đi dạo: cún đi theo con trỏ, có sợi dây nối từ tay tới cổ.
// Thả ra thì cún đi tới chỗ đó, dây biến mất, vị trí được nhớ cho lần sau.
// Bấm (không kéo) vẫn mở khung chat như bình thường.

import { injectCss } from '../lib/dom.js';

const KEY = 'chat-fab-pos';
const LEASH = 90;        // độ dài dây (px)
const DRAG_START = 6;    // kéo quá 6px mới tính là dắt đi

injectCss('leash', `
.leash-layer { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 55; pointer-events: none; overflow: visible; }
.leash-layer[hidden] { display: none; }
.leash-layer path { fill: none; stroke: #C8553D; stroke-width: 3.5; stroke-linecap: round; }
.leash-layer circle { fill: #C8553D; stroke: var(--line); stroke-width: 2; }
.chat-fab.walking { animation: none; cursor: grabbing; transition: none; }
.chat-fab.dragged { right: auto !important; bottom: auto !important; }
.chat-fab { user-select: none; -webkit-user-select: none; }
.chat-fab img, .chat-fab .googly { -webkit-user-drag: none; pointer-events: none; }
`);

export function leash(fab) {
  const layer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  layer.setAttribute('class', 'leash-layer');
  layer.setAttribute('aria-hidden', 'true');
  layer.hidden = true;
  layer.innerHTML = '<path d=""/><circle r="6"/>';
  document.body.appendChild(layer);
  const path = layer.querySelector('path');
  const hand = layer.querySelector('circle');

  const clamp = (x, y) => {
    const r = fab.getBoundingClientRect();
    return [Math.min(Math.max(8, x), innerWidth - r.width - 8), Math.min(Math.max(8, y), innerHeight - r.height - 8)];
  };
  const place = (x, y) => {
    fab.classList.add('dragged');
    fab.style.left = `${x}px`;
    fab.style.top = `${y}px`;
  };

  // Vị trí đã lưu
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) requestAnimationFrame(() => place(...clamp(saved.x * innerWidth, saved.y * innerHeight)));
  } catch { /* bỏ qua */ }

  let start = null;      // điểm bấm xuống
  let walking = false;
  let released = false;
  let cursor = [0, 0];
  let pos = [0, 0];      // góc trên trái của nút
  let offset = [0, 0];   // từ góc nút tới cổ cún
  let raf = 0;
  let justDragged = false;

  const neck = () => [pos[0] + offset[0], pos[1] + offset[1]];

  function frame() {
    const r = fab.getBoundingClientRect();
    let target;
    if (released) {
      // Thả ra: cún đi tới đúng chỗ thả
      target = clamp(cursor[0] - offset[0], cursor[1] - offset[1]);
    } else {
      // Đang dắt: cún đi sau tay một khoảng bằng độ dài dây
      const [nx, ny] = neck();
      const dx = cursor[0] - nx;
      const dy = cursor[1] - ny;
      const d = Math.hypot(dx, dy);
      if (d > LEASH) {
        const k = (d - LEASH) / d;
        target = clamp(pos[0] + dx * k, pos[1] + dy * k);
      } else target = pos;
    }
    const vx = (target[0] - pos[0]) * 0.18;
    const vy = (target[1] - pos[1]) * 0.18;
    pos = [pos[0] + vx, pos[1] + vy];
    place(pos[0], pos[1]);

    // Lắc lư khi đi
    const speed = Math.hypot(vx, vy);
    const sway = Math.min(8, speed * 1.2) * Math.sin(performance.now() / 70);
    fab.style.transform = `rotate(${sway}deg)`;

    // Dây võng xuống khi chùng
    const [nx, ny] = neck();
    const dist = Math.hypot(cursor[0] - nx, cursor[1] - ny);
    const sag = Math.max(0, LEASH - dist) * 0.6 + 8;
    const mx = (nx + cursor[0]) / 2;
    const my = (ny + cursor[1]) / 2 + sag;
    path.setAttribute('d', `M${cursor[0]},${cursor[1]} Q${mx},${my} ${nx},${ny}`);
    hand.setAttribute('cx', cursor[0]);
    hand.setAttribute('cy', cursor[1]);

    if (released && Math.abs(target[0] - pos[0]) < 0.6 && Math.abs(target[1] - pos[1]) < 0.6) {
      place(target[0], target[1]);
      stop(target);
      return;
    }
    raf = requestAnimationFrame(frame);
    void r;
  }

  function stop(at) {
    cancelAnimationFrame(raf);
    walking = false;
    released = false;
    layer.hidden = true;
    fab.classList.remove('walking');
    fab.style.transform = '';
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
      pos = [r.left, r.top];
      offset = [r.height / 2, r.height * 0.78]; // cổ cún nằm dưới mặt
      fab.classList.add('walking');
      layer.hidden = false;
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
    }
  });

  // Vừa dắt xong thì không mở chat
  window.addEventListener('click', (e) => {
    if (justDragged && fab.contains(e.target)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
    justDragged = false;
  }, true);

  // Giữ cún trong màn hình khi đổi kích thước cửa sổ
  window.addEventListener('resize', () => {
    if (!fab.classList.contains('dragged')) return;
    const r = fab.getBoundingClientRect();
    place(...clamp(r.left, r.top));
  });

  fab.style.touchAction = 'none';
  fab.querySelectorAll('img').forEach((i) => { i.draggable = false; });
  fab.addEventListener('dragstart', (e) => e.preventDefault());
}
