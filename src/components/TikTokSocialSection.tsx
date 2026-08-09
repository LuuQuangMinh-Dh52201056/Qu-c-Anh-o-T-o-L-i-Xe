import {
  ArrowUpRight,
  CheckCircle2,
  Film,
  Sparkles,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

const TIKTOK_PROFILE_URL =
  'https://www.tiktok.com/@quoc.anh.dtlx.binhduong'

const TIKTOK_USERNAME =
  'quoc.anh.dtlx.binhduong'

function TikTokIcon({
  size = 28,
}: {
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14.5 3C14.9 5.2 16.2 6.7 18.5 7.1V10.2C16.9 10.2 15.6 9.7 14.5 8.9V15.1C14.5 18.3 11.9 21 8.6 21C5.3 21 2.8 18.4 2.8 15.1C2.8 11.9 5.4 9.2 8.7 9.2C9.1 9.2 9.5 9.2 9.9 9.3V12.5C9.5 12.3 9.1 12.2 8.7 12.2C7.1 12.2 5.8 13.5 5.8 15.1C5.8 16.7 7 18 8.6 18C10.2 18 11.5 16.7 11.5 15.1V3H14.5Z" />
    </svg>
  )
}

export default function TikTokSocialSection() {
  const [embedReady, setEmbedReady] =
    useState(false)

  useEffect(() => {
    const previousScript =
      document.getElementById(
        'tiktok-creator-embed-script'
      )

    previousScript?.remove()

    const script =
      document.createElement('script')

    script.id =
      'tiktok-creator-embed-script'
    script.src =
      'https://www.tiktok.com/embed.js'
    script.async = true

    document.body.appendChild(script)

    let embedCheckCount = 0
    const embedCheckTimer =
      window.setInterval(() => {
        const iframe = document.querySelector(
          '#mang-xa-hoi .tiktok-embed iframe'
        ) as HTMLIFrameElement | null

        const reportedHeight = Number.parseFloat(
          iframe?.style.height ?? '0'
        )

        if (reportedHeight > 100) {
          setEmbedReady(true)
          window.clearInterval(
            embedCheckTimer
          )
        }

        embedCheckCount += 1

        if (embedCheckCount >= 40) {
          window.clearInterval(
            embedCheckTimer
          )
        }
      }, 500)

    const scrollTimer = window.setTimeout(() => {
      if (
        window.location.hash ===
        '#mang-xa-hoi'
      ) {
        document
          .getElementById('mang-xa-hoi')
          ?.scrollIntoView({
            block: 'start',
          })
      }
    }, 250)

    return () => {
      window.clearTimeout(scrollTimer)
      window.clearInterval(embedCheckTimer)
      script.remove()
    }
  }, [])

  return (
    <section
      id="mang-xa-hoi"
      className="social-showcase-section"
    >
      <div className="social-showcase-pattern" />
      <div className="social-showcase-glow social-showcase-glow--cyan" />
      <div className="social-showcase-glow social-showcase-glow--pink" />

      <div className="container social-showcase-container">
        <div className="social-showcase-heading">
          <span>
            <Sparkles size={15} />
            Mạng xã hội Quốc Anh Driving
          </span>

          <h2>
            Xem bài học thật.
            <br />
            Theo dõi hành trình thật.
          </h2>

          <p>
            Video mới từ kênh TikTok chính thức được cập nhật
            trực tiếp để học viên dễ hình dung trước khi đăng ký.
          </p>
        </div>

        <div className="social-showcase-grid">
          <aside className="social-profile-card">
            <div className="social-profile-card__logo">
              <TikTokIcon size={31} />
            </div>

            <span className="social-profile-card__label">
              Kênh TikTok chính thức
            </span>

            <h3>
              Quốc Anh
              <br />
              Đào tạo lái xe
            </h3>

            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-profile-card__handle"
            >
              @{TIKTOK_USERNAME}
            </a>

            <p>
              Theo dõi để nhận video hướng dẫn thi,
              mẹo xử lý bài và những buổi học thực tế mới nhất.
            </p>

            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-profile-card__follow"
            >
              <TikTokIcon size={19} />
              Theo dõi trên TikTok
              <ArrowUpRight size={17} />
            </a>

            <div className="social-profile-card__live">
              <span />
              Nội dung mới được cập nhật từ TikTok
            </div>
          </aside>

          <div className="social-embed-card">
            <div className="social-embed-card__bar">
              <div>
                <span />
                <span />
                <span />
              </div>

              <strong>
                Video mới nhất
              </strong>

              <small>
                TikTok Creator Feed
              </small>
            </div>

            <div
              className={`social-embed-card__content${
                embedReady ? ' is-ready' : ''
              }`}
            >
              {!embedReady && (
                <div className="social-embed-fallback">
                  <div className="social-embed-fallback__brand">
                    <span>
                      <TikTokIcon size={25} />
                    </span>

                    <div>
                      <small>
                        Nội dung thực tế mỗi tuần
                      </small>
                      <strong>
                        Video mới từ Quốc Anh
                      </strong>
                    </div>
                  </div>

                  <div className="social-embed-fallback__previews">
                    {[
                      'Hướng dẫn thi A, A1',
                      'Mẹo thi BSS, BTĐ, C1',
                      'Buổi học thực tế',
                    ].map((title, index) => (
                      <a
                        href={TIKTOK_PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={title}
                      >
                        <span>
                          <Film size={19} />
                        </span>
                        <small>
                          Video {String(index + 1).padStart(2, '0')}
                        </small>
                        <strong>{title}</strong>
                        <i>
                          Xem trên TikTok
                          <ArrowUpRight size={13} />
                        </i>
                      </a>
                    ))}
                  </div>

                  <p>
                    TikTok đang tải nội dung mới nhất. Nếu trình duyệt
                    chặn video nhúng, bạn vẫn có thể mở ngay kênh chính thức.
                  </p>

                  <a
                    href={TIKTOK_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-embed-fallback__open"
                  >
                    Mở kênh TikTok Quốc Anh
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              )}

              <blockquote
                className="tiktok-embed"
                cite={TIKTOK_PROFILE_URL}
                data-unique-id={TIKTOK_USERNAME}
                data-embed-type="creator"
                data-embed-from="oembed"
                style={{
                  maxWidth: '720px',
                  minWidth: '288px',
                  margin: '0 auto',
                }}
              >
                <section>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${TIKTOK_PROFILE_URL}?refer=creator_embed`}
                  >
                    @{TIKTOK_USERNAME}
                  </a>
                </section>
              </blockquote>
            </div>
          </div>

          <aside className="social-learning-card">
            <div className="social-learning-card__icon">
              <Film size={25} />
            </div>

            <span>
              Học trước qua video
            </span>

            <h3>
              Biết trước bài thi,
              tự tin hơn khi học
            </h3>

            <div className="social-learning-card__list">
              <div>
                <CheckCircle2 size={18} />
                Video hướng dẫn bài thi
              </div>

              <div>
                <CheckCircle2 size={18} />
                Kinh nghiệm sa hình thực tế
              </div>

              <div>
                <CheckCircle2 size={18} />
                Khoảnh khắc cùng học viên
              </div>
            </div>

            <Link
              to="/dang-ky"
              className="social-learning-card__register"
            >
              Đăng ký tư vấn
              <ArrowUpRight size={17} />
            </Link>

            <small>
              Tư vấn miễn phí theo nhu cầu và hạng xe.
            </small>
          </aside>
        </div>
      </div>
    </section>
  )
}
