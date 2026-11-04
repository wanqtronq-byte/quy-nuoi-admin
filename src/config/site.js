// ============================================================
// CẤU HÌNH CHUNG — sửa thông tin của bạn ở đây.
// Không cần đụng vào code ở chỗ khác.
// ============================================================

export default {
  name: 'Quỹ Nuôi Admin',
  mascot: '/assets/img/mascot.png',
  mascotAlt: 'Chú cún mặc áo rách vá chằng vá đụp, mặt hiền khô',

  footer: {
    left: '© Quỹ Nuôi Admin · thương nhau thì nuôi nhau.',
    right: 'Trang làm cho vui thôi, đừng căng nha.',
  },

  // Thông tin chuyển khoản.
  // qrImage: bỏ ảnh QR vào assets/img/ rồi ghi đường dẫn, ví dụ '/assets/img/qr.png'.
  // Để trống ('') thì trang hiện ô chờ.
  donate: {
    qrImage: '',
    bank: '[NGÂN HÀNG]',
    accountNumber: '[SỐ TÀI KHOẢN]',
    accountName: '',
  },

  // Khung chat AI. Đặt enabled: false để ẩn hẳn.
  chat: {
    enabled: true,
    endpoint: '/api/chat',
    title: 'Admin',
    subtitle: 'AI trả lời thay admin',
    greeting: 'Ê chào bạn! Tui là AI trả lời thay admin nè. Hỏi mẹo HR, vibe code hay tám chuyện gì cũng được.',
    suggestions: ['Chúc tui một câu đi', 'Mẹo viết CV đi', 'Cho xin prompt vibe code'],
  },
};
