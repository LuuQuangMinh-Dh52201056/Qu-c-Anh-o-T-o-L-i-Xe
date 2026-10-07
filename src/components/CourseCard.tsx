import { ArrowRight, ArrowUpRight, Bike, CarFront, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Truck } from 'lucide-react'

import type { Course } from '../types/course'
import { CONTACT } from '../data/contact'

type CourseCardProps = {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const isMotorcycle = course.code === 'A' || course.code === 'A1'
  const VehicleIcon = isMotorcycle ? Bike : course.code === 'C1' ? Truck : CarFront

  return (
    <article className={`course-card${isMotorcycle ? ' course-card--motorcycle' : ''}`}>
      <Link
        to={`/khoa-hoc/${course.slug}`}
        className="course-card__media"
        aria-label={`Xem khóa học ${course.title}`}
      >
        <img
          src={course.image}
          alt={`${course.title} – ${course.subtitle}`}
          loading="lazy"
          decoding="async"
        />
        <span className="course-card__badge">
          <VehicleIcon size={14} aria-hidden="true" />
          {isMotorcycle ? 'Xe máy' : course.code === 'C1' ? 'Xe tải' : 'Ô tô'}
        </span>
        <span className="course-card__image-link" aria-hidden="true">
          <ArrowUpRight size={19} />
        </span>
      </Link>

      <div className="course-card__body">
        <div className="course-card__category">KHÓA HỌC LÁI XE</div>
        <h3>
          <Link to={`/khoa-hoc/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="course-card__subtitle">{course.subtitle}</p>
        <p className="course-card__summary">{course.summary}</p>
        <div className="course-card__price">
          <span>Học phí tham khảo</span>
          <strong>{course.price}</strong>
        </div>
      </div>

      <footer className="course-card__actions">
        <Link to={`/khoa-hoc/${course.slug}`} className="course-card__detail">
          Xem khóa học <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <a
          href={CONTACT.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="course-card__chat"
          aria-label={`Chat Zalo với admin về khóa ${course.title}`}
        >
          <MessageCircle size={16} aria-hidden="true" /> Zalo
        </a>
      </footer>
    </article>
  )
}
