import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, CirclePlay, MessageCircle, Phone } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import CourseCard from '../components/CourseCard'
import { courses } from '../data/courses'
import { getCourseDetailVideos, type CourseVideo } from '../data/courseVideos'
import { CONTACT } from '../data/contact'

function CourseVideoCard({ video }: { video: CourseVideo }) {
  return (
    <article className="course-video-card">
      <div className="course-video-card__media">
        {video.embedUrl.toLowerCase().includes('.mp4') ? (
          <video controls playsInline preload="none" poster={video.poster} aria-label={video.title}>
            <source src={video.embedUrl} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video. <a href={video.embedUrl}>Mở video hướng dẫn</a>.
          </video>
        ) : (
          <iframe
            src={video.embedUrl}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div className="course-video-card__body">
        <span className="section-label">{video.eyebrow}</span>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
    </article>
  )
}

export default function CourseDetailPage() {
  const { slug } = useParams()
  const course = courses.find((item) => item.slug === slug)

  if (!course) {
    return (
      <section className="section course-not-found">
        <div className="container">
          <span className="section-label">KHÓA HỌC</span>
          <h1>Chưa tìm thấy khóa học này.</h1>
          <p>Đường dẫn có thể đã thay đổi. Bạn có thể xem các khóa học hiện có hoặc nhắn admin để được hỗ trợ.</p>
          <div className="course-not-found__actions">
            <Link to="/khoa-hoc" className="btn btn-primary"><ArrowLeft size={17} aria-hidden="true" /> Xem tất cả khóa học</Link>
            <a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Chat với admin <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    )
  }

  const isMotorcycle = course.code === 'A' || course.code === 'A1'
  const courseVideos = getCourseDetailVideos(course).filter((video) => video.embedUrl)
  const relatedCourses = courses.filter((item) => item.code !== course.code).slice(0, 3)
  const faqs = [
    {
      question: 'Học phí của khóa học là bao nhiêu?',
      answer: `Mức học phí tham khảo hiện có là ${course.price}. Nhắn Zalo hoặc gọi ${CONTACT.phoneDisplay} để xác nhận mức phí theo hồ sơ, các khoản phí liên quan và cách thanh toán trước khi đăng ký.`,
    },
    {
      question: 'Khi nào có lớp và tôi có thể chọn lịch học không?',
      answer: 'Lịch khai giảng và lịch thực hành được xác nhận trực tiếp với admin. Hãy chia sẻ thời gian rảnh và nhu cầu học để được tư vấn lớp phù hợp.',
    },
    {
      question: 'Tôi cần chuẩn bị hồ sơ gì?',
      answer: 'Văn phòng Linh Xuân sẽ hướng dẫn hồ sơ và thông tin đăng ký áp dụng cho khóa bạn chọn. Bạn có thể trao đổi trước qua Zalo để chuẩn bị đầy đủ khi đến văn phòng.',
    },
    {
      question: 'Làm sao để trao đổi riêng với người tư vấn?',
      answer: `Chọn “Chat Zalo với admin” để mở cuộc trò chuyện trực tiếp qua số ${CONTACT.phoneDisplay}. Bạn cũng có thể gọi hotline khi cần trao đổi bằng điện thoại.`,
    },
  ]

  return (
    <div className="course-detail">
      <section className="course-detail__hero">
        <div className="container">
          <nav className="page-breadcrumb course-detail__breadcrumb" aria-label="Đường dẫn trang">
            <Link to="/">Trang chủ</Link><span aria-hidden="true">/</span>
            <Link to="/khoa-hoc">Khóa học</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{course.title}</span>
          </nav>
          <div className="course-detail__hero-grid">
            <div className="course-detail__intro">
              <span className="section-label">KHÓA ĐÀO TẠO {isMotorcycle ? 'XE MÁY' : 'Ô TÔ'}</span>
              <h1>{course.title}</h1>
              <p className="course-detail__subtitle">{course.subtitle}</p>
              <p className="course-detail__description">{course.description}</p>
              <div className="course-detail__hero-actions">
                <a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <MessageCircle size={18} aria-hidden="true" /> Chat Zalo với admin
                </a>
                <a href="#noi-dung-khoa-hoc" className="course-detail__anchor">Xem nội dung <ArrowRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="course-detail__image">
              <img src={course.image} alt={`${course.title} – ${course.subtitle}`} decoding="async" />
              <span>{course.subtitle} · {course.title}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section course-detail__body">
        <div className="container course-detail__layout">
          <div className="course-detail__main">
            <section className="course-detail__section" id="noi-dung-khoa-hoc">
              <span className="section-label">NỘI DUNG ĐÀO TẠO</span>
              <h2>Vững kỹ năng.<br />Tự tin sau tay lái.</h2>
              <p>{course.summary}</p>
              <ol className="course-detail__curriculum">
                {course.bullets.map((bullet, index) => (
                  <li key={bullet}>
                    <span className="course-detail__step">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{bullet}</h3></div>
                    <Check size={18} aria-hidden="true" />
                  </li>
                ))}
              </ol>
            </section>

            <section className="course-detail__section course-detail__audience">
              <span className="section-label">DÀNH CHO BẠN</span>
              <h2>Khóa học này phù hợp với ai?</h2>
              <p>{course.audience}</p>
              <a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                Trao đổi về nhu cầu của bạn <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </section>

            {courseVideos.length > 0 && (
              <section className="course-detail__section course-videos" id="video-khoa-hoc">
                <span className="section-label"><CirclePlay size={15} aria-hidden="true" /> VIDEO HƯỚNG DẪN</span>
                <h2>Hiểu bài thi trước khi bắt đầu.</h2>
                <div className="course-videos__grid">
                  {courseVideos.map((video) => <CourseVideoCard key={video.id} video={video} />)}
                </div>
              </section>
            )}

            <section className="course-detail__section course-detail__faq">
              <span className="section-label">GIẢI ĐÁP TRƯỚC KHI HỌC</span>
              <h2>Câu hỏi thường gặp.</h2>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<ChevronDown size={18} aria-hidden="true" /></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>
          </div>

          <aside className="course-detail__sidebar" aria-label="Thông tin khóa học và liên hệ">
            <div className="course-detail__contact-card">
              <span className="section-label">TƯ VẤN TUYỂN SINH LINH XUÂN</span>
              <h2>{course.title}</h2>
              <dl className="course-detail__facts">
                <div><dt>Phương tiện</dt><dd>{course.subtitle}</dd></div>
                <div><dt>Học phí tham khảo</dt><dd className="course-detail__price">{course.price}</dd></div>
                <div><dt>Lịch khai giảng</dt><dd>Liên hệ để xác nhận</dd></div>
              </dl>
              <p>Văn phòng Linh Xuân hỗ trợ bạn xác nhận lịch học, học phí và hồ sơ phù hợp.</p>
              <a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle size={18} aria-hidden="true" /> Chat Zalo với admin
              </a>
              <a href={CONTACT.phoneUrl} className="btn btn-secondary"><Phone size={17} aria-hidden="true" /> {CONTACT.phoneDisplay}</a>
              <small>Kết nối trực tiếp 1:1 qua Zalo</small>
            </div>
          </aside>
        </div>
      </section>

      <section className="section course-detail__related">
        <div className="container">
          <div className="section-heading-row">
            <div><span className="section-label">KHÁM PHÁ THÊM</span><h2>Các khóa học khác.</h2></div>
            <Link to="/khoa-hoc" className="text-link">Tất cả khóa học <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="course-catalog__grid">
            {relatedCourses.map((item) => <CourseCard course={item} key={item.code} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
