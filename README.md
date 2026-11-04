# Quỹ Nuôi Admin

Trang xin donate vui vẻ, có khung "Chat với admin" dùng AI Gemini. Chạy trên Vercel, không cần build.

## Cấu trúc

```
index.html                 Khung trang (không cần sửa)
assets/img/mascot.png      Ảnh chú cún (thay ảnh khác cùng tên là được)

src/
  main.js                  Khởi động trang (không cần sửa)
  config/
    site.js                ⭐ Thông tin chung: tên trang, ngân hàng, QR, bật/tắt chat
    sections.js            ⭐ Danh sách các phần trên trang và thứ tự
  sections/
    hero.js                Phần mở đầu
    gifts.js               Quà cảm ơn
    story.js               Chuyện là…
    donate.js              Chọn mức tiền + QR
    _template.js           Mẫu để tạo phần mới
  widgets/chat.js          Khung chat nổi
  lib/dom.js               Tiện ích dùng chung
  styles/base.css          Màu, chữ, nút, hiệu ứng dùng chung

api/
  chat.js                  Hàm chạy trên Vercel, gọi Gemini (giấu API key)
  _lib/persona.js          ⭐ Tính cách của "admin" khi chat
```

## Sửa nhanh

| Muốn đổi | Sửa file |
|---|---|
| Số tài khoản, ngân hàng, ảnh QR | `src/config/site.js` → `donate` |
| Chữ ở phần mở đầu | `src/sections/hero.js` → `content` |
| Thêm/bớt quà | `src/sections/gifts.js` → `items` |
| Các mức tiền | `src/sections/donate.js` → `options` |
| Cách admin AI nói chuyện | `api/_lib/persona.js` |
| Màu sắc | `src/styles/base.css` → `:root` |
| Tắt chat | `src/config/site.js` → `chat.enabled: false` |

## Thêm một phần mới

1. Copy `src/sections/_template.js` thành file mới, ví dụ `src/sections/faq.js`.
2. Sửa `id`, `nav`, nội dung và CSS trong file đó.
3. Mở `src/config/sections.js`, thêm:
   ```js
   import faq from '../sections/faq.js';
   ```
   và thêm `faq` vào mảng ở vị trí muốn hiện.

Mỗi phần tự mang CSS riêng nên không ảnh hưởng phần khác.

## Thêm ảnh QR

1. Bỏ ảnh vào `assets/img/`, ví dụ `assets/img/qr.png`.
2. Trong `src/config/site.js` đặt `qrImage: '/assets/img/qr.png'`.

## Biến môi trường trên Vercel

| Tên | Bắt buộc | Ý nghĩa |
|---|---|---|
| `GEMINI_API_KEY` | Có | API key lấy ở https://aistudio.google.com |
| `GEMINI_MODEL` | Không | Mặc định `gemini-3.5-flash-lite`. Có thể đổi sang `gemini-3.8-flash` |

Sửa xong biến môi trường thì vào **Deployments** → **Redeploy** để áp dụng.

## Chạy thử trên máy (không bắt buộc)

```bash
npm i -g vercel
vercel dev
```

Mở http://localhost:3000. Chat cần file `.env.local` có `GEMINI_API_KEY=...`.
