import { useEffect, useRef, useState } from 'react'
import { Facebook, MapPin, Menu, Phone, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
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
        toggleRef.current?.focus({ preventScroll: true })
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

  const navigation = [
    { to: '/', label: 'Trang chủ', active: location.pathname === '/' && !location.hash },
    { to: '/khoa-hoc#danh-sach-khoa-hoc', label: 'Khóa học', active: location.pathname.startsWith('/khoa-hoc') },
    { to: '/#gioi-thieu', label: 'Văn phòng', active: location.pathname === '/' && location.hash === '#gioi-thieu' },
    { to: '/#mang-xa-hoi', label: 'Góc học lái xe', active: location.pathname === '/' && location.hash === '#mang-xa-hoi' },
    { to: '/lien-he', label: 'Liên hệ', active: location.pathname === '/lien-he' },
  ].map(item => (
    <Link key={item.to} to={item.to} className={item.active ? 'active' : undefined} aria-current={item.active ? 'page' : undefined} onClick={() => setOpen(false)}>
      {item.label}
    </Link>
  ))

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
            <span className="brand-text"><small>VĂN PHÒNG HỌC LÁI XE</small><strong>LINH XUÂN</strong></span>
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
