// ============================================================
// CẤU HÌNH CHUNG — sửa thông tin của bạn ở đây.
// Không cần đụng vào code ở chỗ khác.
// ============================================================

export default {
  name: 'Quỹ Nuôi Admin',
  mascot: '/assets/img/mascot.png',
  mascotAlt: 'Chú cún mặc áo rách vá chằng vá đụp, mặt hiền khô',

  // Ảnh cún ở đầu trang, tự đổi mỗi lần vào và mỗi 8 giây.
  heroMemes: [
    { src: '/assets/img/meme/home-1.webp', alt: 'Cún mặc áo rách vá chằng vá đụp' },
    { src: '/assets/img/meme/home-2.webp', alt: 'Cún nằm dài bên cái chén không' },
    { src: '/assets/img/meme/home-3.webp', alt: 'Cún ngồi quay lưng nhìn cái bát trống' },
    { src: '/assets/img/meme/home-4.webp', alt: 'Cún thắt nơ cầm phong bì' },
    { src: '/assets/img/meme/home-5.webp', alt: 'Cún ôm trái tim đỏ' },
  ],

  footer: {
    left: '© Quỹ Nuôi Admin · thương nhau thì nuôi nhau.',
    right: 'Trang làm cho vui thôi, đừng căng nha.',
    project: 'Dự án Nuôi Admin · làm bởi một bạn HR mê vibe code.',
    disclaimer: 'Miễn trừ trách nhiệm: Đây là dự án cá nhân làm cho vui. Ủng hộ là hoàn toàn tự nguyện, không phải gây quỹ từ thiện, không hoàn tiền và không kèm cam kết gì. Mẹo HR, bài đánh giá năng lực và câu trả lời của AI chỉ để tham khảo, không thay cho tư vấn chuyên môn về pháp lý, tài chính hay nhân sự; AI có thể trả lời sai. Đừng gửi thông tin cá nhân hay dữ liệu mật vào ô chat. Hình ảnh meme thuộc về tác giả gốc.',
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
