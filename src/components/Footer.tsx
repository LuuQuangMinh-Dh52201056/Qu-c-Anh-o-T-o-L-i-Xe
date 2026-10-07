import { ArrowUpRight, Facebook, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT } from '../data/contact'
import { TikTokIcon, ZaloIcon } from './SocialIcons'

const logo = '/logo-linh-xuan.png'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand-lockup footer-logo" aria-label={`${CONTACT.brandName} — Trang chủ`}>
            <img src={logo} alt="" width="104" height="52" loading="lazy" />
            <span className="brand-text"><small>VĂN PHÒNG HỌC LÁI XE</small><strong>LINH XUÂN</strong></span>
          </Link>
          <p>{CONTACT.brandName} hỗ trợ lựa chọn khóa học lái xe, tìm hiểu học phí, chuẩn bị hồ sơ và kết nối trực tiếp với Quốc Anh.</p>
          <div className="footer-social-links">
            <a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat Zalo với văn phòng Linh Xuân"><ZaloIcon size={20} /></a>
            <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook Quốc Anh"><Facebook size={20} /></a>
            <a href={CONTACT.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok Quốc Anh"><TikTokIcon size={20} /></a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Khóa học lái xe</h3>
          <nav className="footer-links" aria-label="Khóa học trong chân trang">
            <Link to="/khoa-hoc/hang-a1">Xe máy hạng A1</Link>
            <Link to="/khoa-hoc/hang-a">Mô tô hạng A</Link>
            <Link to="/khoa-hoc/hang-b-so-san">Ô tô B số sàn</Link>
            <Link to="/khoa-hoc/hang-b-tu-dong">Ô tô B tự động</Link>
            <Link to="/khoa-hoc/hang-c1">Ô tô hạng C1</Link>
          </nav>
        </div>
        <div className="footer-column">
          <h3>Thông tin hữu ích</h3>
          <nav className="footer-links" aria-label="Thông tin trong chân trang">
            <Link to="/#gioi-thieu">Về văn phòng Linh Xuân</Link>
            <Link to="/#lo-trinh">Lộ trình học</Link>
            <Link to="/#mang-xa-hoi">Góc học lái xe</Link>
            <Link to="/lien-he">Liên hệ & tư vấn</Link>
            <a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer">Chat 1:1 với admin <ArrowUpRight size={14} /></a>
          </nav>
        </div>
        <div className="footer-column footer-contact-column">
          <h3>Liên hệ văn phòng</h3>
          <div className="footer-contact-list">
            <a href={CONTACT.phoneUrl} className="footer-contact-item"><Phone size={18} /><span><small>Hotline tư vấn</small><strong>{CONTACT.phoneDisplay}</strong></span></a>
            <a href={`mailto:${CONTACT.email}`} className="footer-contact-item"><Mail size={18} /><span>{CONTACT.email}</span></a>
            <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer-contact-item"><MapPin size={18} /><span>{CONTACT.address}</span></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} {CONTACT.brandName}.</span>
          <span>Vững tay lái. An tâm trên mọi hành trình.</span>
        </div>
      </div>
    </footer>
  )
}
