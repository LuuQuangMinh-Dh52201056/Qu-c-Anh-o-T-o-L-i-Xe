import { useState } from 'react'
import { Bike, CarFront, LayoutGrid } from 'lucide-react'
import { useLocation } from 'react-router-dom'

import CourseCard from './CourseCard'
import { courses } from '../data/courses'

type CourseFilter = 'all' | 'motorcycle' | 'car'
const previousFilters = new Map<string, CourseFilter>()

const filters = [
  { value: 'all' as const, label: 'Tất cả khóa học', icon: LayoutGrid },
  { value: 'motorcycle' as const, label: 'Xe máy', icon: Bike },
  { value: 'car' as const, label: 'Ô tô', icon: CarFront },
]

export default function CourseGroups({ showFilters = true }: { showFilters?: boolean }) {
  const { pathname } = useLocation()
  const [activeFilter, setActiveFilter] = useState<CourseFilter>(() => previousFilters.get(pathname) ?? 'all')
  const visibleCourses = courses.filter((course) => {
    const isMotorcycle = course.code === 'A' || course.code === 'A1'
    return activeFilter === 'all' || (activeFilter === 'motorcycle' ? isMotorcycle : !isMotorcycle)
  })

  return (
    <div className="course-catalog">
      {showFilters && (
        <div className="course-catalog__toolbar">
          <div className="course-catalog__filters" role="group" aria-label="Lọc khóa học theo phương tiện">
            {filters.map(({ value, label, icon: Icon }) => (
              <button
                type="button"
                className={activeFilter === value ? 'is-active' : ''}
                aria-pressed={activeFilter === value}
                onClick={() => {
                  previousFilters.set(pathname, value)
                  setActiveFilter(value)
                }}
                key={value}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <p className="course-catalog__count" aria-live="polite" aria-atomic="true">
            <strong>{visibleCourses.length}</strong> khóa học phù hợp
          </p>
        </div>
      )}

      <div className="course-catalog__grid">
        {visibleCourses.map((course) => <CourseCard course={course} key={course.code} />)}
      </div>
    </div>
  )
}
