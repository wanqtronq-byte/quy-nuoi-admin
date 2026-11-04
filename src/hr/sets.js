import { localize } from '../lib/i18n.js';

// Hai bộ đánh giá. Muốn thêm bộ mới: bỏ file JSON vào src/hr/data/ và thêm một mục ở đây.

export const SETS = localize({
  'rut-gon': {
    id: 'rut-gon',
    data: '/src/hr/data/rut-gon.json',
    name: { vi: 'Bản rút gọn', en: 'Short set' },
    tag: { vi: 'Nhanh gọn, đủ ý', en: 'Quick but complete' },
    blurb: { vi: 'Mỗi đề 16 câu, làm trong giờ nghỉ trưa là xong. Hợp để thử nghiệm lần đầu hoặc tự check nhanh.', en: '16 questions per test, done within a lunch break. Good for a first try or a quick self-check.' },
    perHint: { vi: '2 câu cho mỗi hành vi', en: '2 questions per behavior' },
  },
  'day-du': {
    id: 'day-du',
    data: '/src/hr/data/day-du.json',
    name: { vi: 'Bản đầy đủ', en: 'Full set' },
    tag: { vi: 'Kỹ hơn, chuẩn hơn', en: 'Deeper and more accurate' },
    blurb: { vi: 'Mỗi đề 24–28 câu, mỗi hành vi 3 câu nên kết quả chắc tay hơn. Hợp khi muốn làm kế hoạch phát triển nghiêm túc.', en: '24–28 questions per test, 3 per behavior, so results are more reliable. Good for a serious development plan.' },
    perHint: { vi: '3 câu cho mỗi hành vi', en: '3 questions per behavior' },
  },
});

export const AUDIENCE = localize([
  { vi: 'Bạn đang làm HR (tuyển dụng, C&B, đào tạo, HRBP…) và muốn biết mình đang đứng ở đâu.', en: 'You work in HR (recruiting, C&B, L&D, HRBP…) and want to know where you stand.' },
  { vi: 'Quản lý nhân sự (HRM) hoặc phát triển nhân sự (HRD) cần soi lại năng lực của mình hoặc team.', en: 'HR managers (HRM) or HR development leads (HRD) reviewing their own or their team\'s skills.' },
  { vi: 'Bạn sắp chuyển sang làm HR và muốn biết nên học thêm gì trước.', en: 'You are moving into HR and want to know what to learn first.' },
]);

export const HOW_IT_WORKS = localize([
  { title: { vi: 'Trắc nghiệm kiến thức', en: 'Knowledge quiz' }, text: { vi: 'Mỗi câu chọn 1 đáp án. Không chắc thì chọn "Tôi không biết", đừng đoán mò, kết quả sẽ thật hơn. Chọn "Không có đáp án nào đúng", "Tôi không biết" hay bỏ trống đều tính là sai.', en: 'Pick one answer per question. Not sure? Choose "I don\'t know" instead of guessing, it keeps results honest. "None of these", "I don\'t know" or blank all count as wrong.' } },
  { title: { vi: 'Tự đánh giá hành vi', en: 'Behavior self-check' }, text: { vi: 'Nhìn lại 3–6 tháng gần nhất xem mình có thật sự làm điều đó không. "Nhất quán" là làm thường xuyên, "Chưa nhất quán" là có làm nhưng chưa đều, "Chưa có cơ hội" là chưa gặp tình huống đó.', en: 'Look back at the last 3–6 months. "Consistent" means you do it regularly, "Not yet consistent" means sometimes, "No chance yet" means the situation has not come up.' } },
  { title: { vi: 'Cách ra cấp', en: 'How levels work' }, text: { vi: 'Mỗi năng lực có 4 cấp, mỗi cấp 2 hành vi. Hành vi đạt khi đúng khoảng 2/3 số câu. Cấp đạt khi qua cả 2 hành vi. Cấp cuối cùng là cấp cao nhất bạn qua liên tiếp từ Cấp 1, hụt ở đâu dừng ở đó.', en: 'Each skill has 4 levels with 2 behaviors each. A behavior passes at about 2/3 correct. A level passes when both behaviors pass. Your level is the highest one passed in a row from Level 1; the chain stops at the first miss.' } },
]);
