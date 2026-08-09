import {
  Facebook,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

import { Link } from 'react-router-dom'


const logo = new URL(
  '../anh/anhLOGO.png',
  import.meta.url
).href


function TikTokIcon({
  size = 19,
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
      <path
        d="
          M14.5 3
          C14.9 5.2 16.2 6.7 18.5 7.1
          V10.2
          C16.9 10.2 15.6 9.7 14.5 8.9
          V15.1
          C14.5 18.3 11.9 21 8.6 21
          C5.3 21 2.8 18.4 2.8 15.1
          C2.8 11.9 5.4 9.2 8.7 9.2
          C9.1 9.2 9.5 9.2 9.9 9.3
          V12.5
          C9.5 12.3 9.1 12.2 8.7 12.2
          C7.1 12.2 5.8 13.5 5.8 15.1
          C5.8 16.7 7 18 8.6 18
          C10.2 18 11.5 16.7 11.5 15.1
          V3
          H14.5
          Z
        "
      />
    </svg>
  )
}


export default function Footer() {
  return (
    <footer className="site-footer">

      {/* GOLD LINE */}

      <div className="footer-gold-line" />


      <div className="container footer-grid">

        {/* BRAND */}

        <div className="footer-brand">

          <Link
            to="/"
            className="footer-logo"
          >
            <img
              src={logo}
              alt="Quốc Anh - Giáo viên đào tạo lái xe"
            />
          </Link>


          <p>
            Giáo viên đào tạo lái xe.
            Đồng hành cùng học viên trong
            hành trình xây dựng kỹ năng
            lái xe an toàn, tự tin và chủ động.
          </p>


          <div className="footer-license">

            <span>
              Đào tạo
            </span>

            <strong>
              A • A1 • BSS • BTĐ • C1
            </strong>

          </div>

        </div>



        {/* CONTACT */}

        <div className="footer-column">

          <h3>
            Thông tin liên hệ
          </h3>


          <a
            href="tel:0879227614"
            className="footer-contact-item"
          >

            <span className="footer-contact-icon">
              <Phone size={16} />
            </span>


            <div>

              <small>
                Hotline tư vấn
              </small>

              <strong>
                0879 227 614
              </strong>

            </div>

          </a>


          <a
            href="mailto:quocanhdaotaolaixe@gmail.com"
            className="footer-contact-item"
          >

            <span className="footer-contact-icon">
              <Mail size={16} />
            </span>


            <div>

              <small>
                Email
              </small>

              <strong>
                quocanhdaotaolaixe@gmail.com
              </strong>

            </div>

          </a>


          <div className="footer-contact-item">

            <span className="footer-contact-icon">
              <MapPin size={16} />
            </span>


            <div>

              <small>
                Địa điểm đào tạo
              </small>

              <strong>
               300 Đ. Vành Đai Đhqg Hcm, KP, Đông Hòa, Hồ Chí Minh, Việt Nam
              </strong>

            </div>

          </div>

        </div>



        {/* LINKS */}

        <div className="footer-column">

          <h3>
            Khám phá
          </h3>


          <nav className="footer-links">

            <Link to="/">
              Trang chủ
            </Link>

            <Link to="/khoa-hoc">
              Các khóa học
            </Link>

            <Link to="/dang-ky">
              Đăng ký học
            </Link>

            <Link to="/lien-he">
              Liên hệ
            </Link>

          </nav>

        </div>



        {/* SOCIAL */}

        <div className="footer-column">

          <h3>
            Kết nối
          </h3>


          <p className="footer-social-text">
            Theo dõi để cập nhật lịch học,
            kinh nghiệm lái xe và thông tin
            tuyển sinh mới.
          </p>


          <div className="footer-social">

            {/* FACEBOOK */}

            <a
              href="https://www.facebook.com/quocanh.truong.790693"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook Quốc Anh"
            >
              <Facebook size={19} />
            </a>


            {/* TIKTOK */}

            <a
              href="https://www.tiktok.com/@quoc.anh.dtlx.binhduong"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              title="TikTok Quốc Anh"
            >
              <TikTokIcon size={19} />
            </a>

          </div>


          <Link
            to="/dang-ky"
            className="footer-register"
          >
            Đăng ký tư vấn
          </Link>

        </div>

      </div>



      {/* BOTTOM */}

      <div className="footer-bottom">

        <div className="container footer-bottom-inner">

          <span>
            © 2026 Quốc Anh — Giáo viên đào tạo lái xe thuộc trung tâm giáo dục nghề nghiệp Phú Giáo
          </span>


          <span>
            A • A1 • BSS • BTĐ • C1
          </span>

        </div>

      </div>

    </footer>
  )
}