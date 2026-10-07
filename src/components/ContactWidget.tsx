import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, MessageCircle, Phone, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { CONTACT } from '../data/contact'
import { MessengerIcon, ZaloIcon } from './SocialIcons'

export default function ContactWidget() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const location = useLocation()

  const closePanel = (restoreFocus = false) => {
    setOpen(false)
    if (restoreFocus) triggerRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }))
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus({ preventScroll: true })
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const togglePanel = (button: HTMLButtonElement) => {
    triggerRef.current = button
    setOpen(value => !value)
  }

  return (
    <div className="contact-widget-root" ref={rootRef}>
      <aside className={`contact-widget${open ? ' expanded' : ''}`} aria-label="Liên hệ nhanh với văn phòng Linh Xuân">
        {open && (
          <section id="admin-chat-panel" className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="admin-chat-title" aria-describedby="admin-chat-description">
            <div className="chat-panel-header">
              <span className="chat-avatar"><img src="/logo-linh-xuan.png" alt="" width="46" height="23" /></span>
              <div><span className="chat-admin-label">VĂN PHÒNG LINH XUÂN</span><h2 id="admin-chat-title">Trò chuyện với admin</h2></div>
              <button ref={closeRef} type="button" className="chat-close" aria-label="Đóng khung liên hệ" onClick={() => closePanel(true)}><X size={19} /></button>
            </div>
            <div className="chat-panel-copy">
              <p id="admin-chat-description">Xin chào! Văn phòng Linh Xuân có thể hỗ trợ bạn chọn khóa học, tìm hiểu học phí và chuẩn bị hồ sơ. Chọn kênh để trò chuyện 1:1 với admin.</p>
            </div>
            <div className="chat-channel-list">
              <a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" className="chat-channel chat-channel-zalo" onClick={() => closePanel(true)}>
                <span className="chat-channel-icon"><ZaloIcon /></span><span><strong>Chat qua Zalo</strong><small>{CONTACT.phoneDisplay}</small></span><ArrowUpRight size={18} />
              </a>
              <a href={CONTACT.messengerUrl} target="_blank" rel="noopener noreferrer" className="chat-channel chat-channel-messenger" onClick={() => closePanel(true)}>
                <span className="chat-channel-icon"><MessengerIcon /></span><span><strong>Chat qua Messenger</strong><small>Kết nối Facebook Quốc Anh</small></span><ArrowUpRight size={18} />
              </a>
              <a href={CONTACT.phoneUrl} className="chat-channel" onClick={() => closePanel(true)}>
                <span className="chat-channel-icon"><Phone size={21} /></span><span><strong>Gọi trực tiếp</strong><small>{CONTACT.phoneDisplay}</small></span><ArrowUpRight size={18} />
              </a>
            </div>
            <p className="chat-panel-note">Cuộc trò chuyện mở trong Zalo hoặc Messenger. Admin phản hồi khi có thể.</p>
          </section>
        )}
        <button type="button" className="chat-launcher" aria-label={open ? 'Đóng khung chat với admin' : 'Mở khung chat với admin'} aria-expanded={open} aria-controls="admin-chat-panel" onClick={event => togglePanel(event.currentTarget)}>
          {open ? <X size={23} /> : <MessageCircle size={23} />}<span>Chat với admin</span>
        </button>
      </aside>
      <div className="mobile-contact-bar">
        <a href={CONTACT.phoneUrl}><Phone size={18} /><span>Gọi {CONTACT.phoneDisplay}</span></a>
        <button type="button" aria-label={open ? 'Đóng khung chat với admin' : 'Mở khung chat với admin'} aria-expanded={open} aria-controls="admin-chat-panel" onClick={event => togglePanel(event.currentTarget)}><MessageCircle size={19} /><span>Chat với admin</span></button>
      </div>
    </div>
  )
}
