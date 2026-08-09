import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import type { Course } from '../types/course'

type CourseCardProps = {
  course: Course
}

export default function CourseCard({
  course,
}: CourseCardProps) {
  return (
    <article className="vehicle-course-card">
      <Link
        to={`/khoa-hoc/${course.slug}`}
        className="vehicle-course-card__media"
        data-course={course.code}
        aria-label={`Xem chi tiết ${course.title}`}
      >
        <div className="vehicle-course-card__spotlight" />

        <img
          src={course.image}
          alt={`${course.title} - ${course.subtitle}`}
          loading="lazy"
          decoding="async"
        />

        <div className="vehicle-course-card__status">
          <ShieldCheck size={15} />
          Khóa đào tạo
        </div>

        <div className="vehicle-course-card__code">
          <span>Hạng</span>
          <strong>{course.code}</strong>
        </div>
      </Link>

      <div className="vehicle-course-card__content">
        <div className="vehicle-course-card__topline">
          <span>
            <GraduationCap size={15} />
            Chương trình đào tạo
          </span>
          <strong>{course.code}</strong>
        </div>

        <h4>{course.title}</h4>
        <p className="vehicle-course-card__subtitle">
          {course.subtitle}
        </p>

        <p className="vehicle-course-card__summary">
          {course.summary}
        </p>

        <div className="vehicle-course-card__price">
          <div>
            <span>Học phí tham khảo</span>
            <strong>{course.price}</strong>
          </div>

          <small>
           ✔️ Cam kết không phát sinh
          </small>
        </div>

        <div className="vehicle-course-card__benefits">
          {course.bullets.map((item) => (
            <div key={item}>
              <CheckCircle2 size={16} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <footer className="vehicle-course-card__actions">
        <Link
          to={`/khoa-hoc/${course.slug}`}
          className="vehicle-course-card__detail"
        >
          Xem chi tiết
          <ArrowRight size={16} />
        </Link>

        <Link
          to={`/dang-ky?course=${encodeURIComponent(
            course.code
          )}`}
          className="vehicle-course-card__register"
        >
          Đăng ký học
        </Link>
      </footer>
    </article>
  )
}
