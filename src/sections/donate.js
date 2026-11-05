// Phần "Ủng hộ": các mức tiền + ô QR. Thông tin ngân hàng sửa ở config/site.js.

import { esc } from '../lib/dom.js';
import { localize, L } from '../lib/i18n.js';
import { thankYou } from '../widgets/thanks.js';

const content = localize({
  title: { vi: 'Nếu bạn thấy hay thì cho Nhũn xin miếng bánh', en: 'If you enjoyed it, spare Nhũn a snack' },
  lead: { vi: 'Bánh nhỏ bánh to đều là tình iu hết á.', en: 'Small snack or big snack, it is all love.' },
  qrCaption: { vi: 'Quét một phát là xong', en: 'One scan and done' },
  copyLabel: { vi: 'Copy số tài khoản', en: 'Copy account number' },
  copied: { vi: 'Copy rồi nè!', en: 'Copied!' },
  selected: { vi: 'Đã bôi đen, bấm Ctrl+C nha', en: 'Selected, press Ctrl+C' },
  qrAlt: { vi: 'Mã QR chuyển khoản', en: 'Bank transfer QR code' },
  qrPlaceholder: { vi: '[MÃ QR CỦA BẠN]', en: '[YOUR QR CODE]' },
  memoLabel: { vi: 'Nội dung chuyển khoản (giữ nguyên mình mới cảm ơn bạn được nha)', en: 'Transfer note (keep it as is so I can thank you)' },
  memoCopy: { vi: 'Copy nội dung', en: 'Copy note' },
  waiting: { vi: 'Đang chờ bánh tới…', en: 'Waiting for your snack…' },
  feedTitle: { vi: 'Vừa nuôi Nhũn', en: 'Recently fed Nhũn' },
  feedEmpty: { vi: 'Chưa ai nuôi hôm nay, bạn làm người đầu tiên nha!', en: 'Nobody yet today, be the first!' },
  received: { vi: 'Đã nhận bánh, cảm ơn bạn!', en: 'Snack received, thank you!' },
  defaultPick: 2,
  options: [
    { label: '10k', amount: 10000, hint: { vi: 'ổ bánh mì không', en: 'plain baguette' }, msg: { vi: 'Ổ bánh mì mà no cả ngày. Cảm ơn bạn iu nha!', en: 'One baguette, full all day. Thank you!' } },
    { label: '20k', amount: 20000, hint: { vi: 'bánh mì thịt', en: 'bánh mì with meat' }, msg: { vi: 'Bánh mì thịt đủ pate, tui no tới chiều. Thương ghê!', en: 'Bánh mì with all the pâté, good till afternoon. Love it!' } },
    { label: '50k', amount: 50000, hint: { vi: 'bông lan trứng muối', en: 'salted egg sponge cake' }, msg: { vi: 'Bông lan trứng muối, sang chảnh quá trời. Bạn là nhất!', en: 'Salted egg sponge cake, so fancy. You are the best!' } },
    { label: '100k', amount: 100000, hint: { vi: 'nguyên hộp bánh quy', en: 'a whole box of cookies' }, msg: { vi: 'Nguyên hộp bánh quy, tui chia cả xóm luôn. Cảm động muốn khóc.', en: 'A whole box of cookies, sharing with the neighbors. I might cry.' } },
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
.feed { margin-top: 8px; padding: 14px 16px; background: var(--paper); border: 2.5px dashed var(--ink); border-radius: 18px; display: flex; flex-direction: column; gap: 6px; max-width: 520px; overflow: hidden; }
.feed-title { font-size: 13px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); display: flex; align-items: center; gap: 8px; }
.feed-title::before { content: ""; width: 9px; height: 9px; border-radius: 999px; background: #E2556F; animation: beat 1.4s ease-in-out infinite; }
.feed-line { min-height: 28px; font-size: 17px; font-weight: 600; display: flex; flex-wrap: wrap; gap: 4px 8px; align-items: baseline; }
.feed-line b { color: var(--accent); }
.feed-line small { font-size: 13px; color: var(--muted); font-weight: 500; }
.feed-line.in { animation: feed-in .5s cubic-bezier(.2,1.4,.4,1) both; }
@keyframes feed-in { from { opacity: 0; transform: translateY(14px) scale(.96); } }
.qr-memo { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.qr-memo small { font-size: 13px; color: var(--muted); font-weight: 600; }
.qr-memo-code { font: 800 18px var(--font-body); letter-spacing: .06em; color: var(--ink); background: var(--sun); border: 2.5px dashed var(--ink); border-radius: 12px; padding: 6px 12px; cursor: pointer; }
.qr-status { font-size: 14px; line-height: 1.5; color: var(--muted); display: flex; gap: 8px; align-items: center; justify-content: center; }
.qr-status::before { content: ""; width: 10px; height: 10px; flex: 0 0 auto; border-radius: 999px; background: var(--mint2); animation: beat 1.4s ease-in-out infinite; }
.qr-status.ok::before { animation: none; background: var(--deep); }
.qr-copy { min-height: 44px; padding: 0 16px; border-radius: 999px; border: 2px solid var(--ink); background: var(--paper); font: 600 14px var(--font-body); color: var(--ink); cursor: pointer; }
`,

  render(site) {
    const d = site.donate || {};
    const qr = (d.sepay && d.sepay.enabled)
      ? `<img alt="${esc(content.qrAlt)}">`
      : d.qrImage
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
    <div class="feed" hidden>
      <span class="feed-title">${esc(content.feedTitle)}</span>
      <div class="feed-line" aria-live="polite"></div>
    </div>
  </div>
  <div class="card qr">
    <div class="qr-box">${qr}</div>
    <span class="display qr-caption">${esc(content.qrCaption)}</span>
    <span class="qr-bank">${esc(d.bank)} · <span class="qr-acc">${esc(d.accountNumber)}</span>${name}</span>
    <button type="button" class="qr-copy pop">${esc(content.copyLabel)}</button>
    <div class="qr-memo" hidden>
      <small>${esc(content.memoLabel)}</small>
      <button type="button" class="qr-memo-code" title="${esc(content.memoCopy)}"></button>
    </div>
    <p class="qr-status" aria-live="polite" hidden></p>
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

    // ----- SePay: QR riêng cho từng người, tự dò tiền vào -----
    const d = site.donate || {};
    const sp = d.sepay && d.sepay.enabled ? d.sepay : null;
    const qrImg = el.querySelector('.qr-box img');
    let code = null;
    if (sp) {
      try { code = sessionStorage.getItem('donate-code'); } catch { /* bỏ qua */ }
      if (!code) {
        const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        code = 'NUOINHUN' + Array.from({ length: 6 }, () => abc[Math.floor(Math.random() * abc.length)]).join('');
        try { sessionStorage.setItem('donate-code', code); } catch { /* bỏ qua */ }
      }
      const memo = el.querySelector('.qr-memo');
      const memoBtn = el.querySelector('.qr-memo-code');
      memo.hidden = false;
      memoBtn.textContent = code;
      memoBtn.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(code); memoBtn.textContent = content.copied; } catch { /* bỏ qua */ }
        setTimeout(() => { memoBtn.textContent = code; }, 1500);
      });
      watchPayment();
    }

    // ----- Ô "vừa nuôi Nhũn": nhảy qua từng người, ẩn danh, không có số tiền -----
    if (sp) startFeed();
    function startFeed() {
      const feed = el.querySelector('.feed');
      const line = el.querySelector('.feed-line');
      let items = [];
      let k = 0;
      const ago = (at) => {
        if (!at) return '';
        const m = Math.max(1, Math.round((Date.now() - at) / 60000));
        if (m < 60) return L(`${m} phút trước`, `${m} min ago`);
        const h = Math.round(m / 60);
        if (h < 24) return L(`${h} giờ trước`, `${h} h ago`);
        return L(`${Math.round(h / 24)} ngày trước`, `${Math.round(h / 24)} d ago`);
      };
      function show() {
        line.classList.remove('in');
        void line.offsetWidth;
        if (!items.length) {
          line.textContent = content.feedEmpty;
        } else {
          const it = items[k % items.length];
          line.innerHTML = `<span>${L('Cảm ơn', 'Thanks')} <b>${esc(it.who)}</b> ${L('đã nuôi Nhũn', 'for feeding Nhũn')}</span><small>${esc(ago(it.at))}</small>`;
          k += 1;
        }
        line.classList.add('in');
      }
      async function load() {
        try {
          const j = await fetch('/api/recent', { cache: 'no-store' }).then((r) => r.json());
          items = Array.isArray(j.items) ? j.items : [];
        } catch { /* giữ danh sách cũ */ }
        feed.hidden = false;
        if (k === 0) show();
      }
      load();
      setInterval(() => { if (!document.hidden) show(); }, 3500);
      setInterval(() => { if (!document.hidden) load(); }, 60000);
    }

    function setQr(amount) {
      if (!sp || !qrImg) return;
      const qs = new URLSearchParams({ acc: d.accountNumber, bank: sp.bankCode, des: code, template: 'compact' });
      if (amount) qs.set('amount', amount);
      qrImg.src = `https://qr.sepay.vn/img?${qs}`;
    }

    function watchPayment() {
      const status = el.querySelector('.qr-status');
      status.hidden = false;
      status.textContent = content.waiting;
      const started = Date.now();
      let stopped = false;
      async function tick() {
        if (stopped) return;
        if (Date.now() - started > 45 * 60 * 1000) return; // thôi dò sau 45 phút
        if (!document.hidden) {
          try {
            const r = await fetch(`/api/paid?code=${encodeURIComponent(code)}`, { cache: 'no-store' });
            const j = await r.json();
            if (j.error === 'not-configured') { status.hidden = true; stopped = true; return; }
            if (j.paid) {
              stopped = true;
              status.textContent = content.received;
              status.classList.add('ok');
              try { sessionStorage.removeItem('donate-code'); localStorage.setItem('chat-unlock', code); } catch { /* bỏ qua */ }
              thankYou(j.amount);
              window.dispatchEvent(new Event('snack-paid'));
              return;
            }
          } catch { /* mạng chập chờn: thử lại lần sau */ }
        }
        setTimeout(tick, 5000);
      }
      setTimeout(tick, 4000);
    }

    function pick(i) {
      buttons.forEach((b, j) => b.setAttribute('aria-pressed', j === i ? 'true' : 'false'));
      msg.textContent = content.options[i].msg;
      setQr(content.options[i].amount);
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
