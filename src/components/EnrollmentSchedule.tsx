import { ArrowUpRight, CalendarDays, Phone } from 'lucide-react'

import { CONTACT } from '../data/contact'

export default function EnrollmentSchedule() {
  return (
    <section className="course-intake" aria-labelledby="course-intake-title">
      <div className="course-intake__icon"><CalendarDays size={28} aria-hidden="true" /></div>
      <div className="course-intake__copy">
        <span className="section-label">{CONTACT.brandName.toUpperCase()}</span>
        <h2 id="course-intake-title">Tìm lớp phù hợp với lịch của bạn.</h2>
        <p>
          Liên hệ trực tiếp để xác nhận đợt khai giảng gần nhất, lịch học và hồ sơ cần chuẩn bị.
          Văn phòng Linh Xuân sẽ cùng bạn lựa chọn khóa học phù hợp.
        </p>
      </div>
      <div className="course-intake__actions">
        <a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Hỏi lịch học qua Zalo <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <a href={CONTACT.phoneUrl} className="course-intake__phone">
          <Phone size={16} aria-hidden="true" /> {CONTACT.phoneDisplay}
        </a>
      </div>
    </section>
  )
}
