// Biểu đồ nhện (radar) vẽ bằng SVG, không cần thư viện.
// axes: [{ label, sub, value }]  value từ 0 → 1

import { esc } from '../lib/dom.js';

export function radar(axes, { size = 380, rings = 4, ringLabels = null, title = '' } = {}) {
  const n = axes.length;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.32;
  const pt = (i, v) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v];
  };

  let grid = '';
  for (let k = 1; k <= rings; k++) {
    const pts = axes.map((_, i) => pt(i, k / rings).join(',')).join(' ');
    grid += `<polygon points="${pts}" fill="${k % 2 ? 'var(--paper)' : 'var(--bg)'}" stroke="#C5DCD3" stroke-width="1"/>`;
  }
  const spokes = axes.map((_, i) => {
    const [x, y] = pt(i, 1);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#C5DCD3" stroke-width="1"/>`;
  }).join('');

  const ringText = ringLabels
    ? ringLabels.map((t, k) => {
      const [, y] = pt(0, (k + 1) / rings);
      return `<text x="${cx + 4}" y="${y + 4}" font-size="10" fill="#3F6157">${esc(t)}</text>`;
    }).join('')
    : '';

  const shape = axes.map((a, i) => pt(i, Math.max(0.03, a.value)).join(',')).join(' ');
  const dots = axes.map((a, i) => {
    const [x, y] = pt(i, Math.max(0.03, a.value));
    return `<circle cx="${x}" cy="${y}" r="5" fill="${a.value >= (a.pass ?? 0.66) ? '#0E7A5A' : '#FFB5C2'}" stroke="#17342B" stroke-width="2"/>`;
  }).join('');

  const labels = axes.map((a, i) => {
    const [x, y] = pt(i, 1.2);
    const anchor = Math.abs(x - cx) < 8 ? 'middle' : x > cx ? 'start' : 'end';
    return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="12.5" font-weight="700" fill="#17342B">${esc(a.label)}`
      + (a.sub ? `<tspan x="${x}" dy="15" font-size="11" font-weight="500" fill="#3F6157">${esc(a.sub)}</tspan>` : '')
      + '</text>';
  }).join('');

  return `<svg class="radar" viewBox="-40 -10 ${size + 80} ${size + 20}" role="img" aria-label="${esc(title || 'Biểu đồ nhện kết quả')}">
${grid}${spokes}${ringText}
<polygon points="${shape}" fill="rgba(95,211,168,.45)" stroke="#0E7A5A" stroke-width="3" stroke-linejoin="round"/>
${dots}${labels}
</svg>`;
}
