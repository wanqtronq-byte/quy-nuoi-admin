// Meme cún cho trang đánh giá năng lực. Ảnh đã tách nền trong assets/img/meme/.

import { localize } from '../lib/i18n.js';

const img = (name, alt) => `<img class="meme-img" src="/assets/img/meme/${name}.webp" alt="${alt}" width="180" height="180">`;

const T = localize({
  0: { alt: { vi: 'Cún lau nước mắt', en: 'Dog wiping tears' }, line: { vi: 'Ủa khoan… vậy là từ trước tới giờ mình làm theo cảm tính hả?', en: 'Wait… so I have been winging it this whole time?' }, note: { vi: 'Bình tĩnh, ai cũng bắt đầu từ đây. Đọc phần "Nên tập trung" bên dưới là có hướng liền.', en: 'Relax, everyone starts here. Check "Focus on" below for your next step.' } },
  1: { alt: { vi: 'Cún chống cằm suy nghĩ', en: 'Dog thinking, chin in paw' }, line: { vi: 'Biết rồi đó, mà biết… chưa tới.', en: 'You know it… just not all the way.' }, note: { vi: 'Nền đã có. Củng cố mấy hành vi còn hụt là lên cấp ngon lành.', en: 'The basics are there. Shore up the missed behaviors and you will level up.' } },
  2: { alt: { vi: 'Cún cầm sổ ghi chép', en: 'Dog taking notes' }, line: { vi: 'Làm được việc rồi nha, nhưng gặp ca khó thì còn hơi run.', en: 'You get the job done, tough cases still make you sweat a bit.' }, note: { vi: 'Thêm vài tình huống thật để luyện là ổn.', en: 'A few more real cases and you are set.' } },
  3: { alt: { vi: 'Cún giơ ngón cái', en: 'Dog giving a thumbs up' }, line: { vi: 'Ok cái này là có nghề thiệt rồi!', en: 'Okay, you really know your craft!' }, note: { vi: 'Đủ sức kèm người khác. Còn một bậc nữa thôi.', en: 'Ready to coach others. One more level to go.' } },
  4: { alt: { vi: 'Cún bắn pháo giấy ăn mừng', en: 'Dog popping confetti' }, line: { vi: 'Trùm cuối phòng nhân sự đây rồi.', en: 'Final boss of the HR department.' }, note: { vi: 'Giờ tới lượt bạn viết luật chơi cho người khác.', en: 'Now you get to write the rules for everyone else.' } },
  start: { alt: { vi: 'Cún đeo kính ngồi máy tính', en: 'Dog in glasses at a laptop' }, line: { vi: 'Làm thật lòng nha, đừng lén tra Google. Không ai chấm điểm bạn ngoài bạn.', en: 'Be honest, no sneaky Googling. Nobody grades you but you.' } },
  brk: { alt: { vi: 'Cún đeo kính đọc giấy', en: 'Dog in glasses reading a paper' }, line: { vi: 'Nghỉ xíu, uống ngụm nước rồi làm tiếp nha.', en: 'Quick break, sip some water, then carry on.' } },
});

export const MEMES = Object.fromEntries([0, 1, 2, 3, 4].map((k) => [k, { art: img(`lv${k}`, T[k].alt), line: T[k].line, note: T[k].note }]));
export const START_MEME = { art: img('start', T.start.alt), line: T.start.line };
export const BREAK_MEME = { art: img('break', T.brk.alt), line: T.brk.line };
