import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { CONTACT } from '../data/contact'
import { courses } from '../data/courses'

type ScrollPosition = { left: number; top: number }

function findTarget(hash: string) {
  if (!hash) return null
  const id = hash.slice(1)
  try {
    return document.getElementById(decodeURIComponent(id))
  } catch {
    return document.getElementById(id)
  }
}

export default function PageNavigation() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const positions = useRef(new Map<string, ScrollPosition>())
  const currentKey = useRef(location.key)

  useEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const rememberPosition = () => {
      positions.current.set(currentKey.current, { left: window.scrollX, top: window.scrollY })
    }
    // Capture before a link changes the document, including very quick clicks.
    document.addEventListener('click', rememberPosition, true)
    window.addEventListener('scroll', rememberPosition, { passive: true })
    return () => {
      document.removeEventListener('click', rememberPosition, true)
      window.removeEventListener('scroll', rememberPosition)
      window.history.scrollRestoration = previous
    }
  }, [])

  useEffect(() => {
    const { pathname } = location
    const course = courses.find(item => pathname === '/khoa-hoc/' + item.slug)
    const title = course ? course.title + ' · Nội dung học, lộ trình và học phí' : pathname === '/' ? 'Học lái xe tại Thủ Đức' : pathname === '/khoa-hoc' ? 'Các khóa học lái xe' : pathname.startsWith('/khoa-hoc/') ? 'Thông tin khóa học lái xe' : pathname === '/lien-he' ? 'Liên hệ và chat với admin' : 'Học lái xe'
    document.title = CONTACT.brandName + ' | ' + title
    if (course) document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', CONTACT.brandName + ': tìm hiểu ' + course.title + ', ' + course.summary + ' Tư vấn lộ trình, hồ sơ và học phí qua ' + CONTACT.phoneDisplay + '.')
    else document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', CONTACT.brandName + ': các khóa A, A1, B số sàn, B tự động và C1. Tìm hiểu nội dung học, lộ trình, học phí và trao đổi trực tiếp qua ' + CONTACT.phoneDisplay + '.')
  }, [location.pathname])

  useLayoutEffect(() => {
    currentKey.current = location.key
    const saved = navigationType === 'POP' ? positions.current.get(location.key) : undefined
    if (saved) {
      window.scrollTo({ ...saved, behavior: 'instant' })
      return
    }

    const target = findTarget(location.hash)
    if (target) {
      const header = document.querySelector<HTMLElement>('.site-header')
      const headerHeight = header?.getBoundingClientRect().height ?? 0
      const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerHeight - 16)
      window.scrollTo({ top, left: 0, behavior: 'instant' })
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    positions.current.set(location.key, { left: window.scrollX, top: window.scrollY })
    // A new history key also handles clicking the current destination again.
  }, [location.key, location.pathname, location.hash, navigationType])

  return null
}
