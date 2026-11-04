// Meme chó mèo tự vẽ (không dùng ảnh bên ngoài). Mỗi meme: hình + câu thoại.

const INK = '#17342B';
const FUR = '#F3D9B1';
const FUR2 = '#E2BE8C';
const CAT = '#C9CED6';

const art = {
  // Mèo sốc: mắt tròn, miệng chữ O, tay ôm mặt
  catShock: `<svg viewBox="0 0 160 150" aria-hidden="true" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
<path d="M40 52 L34 16 L64 38 Z" fill="${CAT}"/><path d="M120 52 L126 16 L96 38 Z" fill="${CAT}"/>
<ellipse cx="80" cy="80" rx="50" ry="44" fill="${CAT}"/>
<circle cx="62" cy="72" r="11" fill="#fff"/><circle cx="98" cy="72" r="11" fill="#fff"/>
<circle cx="62" cy="72" r="3" fill="${INK}"/><circle cx="98" cy="72" r="3" fill="${INK}"/>
<ellipse cx="80" cy="102" rx="7" ry="9" fill="#fff"/>
<path d="M30 112 C34 96 44 92 50 100" fill="${CAT}"/><path d="M130 112 C126 96 116 92 110 100" fill="${CAT}"/>
<path d="M18 30 L24 40 M10 46 L20 48 M142 30 L136 40 M150 46 L140 48"/>
</svg>`,

  // Cún suy tư: nghiêng đầu, tay chống cằm, dấu hỏi
  dogThink: `<svg viewBox="0 0 160 150" aria-hidden="true" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
<g transform="rotate(-10 80 80)">
<path d="M38 50 C20 54 18 92 30 104 C40 112 48 92 48 70 Z" fill="${FUR2}"/>
<path d="M122 50 C140 54 142 92 130 104 C120 112 112 92 112 70 Z" fill="${FUR2}"/>
<ellipse cx="80" cy="80" rx="44" ry="42" fill="${FUR}"/>
<path d="M58 74 Q64 70 70 74" /><circle cx="98" cy="74" r="4" fill="${INK}"/>
<ellipse cx="80" cy="94" rx="8" ry="6" fill="${INK}"/><path d="M72 106 Q80 102 88 108"/>
</g>
<path d="M100 132 C100 118 116 112 122 122" fill="${FUR}"/>
<path d="M134 22 C134 10 152 10 152 22 C152 30 143 30 143 38 M143 46 L143 47"/>
</svg>`,

  // Cún ăn mừng: hai tay giơ cao, pháo giấy
  dogParty: `<svg viewBox="0 0 160 150" aria-hidden="true" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
<path d="M42 96 L22 58" /><path d="M118 96 L138 58"/>
<circle cx="20" cy="54" r="7" fill="${FUR}"/><circle cx="140" cy="54" r="7" fill="${FUR}"/>
<path d="M40 58 C24 60 22 94 34 104 C42 110 50 92 50 74 Z" fill="${FUR2}"/>
<path d="M120 58 C136 60 138 94 126 104 C118 110 110 92 110 74 Z" fill="${FUR2}"/>
<ellipse cx="80" cy="86" rx="42" ry="40" fill="${FUR}"/>
<path d="M60 80 Q66 72 72 80"/><path d="M88 80 Q94 72 100 80"/>
<ellipse cx="80" cy="96" rx="8" ry="6" fill="${INK}"/>
<path d="M64 106 Q80 124 96 106 Z" fill="#FFB5C2"/>
<path d="M30 20 l6 6 M54 10 l2 8 M106 10 l-2 8 M130 20 l-6 6" stroke="#0E7A5A"/>
<rect x="74" y="8" width="8" height="8" fill="#FFD86B" stroke-width="2" transform="rotate(20 78 12)"/>
</svg>`,

  // Mèo ngầu: kính đen, nhếch mép
  catCool: `<svg viewBox="0 0 160 150" aria-hidden="true" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
<path d="M40 52 L34 16 L64 38 Z" fill="#F7C08A"/><path d="M120 52 L126 16 L96 38 Z" fill="#F7C08A"/>
<ellipse cx="80" cy="82" rx="50" ry="44" fill="#F7C08A"/>
<path d="M44 70 H116" /><rect x="46" y="68" width="30" height="18" rx="7" fill="${INK}"/><rect x="84" y="68" width="30" height="18" rx="7" fill="${INK}"/>
<path d="M72 106 Q84 112 94 102"/>
<path d="M26 92 H44 M26 102 H42 M134 92 H116 M134 102 H118"/>
</svg>`,
};

export const MEMES = {
  0: { art: art.catShock, line: 'Ủa khoan… vậy là từ trước tới giờ mình làm theo cảm tính hả?', note: 'Bình tĩnh, ai cũng bắt đầu từ đây. Đọc lại phần "Nên tập trung" bên dưới là có hướng liền.' },
  1: { art: art.dogThink, line: 'Biết rồi đó, mà biết… chưa tới.', note: 'Nền đã có. Củng cố mấy hành vi còn hụt là lên cấp ngon lành.' },
  2: { art: art.dogThink, line: 'Làm được việc rồi nha, nhưng gặp ca khó thì còn hơi run.', note: 'Thêm vài tình huống thật để luyện là ổn.' },
  3: { art: art.dogParty, line: 'Ok cái này là có nghề thiệt rồi!', note: 'Đủ sức kèm người khác. Còn một bậc nữa thôi.' },
  4: { art: art.catCool, line: 'Trùm cuối phòng nhân sự đây rồi.', note: 'Giờ tới lượt bạn viết luật chơi cho người khác.' },
};

export const START_MEME = { art: art.dogThink, line: 'Làm thật lòng nha, đừng lén tra Google. Không ai chấm điểm bạn ngoài bạn.' };
