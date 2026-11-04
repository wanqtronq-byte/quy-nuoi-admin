// Trang "Thử sức năng lực HR": danh sách đề → làm bài → kết quả có biểu đồ nhện.
// Dữ liệu đề nằm trong src/hr/data/*.json, chấm điểm trong scoring.js.

import { SETS, AUDIENCE, HOW_IT_WORKS } from './sets.js';
import { scoreQuiz, scoreSurvey, LEVEL_NAMES } from './scoring.js';
import { radar } from './radar.js';
import { MEMES, START_MEME } from './memes.js';
import { esc } from '../lib/dom.js';

const params = new URLSearchParams(location.search);
const set = SETS[params.get('bo')] || SETS['rut-gon'];
const app = document.getElementById('hr-app');
const STORE = `hr-results-${set.id}`;

let data = null;
let run = null;      // bài đang làm
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
function renderHome() {
  stopTimer();
  run = null;
  const results = loadResults();

  const testCard = (t, type) => {
    const r = results[testKey(type, t.code)];
    const kind = type === 'quiz' ? 'Trắc nghiệm' : 'Tự đánh giá';
    return `
<article class="card hr-test">
  <span class="code">${esc(t.code)} · ${kind}</span>
  <h3>${esc(t.name)}</h3>
  <p>${esc(t.definition || '')}</p>
  <div class="hr-meta">
    <span>${t.questions.length} câu</span>
    <span>~${t.minutes} phút</span>
    ${r ? `<span class="done">Lần trước: ${esc(LEVEL_NAMES[r.final])}</span>` : ''}
  </div>
  <button class="btn btn-primary pop hr-go" type="button" data-start="${type}" data-code="${esc(t.code)}">${r ? 'Làm lại' : 'Bắt đầu'}</button>
</article>`;
  };

  const done = Object.entries(results);
  const overview = done.length >= 3
    ? `<div class="radar-wrap">${radar(done.map(([k, v]) => ({
        label: k.split(':')[1] + (k.startsWith('survey') ? ' (TĐG)' : ''),
        sub: `Cấp ${v.final}`,
        value: v.final / 4,
        pass: 0.5,
      })), { ringLabels: ['C1', 'C2', 'C3', 'C4'], title: 'Tổng quan cấp năng lực các bài đã làm' })}</div>`
    : '';

  const totalQuiz = data.quizzes.reduce((s, t) => s + t.questions.length, 0);
  const quizMin = data.quizzes.map((t) => t.minutes);
  const surveyMin = data.surveys.map((t) => t.minutes);

  app.innerHTML = `
<div class="wrap hr-stack">
  <section class="hr-intro">
    <div class="hr-intro-text">
      <span class="hr-kicker">${esc(set.name)} · ${esc(set.tag)}</span>
      <h1 class="display">Thử sức năng lực HR</h1>
      <p>${esc(set.blurb)} Làm xong là có ngay biểu đồ nhện, biết mình mạnh chỗ nào, hụt chỗ nào, nên học gì tiếp. Kết quả chỉ lưu trên máy bạn, không ai xem được.</p>
    </div>
    <div class="hr-meme">${START_MEME.art}<div class="hr-bubble">${esc(START_MEME.line)}</div></div>
  </section>

  <section class="hr-facts">
    <div class="card hr-fact"><b>${data.quizzes.length} đề</b><span>trắc nghiệm kiến thức, mỗi đề ${[...new Set(data.quizzes.map((t) => t.questions.length))].join('–')} câu</span></div>
    <div class="card hr-fact"><b>${Math.min(...quizMin)}–${Math.max(...quizMin)} phút</b><span>cho mỗi đề trắc nghiệm, cả ${data.quizzes.length} đề khoảng ${Math.round(quizMin.reduce((a, b) => a + b, 0) / 6) / 10} tiếng</span></div>
    <div class="card hr-fact"><b>${data.surveys.length} bộ</b><span>tự đánh giá hành vi, mỗi bộ chỉ ${Math.max(...surveyMin)} phút</span></div>
    <div class="card hr-fact"><b>${esc(set.perHint)}</b><span>8 hành vi, 4 cấp độ cho mỗi năng lực</span></div>
  </section>

  <section class="hr-two">
    <div class="card hr-box">
      <h2>Ai nên làm?</h2>
      <ul>${AUDIENCE.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
      <p>Không cần làm hết một lần. Chọn năng lực bạn tò mò nhất, làm xong cái nào biết cái đó.</p>
    </div>
    <div class="card hr-box">
      <h2>Làm sao cho chuẩn?</h2>
      ${HOW_IT_WORKS.map((h) => `<div><h3>${esc(h.title)}</h3><p>${esc(h.text)}</p></div>`).join('')}
    </div>
  </section>

  <section class="hr-stack" style="gap:18px">
    <div class="hr-section-title"><h2>Trắc nghiệm kiến thức</h2><span>${totalQuiz} câu tất cả · có xem lại đáp án sau khi nộp</span></div>
    <div class="hr-tests">${data.quizzes.map((t) => testCard(t, 'quiz')).join('')}</div>
  </section>

  <section class="hr-stack" style="gap:18px">
    <div class="hr-section-title"><h2>Tự đánh giá hành vi</h2><span>Trả lời theo việc bạn thật sự làm, không phải việc bạn biết</span></div>
    <div class="hr-tests">${data.surveys.map((t) => testCard(t, 'survey')).join('')}</div>
  </section>

  <section class="card hr-overview">
    ${overview}
    <div class="copy">
      <h2 class="h2" style="font-size:30px">Biểu đồ nhện tổng</h2>
      ${done.length >= 3
        ? '<p class="hr-empty">Mỗi cánh là một bài bạn đã làm, càng xa tâm càng cao cấp. TĐG là tự đánh giá. Với Ứng dụng AI, kết quả cuối nên lấy cấp thấp hơn giữa trắc nghiệm và tự đánh giá: biết mà không làm, hoặc làm mà không hiểu rủi ro, đều chưa đủ.</p>'
        : `<p class="hr-empty">Làm từ 3 bài trở lên là biểu đồ tổng hiện ra ở đây. Hiện bạn đã làm ${done.length} bài.</p>`}
      ${done.length ? '<button class="hr-btn" type="button" data-clear>Xoá kết quả đã lưu</button>' : ''}
    </div>
  </section>
</div>`;

  app.querySelectorAll('[data-start]').forEach((b) => b.addEventListener('click', () => startTest(b.dataset.start, b.dataset.code)));
  const clear = app.querySelector('[data-clear]');
  if (clear) clear.addEventListener('click', () => {
    if (clear.dataset.sure) {
      try { localStorage.removeItem(STORE); } catch { /* bỏ qua */ }
      renderHome();
    } else {
      clear.dataset.sure = '1';
      clear.textContent = 'Bấm lần nữa để xoá thật';
    }
  });
}

// ---------- làm bài ----------
function startTest(type, code) {
  const test = findTest(type, code);
  run = { type, test, i: 0, answers: {}, started: Date.now() };
  stopTimer();
  timerId = setInterval(() => {
    const el = document.getElementById('hr-timer');
    if (el) el.textContent = `${fmtTime(Math.floor((Date.now() - run.started) / 1000))} / gợi ý ${run.test.minutes} phút`;
  }, 1000);
  renderQuestion();
  scrollTop();
}

const QUIZ_EXTRA = [['E', 'Không có đáp án nào đúng'], ['F', 'Tôi không biết']];
const SURVEY_OPTS = [['yes', 'Nhất quán', 'Mình làm việc này thường xuyên, chủ động.'], ['no', 'Chưa nhất quán', 'Có làm nhưng chưa đều, đôi khi còn phải nhắc.'], ['na', 'Chưa có cơ hội', 'Chưa gặp tình huống để làm.']];

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
      <h1>${esc(test.name)} <small style="font-size:16px;color:var(--muted)">· ${isQuiz ? 'Trắc nghiệm' : 'Tự đánh giá'}</small></h1>
      <span class="hr-timer" id="hr-timer">${fmtTime(Math.floor((Date.now() - run.started) / 1000))} / gợi ý ${test.minutes} phút</span>
    </div>
    <div class="hr-progress" aria-label="Đã trả lời ${answered}/${n} câu"><i style="width:${(answered / n) * 100}%"></i></div>
    <article class="card hr-q">
      <span class="label">Câu ${i + 1}/${n} · Cấp ${q.level}${isQuiz && q.topic ? ` · ${esc(q.topic)}` : ''}</span>
      <h2>${isQuiz ? '' : 'Trong 3–6 tháng gần đây, mình… '}${esc(q.q)}</h2>
      <div class="hr-opts">${opts}</div>
    </article>
    <div class="hr-nav">
      <button class="hr-btn" type="button" data-prev ${i === 0 ? 'disabled' : ''}>← Câu trước</button>
      ${last
        ? '<button class="hr-btn primary" type="button" data-submit>Nộp bài, xem kết quả</button>'
        : '<button class="hr-btn primary" type="button" data-next>Câu tiếp →</button>'}
    </div>
    ${showWarn && missing ? `<div class="hr-warn"><span>Còn ${missing} câu chưa trả lời, câu trống sẽ tính ${isQuiz ? 'là sai' : 'là "Chưa có cơ hội"'}.</span><button class="hr-btn" type="button" data-force>Nộp luôn</button></div>` : ''}
    <div class="hr-dots" aria-label="Chuyển nhanh tới câu">
      ${test.questions.map((qq, k) => `<button type="button" data-go="${k}" class="${answers[qq.id] ? 'on' : ''} ${k === i ? 'cur' : ''}" aria-label="Câu ${k + 1}">${k + 1}</button>`).join('')}
    </div>
    <button class="hr-btn" type="button" data-quit style="align-self:flex-start">Thoát, về danh sách</button>
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
  on('[data-quit]', () => { renderHome(); scrollTop(); });
  app.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => { run.i = Number(b.dataset.go); renderQuestion(); }));
}

// ---------- kết quả ----------
function finish() {
  stopTimer();
  const { type, test, answers, started } = run;
  const result = type === 'quiz' ? scoreQuiz(test, answers) : scoreSurvey(test, answers);
  const minutes = Math.max(1, Math.round((Date.now() - started) / 60000));
  saveResult(testKey(type, test.code), { final: result.final, at: Date.now() });
  renderResult(test, type, result, answers, minutes);
  scrollTop();
}

function renderResult(test, type, r, answers, minutes) {
  const meme = MEMES[r.final];
  const isQuiz = type === 'quiz';
  const statusText = { pass: 'Đạt', fail: 'Chưa đạt', excluded: 'Chưa xét' };
  const levelCls = { pass: 'pass', fail: 'fail', unknown: 'skip' };

  const chart = radar(r.behaviors.map((b) => ({
    label: b.code,
    sub: `C${b.level} · ${b.correct}/${isQuiz ? b.total : b.valid || 0}`,
    value: b.ratio,
    pass: b.need && (b.valid || b.total) ? b.need / (b.valid || b.total) : 0.66,
  })), { ringLabels: ['25%', '50%', '75%', '100%'], title: `Biểu đồ nhện 8 hành vi của ${test.name}` });

  const rows = r.behaviors.map((b) => `
    <tr class="${r.focus.includes(b) ? 'hr-focus' : ''}">
      <td>C${b.level}</td>
      <td><b>${esc(b.code)}</b><br>${esc(b.text)}</td>
      <td class="num">${b.correct}/${isQuiz ? b.total : (b.valid ?? 0)}${b.need ? ` (cần ${b.need})` : ''}</td>
      <td><span class="chip ${b.status}">${statusText[b.status]}</span></td>
    </tr>`).join('');

  const focusText = r.focus.length
    ? `<p>Chuỗi cấp dừng ở <b>Cấp ${r.final + 1}</b>. Muốn lên cấp, tập trung vào: ${r.focus.map((b) => `<b>${esc(b.code)}</b> (${esc(b.text)})`).join('; ')}.</p>`
    : '<p>Bạn đã qua đủ 4 cấp. Giờ là lúc chia sẻ lại cho người khác, kiểu như… cho admin xin miếng bánh chẳng hạn.</p>';

  const review = isQuiz ? `
  <section class="card hr-box hr-review">
    <h2>Xem lại từng câu</h2>
    <p>Bấm vào câu để xem đáp án đúng. Câu sai cũng là bài học miễn phí.</p>
    ${test.questions.map((q, k) => {
      const mine = answers[q.id];
      const ok = mine === q.answer;
      const mineText = mine ? (q.options[mine] || QUIZ_EXTRA.find(([x]) => x === mine)?.[1]) : 'Bỏ trống';
      return `<details><summary><span class="${ok ? 'ok' : 'no'}">${ok ? '✓' : '✗'}</span> Câu ${k + 1}: ${esc(q.q)}</summary>
        <p>Bạn chọn: ${mine ? `<b>${mine}</b> · ` : ''}${esc(mineText)}<br>Đáp án đúng: <b>${q.answer}</b> · ${esc(q.options[q.answer])}<br>Hành vi: ${esc(q.behavior)} · ${esc(q.topic || '')}</p></details>`;
    }).join('')}
  </section>` : `
  <section class="card hr-box">
    <h2>Đọc kết quả tự đánh giá sao cho đúng?</h2>
    <p>Đây là góc nhìn của riêng bạn. Bản chính thức cần thêm ý kiến cấp trên, đồng nghiệp và cấp dưới (trọng số 50% · 30% · 20%). Nếu bạn tự chấm cao hơn người khác nhìn từ 2 cấp trở lên, nên ngồi nói chuyện 1-1 để hiểu nhau hơn.</p>
    <p>Câu chọn "Chưa có cơ hội" không bị tính là sai, nhưng nếu cả cấp đều chưa có cơ hội thì cấp đó chưa xét được, chuỗi cấp sẽ dừng ở đó.</p>
  </section>`;

  app.innerHTML = `
<div class="wrap hr-stack">
  <section class="card hr-result-top">
    <div class="meme">${meme.art}</div>
    <div class="copy">
      <span class="hr-kicker">${esc(test.code)} · ${esc(test.name)} · ${isQuiz ? 'Trắc nghiệm' : 'Tự đánh giá'}</span>
      <div class="hr-level">${esc(LEVEL_NAMES[r.final])}</div>
      <div class="hr-bubble" style="text-align:left;max-width:none">${esc(meme.line)}</div>
      <p class="muted" style="font-size:16px;line-height:1.6">${esc(meme.note)} ${isQuiz ? `Bạn đúng ${r.correct}/${r.total} câu` : `Bạn chọn "Nhất quán" ${r.correct}/${r.total} câu`}, mất khoảng ${minutes} phút.</p>
      <div class="hr-ladder">${r.levels.map((l) => `<span class="${levelCls[l.status]}">Cấp ${l.level}: ${l.status === 'pass' ? 'qua' : l.status === 'fail' ? 'hụt' : 'chưa xét'}</span>`).join('')}</div>
    </div>
  </section>

  <section class="hr-two">
    <div class="card hr-box">
      <h2>Biểu đồ nhện 8 hành vi</h2>
      ${chart}
      <p>Mỗi cánh là một hành vi. Chấm xanh là đạt, chấm hồng là chưa đạt. Càng xa tâm càng làm tốt.</p>
    </div>
    <div class="card hr-box">
      <h2>Nên tập trung</h2>
      ${focusText}
      <div class="table-scroll">
        <table class="hr-table">
          <thead><tr><th>Cấp</th><th>Hành vi</th><th>${isQuiz ? 'Đúng' : 'Nhất quán'}</th><th>Kết quả</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  </section>

  ${review}

  <div class="hr-nav" style="justify-content:flex-start">
    <button class="hr-btn primary" type="button" data-again>Làm lại bài này</button>
    <button class="hr-btn" type="button" data-home>Về danh sách bài</button>
    <a class="hr-btn" href="/#chat" >Kể cho admin nghe</a>
  </div>
</div>`;

  app.querySelector('[data-again]').addEventListener('click', () => startTest(type, test.code));
  app.querySelector('[data-home]').addEventListener('click', () => { renderHome(); scrollTop(); });
}

// ---------- khởi động ----------
document.querySelectorAll('[data-set]').forEach((a) => {
  if (a.dataset.set === set.id) a.setAttribute('aria-current', 'page');
});
document.title = `Thử sức năng lực HR · ${set.name}`;

fetch(set.data)
  .then((r) => r.json())
  .then((json) => { data = json; renderHome(); })
  .catch(() => { app.innerHTML = '<div class="wrap"><p class="hr-empty">Không tải được bộ đề. Bạn tải lại trang thử nha.</p></div>'; });
