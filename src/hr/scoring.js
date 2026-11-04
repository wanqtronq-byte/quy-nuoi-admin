import { lang } from '../lib/i18n.js';
// Chấm điểm theo "Hướng dẫn tính điểm" của bộ khung năng lực HRM/HRD.
// Câu → Hành vi (đạt ≥ 2/3 số câu, làm tròn lên) → Cấp (đạt cả 2 hành vi)
// → Năng lực (cấp cao nhất đạt LIÊN TIẾP từ Cấp 1).

export const needed = (n) => Math.ceil((2 * n) / 3);

// Gom câu hỏi theo hành vi, giữ đúng thứ tự cấp 1 → 4.
function groupByBehavior(test) {
  const map = new Map();
  for (const b of test.behaviors) map.set(b.code, { ...b, questions: [] });
  for (const q of test.questions) {
    if (!map.has(q.behavior)) map.set(q.behavior, { code: q.behavior, level: q.level, text: '', questions: [] });
    map.get(q.behavior).questions.push(q);
  }
  return [...map.values()].sort((a, b) => a.level - b.level || a.code.localeCompare(b.code));
}

// Từ kết quả từng hành vi → cấp độ và cấp năng lực.
function rollUp(behaviors) {
  const levels = [1, 2, 3, 4].map((lv) => {
    const inLevel = behaviors.filter((b) => b.level === lv);
    const valid = inLevel.filter((b) => b.status !== 'excluded');
    let status;
    if (!valid.length) status = 'unknown';
    else status = valid.filter((b) => b.status === 'pass').length >= needed(valid.length) ? 'pass' : 'fail';
    return { level: lv, status, behaviors: inLevel };
  });
  let final = 0;
  for (const l of levels) {
    if (l.status === 'pass') final = l.level;
    else break;
  }
  // Hành vi cần tập trung: hành vi chưa đạt / chưa xét ở cấp làm chuỗi dừng lại.
  const stopLevel = levels.find((l) => l.status !== 'pass');
  const focus = stopLevel ? stopLevel.behaviors.filter((b) => b.status !== 'pass') : [];
  return { levels, final, focus };
}

// answers: { [questionId]: 'A'|'B'|'C'|'D'|'E'|'F' }   (E, F, bỏ trống = sai)
export function scoreQuiz(test, answers) {
  const behaviors = groupByBehavior(test).map((b) => {
    const correct = b.questions.filter((q) => answers[q.id] === q.answer).length;
    const total = b.questions.length;
    return { ...b, correct, total, need: needed(total), ratio: total ? correct / total : 0, status: correct >= needed(total) ? 'pass' : 'fail' };
  });
  const correct = behaviors.reduce((s, b) => s + b.correct, 0);
  return { type: 'quiz', behaviors, correct, total: test.questions.length, ...rollUp(behaviors) };
}

// answers: { [questionId]: 'yes' (Nhất quán) | 'no' (Chưa nhất quán) | 'na' (Chưa có cơ hội) }
// Đây là bản TỰ đánh giá: chỉ một nguồn nên tỷ lệ "Nhất quán" của mỗi câu là 1 hoặc 0.
export function scoreSurvey(test, answers) {
  const behaviors = groupByBehavior(test).map((b) => {
    const valid = b.questions.filter((q) => (answers[q.id] || 'na') !== 'na');
    const yes = valid.filter((q) => answers[q.id] === 'yes').length;
    const total = b.questions.length;
    if (!valid.length) return { ...b, correct: 0, total, valid: 0, need: null, ratio: 0, status: 'excluded' };
    const need = needed(valid.length);
    return { ...b, correct: yes, total, valid: valid.length, need, ratio: yes / valid.length, status: yes >= need ? 'pass' : 'fail' };
  });
  const correct = behaviors.reduce((s, b) => s + b.correct, 0);
  return { type: 'survey', behaviors, correct, total: test.questions.length, ...rollUp(behaviors) };
}

export const LEVEL_NAMES = lang === 'en'
  ? ['No level yet', 'Level 1 · Foundation', 'Level 2 · Applying', 'Level 3 · Proficient', 'Level 4 · Expert']
  : ['Chưa đạt cấp nào', 'Cấp 1 · Nền tảng', 'Cấp 2 · Vận dụng', 'Cấp 3 · Thành thạo', 'Cấp 4 · Chuyên gia'];
