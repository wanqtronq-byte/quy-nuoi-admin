// ============================================================
// BỘ BÀI HỌC AI — lấy từ "Bộ bài học AI từ nguồn cộng đồng" (05/11/2026).
// Mỗi bài: tiêu đề, kết quả, mục tiêu, nhóm nguồn học, bài thực hành.
// Thêm bài: thêm một mục vào mảng; trang Góc AI và trang bài học tự cập nhật.
// ============================================================

import { localize } from '../lib/i18n.js';

const KIND = {
  course: { vi: 'Khóa học', en: 'Course' },
  video: { vi: 'Video', en: 'Video' },
};

export const INTRO = localize({
  how: {
    vi: 'Mỗi tuần chọn một bài, học một đến hai nguồn rồi áp dụng ngay vào một việc thật. Lưu lại yêu cầu đã dùng, kết quả AI, cách bạn kiểm chứng và điều cần cải thiện.',
    en: 'Each week pick one lesson, go through one or two sources, then apply it to a real task right away. Keep notes on the prompt you used, the AI output, how you checked it and what to improve.',
  },
  note: {
    vi: 'Các nguồn là khóa học và video công khai của cộng đồng (OpenAI Academy, Microsoft Learn, YouTube). Phần mô tả ở đây chỉ là tóm tắt để định hướng, hãy mở nguồn gốc để học đầy đủ. Một số khóa cần đăng nhập.',
    en: 'Sources are public community courses and videos (OpenAI Academy, Microsoft Learn, YouTube). The notes here are short summaries to guide you; open the original to learn in full. Some courses need a sign-in.',
  },
  order: {
    vi: 'Học theo thứ tự 1 → 4, hoặc nhảy thẳng vào bài bạn đang cần.',
    en: 'Go 1 → 4 in order, or jump straight to the one you need.',
  },
});

const L = (vi, en) => ({ vi, en });
const src = (title, kind, by, desc, url) => ({ title, kind: KIND[kind], by, desc, url });

export const LESSONS = localize([
  {
    id: '1',
    title: L('Hiểu AI và chọn việc giao cho AI', 'Understand AI and pick what to hand over'),
    outcome: L('Một việc phù hợp để thử với AI', 'One task that is a good fit to try with AI'),
    goal: L(
      'Nhận biết AI tạo sinh làm tốt việc gì, có giới hạn gì và khi nào con người cần giữ quyền quyết định. Bắt đầu bằng một công việc lặp lại, có đầu ra kiểm tra được và dữ liệu được phép sử dụng.',
      'Learn what generative AI does well, where it falls short, and when a human must keep the final say. Start with a repetitive task whose output you can check and whose data you are allowed to use.',
    ),
    groups: [
      { title: null, items: [
        src('AI Foundations', 'course', 'OpenAI Academy', L('Kiến thức nền về AI tạo sinh, khả năng, giới hạn và tình huống ứng dụng.', 'Basics of generative AI: what it can do, its limits and where to use it.'), 'https://academy.openai.com/home/courses/ai-foundations-dnq5w'),
      ] },
    ],
    practice: {
      intro: L('Viết ra ba việc bạn đang làm hằng tuần. Với mỗi việc, ghi:', 'Write down three tasks you do every week. For each one, note:'),
      steps: [
        L('Dữ liệu đầu vào', 'The input data'),
        L('Đầu ra mong muốn', 'The output you want'),
        L('Cách kiểm tra đầu ra', 'How you will check the output'),
        L('Bước nào bạn sẽ tự quyết định', 'Which step you will decide yourself'),
      ],
    },
  },
  {
    id: '2',
    title: L('Ứng dụng AI vào công việc', 'Put AI to work'),
    outcome: L('Yêu cầu rõ ràng và một quy trình thử nghiệm', 'A clear prompt and a trial workflow'),
    goal: L(
      'Giao việc cho AI bằng bối cảnh, yêu cầu, giới hạn và tiêu chí đánh giá rõ ràng; thử trên công việc thật và điều chỉnh sau mỗi lần chạy.',
      'Hand work to AI with clear context, instructions, limits and success criteria; try it on real work and adjust after each run.',
    ),
    groups: [
      { title: L('Bắt đầu nhanh', 'Quick start'), items: [
        src('Applied AI Foundations', 'course', 'OpenAI Academy', L('Tách một quy trình thường gặp thành các bước, chọn bước AI có thể hỗ trợ và lập kế hoạch áp dụng.', 'Break a common process into steps, pick the ones AI can help with and plan how to apply it.'), 'https://academy.openai.com/home/courses/applied-ai-foundations-szsmv'),
        src('Ứng dụng AI cho công việc hằng ngày', 'video', 'YouTube', L('Ví dụ về tìm kiếm, tổng hợp, soạn thảo, xử lý dữ liệu, lên ý tưởng và giải quyết vấn đề.', 'Examples of searching, summarizing, drafting, handling data, brainstorming and problem solving.'), 'https://www.youtube.com/watch?v=Pni_hG0wD0o'),
        src('Làm Chủ Claude AI Toàn Diện Cho Người Mới', 'video', 'YouTube', L('Hướng dẫn dùng Claude để tổ chức quy trình, làm tài liệu, website, video và viết mã.', 'Using Claude to organize workflows, make documents, websites, videos and write code.'), 'https://www.youtube.com/watch?v=W6uvxZ8s8Bo'),
      ] },
      { title: L('Đi sâu vào quy trình và quản lý', 'Going deeper: workflows and leadership'), items: [
        src('Agents and Workflows', 'course', 'OpenAI Academy', L('Cung cấp ngữ cảnh, xác định đầu ra, đặt giới hạn, đánh giá và cải thiện quy trình AI.', 'Giving context, defining outputs, setting limits, evaluating and improving AI workflows.'), 'https://academy.openai.com/home/courses/agents-and-workflows-y0qoc'),
        src('AI Leadership', 'course', 'OpenAI Academy', L('Tìm cơ hội ứng dụng AI trong tổ chức, đánh giá giá trị và cân nhắc rủi ro.', 'Finding AI opportunities in an organization, judging value and weighing risks.'), 'https://academy.openai.com/home/courses/ai-leadership-kaf7k'),
      ] },
    ],
    practice: {
      intro: L('Chọn một việc lặp lại, rồi:', 'Pick a repetitive task, then:'),
      steps: [
        L('Viết bối cảnh: việc này để làm gì, cho ai', 'Write the context: what it is for and who it serves'),
        L('Ghi rõ việc cần AI làm', 'Spell out what the AI should do'),
        L('Nêu giới hạn dữ liệu được dùng', 'State the limits on the data it may use'),
        L('Đặt tiêu chí thế nào là đạt', 'Set the criteria for a good result'),
        L('Chạy thử hai lần rồi ghi điểm cần chỉnh', 'Run it twice and note what to adjust'),
      ],
    },
  },
  {
    id: '3',
    title: L('Kiểm chứng đầu ra AI', 'Check what AI gives you'),
    outcome: L('Bản kiểm tra trước khi dùng kết quả', 'A checklist before you use the output'),
    goal: L(
      'Kiểm tra độ đúng, tính đầy đủ, nguồn và mức phù hợp của kết quả AI. Với thông tin quan trọng, đối chiếu bằng chứng độc lập trước khi sử dụng.',
      'Check AI output for accuracy, completeness, sources and fit. For anything important, compare it with independent evidence before using it.',
    ),
    groups: [
      { title: null, items: [
        src('Evaluate generative AI applications', 'course', 'Microsoft Learn', L('Các tiêu chí đánh giá chất lượng, độ chính xác, mức phù hợp và rủi ro của ứng dụng AI tạo sinh.', 'Criteria for judging quality, accuracy, relevance and risk in generative AI apps.'), 'https://learn.microsoft.com/en-us/training/paths/evaluate-generative-ai-apps/'),
        src('Evaluate AI Applications', 'course', 'OpenAI Academy', L('Nhận diện thông tin sai lệch, kiểm tra độ tin cậy và đánh giá đầu ra theo mục tiêu sử dụng.', 'Spotting wrong information, checking reliability and judging output against its purpose.'), 'https://academy.openai.com/home/courses/evaluate-ai-applications-pxds7'),
      ] },
    ],
    practice: {
      intro: L('Lấy một đầu ra AI bạn định dùng, rồi:', 'Take an AI output you plan to use, then:'),
      steps: [
        L('Đánh dấu từng ý có thể kiểm chứng', 'Mark every claim that can be checked'),
        L('Tìm nguồn độc lập cho các ý đó', 'Find independent sources for them'),
        L('Sửa phần thiếu hoặc sai', 'Fix what is missing or wrong'),
        L('Ghi quyết định cuối cùng của bạn', 'Write down your final decision'),
      ],
    },
  },
  {
    id: '4',
    title: L('An toàn dữ liệu và trách nhiệm', 'Data safety and responsibility'),
    outcome: L('Quy tắc dữ liệu cho việc đã chọn', 'Data rules for the task you picked'),
    goal: L(
      'Xác định dữ liệu nào được phép đưa vào công cụ, tôn trọng quyền sử dụng nội dung và giữ trách nhiệm của con người đối với kết quả đưa vào công việc.',
      'Know which data may go into a tool, respect content rights, and keep human responsibility for any result that goes into your work.',
    ),
    groups: [
      { title: null, items: [
        src('Privacy, Security, and Responsible AI Practices', 'course', 'Microsoft Learn', L('Nguyên tắc về quyền riêng tư, bảo mật và sử dụng AI có trách nhiệm.', 'Principles of privacy, security and responsible AI use.'), 'https://learn.microsoft.com/en-us/training/modules/privacy-security-responsible-ai-practices/'),
      ] },
    ],
    practice: {
      intro: L('Trước khi gửi dữ liệu vào AI, tự kiểm tra:', 'Before sending data to an AI tool, check:'),
      steps: [
        L('Mình có quyền truy cập dữ liệu này không', 'Whether you are allowed to access this data'),
        L('Dữ liệu nhạy cảm tới mức nào', 'How sensitive the data is'),
        L('Mục đích sử dụng là gì', 'What it will be used for'),
        L('Có quy tắc nào của công ty đang áp dụng', 'Which company rules apply'),
        L('Chưa rõ thì hỏi người phụ trách trước khi làm tiếp', 'If unsure, ask the person in charge before going on'),
      ],
    },
  },
]);
