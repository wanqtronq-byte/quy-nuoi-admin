// Hai bộ đánh giá. Muốn thêm bộ mới: bỏ file JSON vào src/hr/data/ và thêm một mục ở đây.

export const SETS = {
  'rut-gon': {
    id: 'rut-gon',
    data: '/src/hr/data/rut-gon.json',
    name: 'Bản rút gọn',
    tag: 'Nhanh gọn, đủ ý',
    blurb: 'Mỗi đề 16 câu, làm trong giờ nghỉ trưa là xong. Hợp để thử nghiệm lần đầu hoặc tự check nhanh.',
    perHint: '2 câu cho mỗi hành vi',
  },
  'day-du': {
    id: 'day-du',
    data: '/src/hr/data/day-du.json',
    name: 'Bản đầy đủ',
    tag: 'Kỹ hơn, chuẩn hơn',
    blurb: 'Mỗi đề 24–28 câu, mỗi hành vi 3 câu nên kết quả chắc tay hơn. Hợp khi muốn làm kế hoạch phát triển nghiêm túc.',
    perHint: '3 câu cho mỗi hành vi',
  },
};

export const AUDIENCE = [
  'Bạn đang làm HR (tuyển dụng, C&B, đào tạo, HRBP…) và muốn biết mình đang đứng ở đâu.',
  'Quản lý nhân sự (HRM) hoặc phát triển nhân sự (HRD) cần soi lại năng lực của mình hoặc team.',
  'Bạn sắp chuyển sang làm HR và muốn biết nên học thêm gì trước.',
];

export const HOW_IT_WORKS = [
  { title: 'Trắc nghiệm kiến thức', text: 'Mỗi câu chọn 1 đáp án. Không chắc thì chọn "Tôi không biết", đừng đoán mò, kết quả sẽ thật hơn. Chọn "Không có đáp án nào đúng", "Tôi không biết" hay bỏ trống đều tính là sai.' },
  { title: 'Tự đánh giá hành vi', text: 'Nhìn lại 3–6 tháng gần nhất xem mình có thật sự làm điều đó không. "Nhất quán" là làm thường xuyên, "Chưa nhất quán" là có làm nhưng chưa đều, "Chưa có cơ hội" là chưa gặp tình huống đó.' },
  { title: 'Cách ra cấp', text: 'Mỗi năng lực có 4 cấp, mỗi cấp 2 hành vi. Hành vi đạt khi đúng khoảng 2/3 số câu. Cấp đạt khi qua cả 2 hành vi. Cấp cuối cùng là cấp cao nhất bạn qua liên tiếp từ Cấp 1, hụt ở đâu dừng ở đó.' },
];
