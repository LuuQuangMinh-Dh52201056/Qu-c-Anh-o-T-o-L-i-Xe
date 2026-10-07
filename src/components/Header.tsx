import { useEffect, useRef, useState } from 'react'
import { Facebook, MapPin, Menu, Phone, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CONTACT } from '../data/contact'
import { TikTokIcon } from './SocialIcons'

const logo = '/logo-linh-xuan.png'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { setOpen(false) }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const navigation = (
    <>
      <NavLink to="/" end onClick={() => setOpen(false)}>Trang chủ</NavLink>
      <NavLink to="/khoa-hoc" onClick={() => setOpen(false)}>Khóa học</NavLink>
      <Link to="/#gioi-thieu" onClick={() => setOpen(false)}>Văn phòng</Link>
      <Link to="/#mang-xa-hoi" onClick={() => setOpen(false)}>Góc học lái xe</Link>
      <NavLink to="/lien-he" onClick={() => setOpen(false)}>Liên hệ</NavLink>
    </>
  )

  return (
    <>
      <div className="site-topbar">
        <div className="container topbar-inner">
          <a className="topbar-location" href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin size={13} /><span>Linh Xuân, Thủ Đức · TP. Hồ Chí Minh</span>
          </a>
          <span className="topbar-message">Tư vấn rõ ràng · Đồng hành cùng học viên</span>
          <div className="topbar-links">
            <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook Quốc Anh"><Facebook size={14} /><span>Facebook</span></a>
            <a href={CONTACT.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok Quốc Anh"><TikTokIcon size={14} /><span>TikTok</span></a>
          </div>
        </div>
      </div>
      <header className="site-header" ref={headerRef}>
        <div className="container header-inner">
          <Link to="/" className="brand-lockup" aria-label={`${CONTACT.brandName} — Trang chủ`} onClick={() => setOpen(false)}>
            <img src={logo} alt="" width="104" height="52" />
            <span className="brand-text"><small>VĂN PHÒNG TƯ VẤN TUYỂN SINH</small><strong>LINH XUÂN</strong></span>
          </Link>
          <nav className="desktop-nav" aria-label="Điều hướng chính">{navigation}</nav>
          <a href={CONTACT.phoneUrl} className="header-hotline" aria-label={`Gọi tư vấn ${CONTACT.phoneDisplay}`}><Phone size={18} /><span><small>HOTLINE TƯ VẤN</small><strong>{CONTACT.phoneDisplay}</strong></span></a>
          <button ref={toggleRef} type="button" className="mobile-menu-toggle" aria-label={open ? 'Đóng menu' : 'Mở menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Điều hướng trên điện thoại">
          {navigation}
          <a className="mobile-nav-contact" href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Chat với admin qua Zalo</a>
        </nav>}
      </header>
    </>
  )
}
