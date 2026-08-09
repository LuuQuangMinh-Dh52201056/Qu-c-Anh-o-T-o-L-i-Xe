import motorcycleExamVideo from '../anh/huongdanthiA,A1.mp4'

import type { Course } from '../types/course'


export type CourseVideo = {
  id: string
  eyebrow: string
  title: string
  description: string
  poster: string
  embedUrl: string
}


/* =========================================================
   LẤY 1 VIDEO DUY NHẤT CHO MỖI HẠNG
========================================================= */

export function getCourseDetailVideos(
  course: Course
): CourseVideo[] {

  /* =======================================================
     HẠNG A
  ======================================================= */

  if (course.code === 'A') {
    return [
      {
        id: 'exam-a',

        eyebrow: 'Hướng dẫn thi hạng A',

        title: 'Quy trình thi sát hạch hạng A',

        description:
          'Hướng dẫn quy trình thi, các bài thực hành và những lưu ý quan trọng dành cho học viên thi sát hạch hạng A.',

        poster: course.image,

        embedUrl: motorcycleExamVideo,
      },
    ]
  }


  /* =======================================================
     HẠNG A1
  ======================================================= */

  if (course.code === 'A1') {
    return [
      {
        id: 'exam-a1',

        eyebrow: 'Hướng dẫn thi hạng A1',

        title: 'Quy trình thi sát hạch hạng A1',

        description:
          'Hướng dẫn quy trình thi, các bài thực hành và những lưu ý quan trọng dành cho học viên thi sát hạch hạng A1.',

        poster: course.image,

        embedUrl: motorcycleExamVideo,
      },
    ]
  }


  /* =======================================================
     B SỐ SÀN
     Chưa có video nên tạm thời không hiện
  ======================================================= */

  if (course.code === 'BSS') {
    return []
  }


  /* =======================================================
     B TỰ ĐỘNG
     Chưa có video nên tạm thời không hiện
  ======================================================= */

  if (course.code === 'BTĐ') {
    return []
  }


  /* =======================================================
     C1
     Chưa có video nên tạm thời không hiện
  ======================================================= */

  if (course.code === 'C1') {
    return []
  }


  return []
}