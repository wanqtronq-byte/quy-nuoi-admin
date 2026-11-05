// ============================================================
// CÁC TRANG MẸO — mỗi chủ đề là một trang (/meo.html?chu-de=…), bên trong gắn các module.
//
// Thêm module vào một trang: thêm một mục vào mảng `modules` của chủ đề đó:
//   { title: { vi, en }, desc: { vi, en }, href: '/duong-dan', tags: [{ vi, en }] }
// Mảng `modules` để trống thì trang hiện "đang cập nhật".
// Thêm chủ đề mới: thêm một khoá mới (ví dụ 'excel') rồi trỏ link tới /meo.html?chu-de=excel
// ============================================================

import { localize } from '../lib/i18n.js';

export default localize({
  hr: {
    title: { vi: 'Góc HR', en: 'HR corner' },
    lead: { vi: 'Mấy thứ hay ho cho dân nhân sự. Chọn một cái để bắt đầu nha.', en: 'Handy stuff for HR people. Pick one to start.' },
    modules: [
      {
        title: { vi: 'Đánh giá năng lực (bản đầy đủ)', en: 'Skills assessment (full set)' },
        desc: { vi: '4 đề trắc nghiệm + 4 bộ tự đánh giá, mỗi đề 24–28 câu. Có biểu đồ nhện.', en: '4 quizzes + 4 self-checks, 24–28 questions each. With a spider chart.' },
        tags: [{ vi: 'Cả bộ ~1 tiếng', en: 'Whole set ~1 hour' }, { vi: '~11–13 phút/đề', en: '~11–13 min/test' }],
        href: '/danh-gia.html?bo=day-du',
      },
      {
        title: { vi: 'Đánh giá năng lực (bản rút gọn)', en: 'Skills assessment (short set)' },
        desc: { vi: '4 đề trắc nghiệm + 4 bộ tự đánh giá, mỗi đề 16 câu. Có biểu đồ nhện.', en: '4 quizzes + 4 self-checks, 16 questions each. With a spider chart.' },
        tags: [{ vi: 'Cả bộ ~30 phút', en: 'Whole set ~30 min' }, { vi: '~5 phút/đề', en: '~5 min/test' }],
        href: '/danh-gia.html?bo=rut-gon',
      },
    ],
  },
  'vibe-code': {
    title: { vi: 'Góc AI', en: 'AI corner' },
    lead: { vi: 'Nơi tui gom mấy mẹo dùng AI và vibe code cho nhanh.', en: 'Where I collect tips on using AI and vibe coding.' },
    modules: [],
  },
});
