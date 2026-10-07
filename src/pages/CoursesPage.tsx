import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bike, CarFront, Truck } from 'lucide-react'

import CourseGroups from '../components/CourseGroups'
import EnrollmentSchedule from '../components/EnrollmentSchedule'
import { CONTACT } from '../data/contact'

export default function CoursesPage() {
  return (
    <div className="courses-page">
      <section className="courses-hero">
        <div className="container">
          <nav className="page-breadcrumb" aria-label="Đường dẫn trang">
            <Link to="/">Trang chủ</Link><span aria-hidden="true">/</span><span aria-current="page">Khóa học</span>
          </nav>
          <span className="section-label">TƯ VẤN TUYỂN SINH LINH XUÂN</span>
          <div className="courses-hero__heading">
            <h1>Chọn hạng bằng.<br /><em>Bắt đầu hành trình.</em></h1>
            <div>
              <p>
                Từ xe máy đến ô tô, tìm chương trình phù hợp với nhu cầu đi lại và công việc của bạn.
                Văn phòng Linh Xuân đồng hành cùng bạn từ bước chọn khóa đến chuẩn bị đăng ký.
              </p>
              <a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                Cần hỗ trợ chọn khóa học? <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section courses-page__catalog" aria-label="Danh sách khóa học">
        <div className="container">
          <CourseGroups />
          <p className="courses-page__price-note">
            Học phí hiển thị là mức tham khảo theo thông tin hiện có. Liên hệ admin để xác nhận học phí,
            các khoản phí liên quan và lịch học trước khi đăng ký.
          </p>
        </div>
      </section>

      <section className="section course-needs" aria-labelledby="course-needs-title">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="section-label">BẮT ĐẦU TỪ NHU CẦU CỦA BẠN</span>
              <h2 id="course-needs-title">Chọn khóa học dễ dàng hơn.</h2>
            </div>
            <p className="section-heading-aside">Mỗi hành trình có một điểm bắt đầu. Hãy chọn loại xe bạn muốn sử dụng.</p>
          </div>
          <div className="course-needs__grid">
            <article>
              <span className="course-needs__icon"><Bike size={25} aria-hidden="true" /></span>
              <h3>Đi lại hằng ngày</h3>
              <p>Khám phá khóa xe máy A1 hoặc tìm hiểu hạng A nếu bạn muốn sử dụng mô tô phân khối lớn.</p>
              <Link to="/khoa-hoc/hang-a1" className="text-link">Tìm hiểu hạng A1 <ArrowRight size={17} aria-hidden="true" /></Link>
            </article>
            <article>
              <span className="course-needs__icon"><CarFront size={25} aria-hidden="true" /></span>
              <h3>Xe cá nhân &amp; gia đình</h3>
              <p>Tìm hiểu B tự động để làm quen xe gia đình, hoặc B số sàn để rèn kỹ năng côn, số và điều khiển xe.</p>
              <Link to="/khoa-hoc/hang-b-tu-dong" className="text-link">Tìm hiểu B tự động <ArrowRight size={17} aria-hidden="true" /></Link>
            </article>
            <article>
              <span className="course-needs__icon"><Truck size={25} aria-hidden="true" /></span>
              <h3>Phục vụ công việc</h3>
              <p>Khóa C1 tập trung kỹ năng căn xe, quan sát và vận hành xe tải phục vụ nhu cầu công việc.</p>
              <Link to="/khoa-hoc/hang-c1" className="text-link">Tìm hiểu hạng C1 <ArrowRight size={17} aria-hidden="true" /></Link>
            </article>
          </div>
          <EnrollmentSchedule />
        </div>
      </section>
    </div>
  )
}
