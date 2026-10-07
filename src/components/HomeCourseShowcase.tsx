import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Bike, CarFront, ChevronLeft, ChevronRight, Clock3, LayoutGrid } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

import { courses } from '../data/courses'
import '../styles/home-course-showcase.css'

type CourseFilter = 'all' | 'motorcycle' | 'car'
const previousFilters = new Map<string, CourseFilter>()
const filters = [
  { value: 'all' as const, label: 'Tất cả khóa học', icon: LayoutGrid },
  { value: 'motorcycle' as const, label: 'Xe máy', icon: Bike },
  { value: 'car' as const, label: 'Ô tô', icon: CarFront },
]

export default function HomeCourseShowcase() {
  const { pathname } = useLocation()
  const [activeFilter, setActiveFilter] = useState<CourseFilter>(() => previousFilters.get(pathname) ?? 'all')
  const [scrollBounds, setScrollBounds] = useState({ previous: false, next: false })
  const stripRef = useRef<HTMLDivElement>(null)
  const visibleCourses = courses.filter(course => {
    const isMotorcycle = course.code === 'A' || course.code === 'A1'
    return activeFilter === 'all' || (activeFilter === 'motorcycle' ? isMotorcycle : !isMotorcycle)
  })

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    strip.scrollLeft = 0
    const updateBounds = () => {
      const previous = strip.scrollLeft > 2
      const next = strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 2
      setScrollBounds(current => current.previous === previous && current.next === next ? current : { previous, next })
    }
    const resizeObserver = new ResizeObserver(updateBounds)
    resizeObserver.observe(strip)
    strip.addEventListener('scroll', updateBounds, { passive: true })
    updateBounds()

    return () => {
      resizeObserver.disconnect()
      strip.removeEventListener('scroll', updateBounds)
    }
  }, [activeFilter])

  const scrollCourses = (direction: -1 | 1) => {
    const strip = stripRef.current
    if (!strip) return
    const cards = Array.from(strip.children) as HTMLElement[]
    const cardWidth = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : strip.clientWidth
    strip.scrollBy({
      left: direction * cardWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  return (
    <section id="khoa-hoc" className="home-course-showcase" aria-labelledby="home-course-heading">
      <div className="container">
        <div className="home-course-showcase__heading">
          <div>
            <span className="home-course-showcase__eyebrow">CÁC KHÓA HỌC LÁI XE</span>
            <h2 id="home-course-heading">Chọn khóa học phù hợp với bạn</h2>
          </div>
          <div className="home-course-showcase__heading-actions">
            <Link to="/khoa-hoc#danh-sach-khoa-hoc" className="home-course-showcase__all-link">
              Xem tất cả khóa học <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <div className="home-course-showcase__controls" role="group" aria-label="Duyệt danh sách khóa học">
              <button type="button" aria-label="Xem khóa học trước" aria-controls="home-course-strip" disabled={!scrollBounds.previous} onClick={() => scrollCourses(-1)}>
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Xem khóa học tiếp theo" aria-controls="home-course-strip" disabled={!scrollBounds.next} onClick={() => scrollCourses(1)}>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="home-course-showcase__toolbar">
          <div className="home-course-showcase__filters" role="group" aria-label="Lọc khóa học theo phương tiện">
            {filters.map(({ value, label, icon: Icon }) => (
              <button type="button" key={value} aria-pressed={activeFilter === value} onClick={() => {
                previousFilters.set(pathname, value)
                setActiveFilter(value)
              }}>
                <Icon size={13} aria-hidden="true" />{label}
              </button>
            ))}
          </div>
          <p className="home-course-showcase__count" aria-live="polite" aria-atomic="true">
            {visibleCourses.length} khóa học phù hợp
          </p>
        </div>

        <div id="home-course-strip" className="home-course-showcase__strip" ref={stripRef} tabIndex={0} aria-label="Danh sách khóa học lái xe">
          {visibleCourses.map(course => (
            <article className="course-card home-course-showcase__card" key={course.code}>
              <Link to={`/khoa-hoc/${course.slug}`} className="course-card__media home-course-showcase__media" aria-label={`Xem khóa học ${course.title}`}>
                <img src={course.image} alt={`${course.title} – ${course.subtitle}`} loading="lazy" decoding="async" />
              </Link>
              <div className="home-course-showcase__body">
                <h3><Link to={`/khoa-hoc/${course.slug}`}>{course.title}</Link></h3>
                <p className="home-course-showcase__subtitle">{course.subtitle}</p>
                <p className="home-course-showcase__summary">{course.summary}</p>
                <span className="home-course-showcase__schedule"><Clock3 size={13} aria-hidden="true" />Trao đổi lịch học</span>
                <div className="home-course-showcase__bottom">
                  <div className="home-course-showcase__price"><span>Học phí tham khảo</span><strong>{course.price}</strong></div>
                  <Link to={`/khoa-hoc/${course.slug}`} className="home-course-showcase__detail" aria-label={`Xem chi tiết khóa học ${course.title}`}>
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="home-course-showcase__note">Liên hệ văn phòng để xác nhận học phí, các khoản phí liên quan và lịch học của khóa bạn quan tâm.</p>
      </div>
    </section>
  )
}
