// Phần "Ủng hộ": các mức tiền + ô QR. Thông tin ngân hàng sửa ở config/site.js.

import { esc } from '../lib/dom.js';

const content = {
  title: 'Hôm nay bạn cho admin miếng bánh nào?',
  lead: 'Bánh nhỏ bánh to đều là tình iu hết á.',
  qrCaption: 'Quét một phát là xong',
  defaultPick: 2,
  options: [
    { label: '10k', hint: 'ổ bánh mì không', msg: 'Ổ bánh mì không mà tui nhai ngon lành luôn. Cảm ơn bạn iu nha!' },
    { label: '20k', hint: 'bánh mì thịt', msg: 'Bánh mì thịt đủ pate, tui no tới chiều. Thương ghê!' },
    { label: '50k', hint: 'bông lan trứng muối', msg: 'Bông lan trứng muối, sang chảnh quá trời. Bạn là nhất!' },
    { label: '100k', hint: 'nguyên hộp bánh quy', msg: 'Nguyên hộp bánh quy, tui chia cả xóm luôn. Cảm động muốn khóc.' },
    { label: 'Tùy tâm', hint: 'bánh gì cũng được', msg: 'Bánh gì cũng quý, miễn là bánh của bạn cho.' },
  ],
};

export default {
  id: 'ung-ho',
  nav: 'Ủng hộ',
  navHighlight: true,

  css: `
.donate { padding-block: 40px 72px; display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start; }
.donate-left { flex: 999 1 500px; min-width: 0; display: flex; flex-direction: column; gap: 16px; }
.donate-lead { font-size: 18px; line-height: 1.6; color: var(--muted); }
.amounts { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 4px; }
.amt { min-height: 64px; min-width: 124px; padding: 8px 18px; border-radius: 18px; font-family: inherit; cursor: pointer; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 2px; border: 3px solid var(--ink); color: var(--ink); background: var(--paper); box-shadow: 2px 2px 0 var(--ink); }
.amt b { font-family: var(--font-display); font-size: 22px; line-height: 1.1; font-weight: 800; }
.amt span { font-size: 13px; line-height: 1.3; font-weight: 600; }
.amt[aria-pressed="true"] { background: var(--mint); box-shadow: 4px 4px 0 var(--ink); transform: translate(-2px, -2px); }
.donate-msg { font-size: 18px; line-height: 1.5; font-weight: 700; color: var(--deep); min-height: 27px; }
.qr { flex: 1 1 300px; min-width: 0; max-width: 380px; border-radius: 28px; padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; box-shadow: 8px 8px 0 var(--ink); animation: sway 4s ease-in-out infinite; }
.qr-box { width: 200px; height: 200px; max-width: 100%; border: 3px dashed var(--mint2); border-radius: 18px; background: var(--bg); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; color: var(--muted); overflow: hidden; }
.qr-box img { width: 100%; height: 100%; object-fit: contain; background: #fff; }
.qr-caption { font-size: 22px; }
.qr-bank { font-size: 15px; color: var(--muted); }
.qr-copy { min-height: 44px; padding: 0 16px; border-radius: 999px; border: 2px solid var(--ink); background: var(--paper); font: 600 14px var(--font-body); color: var(--ink); cursor: pointer; }
`,

  render(site) {
    const d = site.donate || {};
    const qr = d.qrImage
      ? `<img src="${esc(d.qrImage)}" alt="Mã QR chuyển khoản">`
      : '[MÃ QR CỦA BẠN]';
    const name = d.accountName ? ` · ${esc(d.accountName)}` : '';
    return `
<section id="ung-ho" class="wrap donate">
  <div class="donate-left">
    <h2 class="h2">${esc(content.title)}</h2>
    <p class="donate-lead">${esc(content.lead)}</p>
    <div class="amounts"></div>
    <p class="donate-msg" aria-live="polite"></p>
  </div>
  <div class="card qr">
    <div class="qr-box">${qr}</div>
    <span class="display qr-caption">${esc(content.qrCaption)}</span>
    <span class="qr-bank">${esc(d.bank)} · <span class="qr-acc">${esc(d.accountNumber)}</span>${name}</span>
    <button type="button" class="qr-copy pop">Copy số tài khoản</button>
  </div>
</section>`;
  },

  mount(el, site) {
    const box = el.querySelector('.amounts');
    const msg = el.querySelector('.donate-msg');
    if (!box) return;

    const buttons = content.options.map((o, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'amt pop';
      const big = document.createElement('b');
      big.textContent = o.label;
      const small = document.createElement('span');
      small.textContent = o.hint;
      b.append(big, small);
      b.addEventListener('click', () => pick(i));
      box.appendChild(b);
      return b;
    });

    function pick(i) {
      buttons.forEach((b, j) => b.setAttribute('aria-pressed', j === i ? 'true' : 'false'));
      msg.textContent = content.options[i].msg;
    }
    pick(content.defaultPick);

    const copy = el.querySelector('.qr-copy');
    const acc = (site.donate && site.donate.accountNumber) || '';
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(acc);
        copy.textContent = 'Copy rồi nè!';
      } catch {
        const range = document.createRange();
        range.selectNodeContents(el.querySelector('.qr-acc'));
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        copy.textContent = 'Đã bôi đen, bấm Ctrl+C nha';
      }
      setTimeout(() => { copy.textContent = 'Copy số tài khoản'; }, 2000);
    });
  },
};
