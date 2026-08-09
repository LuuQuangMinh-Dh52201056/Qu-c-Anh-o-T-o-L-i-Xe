import {
  ArrowUpRight,
  BellRing,
  CalendarDays,
  PhoneCall,
} from 'lucide-react'

import { Link } from 'react-router-dom'

const enrollmentRows = [
  {
    course: 'HẠNG A1 (mô tô đến 125 phân khối)',
    opening: 'Hàng tuần',
  },
  {
    course: 'HẠNG A (mô tô trên 125 phân khối)',
    opening: 'Hàng tuần',
  },
  {
    course: 'HẠNG B (ô tô 4 bánh số tự động)',
    opening: 'Hàng tháng',
  },
  {
    course: 'HẠNG B (ô tô 4 bánh số sàn)',
    opening: 'Hàng tháng',
  },
  {
    course: 'HẠNG C1',
    opening: 'Hàng tháng',
  },
  {
    course: 'NÂNG HẠNG B LÊN C',
    opening: 'Hàng tháng',
  },
  {
    course: 'NÂNG HẠNG B LÊN D1',
    opening: 'Hàng tháng',
  },
  {
    course: 'NÂNG HẠNG B LÊN D2',
    opening: 'Hàng tháng',
  },
]

const PHONE_DISPLAY = '0879 227 614'
const PHONE_LINK = '0879227614'

export default function EnrollmentSchedule() {
  return (
    <section
      className="enrollment-board"
      aria-labelledby="enrollment-board-title"
    >
      <div className="enrollment-board__accent" />

      <header className="enrollment-board__header">
        <div className="enrollment-board__title">
          <span className="enrollment-board__icon">
            <BellRing size={24} />
          </span>

          <div>
            <span>Thông tin tuyển sinh mới nhất</span>
            <h3 id="enrollment-board-title">
              Thông báo chiêu sinh
            </h3>
            <p>
              Lịch khai giảng các khóa học và chương trình
              nâng hạng tại Quốc Anh Driving.
            </p>
          </div>
        </div>

        <div className="enrollment-board__frequency">
          <CalendarDays size={18} />
          <div>
            <small>Lịch tuyển sinh</small>
            <strong>Mở lớp thường xuyên</strong>
          </div>
        </div>
      </header>

      <div className="enrollment-board__table-wrap">
        <table className="enrollment-board__table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Khóa học</th>
              <th scope="col">Ngày khai giảng</th>
              <th scope="col">Liên hệ</th>
            </tr>
          </thead>

          <tbody>
            {enrollmentRows.map((row, index) => (
              <tr key={row.course}>
                <td data-label="STT">
                  <span className="enrollment-board__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </td>

                <td data-label="Khóa học">
                  <strong>{row.course}</strong>
                </td>

                <td data-label="Khai giảng">
                  <span className="enrollment-board__opening">
                    <i />
                    {row.opening}
                  </span>
                </td>

                <td data-label="Liên hệ">
                  <a
                    href={`tel:${PHONE_LINK}`}
                    className="enrollment-board__phone"
                  >
                    <PhoneCall size={15} />
                    {PHONE_DISPLAY}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="enrollment-board__footer">
        <p>
          Lịch có thể được điều chỉnh theo số lượng hồ sơ.
          Liên hệ để được xác nhận lớp gần nhất.
        </p>

        <Link to="/dang-ky">
          Giữ chỗ khóa học
          <ArrowUpRight size={16} />
        </Link>
      </footer>
    </section>
  )
}
