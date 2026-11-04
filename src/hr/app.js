// Trang "Thử sức năng lực HR": danh sách đề → làm bài → kết quả có biểu đồ nhện.
// Dữ liệu đề nằm trong src/hr/data/*.json, chấm điểm trong scoring.js.

import { SETS, AUDIENCE, HOW_IT_WORKS } from './sets.js';
import { scoreQuiz, scoreSurvey, LEVEL_NAMES } from './scoring.js';
import { radar } from './radar.js';
import { MEMES, START_MEME, BREAK_MEME } from './memes.js';
import { esc } from '../lib/dom.js';
import { L, lang } from '../lib/i18n.js';
import { togglesHtml, bindToggles } from '../lib/prefs.js';

// Tên và mô tả năng lực bằng tiếng Anh (câu hỏi vẫn giữ tiếng Việt).
const EN = {
  'PB-01': ['Critical thinking', 'Questioning, checking sources and spotting weak arguments before deciding.'],
  'NS-02': ['Performance management', 'Setting goals, running reviews, coaching and linking performance to rewards.'],
  'NS-06': ['HR analytics & workforce planning', 'Using people data and forecasts to plan the workforce.'],
  'AI-01': ['Using AI at work', 'Using generative AI safely, effectively and responsibly in HR work.'],
  'DL-01': ['Data thinking', 'Reading, organizing and questioning data to draw useful conclusions.'],
  'TA-02': ['Agility & adaptability', 'Staying effective and positive when plans, tools or priorities change.'],
  'LN-02': ['Empathy', 'Understanding how others feel and responding in a way that helps.'],
};
const nm = (t) => L(t.name, EN[t.code]?.[0] || t.name);
const def = (t) => L(t.definition || '', EN[t.code]?.[1] || t.definition || '');
const KIND = (type) => (type === 'quiz' ? L('Trắc nghiệm', 'Quiz') : L('Tự đánh giá', 'Self-check'));
const SELF = L('TĐG', 'self');

const params = new URLSearchParams(location.search);
const set = SETS[params.get('bo')] || SETS['rut-gon'];
const app = document.getElementById('hr-app');
const STORE = `hr-results-${set.id}`;

let data = null;
let run = null;      // bài đang làm

// Nhắc giữ trang: chưa có database, thoát là mất bài đang làm
const KEEP_NOTE = `<div class="hr-keep" role="note"><b>${L('Giữ trang tới khi làm xong nha!', 'Please keep this page open until you finish!')}</b> ${L('Admin chưa có tiền mua database nên bài đang làm chỉ nằm trên trang này. Lỡ thoát hay tải lại trang là mất sạch, phải làm lại từ đầu đó.', 'The admin cannot afford a database yet, so your answers only live on this page. Leave or reload and they are gone.')}</div>`;

window.addEventListener('beforeunload', (e) => {
  if (run && (Object.keys(run.answers).length || (run.batch && run.batch.done.length))) {
    e.preventDefault();
    e.returnValue = '';
  }
});
let timerId = null;

// ---------- lưu kết quả trên máy người dùng ----------
function loadResults() {
  try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; }
}
function saveResult(key, value) {
  try {
    const all = loadResults();
    all[key] = value;
    localStorage.setItem(STORE, JSON.stringify(all));
  } catch { /* trình duyệt chặn lưu thì thôi */ }
}

// ---------- tiện ích ----------
const testKey = (type, code) => `${type}:${code}`;
const findTest = (type, code) => (type === 'quiz' ? data.quizzes : data.surveys).find((t) => t.code === code);
const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ---------- màn hình danh sách ----------
function renderHome(view = 'gate') {
  stopTimer();
  run = null;
  const results = loadResults();

  const testCard = (t, type) => {
    const r = results[testKey(type, t.code)];
    const kind = KIND(type);
    return `
<article class="card hr-test">
  <span class="code">${esc(t.code)} · ${kind}</span>
  <h3>${esc(nm(t))}</h3>
  <p>${esc(def(t))}</p>
  <div class="hr-meta">
    <span>${t.questions.length} ${L('câu', 'questions')}</span>
    <span>~${t.minutes} ${L('phút', 'min')}</span>
    ${r ? `<span class="done">${L('Lần trước', 'Last time')}: ${esc(LEVEL_NAMES[r.final])}</span>` : ''}
  </div>
  <button class="btn btn-primary pop hr-go" type="button" data-start="${type}" data-code="${esc(t.code)}">${r ? L('Làm lại', 'Retake') : L('Bắt đầu', 'Start')}</button>
</article>`;
  };

  const done = Object.entries(results);
  const overview = done.length >= 3
    ? `<div class="radar-wrap">${radar(done.map(([k, v]) => ({
        label: k.split(':')[1] + (k.startsWith('survey') ? ` (${SELF})` : ''),
        sub: `${L('Cấp', 'Level')} ${v.final}`,
        value: v.final / 4,
        pass: 0.5,
      })), { ringLabels: ['C1', 'C2', 'C3', 'C4'], title: L('Tổng quan cấp năng lực các bài đã làm', 'Overview of levels from completed tests') })}</div>`
    : '';

  const totalQuiz = data.quizzes.reduce((s, t) => s + t.questions.length, 0);
  const quizMin = data.quizzes.map((t) => t.minutes);
  const surveyMin = data.surveys.map((t) => t.minutes);
  const hours = Math.round((quizMin.reduce((a, b) => a + b, 0) + surveyMin.reduce((a, b) => a + b, 0)) / 6) / 10;

  app.innerHTML = `
<div class="wrap hr-stack">
  <section class="hr-intro">
    <div class="hr-intro-text">
      <span class="hr-kicker">${esc(set.name)} · ${esc(set.tag)}</span>
      <h1 class="display">${L('Thử sức năng lực HR', 'HR skills check')}</h1>
      <p>${esc(set.blurb)} ${L('Làm xong là có ngay biểu đồ nhện, biết mình mạnh chỗ nào, hụt chỗ nào, nên học gì tiếp. Kết quả chỉ lưu trên máy bạn, không ai xem được.', 'You get a spider chart right away: where you are strong, where you fall short, what to learn next. Results stay on your device only.')}</p>
      ${lang === 'en' ? '<p class="hr-langnote">Heads up: the questions themselves are in Vietnamese for now.</p>' : ''}
    </div>
    <div class="hr-meme">${START_MEME.art}<div class="hr-bubble">${esc(START_MEME.line)}</div></div>
  </section>

  <section class="hr-modes">
    <button class="card hr-mode pop" type="button" data-list>
      <b class="display">${L('Làm từng phần', 'One part at a time')}</b>
      <span>${L(`Chọn 1 bài bạn thích, ${Math.min(...surveyMin)}–${Math.max(...quizMin)} phút là xong.`, `Pick any test, ${Math.min(...surveyMin)}–${Math.max(...quizMin)} minutes each.`)}</span>
      <em>${L('Chọn bài →', 'Pick a test →')}</em>
    </button>
    <button class="card hr-mode pop" type="button" data-all>
      <b class="display">${L('Làm hết một lượt', 'Everything in one go')}</b>
      <span>${L(`Cả ${data.quizzes.length + data.surveys.length} bài liền nhau, khoảng ${hours} tiếng. Giữa các bài được nghỉ, dừng lúc nào cũng được.`, `All ${data.quizzes.length + data.surveys.length} tests back to back, about ${hours} hours. Breaks in between, stop any time.`)}</span>
      <em>${L('Bắt đầu luôn →', 'Start now →')}</em>
    </button>
  </section>

  <section class="card hr-box hr-tips">
    <h2>${L('3 điều cần nhớ', '3 things to know')}</h2>
    <ul>
      <li>${L('Không chắc thì chọn <b>"Tôi không biết"</b>, đừng đoán mò.', 'Not sure? Pick <b>"I don\'t know"</b> instead of guessing.')}</li>
      <li>${L('Phần tự đánh giá: chọn theo việc bạn <b>thật sự làm</b> 3–6 tháng qua.', 'Self-checks: answer based on what you <b>actually did</b> in the last 3–6 months.')}</li>
      <li>${L('Kết quả chỉ lưu trên máy bạn, không ai xem được.', 'Results stay on your device, nobody else sees them.')}</li>
    </ul>
    <details>
      <summary>${L('Dành cho ai, tính cấp thế nào?', 'Who is it for, how are levels worked out?')}</summary>
      <ul>${AUDIENCE.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
      ${HOW_IT_WORKS.map((h) => `<p><b>${esc(h.title)}:</b> ${esc(h.text)}</p>`).join('')}
    </details>
  </section>

  <section class="hr-stack" id="ds-de" style="gap:18px">
    <div class="hr-section-title"><h2>${L('Trắc nghiệm kiến thức', 'Knowledge quizzes')}</h2><span>${L(`${totalQuiz} câu tất cả · có xem lại đáp án sau khi nộp`, `${totalQuiz} questions in total · answers shown after you submit`)}</span></div>
    <div class="hr-tests">${data.quizzes.map((t) => testCard(t, 'quiz')).join('')}</div>
  </section>

  <section class="hr-stack" style="gap:18px">
    <div class="hr-section-title"><h2>${L('Tự đánh giá hành vi', 'Behavior self-checks')}</h2><span>${L('Trả lời theo việc bạn thật sự làm, không phải việc bạn biết', 'Answer by what you do, not what you know')}</span></div>
    <div class="hr-tests">${data.surveys.map((t) => testCard(t, 'survey')).join('')}</div>
  </section>

  <section class="card hr-overview">
    ${overview}
    <div class="copy">
      <h2 class="h2" style="font-size:30px">${L('Biểu đồ nhện tổng', 'Overall spider chart')}</h2>
      ${done.length >= 3
        ? `<p class="hr-empty">${L('Mỗi cánh là một bài bạn đã làm, càng xa tâm càng cao cấp. TĐG là tự đánh giá. Với Ứng dụng AI, kết quả cuối nên lấy cấp thấp hơn giữa trắc nghiệm và tự đánh giá: biết mà không làm, hoặc làm mà không hiểu rủi ro, đều chưa đủ.', 'Each spoke is a test you took; further out means a higher level. "self" marks a self-check. For Using AI, take the lower of the quiz and self-check levels: knowing without doing, or doing without understanding the risks, is not enough.')}</p>`
        : `<p class="hr-empty">${L(`Làm từ 3 bài trở lên là biểu đồ tổng hiện ra ở đây. Hiện bạn đã làm ${done.length} bài.`, `Finish 3 or more tests to see the overall chart here. You have done ${done.length} so far.`)}</p>`}
      ${done.length ? `<button class="hr-btn" type="button" data-clear>${L('Xoá kết quả đã lưu', 'Clear saved results')}</button>` : ''}
    </div>
  </section>
</div>`;

  // Chỉ hiện đúng phần cần thấy: cổng chọn cách làm, hoặc danh sách bài
  if (view === 'gate') {
    app.querySelectorAll('#ds-de, #ds-de ~ section').forEach((el) => el.remove());
  } else {
    app.querySelectorAll('.hr-modes, .hr-tips').forEach((el) => el.remove());
    app.querySelector('.hr-intro').insertAdjacentHTML('afterend', `
  <div class="hr-listbar">
    <button class="hr-btn" type="button" data-gate>← ${L('Chọn lại cách làm', 'Change how to take it')}</button>
  </div>
  ${KEEP_NOTE}`);
  }
  const gate = app.querySelector('[data-gate]');
  if (gate) gate.addEventListener('click', () => { renderHome('gate'); scrollTop(); });
  const list = app.querySelector('[data-list]');
  if (list) list.addEventListener('click', () => { renderHome('list'); scrollTop(); });

  app.querySelectorAll('[data-start]').forEach((b) => b.addEventListener('click', () => startTest(b.dataset.start, b.dataset.code)));
  const all = app.querySelector('[data-all]');
  if (all) all.addEventListener('click', () => {
    const queue = [...data.quizzes.map((t) => ['quiz', t.code]), ...data.surveys.map((t) => ['survey', t.code])];
    const batch = { queue, total: queue.length, done: [] };
    const [type, code] = batch.queue.shift();
    startTest(type, code, batch);
  });
  const clear = app.querySelector('[data-clear]');
  if (clear) clear.addEventListener('click', () => {
    if (clear.dataset.sure) {
      try { localStorage.removeItem(STORE); } catch { /* bỏ qua */ }
      renderHome('list');
    } else {
      clear.dataset.sure = '1';
      clear.textContent = L('Bấm lần nữa để xoá thật', 'Click again to really clear');
    }
  });
}

// ---------- làm bài ----------
function startTest(type, code, batch = null) {
  const test = findTest(type, code);
  run = { type, test, i: 0, answers: {}, started: Date.now(), batch };
  stopTimer();
  timerId = setInterval(() => {
    const el = document.getElementById('hr-timer');
    if (el) el.textContent = `${fmtTime(Math.floor((Date.now() - run.started) / 1000))} / ${L('gợi ý', 'suggested')} ${run.test.minutes} ${L('phút', 'min')}`;
  }, 1000);
  renderQuestion();
  scrollTop();
}

const QUIZ_EXTRA = [['E', L('Không có đáp án nào đúng', 'None of these is correct')], ['F', L('Tôi không biết', 'I don\'t know')]];
const SURVEY_OPTS = [['yes', L('Nhất quán', 'Consistent'), L('Mình làm việc này thường xuyên, chủ động.', 'I do this regularly and on my own.')], ['no', L('Chưa nhất quán', 'Not yet consistent'), L('Có làm nhưng chưa đều, đôi khi còn phải nhắc.', 'I do it, but not always; sometimes I need a nudge.')], ['na', L('Chưa có cơ hội', 'No chance yet'), L('Chưa gặp tình huống để làm.', 'The situation has not come up.')]];

function renderQuestion(showWarn = false) {
  const { test, type, i, answers } = run;
  const q = test.questions[i];
  const n = test.questions.length;
  const answered = Object.keys(answers).length;
  const isQuiz = type === 'quiz';
  const last = i === n - 1;

  const opts = isQuiz
    ? [...Object.entries(q.options), ...QUIZ_EXTRA].map(([k, v]) => `
      <button type="button" class="hr-opt${'EF'.includes(k) ? ' soft' : ''}" data-val="${k}" aria-pressed="${answers[q.id] === k}"><b>${k}</b><span>${esc(v)}</span></button>`).join('')
    : SURVEY_OPTS.map(([k, label, hint]) => `
      <button type="button" class="hr-opt" data-val="${k}" aria-pressed="${answers[q.id] === k}"><b>${label[0]}</b><span><strong>${label}</strong><br><small>${hint}</small></span></button>`).join('');

  const missing = n - answered;
  app.innerHTML = `
<div class="wrap">
  <div class="hr-run">
    <div class="hr-run-head">
      <h1>${esc(nm(test))} <small style="font-size:16px;color:var(--muted)">· ${KIND(type)}${run.batch ? ` · ${L('bài', 'test')} ${run.batch.done.length + 1}/${run.batch.total}` : ''}</small></h1>
      <span class="hr-timer" id="hr-timer">${fmtTime(Math.floor((Date.now() - run.started) / 1000))} / ${L('gợi ý', 'suggested')} ${test.minutes} ${L('phút', 'min')}</span>
    </div>
    ${i === 0 && !Object.keys(answers).length ? KEEP_NOTE : ''}
    <div class="hr-progress" aria-label="${L('Đã trả lời', 'Answered')} ${answered}/${n}"><i style="width:${(answered / n) * 100}%"></i></div>
    <article class="card hr-q">
      <span class="label">${L('Câu', 'Question')} ${i + 1}/${n} · ${L('Cấp', 'Level')} ${q.level}${isQuiz && q.topic ? ` · ${esc(q.topic)}` : ''}</span>
      <h2>${isQuiz ? '' : L('Trong 3–6 tháng gần đây, mình… ', 'In the last 3–6 months, I… ')}${esc(q.q)}</h2>
      <div class="hr-opts">${opts}</div>
    </article>
    <div class="hr-nav">
      <button class="hr-btn" type="button" data-prev ${i === 0 ? 'disabled' : ''}>← ${L('Câu trước', 'Back')}</button>
      ${last
        ? `<button class="hr-btn primary" type="button" data-submit>${L('Nộp bài, xem kết quả', 'Submit and see results')}</button>`
        : `<button class="hr-btn primary" type="button" data-next>${L('Câu tiếp →', 'Next →')}</button>`}
    </div>
    ${showWarn && missing ? `<div class="hr-warn"><span>${L(`Còn ${missing} câu chưa trả lời, câu trống sẽ tính ${isQuiz ? 'là sai' : 'là "Chưa có cơ hội"'}.`, `${missing} unanswered; blanks count as ${isQuiz ? 'wrong' : '"No chance yet"'}.`)}</span><button class="hr-btn" type="button" data-force>${L('Nộp luôn', 'Submit anyway')}</button></div>` : ''}
    <div class="hr-dots" aria-label="${L('Chuyển nhanh tới câu', 'Jump to question')}">
      ${test.questions.map((qq, k) => `<button type="button" data-go="${k}" class="${answers[qq.id] ? 'on' : ''} ${k === i ? 'cur' : ''}" aria-label="${L('Câu', 'Question')} ${k + 1}">${k + 1}</button>`).join('')}
    </div>
    <button class="hr-btn" type="button" data-quit style="align-self:flex-start">${L('Thoát, về danh sách', 'Quit to the list')}</button>
  </div>
</div>`;

  app.querySelectorAll('.hr-opt').forEach((b) => b.addEventListener('click', () => {
    run.answers[q.id] = b.dataset.val;
    if (!last) { run.i += 1; }
    renderQuestion();
  }));
  const on = (sel, fn) => { const el = app.querySelector(sel); if (el) el.addEventListener('click', fn); };
  on('[data-prev]', () => { run.i -= 1; renderQuestion(); });
  on('[data-next]', () => { run.i += 1; renderQuestion(); });
  on('[data-submit]', () => (missing ? renderQuestion(true) : finish()));
  on('[data-force]', finish);
  on('[data-quit]', () => { const b = run && run.batch; run = null; renderHome(b ? 'gate' : 'list'); scrollTop(); });
  app.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => { run.i = Number(b.dataset.go); renderQuestion(); }));
}

// ---------- kết quả ----------
function finish() {
  stopTimer();
  const { type, test, answers, started } = run;
  const result = type === 'quiz' ? scoreQuiz(test, answers) : scoreSurvey(test, answers);
  const minutes = Math.max(1, Math.round((Date.now() - started) / 60000));
  saveResult(testKey(type, test.code), { final: result.final, at: Date.now() });
  const batch = run.batch;
  if (batch) {
    batch.done.push({ test, type, result, answers, minutes });
    if (batch.queue.length) renderBreak(batch); else renderBatch(batch);
  } else {
    run = null;
    renderResult(test, type, result, answers, minutes);
  }
  scrollTop();
}

// Nghỉ giữa các bài khi làm hết một lượt
function renderBreak(batch) {
  const last = batch.done[batch.done.length - 1];
  const [nType, nCode] = batch.queue[0];
  const next = findTest(nType, nCode);
  app.innerHTML = `
<div class="wrap"><div class="hr-run">
  <section class="card hr-result-top">
    <div class="meme">${BREAK_MEME.art}</div>
    <div class="copy">
      <span class="hr-kicker">${L('Xong bài', 'Finished test')} ${batch.done.length}/${batch.total}</span>
      <div class="hr-level" style="font-size:32px">${esc(nm(last.test))}: ${esc(LEVEL_NAMES[last.result.final])}</div>
      <p class="muted" style="font-size:16px;line-height:1.6">${esc(BREAK_MEME.line)} ${L('Bài sau', 'Next up')}: <b>${esc(nm(next))}</b> (${KIND(nType)}, ~${next.minutes} ${L('phút', 'min')}).</p>
      <div class="hr-nav" style="justify-content:flex-start">
        <button class="hr-btn primary" type="button" data-next-test>${L('Làm tiếp', 'Continue')}</button>
        <button class="hr-btn" type="button" data-stop>${L('Dừng, xem kết quả tới đây', 'Stop and see results so far')}</button>
      </div>
    </div>
  </section>
</div></div>`;
  app.querySelector('[data-next-test]').addEventListener('click', () => {
    const [t, c] = batch.queue.shift();
    startTest(t, c, batch);
  });
  app.querySelector('[data-stop]').addEventListener('click', () => { renderBatch(batch); scrollTop(); });
}

// Kết quả tổng khi làm nhiều bài một lượt
function renderBatch(batch) {
  run = null;
  const items = batch.done;
  const avg = Math.floor(items.reduce((a, d) => a + d.result.final, 0) / items.length);
  const meme = MEMES[avg];
  const chart = items.length >= 3 ? radar(items.map((d) => ({
    label: d.test.code + (d.type === 'survey' ? ` (${SELF})` : ''),
    sub: `${L('Cấp', 'Level')} ${d.result.final}`,
    value: d.result.final / 4,
    pass: 0.5,
  })), { ringLabels: ['C1', 'C2', 'C3', 'C4'], title: L('Biểu đồ nhện tổng các bài vừa làm', 'Overall spider chart for this session') }) : '';
  const aiQuiz = items.find((d) => d.type === 'quiz' && d.test.code === 'AI-01');
  const aiSurvey = items.find((d) => d.type === 'survey' && d.test.code === 'AI-01');
  const aiNote = aiQuiz && aiSurvey
    ? `<p>${L('Ứng dụng AI tính chung là', 'Using AI overall:')} <b>${L('Cấp', 'Level')} ${Math.min(aiQuiz.result.final, aiSurvey.result.final)}</b> ${L('(lấy cấp thấp hơn giữa trắc nghiệm và tự đánh giá).', '(the lower of the quiz and the self-check).')}</p>` : '';

  app.innerHTML = `
<div class="wrap hr-stack">
  <section class="card hr-result-top">
    <div class="meme">${meme.art}</div>
    <div class="copy">
      <span class="hr-kicker">${L('Đã làm', 'Completed')} ${items.length}/${batch.total}</span>
      <div class="hr-level">${L('Mức chung', 'Overall')}: ${esc(LEVEL_NAMES[avg])}</div>
      <div class="hr-bubble" style="text-align:left;max-width:none">${esc(meme.line)}</div>
      ${aiNote}
    </div>
  </section>
  <section class="hr-two">
    <div class="card hr-box">
      <h2>${L('Biểu đồ nhện tổng', 'Overall spider chart')}</h2>
      ${chart || `<p class="hr-empty">${L('Làm từ 3 bài trở lên mới vẽ được biểu đồ tổng.', 'Finish 3 or more tests to draw the overall chart.')}</p>`}
    </div>
    <div class="card hr-box">
      <h2>${L('Từng bài', 'Per test')}</h2>
      <div class="table-scroll"><table class="hr-table">
        <thead><tr><th>${L('Năng lực', 'Skill')}</th><th>${L('Loại', 'Type')}</th><th>${L('Cấp', 'Level')}</th><th></th></tr></thead>
        <tbody>${items.map((d, k) => `<tr><td><b>${esc(d.test.code)}</b> ${esc(nm(d.test))}</td><td>${KIND(d.type)}</td><td class="num">${d.result.final}</td><td><button class="hr-btn" style="min-height:40px;white-space:nowrap" type="button" data-detail="${k}">${L('Chi tiết', 'Details')}</button></td></tr>`).join('')}</tbody>
      </table></div>
    </div>
  </section>
  <div class="hr-nav" style="justify-content:flex-start">
    <button class="hr-btn" type="button" data-home>${L('Về danh sách bài', 'Back to the list')}</button>
    <a class="hr-btn" href="/#chat">${L('Kể cho admin nghe', 'Tell the admin')}</a>
  </div>
</div>`;
  app.querySelectorAll('[data-detail]').forEach((b) => b.addEventListener('click', () => {
    const d = items[Number(b.dataset.detail)];
    renderResult(d.test, d.type, d.result, d.answers, d.minutes, batch);
    scrollTop();
  }));
  app.querySelector('[data-home]').addEventListener('click', () => { renderHome('gate'); scrollTop(); });
}

function renderResult(test, type, r, answers, minutes, batch = null) {
  const meme = MEMES[r.final];
  const isQuiz = type === 'quiz';
  const statusText = { pass: L('Đạt', 'Pass'), fail: L('Chưa đạt', 'Not yet'), excluded: L('Chưa xét', 'Not rated') };
  const levelCls = { pass: 'pass', fail: 'fail', unknown: 'skip' };

  const chart = radar(r.behaviors.map((b) => ({
    label: b.code,
    sub: `C${b.level} · ${b.correct}/${isQuiz ? b.total : b.valid || 0}`,
    value: b.ratio,
    pass: b.need && (b.valid || b.total) ? b.need / (b.valid || b.total) : 0.66,
  })), { ringLabels: ['25%', '50%', '75%', '100%'], title: `${L('Biểu đồ nhện 8 hành vi của', '8-behavior spider chart for')} ${nm(test)}` });

  const rows = r.behaviors.map((b) => `
    <tr class="${r.focus.includes(b) ? 'hr-focus' : ''}">
      <td>C${b.level}</td>
      <td><b>${esc(b.code)}</b><br>${esc(b.text)}</td>
      <td class="num">${b.correct}/${isQuiz ? b.total : (b.valid ?? 0)}${b.need ? ` (${L('cần', 'need')} ${b.need})` : ''}</td>
      <td><span class="chip ${b.status}">${statusText[b.status]}</span></td>
    </tr>`).join('');

  const focusText = r.focus.length
    ? `<p>${L('Chuỗi cấp dừng ở', 'Your chain stops at')} <b>${L('Cấp', 'Level')} ${r.final + 1}</b>. ${L('Muốn lên cấp, tập trung vào', 'To level up, focus on')}: ${r.focus.map((b) => `<b>${esc(b.code)}</b> (${esc(b.text)})`).join('; ')}.</p>`
    : `<p>${L('Bạn đã qua đủ 4 cấp. Giờ là lúc chia sẻ lại cho người khác, kiểu như… cho admin xin miếng bánh chẳng hạn.', 'You passed all 4 levels. Time to pass it on… or maybe buy the admin a snack.')}</p>`;

  const review = isQuiz ? `
  <section class="card hr-box hr-review">
    <h2>${L('Xem lại từng câu', 'Review each question')}</h2>
    <p>${L('Bấm vào câu để xem đáp án đúng. Câu sai cũng là bài học miễn phí.', 'Tap a question to see the right answer. Wrong answers are free lessons.')}</p>
    ${test.questions.map((q, k) => {
      const mine = answers[q.id];
      const ok = mine === q.answer;
      const mineText = mine ? (q.options[mine] || QUIZ_EXTRA.find(([x]) => x === mine)?.[1]) : L('Bỏ trống', 'Left blank');
      return `<details><summary><span class="${ok ? 'ok' : 'no'}">${ok ? '✓' : '✗'}</span> ${L('Câu', 'Q')}${k + 1}: ${esc(q.q)}</summary>
        <p>${L('Bạn chọn', 'Your answer')}: ${mine ? `<b>${mine}</b> · ` : ''}${esc(mineText)}<br>${L('Đáp án đúng', 'Correct answer')}: <b>${q.answer}</b> · ${esc(q.options[q.answer])}<br>${L('Hành vi', 'Behavior')}: ${esc(q.behavior)} · ${esc(q.topic || '')}</p></details>`;
    }).join('')}
  </section>` : `
  <section class="card hr-box">
    <h2>${L('Đọc kết quả tự đánh giá sao cho đúng?', 'How to read a self-check')}</h2>
    <p>${L('Đây là góc nhìn của riêng bạn. Bản chính thức cần thêm ý kiến cấp trên, đồng nghiệp và cấp dưới (trọng số 50% · 30% · 20%). Nếu bạn tự chấm cao hơn người khác nhìn từ 2 cấp trở lên, nên ngồi nói chuyện 1-1 để hiểu nhau hơn.', 'This is your own view. An official 360 adds your manager, peers and reports (weighted 50% · 30% · 20%). If you rate yourself 2+ levels above how others see you, a 1-on-1 chat helps.')}</p>
    <p>${L('Câu chọn "Chưa có cơ hội" không bị tính là sai, nhưng nếu cả cấp đều chưa có cơ hội thì cấp đó chưa xét được, chuỗi cấp sẽ dừng ở đó.', '"No chance yet" is not counted as wrong, but if a whole level has no chance yet it cannot be rated and the chain stops there.')}</p>
  </section>`;

  app.innerHTML = `
<div class="wrap hr-stack">
  <section class="card hr-result-top">
    <div class="meme">${meme.art}</div>
    <div class="copy">
      <span class="hr-kicker">${esc(test.code)} · ${esc(nm(test))} · ${KIND(type)}</span>
      <div class="hr-level">${esc(LEVEL_NAMES[r.final])}</div>
      <div class="hr-bubble" style="text-align:left;max-width:none">${esc(meme.line)}</div>
      <p class="muted" style="font-size:16px;line-height:1.6">${esc(meme.note)} ${isQuiz ? L(`Bạn đúng ${r.correct}/${r.total} câu`, `You got ${r.correct}/${r.total} right`) : L(`Bạn chọn "Nhất quán" ${r.correct}/${r.total} câu`, `You chose "Consistent" on ${r.correct}/${r.total}`)}, ${L(`mất khoảng ${minutes} phút`, `in about ${minutes} min`)}.</p>
      <div class="hr-ladder">${r.levels.map((l) => `<span class="${levelCls[l.status]}">${L('Cấp', 'Level')} ${l.level}: ${l.status === 'pass' ? L('qua', 'passed') : l.status === 'fail' ? L('hụt', 'missed') : L('chưa xét', 'not rated')}</span>`).join('')}</div>
    </div>
  </section>

  <section class="hr-two">
    <div class="card hr-box">
      <h2>${L('Biểu đồ nhện 8 hành vi', '8-behavior spider chart')}</h2>
      ${chart}
      <p>${L('Mỗi cánh là một hành vi. Chấm xanh là đạt, chấm hồng là chưa đạt. Càng xa tâm càng làm tốt.', 'Each spoke is a behavior. Green dots passed, pink dots not yet. Further out means better.')}</p>
    </div>
    <div class="card hr-box">
      <h2>${L('Nên tập trung', 'Focus on')}</h2>
      ${focusText}
      <div class="table-scroll">
        <table class="hr-table">
          <thead><tr><th>${L('Cấp', 'Level')}</th><th>${L('Hành vi', 'Behavior')}</th><th>${isQuiz ? L('Đúng', 'Correct') : L('Nhất quán', 'Consistent')}</th><th>${L('Kết quả', 'Result')}</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  </section>

  ${review}

  <div class="hr-nav" style="justify-content:flex-start">
    ${batch ? `<button class="hr-btn primary" type="button" data-back-batch>← ${L('Về kết quả tổng', 'Back to overall results')}</button>` : ''}
    <button class="hr-btn${batch ? '' : ' primary'}" type="button" data-again>${L('Làm lại bài này', 'Retake this test')}</button>
    <button class="hr-btn" type="button" data-home>${L('Về danh sách bài', 'Back to the list')}</button>
    <a class="hr-btn" href="/#chat">${L('Kể cho admin nghe', 'Tell the admin')}</a>
  </div>
</div>`;

  app.querySelector('[data-again]').addEventListener('click', () => startTest(type, test.code));
  const back = app.querySelector('[data-back-batch]');
  if (back) back.addEventListener('click', () => { renderBatch(batch); scrollTop(); });
  app.querySelector('[data-home]').addEventListener('click', () => { renderHome(batch ? 'gate' : 'list'); scrollTop(); });
}

// ---------- khởi động ----------
document.querySelectorAll('[data-set]').forEach((a) => {
  if (a.dataset.set === set.id) a.setAttribute('aria-current', 'page');
});
document.title = `${L('Thử sức năng lực HR', 'HR skills check')} · ${set.name}`;
const slot = document.getElementById('prefs-slot');
if (slot) { slot.innerHTML = togglesHtml(); bindToggles(slot); }
document.querySelectorAll('[data-i18n-vi]').forEach((el) => { el.textContent = L(el.dataset.i18nVi, el.dataset.i18nEn); });

fetch(set.data)
  .then((r) => r.json())
  .then((json) => { data = json; renderHome(); })
  .catch(() => { app.innerHTML = `<div class="wrap"><p class="hr-empty">${L('Không tải được bộ đề. Bạn tải lại trang thử nha.', 'Could not load the tests. Please reload the page.')}</p></div>`; });
