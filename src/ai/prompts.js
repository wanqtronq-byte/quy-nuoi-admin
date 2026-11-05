// ============================================================
// KHO PROMPT — mỗi mục: nhóm, tên, khi nào dùng, nội dung prompt.
// Chỗ cần tự điền viết trong ngoặc vuông [như thế này], trang sẽ tô màu.
// Thêm prompt: thêm một mục vào mảng PROMPTS.
// ============================================================

import { localize } from '../lib/i18n.js';

export const GROUPS = localize([
  { id: 'hr', name: { vi: 'HR', en: 'HR' } },
  { id: 'work', name: { vi: 'Công việc hằng ngày', en: 'Everyday work' } },
  { id: 'code', name: { vi: 'Vibe code', en: 'Vibe coding' } },
  { id: 'learn', name: { vi: 'Học tập', en: 'Learning' } },
]);

const P = (group, title, when, text) => ({ group, title, when, text });
const L = (vi, en) => ({ vi, en });

export const PROMPTS = localize([
  // ---------------- HR ----------------
  P('hr', L('Viết JD chuẩn, dễ đọc', 'Write a clear job description'),
    L('Khi cần đăng tuyển nhanh mà vẫn đủ ý.', 'When you need a solid job post fast.'),
`Bạn là chuyên viên tuyển dụng nhiều kinh nghiệm tại Việt Nam.
Viết bản mô tả công việc (JD) cho vị trí [tên vị trí] tại [loại công ty, quy mô, ngành].

Thông tin:
- Cấp bậc: [nhân viên / trưởng nhóm / quản lý]
- Nơi làm việc, hình thức: [địa điểm, onsite/hybrid/remote]
- Việc chính hằng ngày: [liệt kê 3–5 việc]
- Yêu cầu bắt buộc: [kỹ năng, số năm kinh nghiệm]
- Điểm cộng: [nếu có]
- Quyền lợi: [lương, thưởng, phúc lợi nổi bật]

Yêu cầu:
- Giọng thân thiện, rõ ràng, không sáo rỗng (tránh "năng động", "chịu được áp lực").
- Cấu trúc: Giới thiệu 2 câu → Bạn sẽ làm gì → Bạn cần có gì → Điểm cộng → Bạn nhận được gì → Cách ứng tuyển.
- Mỗi gạch đầu dòng bắt đầu bằng động từ, tối đa 15 chữ.
- Không dùng từ ngữ phân biệt giới tính, tuổi tác, vùng miền.
Sau đó gợi ý 3 tiêu đề tin tuyển dụng hấp dẫn.`),

  P('hr', L('Bộ câu hỏi phỏng vấn theo năng lực', 'Competency-based interview questions'),
    L('Trước buổi phỏng vấn, để hỏi đúng thứ cần đánh giá.', 'Before an interview, to ask what really matters.'),
`Mình chuẩn bị phỏng vấn vị trí [tên vị trí]. 3 năng lực quan trọng nhất là: [năng lực 1], [năng lực 2], [năng lực 3].

Với mỗi năng lực, hãy đưa:
1. 2 câu hỏi hành vi (dạng "Kể về một lần bạn…") để ứng viên trả lời theo STAR.
2. 1 câu hỏi tình huống gắn với công việc thật của vị trí.
3. Dấu hiệu câu trả lời tốt và dấu hiệu đáng lo (mỗi loại 2–3 ý).
4. 1 câu hỏi đào sâu nếu ứng viên trả lời chung chung.

Trình bày dạng bảng: Năng lực | Câu hỏi | Dấu hiệu tốt | Dấu hiệu đáng lo.
Tránh câu hỏi về đời tư, hôn nhân, tôn giáo, sức khoẻ.`),

  P('hr', L('Chấm CV theo tiêu chí', 'Screen a CV against criteria'),
    L('Khi có nhiều CV và cần sàng lọc nhất quán. Nhớ ẩn tên, số điện thoại trước khi dán.', 'When screening many CVs consistently. Remove names and phone numbers first.'),
`Bạn là người sàng lọc CV công bằng và chặt chẽ.
Tiêu chí cho vị trí [tên vị trí]:
- Bắt buộc: [tiêu chí 1], [tiêu chí 2], [tiêu chí 3]
- Điểm cộng: [tiêu chí 4], [tiêu chí 5]

Dưới đây là CV đã ẩn thông tin cá nhân:
"""
[dán nội dung CV]
"""

Hãy:
1. Chấm từng tiêu chí: Đạt / Một phần / Chưa thấy, kèm dẫn chứng trích từ CV.
2. Tổng kết: Nên mời phỏng vấn / Cân nhắc / Không phù hợp, và lý do trong 2 câu.
3. Đề xuất 3 câu hỏi để làm rõ điểm còn mơ hồ.
Chỉ dựa vào nội dung CV, không suy đoán về tuổi, giới tính, ngoại hình hay hoàn cảnh.`),

  P('hr', L('Email từ chối ứng viên tử tế', 'A kind rejection email'),
    L('Khi cần báo kết quả chưa phù hợp mà vẫn giữ thiện cảm.', 'When you need to say no and keep goodwill.'),
`Viết email thông báo kết quả phỏng vấn chưa phù hợp cho ứng viên [tên ứng viên], vị trí [tên vị trí], đã phỏng vấn vòng [số vòng].

Yêu cầu:
- Cảm ơn cụ thể về thời gian và một điểm tích cực của họ: [điểm tích cực].
- Báo kết quả rõ ràng ngay đoạn đầu, không vòng vo.
- Không nêu lý do gây tổn thương; nếu có, chỉ nêu ngắn gọn ở mức phù hợp.
- Mời giữ liên lạc cho cơ hội sau (nếu đúng): [có/không].
- Dưới 120 chữ, giọng ấm áp, chuyên nghiệp.
Đưa 2 phiên bản: trang trọng và thân thiện.`),

  P('hr', L('Kế hoạch onboarding 30-60-90 ngày', '30-60-90 day onboarding plan'),
    L('Khi có nhân viên mới sắp vào.', 'When a new hire is about to start.'),
`Lập kế hoạch onboarding 30-60-90 ngày cho [vị trí] mới vào [phòng ban], quản lý trực tiếp là [chức danh quản lý].

Bối cảnh:
- Mục tiêu chính của vị trí trong năm đầu: [mục tiêu]
- Công cụ, hệ thống cần học: [liệt kê]
- Người cần gặp sớm: [phòng ban, vai trò]

Trình bày theo 3 giai đoạn (0–30, 31–60, 61–90 ngày). Mỗi giai đoạn gồm:
- Mục tiêu học hỏi
- Việc cụ thể cần làm
- Kết quả đo được để biết đã đạt
- Buổi gặp 1-1 cần có và nội dung trao đổi
Thêm checklist ngày đầu tiên (chuẩn bị trước khi nhân viên tới).`),

  P('hr', L('Góp ý khó cho nhân viên', 'Prepare a tough feedback talk'),
    L('Trước buổi 1-1 cần góp ý về hiệu suất hoặc thái độ.', 'Before a 1-on-1 with difficult feedback.'),
`Mình cần góp ý với một nhân viên về vấn đề: [mô tả hành vi cụ thể, không phán xét].
Ví dụ gần đây: [1–2 tình huống cụ thể, ngày/tuần].
Ảnh hưởng: [tác động tới nhóm, khách hàng, kết quả].
Mình mong muốn thay đổi: [hành vi mong đợi].

Hãy giúp mình:
1. Kịch bản mở đầu 3–4 câu, theo khung: Hành vi – Tác động – Hỏi góc nhìn của họ.
2. 5 câu hỏi mở để lắng nghe trước khi đưa giải pháp.
3. Cách phản hồi nếu nhân viên phản ứng: phủ nhận / buồn / đổ lỗi.
4. Cách chốt: thống nhất 1–2 hành động, thời hạn, lần gặp lại.
Giọng tôn trọng, thẳng thắn, không đe doạ.`),

  P('hr', L('Biến số liệu nghỉ việc thành nhận định', 'Turn turnover data into insights'),
    L('Khi có bảng số liệu nhân sự cần báo cáo lên trên. Dùng số liệu đã ẩn danh.', 'When reporting HR numbers upward. Use anonymised data.'),
`Dưới đây là số liệu nghỉ việc [khoảng thời gian] của công ty, đã ẩn danh:
"""
[dán bảng: phòng ban, số nhân viên đầu kỳ, số nghỉ việc, thâm niên, lý do nghỉ]
"""

Hãy:
1. Tính tỷ lệ nghỉ việc theo phòng ban và chung toàn công ty (ghi rõ công thức).
2. Chỉ ra 3 điểm đáng chú ý nhất, mỗi điểm 1–2 câu, kèm con số.
3. Nêu 2 giả thuyết cho từng điểm và dữ liệu cần thêm để kiểm chứng.
4. Đề xuất 3 hành động ưu tiên, có người phụ trách và thời hạn gợi ý.
Không kết luận chắc chắn khi dữ liệu chưa đủ; ghi rõ chỗ nào là giả thuyết.`),

  // ---------------- Công việc hằng ngày ----------------
  P('work', L('Tóm tắt cuộc họp thành việc cần làm', 'Meeting notes to action items'),
    L('Sau họp, có ghi chú lộn xộn hoặc bản ghi âm đã chuyển chữ.', 'After a meeting with messy notes or a transcript.'),
`Dưới đây là ghi chú cuộc họp [chủ đề] ngày [ngày]:
"""
[dán ghi chú]
"""

Hãy trình bày:
1. Tóm tắt 3 câu: họp để làm gì, kết luận chính.
2. Quyết định đã chốt (gạch đầu dòng).
3. Bảng việc cần làm: Việc | Người phụ trách | Hạn chót. Chỗ nào ghi chú không nói rõ thì ghi "Chưa rõ", đừng tự đoán.
4. Câu hỏi còn bỏ ngỏ.
Viết ngắn gọn để gửi email cho cả nhóm.`),

  P('work', L('Viết lại email cho rõ và lịch sự', 'Rewrite an email to be clear and polite'),
    L('Khi email nháp dài, lủng củng hoặc dễ gây hiểu lầm.', 'When a draft is long, clumsy or easy to misread.'),
`Viết lại email dưới đây cho rõ ràng, lịch sự, dưới [số] chữ. Người nhận là [vai trò: sếp / đồng nghiệp / khách hàng / ứng viên].
Mục tiêu email: [người nhận cần làm gì sau khi đọc].
Giữ nguyên mọi thông tin, con số và mốc thời gian. Không thêm thông tin mới.
"""
[dán email nháp]
"""
Đưa 2 phiên bản: ngắn gọn và đầy đủ hơn. Gợi ý tiêu đề email cho mỗi bản.`),

  P('work', L('Hỏi ngược để hiểu yêu cầu', 'Let AI interview you first'),
    L('Khi chưa biết diễn đạt yêu cầu sao cho đủ.', 'When you are not sure how to brief the AI.'),
`Mình cần bạn giúp [mục tiêu, ví dụ: lập kế hoạch đào tạo quý tới cho phòng kinh doanh].
Trước khi làm, hãy hỏi mình tối đa 6 câu, mỗi lần 1 câu, để hiểu đủ bối cảnh, đối tượng, giới hạn và tiêu chí thành công.
Khi đã đủ thông tin, tóm tắt lại yêu cầu trong 5 gạch đầu dòng để mình xác nhận, rồi mới làm.`),

  P('work', L('Kiểm tra lại câu trả lời của AI', 'Make the AI check its own answer'),
    L('Sau khi AI vừa trả lời một việc quan trọng.', 'Right after the AI answers something important.'),
`Rà lại câu trả lời bạn vừa đưa:
1. Liệt kê các ý là sự kiện, con số hoặc trích dẫn có thể kiểm chứng.
2. Với mỗi ý, đánh giá độ chắc chắn: Chắc / Khá chắc / Không chắc, và vì sao.
3. Chỉ ra chỗ có thể sai, thiếu hoặc đang giả định.
4. Gợi ý mình nên kiểm tra lại ở đâu (loại nguồn, không bịa đường link).
Sau đó viết lại bản đã sửa, đánh dấu những chỗ thay đổi.`),

  // ---------------- Vibe code ----------------
  P('code', L('Khởi đầu một tool nhỏ', 'Start a small tool'),
    L('Lần đầu nhờ AI làm một trang web/tool đơn giản.', 'Your first ask for a simple web tool.'),
`Làm cho mình một trang web chỉ gồm MỘT file HTML (CSS và JavaScript để chung trong file) để [mục đích của tool].

Người dùng: [ai dùng, trên máy tính hay điện thoại]
Đầu vào: [người dùng nhập gì]
Đầu ra: [bấm nút thì hiện gì]
Yêu cầu:
- Giao diện gọn, chữ dễ đọc, dùng tốt trên điện thoại.
- Không dùng thư viện ngoài, không cần máy chủ.
- Có kiểm tra dữ liệu nhập sai và báo lỗi dễ hiểu.
Sau khi đưa code, giải thích ngắn cách mở file và cách thử.`),

  P('code', L('Thêm một tính năng mà không phá phần cũ', 'Add a feature without breaking things'),
    L('Khi tool đã chạy và muốn thêm từng chút một.', 'When the tool works and you want to add one thing.'),
`Đây là code hiện tại đang chạy ổn:
"""
[dán code]
"""

Mình muốn thêm đúng một tính năng: [mô tả tính năng, ví dụ: nút Xuất ra Excel].
Yêu cầu:
- Chỉ sửa phần liên quan, giữ nguyên mọi thứ khác.
- Trước khi sửa, nói ngắn bạn sẽ sửa những đoạn nào.
- Đưa lại toàn bộ file đã sửa (không bỏ lửng "phần còn lại giữ nguyên").
- Liệt kê cách thử để biết tính năng mới chạy đúng.`),

  P('code', L('Sửa lỗi có bài bản', 'Debug step by step'),
    L('Khi tool báo lỗi hoặc chạy sai mà chưa biết vì sao.', 'When something breaks and you do not know why.'),
`Tool của mình bị lỗi.
Mình làm: [các bước đã làm]
Mong đợi: [điều lẽ ra xảy ra]
Thực tế: [điều đã xảy ra]
Thông báo lỗi (nguyên văn):
"""
[dán lỗi, ví dụ từ Console của trình duyệt]
"""
Đoạn code liên quan:
"""
[dán code]
"""
Hãy: 1) nêu 2–3 nguyên nhân có thể, xếp theo khả năng; 2) cách kiểm tra từng nguyên nhân; 3) bản sửa cho nguyên nhân khả dĩ nhất. Đừng sửa những phần không liên quan.`),

  P('code', L('Công thức Excel/Google Sheets', 'Excel / Google Sheets formula'),
    L('Khi cần một công thức mà không nhớ hàm.', 'When you need a formula but forget the function.'),
`Mình dùng [Excel / Google Sheets], bảng có các cột:
[A: tên cột, B: tên cột, C: …], dữ liệu từ dòng [số] đến dòng [số].
Mình muốn: [mô tả kết quả, ví dụ: tính số ngày phép còn lại của mỗi người, tô đỏ nếu dưới 2 ngày].
Hãy đưa: công thức (kèm ô đặt công thức), giải thích từng phần trong 1–2 câu, và cách làm định dạng có điều kiện nếu cần.`),

  // ---------------- Học tập ----------------
  P('learn', L('Học một chủ đề mới trong 30 phút', 'Learn a new topic in 30 minutes'),
    L('Khi cần nắm nhanh một khái niệm để đi họp hoặc đi làm.', 'When you need the gist of something fast.'),
`Mình là [nghề nghiệp, trình độ hiện tại] và cần hiểu [chủ đề] đủ để [mục đích, ví dụ: trao đổi với đội IT].
Hãy:
1. Giải thích bằng ngôn ngữ đời thường trong 5 câu, kèm 1 ví dụ gần với công việc của mình.
2. 5 thuật ngữ quan trọng nhất và nghĩa của từng cái.
3. 3 hiểu lầm phổ biến.
4. 5 câu hỏi trắc nghiệm ngắn để mình tự kiểm tra (đáp án để cuối).
5. Gợi ý bước học tiếp theo (loại tài liệu nên tìm, không bịa link).`),

  P('learn', L('Luyện phỏng vấn với AI', 'Practise an interview with AI'),
    L('Trước buổi phỏng vấn xin việc.', 'Before a job interview.'),
`Đóng vai nhà tuyển dụng cho vị trí [vị trí] tại [loại công ty].
Hỏi mình lần lượt 6 câu, mỗi lần 1 câu, trộn câu hỏi hành vi và tình huống. Đợi mình trả lời rồi mới hỏi tiếp.
Sau mỗi câu trả lời, nhận xét ngắn: điểm tốt, điểm cần thêm (theo STAR), và gợi ý một câu trả lời mạnh hơn.
Kết thúc bằng đánh giá chung và 3 điều mình nên luyện thêm.`),
]);
