import type { Course } from '../types/course'

import courseAImage from '../anh/A.jfif'
import courseA1Image from '../anh/A1.webp'
import courseBssImage from '../anh/BSS.png'
import courseAutomaticImage from '../anh/BTĐ.jfif'
import courseC1Image from '../anh/C1.png'

export const courses: Course[] = [
  {
    code: 'A',
    slug: 'hang-a',
    title: 'Hạng A',
    subtitle: 'Mô tô phân khối lớn',
    summary:
      'Đào tạo kỹ năng điều khiển mô tô phân khối lớn an toàn, tự tin và chủ động.',
    description:
      'Khóa học hạng A tập trung vào kỹ năng làm chủ mô tô phân khối lớn, tư thế điều khiển, khả năng quan sát, xử lý tình huống và chuẩn bị cho quá trình sát hạch.',
    image: courseAImage,
    price: '2.500.000đ',
    bullets: [
      'Làm quen mô tô phân khối lớn',
      'Rèn kỹ năng điều khiển xe',
      'Hướng dẫn quy trình sát hạch',
    ],
    audience:
      'Phù hợp học viên có nhu cầu sử dụng mô tô phân khối lớn.',
  },

  {
    code: 'A1',
    slug: 'hang-a1',
    title: 'Hạng A1',
    subtitle: 'Xe máy phổ thông',
    summary:
      'Khóa học dễ tiếp cận, phù hợp nhu cầu đi lại cá nhân và sử dụng xe máy hằng ngày.',
    description:
      'Học viên được hướng dẫn lý thuyết, kỹ năng điều khiển xe, xử lý bài thực hành và các lưu ý quan trọng trước kỳ sát hạch.',
    image: courseA1Image,
    price: '900.000đ',
    bullets: [
      'Ôn lý thuyết trọng tâm',
      'Luyện kỹ năng thực hành',
      'Hướng dẫn trước ngày thi',
    ],
    audience:
      'Phù hợp người cần giấy phép xe máy phục vụ nhu cầu cá nhân.',
  },

  {
    code: 'BSS',
    slug: 'hang-b-so-san',
    title: 'B Số Sàn',
    subtitle: 'Ô tô số sàn',
    summary:
      'Học bài bản từ côn - phanh - ga đến sa hình, đường trường và xử lý tình huống.',
    description:
      'Khóa B số sàn đào tạo từ thao tác cơ bản, sử dụng côn - số, khởi hành, ghép xe, dừng xe, sa hình cho đến kỹ năng lái đường trường.',
    image: courseBssImage,
    price: '22.000.000đ',
    bullets: [
      'Kỹ thuật côn - phanh - ga',
      'Luyện bài sa hình',
      'Thực hành đường trường',
    ],
    audience:
      'Phù hợp người muốn làm chủ kỹ năng điều khiển ô tô số sàn.',
  },

  {
    code: 'BTĐ',
    slug: 'hang-b-tu-dong',
    title: 'B Tự Động',
    subtitle: 'Ô tô số tự động',
    summary:
      'Dễ làm quen, thao tác đơn giản, phù hợp người sử dụng xe cá nhân và gia đình.',
    description:
      'Khóa B tự động chú trọng kỹ năng quan sát, kiểm soát tốc độ, sa hình, ghép xe, đường trường và xử lý các tình huống thường gặp.',
    image: courseAutomaticImage,
    price: '22.000.000đ',
    bullets: [
      'Làm quen xe nhanh',
      'Sa hình và đường trường',
      'Kỹ năng lái xe an toàn',
    ],
    audience:
      'Phù hợp người ưu tiên xe gia đình hoặc xe cá nhân số tự động.',
  },

  {
    code: 'C1',
    slug: 'hang-c1',
    title: 'Hạng C1',
    subtitle: 'Ô tô tải / xe hạng C1',
    summary:
      'Đào tạo kỹ năng điều khiển xe tải phục vụ nhu cầu công việc và vận tải.',
    description:
      'Khóa C1 tập trung khả năng căn xe, quan sát, kiểm soát thân xe, sa hình và kỹ năng vận hành phương tiện tải an toàn.',
    image: courseC1Image,
    price: '24.000.000đ',
    bullets: [
      'Kỹ năng căn xe tải',
      'Luyện sa hình',
      'Vận hành thực tế',
    ],
    audience:
      'Phù hợp học viên có nhu cầu công việc, vận tải hoặc phát triển nghề lái xe.',
  },
]
