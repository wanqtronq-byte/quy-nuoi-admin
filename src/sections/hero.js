// Phần mở đầu: tiêu đề, lời giới thiệu, 2 nút, chú cún và khung cảnh hoạt hình.

import { esc } from '../lib/dom.js';

const content = {
  badge: 'Admin nghèo nhưng vui',
  titleBefore: 'Xin ',
  titleHighlight: 'tí tiền',
  titleAfter: ',<br>không có lý do gì đâu',
  lead: 'Không bệnh, không nợ, không gây quỹ gì hết. Thấy người ta mở trang donate nên tui cũng mở thử. Ai cho thì tui cảm ơn, ai không cho thì cũng cảm ơn vì đã ghé.',
  primary: { label: 'Nuôi tui liền', href: '#ung-ho' },
  secondary: { label: 'Xem quà cảm ơn', href: '#qua' },
};

const STAR = 'M12 1 L14.5 9.5 L23 12 L14.5 14.5 L12 23 L9.5 14.5 L1 12 L9.5 9.5 Z';

export default {
  id: 'top',
  nav: null,

  css: `
.hero { position: relative; padding-top: 48px; }
.hero-inner { display: flex; flex-wrap: wrap; gap: 40px; align-items: center; padding-bottom: 96px; }
.hero-text { flex: 999 1 500px; min-width: 0; display: flex; flex-direction: column; gap: 22px; }
.hero-badge { align-self: flex-start; display: inline-flex; align-items: center; gap: 8px; background: var(--sun); border: 2.5px solid var(--ink); border-radius: 999px; padding: 6px 16px; font-weight: 700; font-size: 15px; animation: wobble 2.5s ease-in-out infinite; }
.hero h1 { font-size: clamp(42px, 6vw, 76px); line-height: 1.12; letter-spacing: -.01em; animation: rise .7s ease-out both; }
.hero h1 em { font-style: normal; color: var(--deep); text-decoration: underline wavy var(--mint2); text-decoration-thickness: 4px; text-underline-offset: 10px; }
.hero-lead { font-size: 20px; line-height: 1.65; color: var(--muted); max-width: 580px; }
.hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 6px; }
.hero-scene-col { flex: 1 1 380px; min-width: 0; display: flex; justify-content: center; }
.hero-scene { position: relative; width: 460px; max-width: 100%; aspect-ratio: 1 / 1; }
.hero-scene .deco { position: absolute; height: auto; }
.hero-frame { position: absolute; inset: 12%; background: var(--paper); border: 4px solid var(--ink); border-radius: 36px; box-shadow: 10px 10px 0 var(--mint2); display: flex; align-items: center; justify-content: center; padding: 18px; }
.hero-frame img { width: 100%; height: 100%; object-fit: contain; display: block; animation: dogbounce 2.8s ease-in-out infinite; }
.hero-grass { position: absolute; left: 0; bottom: -2px; width: 100%; height: 72px; display: block; }
`,

  render(site) {
    return `
<section id="top" class="hero">
  <div class="wrap hero-inner">
    <div class="hero-text">
      <span class="hero-badge"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><path d="M9 1 L11 7 L17 9 L11 11 L9 17 L7 11 L1 9 L7 7 Z" fill="currentColor"/></svg>${esc(content.badge)}</span>
      <h1 class="display">${esc(content.titleBefore)}<em>${esc(content.titleHighlight)}</em>${content.titleAfter}</h1>
      <p class="hero-lead">${esc(content.lead)}</p>
      <div class="hero-ctas">
        <a class="btn btn-primary pop" href="${content.primary.href}">${esc(content.primary.label)}</a>
        <a class="btn btn-ghost pop" href="${content.secondary.href}">${esc(content.secondary.label)}</a>
      </div>
    </div>
    <div class="hero-scene-col">
      <div class="hero-scene">
        <svg class="deco" aria-hidden="true" viewBox="0 0 120 64" style="left:-8px;top:4px;width:26%;animation:drift 6s ease-in-out infinite"><path d="M22 56 C6 56 4 36 20 34 C20 18 42 12 50 26 C56 10 84 10 86 30 C104 28 112 54 94 56 Z" fill="#fff" stroke="#17342B" stroke-width="4" stroke-linejoin="round"/></svg>
        <svg class="deco" aria-hidden="true" viewBox="0 0 60 60" style="right:0;top:0;width:14%;animation:spin 14s linear infinite"><circle cx="30" cy="30" r="18" fill="#FFD86B" stroke="#17342B" stroke-width="4"/><path d="M30 3 V8 M30 52 V57 M3 30 H8 M52 30 H57 M11 11 L15 15 M45 45 L49 49 M49 11 L45 15 M11 49 L15 45" stroke="#17342B" stroke-width="4" stroke-linecap="round"/></svg>
        <svg class="deco" aria-hidden="true" viewBox="0 0 40 40" style="right:-4px;top:42%;width:9%;animation:bob 3s ease-in-out infinite"><circle cx="20" cy="20" r="16" fill="#FFD86B" stroke="#17342B" stroke-width="3.5"/><path d="M20 11 V29 M15 15 H23 A3 3 0 0 1 23 21 H17 A3 3 0 0 0 17 27 H25" stroke="#17342B" stroke-width="3" stroke-linecap="round" fill="none"/></svg>
        <svg class="deco" aria-hidden="true" viewBox="0 0 40 40" style="left:0;top:56%;width:8%;animation:beat 1.6s ease-in-out infinite"><path d="M20 34 C6 24 2 16 8 10 C13 5 19 8 20 13 C21 8 27 5 32 10 C38 16 34 24 20 34 Z" fill="#FFB5C2" stroke="#17342B" stroke-width="3.5" stroke-linejoin="round"/></svg>
        <svg class="deco" aria-hidden="true" viewBox="0 0 24 24" style="left:6%;bottom:4%;width:6%;animation:twinkle 2s ease-in-out infinite"><path d="${STAR}" fill="#5FD3A8" stroke="#17342B" stroke-width="2" stroke-linejoin="round"/></svg>
        <svg class="deco" aria-hidden="true" viewBox="0 0 24 24" style="right:8%;bottom:2%;width:5%;animation:twinkle 2.6s ease-in-out .6s infinite"><path d="${STAR}" fill="#FFD86B" stroke="#17342B" stroke-width="2" stroke-linejoin="round"/></svg>
        <div class="hero-frame"><img src="${esc(site.mascot)}" alt="${esc(site.mascotAlt)}"></div>
      </div>
    </div>
  </div>
  <svg class="hero-grass" aria-hidden="true" viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0 50 C120 20 240 20 360 44 C480 68 600 70 720 46 C840 22 960 18 1080 42 C1200 66 1320 64 1440 40 V90 H0 Z" fill="#9EE6C9" stroke="#17342B" stroke-width="4"/></svg>
</section>`;
  },
};
