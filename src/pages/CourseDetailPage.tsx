import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  CirclePlay,
  Clapperboard,
  GraduationCap,
  Headphones,
  PhoneCall,
  Route,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react'

import {
  Link,
  useParams,
} from 'react-router-dom'

import { courses } from '../data/courses'

import {
  getCourseDetailVideos,
  type CourseVideo,
} from '../data/courseVideos'


function CourseVideoCard({
  video,
}: {
  video: CourseVideo
}) {
  return (
    <article className="course-video-card">

      <div className="course-video-media">

        {video.embedUrl ? (
          video.embedUrl.toLowerCase().includes('.mp4') ? (
            <video
              controls
              playsInline
              preload="metadata"
              poster={video.poster}
              aria-label={video.title}
            >
              <source
                src={video.embedUrl}
                type="video/mp4"
              />
              Trình duyệt của bạn không hỗ trợ phát video.
            </video>
          ) : (
            <iframe
              src={video.embedUrl}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )
        ) : (
          <>
            <img
              src={video.poster}
              alt=""
              loading="lazy"
            />

            <div className="course-video-overlay" />

            <div className="course-video-badge">
              <Clapperboard size={15} />
              {video.eyebrow}
            </div>

            <div className="course-video-play">
              <span>
                <CirclePlay size={31} />
              </span>

              <strong>
                Video đang được cập nhật
              </strong>

              <small>
                Khung phát đã sẵn sàng
              </small>
            </div>
          </>
        )}

      </div>

      <div className="course-video-content">
        <span>
          {video.eyebrow}
        </span>

        <h3>
          {video.title}
        </h3>

        <p>
          {video.description}
        </p>
      </div>

    </article>
  )
}


export default function CourseDetailPage() {
  const { slug } = useParams()

  const course = courses.find(
    (item) => item.slug === slug
  )

  if (!course) {
    return (
      <section className="premium-detail-not-found">

        <div className="container">

          <h1>
            Không tìm thấy khóa học
          </h1>

          <p>
            Khóa học bạn đang tìm kiếm hiện không tồn tại.
          </p>

          <Link to="/khoa-hoc">
            Quay lại danh sách khóa học
          </Link>

        </div>

      </section>
    )
  }

  const courseVideos =
    getCourseDetailVideos(course)

  return (
    <>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="premium-course-detail">

        <div className="premium-detail-pattern" />

        <div className="container">

          {/* BREADCRUMB */}

          <div className="premium-detail-breadcrumb">

            <Link to="/khoa-hoc">
              <ArrowLeft size={15} />

              Tất cả khóa học
            </Link>

            <span>/</span>

            <strong>
              {course.title}
            </strong>

          </div>


          <div className="premium-detail-grid">

            {/* =========================
                LEFT
            ========================== */}

            <div className="premium-detail-content">

              <div className="premium-detail-topline">

                <span className="premium-detail-code">
                  {course.code}
                </span>

                <div className="premium-detail-label">
                  <Sparkles size={14} />

                  Khóa đào tạo lái xe
                </div>

              </div>


              <h1>
                {course.title}
              </h1>


              <h2>
                {course.subtitle}
              </h2>


              <p className="premium-detail-description">
                {course.description}
              </p>


              <div className="premium-detail-price">
                <span>
                  <WalletCards size={22} />
                </span>

                <div>
                  <small>
                    Học phí tham khảo
                  </small>

                  <strong>
                    {course.price}
                  </strong>

                  <p>
                    Mức phí tạm tính, vui lòng liên hệ để nhận
                    báo giá chính xác theo hồ sơ.
                  </p>
                </div>
              </div>


              {/* QUICK FEATURES */}

              <div className="premium-detail-quick">

                <div>
                  <span>
                    <ShieldCheck size={18} />
                  </span>

                  <section>
                    <strong>
                      Học bài bản
                    </strong>

                    <small>
                      Theo lộ trình rõ ràng
                    </small>
                  </section>
                </div>


                <div>
                  <span>
                    <Route size={18} />
                  </span>

                  <section>
                    <strong>
                      Thực hành thực tế
                    </strong>

                    <small>
                      Chú trọng kỹ năng lái
                    </small>
                  </section>
                </div>


                <div>
                  <span>
                    <Headphones size={18} />
                  </span>

                  <section>
                    <strong>
                      Hỗ trợ xuyên suốt
                    </strong>

                    <small>
                      Đồng hành cùng học viên
                    </small>
                  </section>
                </div>

              </div>


              {/* TRAINING CONTENT */}

              <div className="premium-detail-box">

                <div className="premium-detail-box-title">

                  <span>
                    <GraduationCap size={20} />
                  </span>

                  <div>
                    <small>
                      NỘI DUNG KHÓA HỌC
                    </small>

                    <h3>
                      Nội dung đào tạo chính
                    </h3>
                  </div>

                </div>


                <div className="premium-training-list">

                  {course.bullets.map(
                    (bullet, index) => (
                      <div
                        className="premium-training-item"
                        key={bullet}
                      >

                        <span className="premium-training-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <CheckCircle2 size={18} />

                        <p>
                          {bullet}
                        </p>

                      </div>
                    )
                  )}

                </div>

              </div>


              {/* AUDIENCE */}

              <div className="premium-audience">

                <div className="premium-audience-icon">
                  <Award size={23} />
                </div>

                <div>

                  <span>
                    ĐỐI TƯỢNG PHÙ HỢP
                  </span>

                  <h3>
                    Khóa học này dành cho ai?
                  </h3>

                  <p>
                    {course.audience}
                  </p>

                </div>

              </div>


              {/* CTA */}

              <div className="premium-detail-actions">

                <Link
                  to={`/dang-ky?course=${encodeURIComponent(
                    course.code
                  )}`}
                  className="premium-detail-register"
                >
                  Đăng ký khóa {course.code}

                  <ArrowRight size={17} />
                </Link>


                <a
                  href="tel:0879227614"
                  className="premium-detail-call"
                >
                  <PhoneCall size={17} />

                  <div>
                    <small>
                      Cần tư vấn?
                    </small>

                    <strong>
                      0879 227 614
                    </strong>
                  </div>
                </a>

              </div>

            </div>



            {/* =========================
                RIGHT
            ========================== */}

            <aside className="premium-detail-visual">

              <div className="premium-detail-photo">

                <img
                  src={course.image}
                  alt={`${course.title} - ${course.subtitle}`}
                />

                <div className="premium-photo-overlay" />


                <div className="premium-photo-badge">

                  <ShieldCheck size={15} />

                  Đào tạo thực tế

                </div>


                <div className="premium-photo-bottom">

                  <span>
                    KHÓA ĐÀO TẠO
                  </span>

                  <div>

                    <strong>
                      {course.code}
                    </strong>

                    <section>

                      <h3>
                        {course.title}
                      </h3>

                      <p>
                        {course.subtitle}
                      </p>

                    </section>

                  </div>

                </div>

              </div>


              {/* SIDE INFORMATION */}

              <div className="premium-side-card">

                <div className="premium-side-card-head">

                  <span>
                    QUỐC ANH DRIVING
                  </span>

                  <h3>
                    Sẵn sàng bắt đầu?
                  </h3>

                  <p>
                    Để lại thông tin để được hỗ trợ
                    lựa chọn lộ trình học phù hợp.
                  </p>

                </div>


                <div className="premium-side-benefits">

                  <div>
                    <CheckCircle2 />
                    Tư vấn hạng bằng
                  </div>

                  <div>
                    <CheckCircle2 />
                    Hỗ trợ hồ sơ
                  </div>

                  <div>
                    <CheckCircle2 />
                    Chủ động lịch học
                  </div>

                </div>


                <Link
                  to={`/dang-ky?course=${encodeURIComponent(
                    course.code
                  )}`}
                >
                  Đăng ký tư vấn

                  <ArrowRight size={16} />
                </Link>

              </div>

            </aside>

          </div>

        </div>

      </section>


      {/* =====================================================
          COURSE VIDEOS
      ===================================================== */}

      {courseVideos.length > 0 && (
        <section
          className="course-videos-section"
          id="video-khoa-hoc"
        >

        <div className="course-videos-pattern" />

        <div className="container course-videos-container">

          <div className="course-videos-heading">

            <div className="course-videos-heading-icon">
              <CirclePlay size={24} />
            </div>

            <div>
              <span>
                Video giới thiệu thực tế
              </span>

              <h2>
                Xem trước hành trình học và thi
              </h2>

              <p>
                Tìm hiểu trung tâm, cách đào tạo và quy trình
                sát hạch trước khi lựa chọn khóa học phù hợp.
              </p>
            </div>

          </div>

          <div className="course-videos-grid">
            {courseVideos.map((video) => (
              <CourseVideoCard
                key={video.id}
                video={video}
              />
            ))}
          </div>

        </div>

        </section>
      )}



      {/* =====================================================
          BOTTOM TRUST
      ===================================================== */}

      <section className="premium-detail-trust">

        <div className="container premium-detail-trust-grid">

          <div>

            <span>
              <ShieldCheck />
            </span>

            <section>
              <strong>
                Đào tạo bài bản
              </strong>

              <p>
                Tập trung kỹ năng thực tế
              </p>
            </section>

          </div>


          <div>

            <span>
              <GraduationCap />
            </span>

            <section>
              <strong>
                Hướng dẫn tận tâm
              </strong>

              <p>
                Theo sát từng học viên
              </p>
            </section>

          </div>


          <div>

            <span>
              <Route />
            </span>

            <section>
              <strong>
                Lộ trình rõ ràng
              </strong>

              <p>
                Biết mình đang học đến đâu
              </p>
            </section>

          </div>


          <div>

            <span>
              <PhoneCall />
            </span>

            <section>
              <strong>
                0879 227 614
              </strong>

              <p>
                Hotline tư vấn
              </p>
            </section>

          </div>

        </div>

      </section>

    </>
  )
}
