import {
  CheckCircle2,
  PhoneCall,
} from 'lucide-react'

import { useSearchParams } from 'react-router-dom'

import RegistrationForm from '../components/RegistrationForm'

export default function RegisterPage() {
  const [searchParams] =
    useSearchParams()

  const defaultCourse =
    searchParams.get('course') || ''

  return (
    <section className="section register-page">

      <div className="container">

        <div className="register-page-grid">

          <div className="register-page-copy">

            <span>
              Quốc Anh Driving
            </span>

            <h1>
              Đăng ký học lái xe
            </h1>

            <p>
              Gửi thông tin để được hỗ trợ
              lựa chọn khóa học phù hợp.
            </p>

            <div className="register-page-benefits">

              <div>
                <CheckCircle2 />
                Tư vấn hạng học
              </div>

              <div>
                <CheckCircle2 />
                Hỗ trợ hồ sơ
              </div>

              <div>
                <CheckCircle2 />
                Chủ động lịch học
              </div>

              <div>
                <CheckCircle2 />
                Theo sát quá trình học
              </div>

            </div>

            <a
              href="tel:0879227614"
              className="register-page-phone"
            >

              <PhoneCall />

              <div>

                <small>
                  Hotline
                </small>

                <strong>
                  0879 227 614
                </strong>

              </div>

            </a>

          </div>

          <RegistrationForm
            defaultCourse={
              defaultCourse
            }
          />

        </div>

      </div>

    </section>
  )
}