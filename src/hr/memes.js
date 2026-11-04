// Meme cún cho trang đánh giá năng lực. Ảnh đã tách nền trong assets/img/meme/.

const img = (name, alt) => `<img class="meme-img" src="/assets/img/meme/${name}.webp" alt="${alt}" width="180" height="180">`;

export const MEMES = {
  0: { art: img('lv0', 'Cún lau nước mắt'), line: 'Ủa khoan… vậy là từ trước tới giờ mình làm theo cảm tính hả?', note: 'Bình tĩnh, ai cũng bắt đầu từ đây. Đọc phần "Nên tập trung" bên dưới là có hướng liền.' },
  1: { art: img('lv1', 'Cún chống cằm suy nghĩ'), line: 'Biết rồi đó, mà biết… chưa tới.', note: 'Nền đã có. Củng cố mấy hành vi còn hụt là lên cấp ngon lành.' },
  2: { art: img('lv2', 'Cún cầm sổ ghi chép'), line: 'Làm được việc rồi nha, nhưng gặp ca khó thì còn hơi run.', note: 'Thêm vài tình huống thật để luyện là ổn.' },
  3: { art: img('lv3', 'Cún giơ ngón cái'), line: 'Ok cái này là có nghề thiệt rồi!', note: 'Đủ sức kèm người khác. Còn một bậc nữa thôi.' },
  4: { art: img('lv4', 'Cún bắn pháo giấy ăn mừng'), line: 'Trùm cuối phòng nhân sự đây rồi.', note: 'Giờ tới lượt bạn viết luật chơi cho người khác.' },
};

export const START_MEME = { art: img('start', 'Cún đeo kính ngồi máy tính'), line: 'Làm thật lòng nha, đừng lén tra Google. Không ai chấm điểm bạn ngoài bạn.' };

export const BREAK_MEME = { art: img('break', 'Cún đeo kính đọc giấy'), line: 'Nghỉ xíu, uống ngụm nước rồi làm tiếp nha.' };
