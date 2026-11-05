// ============================================================
// CẤU HÌNH CHUNG — sửa thông tin của bạn ở đây.
// Chữ nào có { vi: '…', en: '…' } là song ngữ: sửa cả hai bản.
// ============================================================

import { localize } from '../lib/i18n.js';

export default localize({
  name: { vi: 'Quỹ Nuôi Nhũn', en: 'Feed Nhũn' },
  mascot: '/assets/img/mascot.png',
  mascotAlt: { vi: 'Nhũn, chú cún mặc áo rách vá chằng vá đụp', en: 'Nhũn, the dog in a patched-up torn shirt' },

  // Ảnh cún ở đầu trang, tự đổi mỗi lần vào và mỗi 8 giây.
  heroMemes: [
    { src: '/assets/img/meme/home-1.webp', alt: { vi: 'Cún mặc áo rách vá chằng vá đụp', en: 'Dog in a patched, torn shirt' } },
    { src: '/assets/img/meme/home-2.webp', alt: { vi: 'Cún nằm dài bên cái chén không', en: 'Dog lying next to an empty bowl' } },
    { src: '/assets/img/meme/home-3.webp', alt: { vi: 'Cún ngồi quay lưng nhìn cái bát trống', en: 'Dog staring at an empty bowl' } },
    { src: '/assets/img/meme/home-4.webp', alt: { vi: 'Cún thắt nơ cầm phong bì', en: 'Dog in a bow tie holding an envelope' } },
    { src: '/assets/img/meme/home-5.webp', alt: { vi: 'Cún ôm trái tim đỏ', en: 'Dog holding a red heart' } },
  ],

  nav: {
    chat: { vi: 'Chat với Nhũn', en: 'Chat with Nhũn' },
  },

  footer: {
    left: { vi: '© Quỹ Nuôi Nhũn · thương nhau thì nuôi nhau.', en: '© Feed Nhũn · if you care, you share.' },
    right: { vi: 'Trang làm cho vui thôi, đừng căng nha.', en: 'Just for fun, no pressure.' },
    project: { vi: 'Dự án Nuôi Nhũn · làm bởi một bạn HR mê vibe code.', en: 'The Feed Nhũn project · made by an HR person who loves vibe coding.' },
    disclaimer: {
      vi: 'Miễn trừ trách nhiệm: Đây là dự án cá nhân làm cho vui. Ủng hộ là hoàn toàn tự nguyện, không phải gây quỹ từ thiện, không hoàn tiền và không kèm cam kết gì. Mẹo HR, bài đánh giá năng lực và câu trả lời của AI chỉ để tham khảo, không thay cho tư vấn chuyên môn về pháp lý, tài chính hay nhân sự; AI có thể trả lời sai. Đừng gửi thông tin cá nhân hay dữ liệu mật vào ô chat. Hình ảnh meme thuộc về tác giả gốc.',
      en: 'Disclaimer: This is a personal project made for fun. Donations are fully voluntary, not charity fundraising, non-refundable and come with no promises. HR tips, skills assessments and AI replies are for reference only and do not replace professional legal, financial or HR advice; the AI can be wrong. Please do not share personal or confidential data in the chat. Meme images belong to their original creators.',
    },
  },

  // Thông tin chuyển khoản.
  // qrImage: bỏ ảnh QR vào assets/img/ rồi ghi đường dẫn, ví dụ '/assets/img/qr.png'.
  // Để trống ('') thì trang hiện ô chờ.
  donate: {
    qrImage: '',   // ảnh QR tĩnh, chỉ dùng khi tắt SePay
    bank: 'MB Bank',
    // SePay: QR riêng cho từng người + tự hiện thư cảm ơn khi tiền vào.
    // Cần SEPAY_API_TOKEN trên Vercel. Đặt enabled: false để quay về QR tĩnh.
    sepay: { enabled: true, bankCode: 'MBBank' },
    accountNumber: 'VQRQANIVY8176',   // tài khoản ảo (VA) của SePay, tiền về tài khoản MB chính
    accountName: '',   // để trống: không hiện tên chủ tài khoản trên trang
  },

  // Khung chat AI. Đặt enabled: false để ẩn hẳn.
  chat: {
    enabled: true,
    endpoint: '/api/chat',
    title: 'Nhũn',
    subtitle: { vi: 'AI trả lời thay Nhũn', en: 'AI replying for Nhũn' },
    greeting: {
      vi: 'Ê chào bạn! Tui là AI trả lời thay Nhũn nè. Hỏi mẹo HR, vibe code hay tám chuyện gì cũng được.',
      en: 'Hey there! I am the AI answering for Nhũn. Ask about HR tips, vibe coding, or just chat.',
    },
    suggestions: [
      { vi: 'Chúc tui một câu đi', en: 'Give me a good-luck wish' },
      { vi: 'Viết prompt sao cho AI hiểu?', en: 'How do I write a good prompt?' },
      { vi: 'Vibe code bắt đầu từ đâu?', en: 'Where do I start with vibe coding?' },
      { vi: 'Mẹo viết CV đi', en: 'Any CV tips?' },
    ],
    text: {
      open: { vi: 'Chat với Nhũn', en: 'Chat with Nhũn' },
      close: { vi: 'Đóng khung chat', en: 'Close chat' },
      inputLabel: { vi: 'Tin nhắn cho Nhũn', en: 'Message to Nhũn' },
      placeholder: { vi: 'Nhắn gì đó cho Nhũn…', en: 'Say something to Nhũn…' },
      send: { vi: 'Gửi', en: 'Send' },
      typing: { vi: 'Nhũn đang gõ', en: 'Nhũn is typing' },
      lag: { vi: 'Nhũn đang lag xíu, bạn thử lại sau nha.', en: 'Nhũn is lagging a bit, please try again.' },
      offline: { vi: 'Mạng chập chờn rồi, bạn thử lại nha.', en: 'Connection hiccup, please try again.' },
      memeAlt: { vi: 'Husky chỉ tay: anh nhắc em', en: 'Husky pointing: consider yourself warned' },
    },
  },
});
