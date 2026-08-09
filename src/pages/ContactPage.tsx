import {
  Mail,
  MapPin,
  PhoneCall,
} from 'lucide-react'

export default function ContactPage() {
  return (
    <section className="section normal-page">

      <div className="container">

        <div className="section-heading">

          <span className="section-label">
            Liên hệ
          </span>

          <h1>
            Kết nối với Quốc Anh
          </h1>

          <p>
            Liên hệ để được tư vấn các khóa
            A, A1, B số sàn, B tự động và C1.
          </p>

        </div>

        <div className="contact-grid">

          <div className="contact-card">

            <PhoneCall />

            <span>
              Điện thoại
            </span>

            <strong>
              0879 227 614
            </strong>

          </div>

          <div className="contact-card">

            <Mail />

            <span>
              Email
            </span>

            <strong>
              quocanh.daotaolaixe@gmail.com
            </strong>

          </div>

          <div className="contact-card">

            <MapPin />

            <span>
              Địa điểm
            </span>

            <strong>
              300 Đ. Vành Đai Đhqg Hcm, KP, Đông Hòa, Hồ Chí Minh, Việt Nam
            </strong>

          </div>

        </div>

      </div>

    </section>
  )
}