// ============================================================
// CẤU HÌNH CHUNG — sửa thông tin của bạn ở đây.
// Chữ nào có { vi: '…', en: '…' } là song ngữ: sửa cả hai bản.
// ============================================================

import { localize } from '../lib/i18n.js';

export default localize({
  name: { vi: 'Quỹ Nuôi Admin', en: 'Feed The Admin' },
  mascot: '/assets/img/mascot.png',
  mascotAlt: { vi: 'Chú cún mặc áo rách vá chằng vá đụp, mặt hiền khô', en: 'A gentle dog in a patched-up, torn shirt' },

  // Ảnh cún ở đầu trang, tự đổi mỗi lần vào và mỗi 8 giây.
  heroMemes: [
    { src: '/assets/img/meme/home-1.webp', alt: { vi: 'Cún mặc áo rách vá chằng vá đụp', en: 'Dog in a patched, torn shirt' } },
    { src: '/assets/img/meme/home-2.webp', alt: { vi: 'Cún nằm dài bên cái chén không', en: 'Dog lying next to an empty bowl' } },
    { src: '/assets/img/meme/home-3.webp', alt: { vi: 'Cún ngồi quay lưng nhìn cái bát trống', en: 'Dog staring at an empty bowl' } },
    { src: '/assets/img/meme/home-4.webp', alt: { vi: 'Cún thắt nơ cầm phong bì', en: 'Dog in a bow tie holding an envelope' } },
    { src: '/assets/img/meme/home-5.webp', alt: { vi: 'Cún ôm trái tim đỏ', en: 'Dog holding a red heart' } },
  ],

  nav: {
    chat: { vi: 'Chat với admin', en: 'Chat with admin' },
  },

  footer: {
    left: { vi: '© Quỹ Nuôi Admin · thương nhau thì nuôi nhau.', en: '© Feed The Admin · if you care, you share.' },
    right: { vi: 'Trang làm cho vui thôi, đừng căng nha.', en: 'Just for fun, no pressure.' },
    project: { vi: 'Dự án Nuôi Admin · làm bởi một bạn HR mê vibe code.', en: 'The Feed The Admin project · made by an HR person who loves vibe coding.' },
    disclaimer: {
      vi: 'Miễn trừ trách nhiệm: Đây là dự án cá nhân làm cho vui. Ủng hộ là hoàn toàn tự nguyện, không phải gây quỹ từ thiện, không hoàn tiền và không kèm cam kết gì. Mẹo HR, bài đánh giá năng lực và câu trả lời của AI chỉ để tham khảo, không thay cho tư vấn chuyên môn về pháp lý, tài chính hay nhân sự; AI có thể trả lời sai. Đừng gửi thông tin cá nhân hay dữ liệu mật vào ô chat. Hình ảnh meme thuộc về tác giả gốc.',
      en: 'Disclaimer: This is a personal project made for fun. Donations are fully voluntary, not charity fundraising, non-refundable and come with no promises. HR tips, skills assessments and AI replies are for reference only and do not replace professional legal, financial or HR advice; the AI can be wrong. Please do not share personal or confidential data in the chat. Meme images belong to their original creators.',
    },
  },

  // Thông tin chuyển khoản.
  // qrImage: bỏ ảnh QR vào assets/img/ rồi ghi đường dẫn, ví dụ '/assets/img/qr.png'.
  // Để trống ('') thì trang hiện ô chờ.
  donate: {
    qrImage: '',
    bank: { vi: '[NGÂN HÀNG]', en: '[BANK]' },
    accountNumber: { vi: '[SỐ TÀI KHOẢN]', en: '[ACCOUNT NUMBER]' },
    accountName: '',
  },

  // Khung chat AI. Đặt enabled: false để ẩn hẳn.
  chat: {
    enabled: true,
    endpoint: '/api/chat',
    title: 'Admin',
    subtitle: { vi: 'AI trả lời thay admin', en: 'AI replying for the admin' },
    greeting: {
      vi: 'Ê chào bạn! Tui là AI trả lời thay admin nè. Hỏi mẹo HR, vibe code hay tám chuyện gì cũng được.',
      en: 'Hey there! I am the AI answering for the admin. Ask about HR tips, vibe coding, or just chat.',
    },
    suggestions: [
      { vi: 'Chúc tui một câu đi', en: 'Give me a good-luck wish' },
      { vi: 'Mẹo viết CV đi', en: 'Any CV tips?' },
      { vi: 'Cho xin prompt vibe code', en: 'Share a vibe coding prompt' },
    ],
    text: {
      open: { vi: 'Chat với admin', en: 'Chat with admin' },
      close: { vi: 'Đóng khung chat', en: 'Close chat' },
      inputLabel: { vi: 'Tin nhắn cho admin', en: 'Message to admin' },
      placeholder: { vi: 'Nhắn gì đó cho admin…', en: 'Say something to the admin…' },
      send: { vi: 'Gửi', en: 'Send' },
      typing: { vi: 'Admin đang gõ', en: 'Admin is typing' },
      lag: { vi: 'Admin đang lag xíu, bạn thử lại sau nha.', en: 'The admin is lagging a bit, please try again.' },
      offline: { vi: 'Mạng chập chờn rồi, bạn thử lại nha.', en: 'Connection hiccup, please try again.' },
      memeAlt: { vi: 'Husky chỉ tay: anh nhắc em', en: 'Husky pointing: consider yourself warned' },
    },
  },
});
