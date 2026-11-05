// Lời chúc tiếng Anh ngẫu nhiên, gửi mỗi lần mở khung chat. Thêm/bớt thoải mái.

export const WISHES = [
  'May your coffee be strong and your Mondays be short. ☕',
  'Wishing you zero bugs and infinite snacks today.',
  'May your inbox be light and your weekend be long.',
  'Hope your deadlines are kind and your boss is in a good mood.',
  'Sending you good vibes and a perfectly timed lunch break.',
  'May your meetings end early and your ideas land well.',
  'Wishing you a day where everything just works on the first try.',
  'May your Wi-Fi be fast and your problems be small.',
  'Hope today brings you one small win and one big laugh.',
  'May your to-do list shrink faster than your snack stash.',
  'Wishing you the confidence of a dog who just learned a new trick. 🐶',
  'May your salary arrive early and your bills arrive late.',
  'Hope your code compiles and your plants stay alive.',
  'Wishing you a calm mind, a full belly and a good night\'s sleep.',
  'May every email you open today be good news.',
  'Hope someone makes you smile today, and it might as well be this dog.',
  'Wishing you the energy of a Friday afternoon, all week long.',
  'May your prompts be clear and your AI never make things up.',
  'Hope you find what you came here for, plus a little extra luck.',
  'May your next interview feel like a chat with an old friend.',
];

let last = -1;
export function randomWish() {
  let i = Math.floor(Math.random() * WISHES.length);
  if (i === last) i = (i + 1) % WISHES.length;
  last = i;
  return WISHES[i];
}
