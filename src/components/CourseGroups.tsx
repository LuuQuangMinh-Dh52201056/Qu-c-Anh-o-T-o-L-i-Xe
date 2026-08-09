import {
  Bike,
  CarFront,
  Sparkles,
} from 'lucide-react'

import CourseCard from './CourseCard'
import EnrollmentSchedule from './EnrollmentSchedule'

import { courses } from '../data/courses'

import type { Course } from '../types/course'

type CourseGroup = {
  id: string
  number: string
  eyebrow: string
  title: string
  description: string
  codes: Course['code'][]
  icon: typeof Bike
  theme: 'motorcycle' | 'car'
}

const courseGroups: CourseGroup[] = [
  {
    id: 'hoc-mo-to',
    number: '01',
    eyebrow: 'Nhóm xe hai bánh',
    title: 'Học lái mô tô',
    description:
      'Làm chủ kỹ năng điều khiển xe hai bánh, nắm chắc bài thi và tự tin xử lý các tình huống giao thông thực tế.',
    codes: ['A', 'A1'],
    icon: Bike,
    theme: 'motorcycle',
  },
  {
    id: 'hoc-o-to-xe-tai',
    number: '02',
    eyebrow: 'Nhóm xe bốn bánh',
    title: 'Học lái ô tô & xe tải',
    description:
      'Lộ trình từ thao tác cơ bản đến sa hình và đường trường dành cho ô tô số sàn, số tự động và xe tải C1.',
    codes: ['BSS', 'BTĐ', 'C1'],
    icon: CarFront,
    theme: 'car',
  },
]

export default function CourseGroups() {
  return (
    <div className="vehicle-course-catalog">
      <EnrollmentSchedule />

      {courseGroups.map((group) => {
        const Icon = group.icon
        const groupCourses = courses.filter(
          (course) => group.codes.includes(course.code)
        )

        return (
          <section
            className={`vehicle-course-group vehicle-course-group--${group.theme}`}
            id={group.id}
            key={group.id}
          >
            <div className="vehicle-course-group__glow" />

            <header className="vehicle-course-group__header">
              <div className="vehicle-course-group__identity">
                <div className="vehicle-course-group__icon">
                  <Icon size={28} />
                </div>

                <div>
                  <div className="vehicle-course-group__eyebrow">
                    <Sparkles size={13} />
                    {group.eyebrow}
                  </div>

                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
              </div>

              <div className="vehicle-course-group__count">
                <strong>{String(groupCourses.length).padStart(2, '0')}</strong>
                <span>Hạng đào tạo</span>
                <small>Nhóm {group.number}</small>
              </div>
            </header>

            <div
              className={`vehicle-course-grid vehicle-course-grid--${groupCourses.length}`}
            >
              {groupCourses.map((course) => (
                <CourseCard
                  course={course}
                  key={course.code}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
