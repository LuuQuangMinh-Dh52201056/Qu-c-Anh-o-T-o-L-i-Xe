import {
  ArrowRight,
  Award,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ClipboardCheck,
  Facebook,
  FileCheck2,
  GraduationCap,
  Headphones,
  MessageCircle,
  PhoneCall,
  Route,
  ShieldCheck,
  Gauge,
  Users,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

import CourseGroups from '../components/CourseGroups'

import RegistrationForm from '../components/RegistrationForm'

import TikTokSocialSection from '../components/TikTokSocialSection'

import logo from '../anh/anhLOGO.png'
import heroInstructor from '../anh/anhnen1.jpg'
import heroPresentation from '../anh/anhnen2.jpg'
import heroStudents from '../anh/anhnen4.jpg'
import heroPractice from '../anh/giaovientantinh.jpg'

const HERO_SLIDES = [
  {
    image: heroStudents,
    alt: 'Học viên tham gia khóa đào tạo lái xe',
    label: 'Đông đảo học viên tin tưởng',
    position: 'center 54%',
  },
  {
    image: heroPresentation,
    alt: 'Giáo viên Quốc Anh hướng dẫn lý thuyết',
    label: 'Hướng dẫn lý thuyết bài bản',
    position: 'center 47%',
  },
  {
    image: heroInstructor,
    alt: 'Giáo viên Quốc Anh và xe tập lái',
    label: 'Đồng hành cùng học viên',
    position: 'center 44%',
  },
  {
    image: heroPractice,
    alt: 'Học viên thực hành tại sân tập',
    label: 'Kinh nghiệm thực tế',
    position: 'center 45%',
  },
]

const journey = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'Tư vấn & đăng ký',
    description:
      'Tư vấn nhu cầu và lựa chọn khóa học phù hợp.',
  },

  {
    number: '02',
    icon: FileCheck2,
    title: 'Chuẩn bị hồ sơ',
    description:
      'Hỗ trợ chuẩn bị hồ sơ nhanh chóng và rõ ràng.',
  },

  {
    number: '03',
    icon: Gauge,
    title: 'Học & thực hành',
    description:
      'Kết hợp lý thuyết, sa hình và đường trường.',
  },

  {
    number: '04',
    icon: Award,
    title: 'Thi sát hạch',
    description:
      'Ôn luyện trọng tâm và chuẩn bị trước kỳ thi.',
  },

  {
    number: '05',
    icon: GraduationCap,
    title: 'Hoàn thành',
    description:
      'Theo sát học viên đến khi hoàn tất lộ trình.',
  },
]

const advantages = [
  {
    icon: Users,
    title: 'Giáo viên tận tâm',
    description:
      'Hướng dẫn chi tiết, dễ hiểu và điều chỉnh theo khả năng từng học viên.',
  },

  {
    icon: Route,
    title: 'Lộ trình rõ ràng',
    description:
      'Từng giai đoạn học được tổ chức khoa học để dễ theo dõi tiến độ.',
  },

  {
    icon: Headphones,
    title: 'Hỗ trợ tối đa',
    description:
      'Hỗ trợ hồ sơ, lịch học và giải đáp trong suốt quá trình đào tạo.',
  },

  {
    icon: ShieldCheck,
    title: 'Thực hành thực tế',
    description:
      'Chú trọng kỹ năng xử lý tình huống và khả năng làm chủ phương tiện.',
  },

  {
    icon: CalendarClock,
    title: 'Linh hoạt thời gian',
    description:
      'Lịch học có thể chủ động bố trí theo thời gian phù hợp.',
  },
]

export default function HomePage() {
  const [activeHeroSlide, setActiveHeroSlide] =
    useState(0)

  useEffect(() => {
    const sliderTimer = window.setInterval(() => {
      setActiveHeroSlide(
        (current) =>
          (current + 1) % HERO_SLIDES.length
      )
    }, 5500)

    return () => {
      window.clearInterval(sliderTimer)
    }
  }, [activeHeroSlide])

  const showPreviousHeroSlide = () => {
    setActiveHeroSlide(
      (current) =>
        (current - 1 + HERO_SLIDES.length) %
        HERO_SLIDES.length
    )
  }

  const showNextHeroSlide = () => {
    setActiveHeroSlide(
      (current) =>
        (current + 1) % HERO_SLIDES.length
    )
  }

  return (
    <>

      <section className="campaign-hero">
        <div className="campaign-hero__media">
          {HERO_SLIDES.map((slide, index) => (
            <img
              src={slide.image}
              alt={slide.alt}
              className={`campaign-hero__background${
                activeHeroSlide === index
                  ? ' is-active'
                  : ''
              }`}
              style={{
                objectPosition: slide.position,
              }}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              aria-hidden={activeHeroSlide !== index}
              key={slide.image}
            />
          ))}
        </div>

        <div className="campaign-hero__overlay" />
        <div className="campaign-hero__grid-pattern" />

        <div className="container campaign-hero__inner">
          <div className="campaign-hero__brand">
            <span>
              <img src={logo} alt="Quốc Anh Driving" />
            </span>

            <div>
              <small>Trung tâm đào tạo lái xe</small>
              <strong>Quốc Anh Driving</strong>
            </div>
          </div>

          <div className="campaign-hero__content">
            <div className="campaign-hero__eyebrow">
              <ShieldCheck size={17} />
              Đào tạo tận tâm · Thực hành bài bản
            </div>

            <h1>
              Học lái xe bài bản.
              <span>
                Tự tin trên mọi hành trình.
              </span>
            </h1>

            <p>
              Đồng hành từ lúc chọn hạng bằng, chuẩn bị hồ sơ,
              luyện sa hình đến khi hoàn thành kỳ thi sát hạch.
            </p>

            <div className="campaign-hero__licenses">
              <span>Hạng A</span>
              <span>Hạng A1</span>
              <span>B số sàn</span>
              <span>B tự động</span>
              <span>Hạng C1</span>
            </div>

            <a
              href="#khoa-hoc"
              className="campaign-hero__courses"
            >
              Xem lịch chiêu sinh
              <ArrowRight size={18} />
            </a>
          </div>

          <div
            className="campaign-hero__slider"
            aria-label="Chọn ảnh giới thiệu"
          >
            <div className="campaign-hero__slider-caption">
              <small>
                Khoảnh khắc tại trung tâm
              </small>
              <strong>
                {HERO_SLIDES[activeHeroSlide].label}
              </strong>
            </div>

            <div className="campaign-hero__slider-buttons">
              <button
                type="button"
                onClick={showPreviousHeroSlide}
                aria-label="Xem ảnh trước"
                className="campaign-hero__slider-arrow"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="campaign-hero__slider-dots">
                {HERO_SLIDES.map((slide, index) => (
                  <button
                    type="button"
                    className={
                      activeHeroSlide === index
                        ? 'is-active'
                        : ''
                    }
                    onClick={() =>
                      setActiveHeroSlide(index)
                    }
                    aria-label={`Xem ảnh ${index + 1}: ${slide.label}`}
                    aria-current={
                      activeHeroSlide === index
                        ? 'true'
                        : undefined
                    }
                    key={slide.image}
                  >
                    <span aria-hidden="true" />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={showNextHeroSlide}
                aria-label="Xem ảnh tiếp theo"
                className="campaign-hero__slider-arrow"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="campaign-hero__contact-dock">
            <a
              href="https://www.facebook.com/quocanh.truong.790693"
              target="_blank"
              rel="noopener noreferrer"
              className="campaign-hero__social campaign-hero__social--facebook"
            >
              <Facebook size={21} />
              <span>Facebook</span>
            </a>

            <a
              href="https://zalo.me/0879227614"
              target="_blank"
              rel="noopener noreferrer"
              className="campaign-hero__social campaign-hero__social--zalo"
            >
              <MessageCircle size={21} />
              <span>Zalo</span>
            </a>

            <Link
              to="/dang-ky"
              className="campaign-hero__register"
            >
              Đăng ký ngay
              <ArrowRight size={18} />
            </Link>

            <a
              href="tel:0879227614"
              className="campaign-hero__hotline"
            >
              <span>
                <PhoneCall size={20} />
              </span>
              <div>
                <small>Hotline tư vấn</small>
                <strong>0879 227 614</strong>
              </div>
            </a>
          </div>
        </div>

        <div className="campaign-hero__bottom-line" />
      </section>


      <section
        className="section courses-section"
        id="khoa-hoc"
      >

        <div className="container">

          <div className="section-heading">

            <span className="section-label">
              Các khóa đào tạo
            </span>

            <h2>
              Chọn hạng bằng phù hợp
              với nhu cầu của bạn
            </h2>

            <p>
              Quốc Anh đào tạo các hạng A,
              A1, B số sàn, B tự động và C1
              với lộ trình rõ ràng, thực hành
              bài bản và hỗ trợ xuyên suốt.
            </p>

          </div>

          <CourseGroups />

        </div>

      </section>


      <section
        className="section journey-section"
        id="lo-trinh"
      >

        <div className="container">

          <div className="journey-wrapper">

            <div className="journey-heading">

              <span>
                Lộ trình đào tạo
              </span>

              <h2>
                Quy trình rõ ràng từ
                đăng ký đến hoàn thành
              </h2>

            </div>

            <div className="journey-grid">

              {journey.map(
                (
                  {
                    number,
                    icon: Icon,
                    title,
                    description,
                  },
                  index
                ) => (
                  <div
                    className="journey-card"
                    key={number}
                  >

                    <div className="journey-circle">

                      <Icon size={27} />

                      <span>
                        {number}
                      </span>

                    </div>

                    <h3>
                      {title}
                    </h3>

                    <p>
                      {description}
                    </p>

                    {index <
                      journey.length -
                        1 && (
                      <div className="journey-link">
                        →
                      </div>
                    )}

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </section>


      <section className="section advantages-section">

        <div className="container">

          <div className="section-heading">

            <span className="section-label">
              Quốc Anh Driving
            </span>

            <h2>
              Vì sao học viên lựa chọn
              Quốc Anh?
            </h2>

          </div>

          <div className="advantages-grid">

            {advantages.map(
              ({
                icon: Icon,
                title,
                description,
              }) => (
                <article
                  className="advantage-card"
                  key={title}
                >

                  <div className="advantage-icon">

                    <Icon />

                  </div>

                  <h3>
                    {title}
                  </h3>

                  <p>
                    {description}
                  </p>

                </article>
              )
            )}

          </div>

        </div>

      </section>


      <TikTokSocialSection />


      <section className="section registration-section">

        <div className="container">

          <div className="registration-wrapper">

            <div className="registration-copy">

              <span className="registration-tag">
                Đăng ký học lái xe
              </span>

              <h2>
                Nhận tư vấn miễn phí
              </h2>

              <p>
                Để lại thông tin để Quốc Anh
                hỗ trợ chọn hạng bằng, lịch
                học và lộ trình phù hợp.
              </p>

              <div className="registration-points">

                <div>

                  <CheckCircle2 />

                  Tư vấn khóa học phù hợp

                </div>

                <div>

                  <CheckCircle2 />

                  Hỗ trợ chuẩn bị hồ sơ

                </div>

                <div>

                  <CheckCircle2 />

                  Chủ động lịch học

                </div>

                <div>

                  <CheckCircle2 />

                  Hỗ trợ trong quá trình học

                </div>

              </div>

              <a
                href="tel:0879227614"
                className="registration-hotline"
              >

                <PhoneCall />

                <div>

                  <span>
                    Gọi ngay để tư vấn
                  </span>

                  <strong>
                    0879 227 614
                  </strong>

                </div>

              </a>

            </div>

            <RegistrationForm compact />

          </div>

        </div>

      </section>

    </>
  )
}
