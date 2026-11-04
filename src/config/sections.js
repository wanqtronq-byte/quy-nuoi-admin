// ============================================================
// DANH SÁCH CÁC PHẦN TRÊN TRANG — theo đúng thứ tự hiển thị.
//
// Thêm phần mới:
//   1. Copy src/sections/_template.js thành file mới, ví dụ src/sections/faq.js
//   2. Import và thêm vào mảng bên dưới
// Ẩn một phần: xoá (hoặc comment) dòng của nó trong mảng.
// Đổi thứ tự: đổi vị trí trong mảng.
// ============================================================

import hero from '../sections/hero.js';
import gifts from '../sections/gifts.js';
import story from '../sections/story.js';
// Phần riêng cho bài thử sức HR (đang gộp vào thẻ Mẹo HR, bật lại bằng cách thêm vào mảng):
// import hrSkills from '../sections/hr-skills.js';
import donate from '../sections/donate.js';

export default [
  hero,
  gifts,
  story,
  donate,
];
