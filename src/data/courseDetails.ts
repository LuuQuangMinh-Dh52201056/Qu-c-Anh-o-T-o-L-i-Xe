import type { Course } from '../types/course'

export type CourseDetailInfo = {
  headline: string
  introduction: string
  quickFacts: { label: string; value: string }[]
  whoFits: string[]
  curriculum: { title: string; description: string; points: string[] }[]
  learningSteps: { title: string; description: string }[]
  preparation: string[]
  keyOutcomes: string[]
  faqs: { question: string; answer: string }[]
  references?: { label: string; url: string }[]
}

export const courseDetails: Record<Course['code'], CourseDetailInfo> = {
  A: {
    headline: 'Làm chủ mô tô. Vững vàng trên mỗi hành trình.',
    introduction:
      'Một chiếc mô tô có công suất lớn đòi hỏi khả năng kiểm soát xe và sự chủ động trong từng thao tác. Tìm hiểu lộ trình hạng A từ tư thế lái, phối hợp ga – phanh đến quan sát, thực hành và chuẩn bị sát hạch.',
    quickFacts: [
      { label: 'Phương tiện', value: 'Mô tô phân khối lớn' },
      { label: 'Kỹ năng trọng tâm', value: 'Cân bằng & kiểm soát xe' },
      { label: 'Tư vấn đăng ký', value: 'Trao đổi trực tiếp 1:1' },
    ],
    whoFits: [
      'Bạn muốn sử dụng mô tô phân khối lớn và cần tìm hiểu khóa học hạng A phù hợp.',
      'Bạn đã đi xe máy nhưng muốn rèn khả năng kiểm soát một chiếc xe có trọng lượng và công suất lớn hơn.',
      'Bạn cần hướng dẫn cách luyện thực hành, ôn lý thuyết và chuẩn bị trước kỳ sát hạch.',
    ],
    curriculum: [
      {
        title: 'Tư duy lái xe an toàn',
        description: 'Hiểu tình huống trước khi xử lý, hình thành thói quen quan sát khi điều khiển mô tô.',
        points: [
          'Ôn quy tắc giao thông, biển báo và nhận diện tình huống.',
          'Chú ý điểm mù, khoảng cách và nguy cơ ở giao lộ.',
          'Lựa chọn trang phục bảo hộ phù hợp khi luyện tập.',
        ],
      },
      {
        title: 'Làm quen xe và các thao tác nền tảng',
        description: 'Bắt đầu từ tư thế ngồi, cách giữ xe và sử dụng hệ thống điều khiển.',
        points: [
          'Điều chỉnh tư thế, tay lái và hướng nhìn.',
          'Phối hợp ga – phanh; làm quen côn – số theo loại xe.',
          'Khởi hành, di chuyển chậm và dừng xe có kiểm soát.',
        ],
      },
      {
        title: 'Cân bằng và điều khiển theo bài thực hành',
        description: 'Luyện theo từng thao tác để biết mình cần chỉnh ở đâu và vì sao.',
        points: [
          'Duy trì tốc độ đều khi đi qua đoạn hẹp và đoạn cong.',
          'Kết hợp hướng nhìn, tay lái và thăng bằng.',
          'Nhận diện lỗi thường gặp và điều chỉnh qua từng lượt tập.',
        ],
      },
      {
        title: 'Chuẩn bị trước kỳ sát hạch',
        description: 'Hệ thống kiến thức và kỹ năng, tìm hiểu trình tự thực hiện bài thi.',
        points: [
          'Ôn lý thuyết theo nhóm kiến thức còn yếu.',
          'Làm quen thứ tự bài thực hành và lưu ý khi thực hiện.',
          'Trao đổi các thông tin cần xác nhận trước ngày thi.',
        ],
      },
    ],
    learningSteps: [
      { title: 'Trao đổi nhu cầu', description: 'Chia sẻ loại mô tô bạn dự định sử dụng và kinh nghiệm lái xe hiện có.' },
      { title: 'Xác nhận khóa học', description: 'Làm rõ điều kiện đăng ký, hồ sơ, học phí và lịch học với người tư vấn.' },
      { title: 'Ôn và luyện kỹ năng', description: 'Tìm hiểu lý thuyết, làm quen xe và rèn các thao tác thực hành.' },
      { title: 'Chuẩn bị sát hạch', description: 'Rà soát phần cần luyện thêm và xác nhận thông tin kỳ sát hạch.' },
    ],
    preparation: [
      'Cho người tư vấn biết loại mô tô bạn muốn sử dụng và mức độ quen xe hiện tại.',
      'Trao đổi thời gian có thể học để xác nhận lịch phù hợp trước khi đăng ký.',
      'Nhận hướng dẫn hồ sơ và yêu cầu sức khỏe áp dụng cho trường hợp của bạn.',
      'Xác nhận mức học phí, các khoản phí liên quan và trang bị cần mang khi thực hành.',
    ],
    keyOutcomes: [
      'Hiểu cách phối hợp các thao tác khi điều khiển mô tô.',
      'Biết quan sát, giữ khoảng cách và kiểm soát tốc độ.',
      'Nắm hướng ôn tập và những điểm cần chú ý trước sát hạch.',
    ],
    faqs: [
      {
        question: 'Tôi đã đi xe máy lâu năm, có cần luyện thực hành hạng A?',
        answer: 'Kinh nghiệm xe máy là một nền tảng hữu ích, nhưng trọng lượng, công suất và cách điều khiển từng loại mô tô có thể khác nhau. Bạn nên trao đổi kinh nghiệm hiện tại để được hướng dẫn phần kỹ năng cần làm quen và luyện thêm.',
      },
      {
        question: 'Tôi chưa quen mô tô phân khối lớn thì bắt đầu như thế nào?',
        answer: 'Bạn có thể bắt đầu bằng việc tìm hiểu tư thế, giữ thăng bằng và thao tác điều khiển. Hãy nói rõ mức độ quen xe với người tư vấn để xác nhận cách tiếp cận thực hành phù hợp.',
      },
      {
        question: 'Hạng A hay A1 phù hợp với xe của tôi?',
        answer: 'Gửi thông tin loại xe, dung tích động cơ hoặc công suất xe điện cho văn phòng. Người tư vấn sẽ hỗ trợ bạn kiểm tra hạng giấy phép và điều kiện đăng ký áp dụng trước khi chọn khóa học.',
      },
      {
        question: 'Học phí hiển thị đã bao gồm những khoản nào?',
        answer: 'Giá trên website là mức tham khảo. Hãy yêu cầu người tư vấn xác nhận các khoản được tính trong học phí, lệ phí liên quan, điều kiện thanh toán và lịch học trước khi đăng ký.',
      },
    ],
  },
  A1: {
    headline: 'Đi xe mỗi ngày. Bắt đầu bằng kỹ năng đúng.',
    introduction:
      'Đi làm, đi học hay di chuyển trong thành phố đều cần những thói quen lái xe an toàn. Khóa hạng A1 chú trọng kiến thức dễ hiểu, thao tác cơ bản và cách luyện bài thực hành để bạn có hướng chuẩn bị rõ ràng.',
    quickFacts: [
      { label: 'Phương tiện', value: 'Xe máy phổ thông' },
      { label: 'Kỹ năng trọng tâm', value: 'Quan sát & thao tác cơ bản' },
      { label: 'Tư vấn đăng ký', value: 'Trao đổi trực tiếp 1:1' },
    ],
    whoFits: [
      'Bạn cần tìm hiểu giấy phép phù hợp với chiếc xe máy dùng để đi học hoặc đi làm.',
      'Bạn mới làm quen xe máy và muốn được hướng dẫn từ các thao tác cơ bản.',
      'Bạn đã biết đi xe nhưng cần hệ thống kiến thức và luyện bài thực hành trước khi thi.',
    ],
    curriculum: [
      {
        title: 'Lý thuyết gắn với việc đi xe hằng ngày',
        description: 'Học cách hiểu quy tắc và tình huống, xây dựng thói quen ôn tập có trọng tâm.',
        points: [
          'Nhận biết biển báo, vạch đường và tín hiệu giao thông.',
          'Hiểu quyền ưu tiên và cách xử lý tình huống ở giao lộ.',
          'Ôn theo nhóm câu hỏi và xem lại phần còn nhầm lẫn.',
        ],
      },
      {
        title: 'Làm quen xe và giữ thăng bằng',
        description: 'Rèn thao tác nền tảng trước khi ghép thành một bài thực hành.',
        points: [
          'Tư thế ngồi, đặt tay và hướng nhìn khi điều khiển xe.',
          'Khởi hành, tăng giảm tốc và dừng xe an toàn.',
          'Phối hợp tay lái, ga và phanh ở tốc độ thấp.',
        ],
      },
      {
        title: 'Luyện bài thực hành theo từng phần',
        description: 'Làm quen đường đi và điểm quan sát, tập ổn định thao tác qua từng lượt.',
        points: [
          'Luyện đi đường cong, vòng số 8 và các đoạn thực hành.',
          'Căn đường đi, giữ tốc độ đều và kiểm soát thăng bằng.',
          'Nhận biết các lỗi thao tác để điều chỉnh khi tập lại.',
        ],
      },
      {
        title: 'Ôn tập và chuẩn bị ngày thi',
        description: 'Sắp xếp lại kiến thức và các việc cần xác nhận để chủ động trước kỳ sát hạch.',
        points: [
          'Rà soát phần lý thuyết còn yếu.',
          'Ôn trình tự thực hiện bài thực hành.',
          'Xác nhận thông tin hồ sơ, địa điểm và thời gian thi.',
        ],
      },
    ],
    learningSteps: [
      { title: 'Chọn đúng nhu cầu', description: 'Trao đổi loại xe thường sử dụng và mức độ quen xe của bạn.' },
      { title: 'Xác nhận đăng ký', description: 'Làm rõ hồ sơ, điều kiện, lịch học và chi phí trước khi quyết định.' },
      { title: 'Ôn lý thuyết, luyện xe', description: 'Hệ thống kiến thức và làm quen từng phần của bài thực hành.' },
      { title: 'Sẵn sàng trước ngày thi', description: 'Kiểm tra lại thông tin kỳ thi và những kỹ năng cần luyện thêm.' },
    ],
    preparation: [
      'Chia sẻ loại xe bạn thường sử dụng để được tư vấn hạng học phù hợp.',
      'Cho văn phòng biết bạn đã biết đi xe hay cần làm quen từ đầu.',
      'Nhận hướng dẫn hồ sơ và xác nhận lịch học, lịch sát hạch dự kiến.',
      'Làm rõ học phí, lệ phí liên quan và các khoản cần thanh toán trước khi đăng ký.',
    ],
    keyOutcomes: [
      'Hiểu các tình huống giao thông thường gặp khi đi xe máy.',
      'Biết cách rèn thao tác, thăng bằng và quan sát.',
      'Có hướng ôn lý thuyết và luyện thực hành rõ ràng.',
    ],
    faqs: [
      {
        question: 'Chưa biết đi xe máy có thể tìm hiểu khóa A1 không?',
        answer: 'Bạn có thể trao đổi trước để được tư vấn. Hãy nói rõ mình chưa biết đi xe để văn phòng xác nhận cách làm quen xe, yêu cầu thực hành và lịch học phù hợp với trường hợp của bạn.',
      },
      {
        question: 'Tôi đi xe tay ga, cần lưu ý gì khi luyện thực hành?',
        answer: 'Loại xe thực hành có thể có cách điều khiển khác chiếc xe bạn dùng hằng ngày. Bạn nên xác nhận loại xe tập và làm quen cách khởi hành, giữ ga, sử dụng phanh trước khi luyện bài.',
      },
      {
        question: 'Ôn lý thuyết A1 như thế nào để dễ nhớ?',
        answer: 'Hãy chia nội dung theo biển báo, quy tắc và tình huống, làm câu hỏi rồi xem lại lý do của các đáp án còn nhầm. Văn phòng hỗ trợ bạn tìm hiểu tài liệu ôn phù hợp với khóa đã đăng ký.',
      },
      {
        question: 'Có lịch học phù hợp với người đi làm không?',
        answer: 'Lịch học cần được xác nhận trực tiếp theo lớp hiện có. Gửi những khoảng thời gian bạn có thể tham gia để người tư vấn kiểm tra phương án phù hợp trước khi đăng ký.',
      },
    ],
  },
  BSS: {
    headline: 'Hiểu côn – số. Chủ động sau tay lái.',
    introduction:
      'Học ô tô số sàn bắt đầu từ việc phối hợp côn, ga và phanh một cách có kiểm soát. Lộ trình đi từ làm quen khoang lái đến sa hình, đường trường và cách xử lý những tình huống thường gặp.',
    quickFacts: [
      { label: 'Phương tiện', value: 'Ô tô số sàn' },
      { label: 'Kỹ năng trọng tâm', value: 'Phối hợp côn – số – ga' },
      { label: 'Nội dung thực hành', value: 'Sa hình & đường trường' },
    ],
    whoFits: [
      'Bạn muốn tìm hiểu khóa học để sử dụng ô tô số sàn.',
      'Bạn bắt đầu học lái ô tô và muốn hiểu từ các thao tác nền tảng.',
      'Bạn cần rèn sự chủ động khi khởi hành, chuyển số, ghép xe và lái trên đường.',
    ],
    curriculum: [
      {
        title: 'Làm quen khoang lái và kiến thức nền',
        description: 'Hiểu xe, cách quan sát và các nguyên tắc cần biết trước khi thực hành.',
        points: [
          'Chỉnh ghế, gương, tư thế lái và nhận biết bộ phận điều khiển.',
          'Ôn quy tắc giao thông, biển báo và tình huống lái xe.',
          'Tìm hiểu thao tác kiểm tra xe trước khi di chuyển.',
        ],
      },
      {
        title: 'Phối hợp côn – phanh – ga',
        description: 'Rèn thao tác có nhịp để kiểm soát xe khi khởi hành và thay đổi tốc độ.',
        points: [
          'Làm quen điểm bắt côn và khởi hành ở tốc độ thấp.',
          'Phối hợp chuyển số, tăng giảm tốc và dừng xe.',
          'Nhận biết nguyên nhân chết máy và luyện cách điều chỉnh.',
        ],
      },
      {
        title: 'Căn xe và luyện sa hình',
        description: 'Ghép thao tác thành bài thực hành, đồng thời rèn khả năng quan sát thân xe.',
        points: [
          'Căn khoảng cách, đánh lái và kiểm soát xe trong không gian hẹp.',
          'Luyện ghép xe, dừng xe và di chuyển trên dốc.',
          'Xem lại lỗi thường gặp để luyện đúng phần còn yếu.',
        ],
      },
      {
        title: 'Đường trường và chuẩn bị sát hạch',
        description: 'Kết hợp kỹ năng điều khiển với quan sát và đưa ra quyết định khi tham gia giao thông.',
        points: [
          'Giữ khoảng cách, chọn làn và tốc độ phù hợp.',
          'Quan sát trước khi chuyển hướng, chuyển làn và qua giao lộ.',
          'Ôn nội dung sát hạch và xác nhận thông tin trước ngày thi.',
        ],
      },
    ],
    learningSteps: [
      { title: 'Tư vấn loại xe', description: 'Trao đổi mục đích sử dụng ô tô và lý do bạn lựa chọn số sàn.' },
      { title: 'Làm rõ lộ trình', description: 'Xác nhận hồ sơ, lịch học, các nội dung thực hành và chi phí liên quan.' },
      { title: 'Rèn kỹ năng từ nền tảng', description: 'Làm quen côn – số, luyện sa hình và kỹ năng lái đường trường.' },
      { title: 'Rà soát trước sát hạch', description: 'Ôn nội dung còn yếu và kiểm tra thông tin kỳ sát hạch với văn phòng.' },
    ],
    preparation: [
      'Trao đổi kinh nghiệm lái xe hiện có và mục đích sử dụng xe số sàn.',
      'Chia sẻ lịch làm việc để xác nhận thời gian học và các buổi thực hành.',
      'Nhận hướng dẫn hồ sơ, yêu cầu sức khỏe và điều kiện đăng ký áp dụng.',
      'Yêu cầu làm rõ học phí, nội dung thực hành, lệ phí và điều kiện thanh toán.',
    ],
    keyOutcomes: [
      'Hiểu cách phối hợp côn, số, ga và phanh.',
      'Biết nguyên tắc căn xe, ghép xe và di chuyển trên dốc.',
      'Rèn quan sát, giữ khoảng cách và quyết định khi lái đường trường.',
    ],
    faqs: [
      {
        question: 'Tôi chưa từng lái ô tô, số sàn có quá khó không?',
        answer: 'Số sàn cần thêm thời gian làm quen với côn và chuyển số. Bạn có thể bắt đầu từ thao tác cơ bản, luyện từng phần rồi mới phối hợp; hãy trao đổi kinh nghiệm hiện tại để xác nhận cách học phù hợp.',
      },
      {
        question: 'Nên chọn B số sàn hay B tự động?',
        answer: 'Bạn nên dựa vào chiếc xe dự định sử dụng, mục đích học và khả năng làm quen thao tác. Người tư vấn sẽ hỗ trợ làm rõ nội dung từng khóa và phạm vi giấy phép áp dụng trước khi bạn quyết định.',
      },
      {
        question: 'Khóa học có nội dung sa hình và đường trường không?',
        answer: 'Trang này giới thiệu các nhóm kỹ năng sa hình và đường trường của khóa số sàn. Trước khi đăng ký, bạn cần xác nhận lịch, địa điểm, hình thức tổ chức và các nội dung thực hành cụ thể với người tư vấn.',
      },
      {
        question: 'Tôi cần hỏi rõ những gì về học phí?',
        answer: 'Hãy làm rõ khoản học phí tham khảo đang bao gồm nội dung nào, chi phí thực hành, lệ phí liên quan và điều kiện thanh toán. Bạn cũng nên xác nhận các khoản có thể phát sinh trước khi đăng ký.',
      },
    ],
  },
  'BTĐ': {
    headline: 'Lái xe gia đình. Tự tin từ những điều cơ bản.',
    introduction:
      'Ô tô số tự động giúp bạn tập trung vào quan sát, kiểm soát tốc độ và xử lý tình huống. Tìm hiểu hành trình từ làm quen xe, sử dụng ga – phanh đến ghép xe, sa hình và lái trên đường.',
    quickFacts: [
      { label: 'Phương tiện', value: 'Ô tô số tự động' },
      { label: 'Kỹ năng trọng tâm', value: 'Ga – phanh & quan sát' },
      { label: 'Nội dung thực hành', value: 'Sa hình & đường trường' },
    ],
    whoFits: [
      'Bạn dự định sử dụng ô tô số tự động cho việc đi lại cá nhân hoặc gia đình.',
      'Bạn mới học lái và muốn tập trung rèn khả năng quan sát, kiểm soát ga và phanh.',
      'Bạn cần tìm hiểu cách căn xe, đỗ xe và di chuyển trong những tình huống thường gặp.',
    ],
    curriculum: [
      {
        title: 'Hiểu xe và thói quen trước khi lái',
        description: 'Tạo nền tảng từ tư thế lái, vị trí điều khiển và kiểm tra an toàn.',
        points: [
          'Điều chỉnh ghế, gương và tư thế ngồi.',
          'Nhận biết vị trí cần số và thao tác sử dụng xe.',
          'Ôn biển báo, quy tắc và tình huống giao thông.',
        ],
      },
      {
        title: 'Sử dụng ga – phanh có kiểm soát',
        description: 'Luyện từ khởi hành chậm đến dừng xe, xây dựng thói quen đặt chân đúng.',
        points: [
          'Khởi hành, tăng giảm tốc và dừng xe.',
          'Kiểm soát tốc độ khi di chuyển trong khoảng hẹp.',
          'Rèn thao tác chân phải và chuyển trạng thái điều khiển.',
        ],
      },
      {
        title: 'Căn xe, ghép xe và sa hình',
        description: 'Học cách nhận biết khoảng cách, kết hợp gương và hướng nhìn khi điều khiển xe.',
        points: [
          'Quan sát thân xe và ước lượng khoảng cách.',
          'Luyện chuyển hướng, ghép xe và dừng đúng vị trí.',
          'Nhận diện lỗi thường gặp khi đánh lái và căn xe.',
        ],
      },
      {
        title: 'Lái đường trường và ôn sát hạch',
        description: 'Rèn cách đọc tình huống và đưa ra quyết định khi di chuyển cùng các phương tiện khác.',
        points: [
          'Giữ khoảng cách, quan sát điểm mù và chọn tốc độ.',
          'Tập quan sát khi chuyển làn, chuyển hướng và qua giao lộ.',
          'Ôn kiến thức, kỹ năng và xác nhận thông tin kỳ sát hạch.',
        ],
      },
    ],
    learningSteps: [
      { title: 'Hiểu mục tiêu sử dụng', description: 'Chia sẻ loại xe gia đình hoặc nhu cầu di chuyển bạn đang hướng tới.' },
      { title: 'Xác nhận phương án học', description: 'Làm rõ điều kiện đăng ký, hồ sơ, lịch thực hành và chi phí.' },
      { title: 'Rèn thao tác và quan sát', description: 'Làm quen ga – phanh, căn xe, sa hình và kỹ năng lái đường trường.' },
      { title: 'Chuẩn bị kỳ sát hạch', description: 'Ôn lại phần cần cải thiện và xác nhận các thông tin trước ngày thi.' },
    ],
    preparation: [
      'Chia sẻ loại xe dự định sử dụng và kinh nghiệm lái xe hiện tại.',
      'Trao đổi thời gian có thể học để xác nhận lịch phù hợp với công việc.',
      'Nhận hướng dẫn hồ sơ và kiểm tra điều kiện đăng ký với người tư vấn.',
      'Làm rõ nội dung học, học phí, lệ phí liên quan và các điều kiện thanh toán.',
    ],
    keyOutcomes: [
      'Hiểu nguyên tắc điều khiển ga – phanh và sử dụng số tự động.',
      'Biết cách quan sát, căn xe và ghép xe.',
      'Rèn thói quen kiểm soát tốc độ và chủ động đọc tình huống.',
    ],
    faqs: [
      {
        question: 'Khóa B tự động phù hợp khi tôi chỉ dùng xe gia đình?',
        answer: 'Nếu bạn dự định sử dụng ô tô số tự động, đây là lựa chọn nên tìm hiểu. Hãy trao đổi loại xe và mục đích sử dụng để người tư vấn xác nhận nội dung khóa học và phạm vi giấy phép phù hợp.',
      },
      {
        question: 'Xe tự động ít thao tác hơn, tôi cần chú trọng phần nào?',
        answer: 'Bạn vẫn cần luyện cách đặt chân, phân biệt ga – phanh, quan sát điểm mù và kiểm soát tốc độ. Khả năng đọc tình huống, giữ khoảng cách và căn xe cũng là những kỹ năng quan trọng.',
      },
      {
        question: 'Tôi lo việc ghép xe và đỗ xe có được không?',
        answer: 'Ghép xe và căn khoảng cách là nhóm kỹ năng cần luyện từng phần. Bạn có thể trao đổi phần mình chưa tự tin để được hướng dẫn cách quan sát gương, hướng nhìn và phối hợp đánh lái.',
      },
      {
        question: 'Lịch học và thời gian hoàn thành được xác nhận thế nào?',
        answer: 'Lịch học và tiến độ cần được trao đổi theo lớp, thời gian thực hành và các yêu cầu áp dụng. Văn phòng hỗ trợ bạn kiểm tra thông tin cụ thể trước khi đăng ký; không nên chỉ dựa vào một mốc thời gian chung.',
      },
    ],
  },
  C1: {
    headline: 'Vững tay lái xe tải. Chủ động với công việc.',
    introduction:
      'Xe tải cần khả năng quan sát thân xe, căn khoảng cách và kiểm soát tốc độ phù hợp. Tìm hiểu khóa hạng C1 với các nhóm kỹ năng nền tảng, sa hình và đường trường phục vụ nhu cầu công việc của bạn.',
    quickFacts: [
      { label: 'Phương tiện', value: 'Ô tô tải / xe hạng C1' },
      { label: 'Kỹ năng trọng tâm', value: 'Căn xe & kiểm soát thân xe' },
      { label: 'Nội dung thực hành', value: 'Sa hình & đường trường' },
    ],
    whoFits: [
      'Bạn có nhu cầu sử dụng xe tải và muốn xác định khóa học phù hợp với loại xe.',
      'Bạn đang tìm hiểu nghề lái xe hoặc công việc cần kỹ năng điều khiển xe tải.',
      'Bạn cần rèn quan sát điểm mù, căn thân xe và xử lý trong không gian hẹp.',
    ],
    curriculum: [
      {
        title: 'Hiểu phương tiện và kiểm tra trước khi lái',
        description: 'Làm quen đặc điểm xe tải và các việc cần chú ý trước khi di chuyển.',
        points: [
          'Tư thế lái, gương và vị trí điều khiển.',
          'Tìm hiểu kích thước thân xe, điểm mù và giới hạn quan sát.',
          'Ôn quy tắc giao thông và tình huống thường gặp.',
        ],
      },
      {
        title: 'Điều khiển và kiểm soát xe',
        description: 'Rèn thao tác nền tảng để di chuyển đều, dừng xe và đổi hướng có kiểm soát.',
        points: [
          'Phối hợp bộ phận điều khiển theo loại xe thực hành.',
          'Khởi hành, tăng giảm tốc, chuyển số và dừng xe.',
          'Quan sát trước khi vào cua và thay đổi hướng di chuyển.',
        ],
      },
      {
        title: 'Căn thân xe và luyện sa hình',
        description: 'Chú trọng khoảng cách, góc đánh lái và cách nhìn khi điều khiển xe có kích thước lớn.',
        points: [
          'Căn đường đi và vị trí thân xe trong không gian hẹp.',
          'Luyện ghép xe, lùi xe và di chuyển trên dốc.',
          'Nhận biết lỗi quan sát, khoảng cách và thao tác để chỉnh lại.',
        ],
      },
      {
        title: 'Đường trường và chuẩn bị sát hạch',
        description: 'Kết hợp quan sát với điều khiển xe trong điều kiện giao thông thực tế.',
        points: [
          'Giữ khoảng cách và chủ động giảm tốc theo tình huống.',
          'Quan sát điểm mù trước khi chuyển làn hoặc chuyển hướng.',
          'Ôn kỹ năng, kiến thức và xác nhận thông tin kỳ sát hạch.',
        ],
      },
    ],
    learningSteps: [
      { title: 'Tư vấn loại xe sử dụng', description: 'Chia sẻ loại xe tải và nhu cầu công việc để kiểm tra khóa học phù hợp.' },
      { title: 'Xác nhận điều kiện học', description: 'Làm rõ điều kiện đăng ký, hồ sơ, lộ trình thực hành và chi phí.' },
      { title: 'Luyện kỹ năng xe tải', description: 'Rèn điều khiển, căn thân xe, sa hình và quan sát trên đường.' },
      { title: 'Ôn tập trước sát hạch', description: 'Rà soát nhóm kỹ năng cần luyện thêm và thông tin kỳ sát hạch.' },
    ],
    preparation: [
      'Chuẩn bị thông tin loại xe tải dự định sử dụng để được tư vấn hạng phù hợp.',
      'Chia sẻ kinh nghiệm lái xe và mục đích sử dụng cho công việc.',
      'Nhận hướng dẫn hồ sơ, yêu cầu sức khỏe và điều kiện đăng ký áp dụng.',
      'Xác nhận lịch thực hành, học phí, lệ phí liên quan và điều kiện thanh toán.',
    ],
    keyOutcomes: [
      'Hiểu đặc điểm quan sát và điều khiển xe tải.',
      'Biết nguyên tắc căn thân xe, lùi và ghép xe.',
      'Rèn cách chọn tốc độ, giữ khoảng cách và quan sát điểm mù.',
    ],
    faqs: [
      {
        question: 'C1 có phù hợp với loại xe tải tôi cần sử dụng không?',
        answer: 'Hãy gửi thông tin xe và khối lượng được ghi trong hồ sơ phương tiện cho người tư vấn. Văn phòng hỗ trợ kiểm tra hạng giấy phép áp dụng để bạn chọn đúng khóa học.',
      },
      {
        question: 'Tôi chưa lái xe tải, nên chuẩn bị kỹ năng gì?',
        answer: 'Bạn nên bắt đầu từ tư thế lái, quan sát gương, nhận biết điểm mù và kiểm soát tốc độ. Thân xe lớn hơn đòi hỏi luyện cách căn khoảng cách, vào cua và lùi xe có quan sát.',
      },
      {
        question: 'Nội dung C1 khác gì so với học ô tô cá nhân?',
        answer: 'Nội dung giới thiệu ở đây chú trọng đặc điểm thân xe tải, tầm nhìn, cách căn xe và kiểm soát phương tiện. Loại xe tập, lịch và nội dung thực hành cụ thể cần được xác nhận trước khi đăng ký.',
      },
      {
        question: 'Tôi đi làm theo ca, có thể trao đổi lịch học không?',
        answer: 'Bạn có thể gửi lịch làm việc và các khoảng thời gian có thể học. Người tư vấn sẽ kiểm tra lịch lớp, lịch thực hành hiện có và trao đổi phương án trước khi bạn đăng ký.',
      },
    ],
  },
}

export function getCourseDetailInfo(course: Course): CourseDetailInfo {
  return courseDetails[course.code]
}
