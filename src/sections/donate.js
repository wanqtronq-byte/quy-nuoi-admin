// Phần "Ủng hộ": các mức tiền + ô QR. Thông tin ngân hàng sửa ở config/site.js.

import { esc } from '../lib/dom.js';
import { localize } from '../lib/i18n.js';

const content = localize({
  title: { vi: 'Hôm nay bạn cho admin miếng bánh nào?', en: 'Which snack for the admin today?' },
  lead: { vi: 'Bánh nhỏ bánh to đều là tình iu hết á.', en: 'Small snack or big snack, it is all love.' },
  qrCaption: { vi: 'Quét một phát là xong', en: 'One scan and done' },
  copyLabel: { vi: 'Copy số tài khoản', en: 'Copy account number' },
  copied: { vi: 'Copy rồi nè!', en: 'Copied!' },
  selected: { vi: 'Đã bôi đen, bấm Ctrl+C nha', en: 'Selected, press Ctrl+C' },
  qrAlt: { vi: 'Mã QR chuyển khoản', en: 'Bank transfer QR code' },
  qrPlaceholder: { vi: '[MÃ QR CỦA BẠN]', en: '[YOUR QR CODE]' },
  defaultPick: 2,
  options: [
    { label: '10k', hint: { vi: 'ổ bánh mì không', en: 'plain baguette' }, msg: { vi: 'Ổ bánh mì mà no cả ngày. Cảm ơn bạn iu nha!', en: 'One baguette, full all day. Thank you!' } },
    { label: '20k', hint: { vi: 'bánh mì thịt', en: 'bánh mì with meat' }, msg: { vi: 'Bánh mì thịt đủ pate, tui no tới chiều. Thương ghê!', en: 'Bánh mì with all the pâté, good till afternoon. Love it!' } },
    { label: '50k', hint: { vi: 'bông lan trứng muối', en: 'salted egg sponge cake' }, msg: { vi: 'Bông lan trứng muối, sang chảnh quá trời. Bạn là nhất!', en: 'Salted egg sponge cake, so fancy. You are the best!' } },
    { label: '100k', hint: { vi: 'nguyên hộp bánh quy', en: 'a whole box of cookies' }, msg: { vi: 'Nguyên hộp bánh quy, tui chia cả xóm luôn. Cảm động muốn khóc.', en: 'A whole box of cookies, sharing with the neighbors. I might cry.' } },
    { label: { vi: 'Tùy tâm', en: 'Your call' }, hint: { vi: 'bánh gì cũng được', en: 'any snack works' }, msg: { vi: 'Bánh gì cũng quý, miễn là bánh của bạn cho.', en: 'Any snack is precious when it is from you.' } },
  ],
});

export default {
  id: 'ung-ho',
  nav: { vi: 'Ủng hộ', en: 'Donate' },
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
.donate-msg { font-size: 18px; line-height: 1.5; font-weight: 700; color: var(--accent); min-height: 27px; }
.qr { flex: 1 1 300px; min-width: 0; max-width: 380px; border-radius: 28px; padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; box-shadow: 8px 8px 0 var(--ink); animation: sway 4s ease-in-out infinite; }
.qr-box { width: 200px; height: 200px; max-width: 100%; border: 3px dashed var(--mint2); border-radius: 18px; background: var(--bg); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; color: var(--muted); overflow: hidden; }
.qr-box img { width: 100%; height: 100%; object-fit: contain; background: #fff; }
.qr-caption { font-size: 22px; }
.qr-bank { font-size: 15px; line-height: 1.6; color: var(--muted); }
.qr-name { color: var(--ink); letter-spacing: .02em; }
.qr-copy { min-height: 44px; padding: 0 16px; border-radius: 999px; border: 2px solid var(--ink); background: var(--paper); font: 600 14px var(--font-body); color: var(--ink); cursor: pointer; }
`,

  render(site) {
    const d = site.donate || {};
    const qr = d.qrImage
      ? `<img src="${esc(d.qrImage)}" alt="${esc(content.qrAlt)}">`
      : esc(content.qrPlaceholder);
    const name = d.accountName ? `<br><b class="qr-name">${esc(d.accountName)}</b>` : '';
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
    <button type="button" class="qr-copy pop">${esc(content.copyLabel)}</button>
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
        copy.textContent = content.copied;
      } catch {
        const range = document.createRange();
        range.selectNodeContents(el.querySelector('.qr-acc'));
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        copy.textContent = content.selected;
      }
      setTimeout(() => { copy.textContent = content.copyLabel; }, 2000);
    });
  },
};
