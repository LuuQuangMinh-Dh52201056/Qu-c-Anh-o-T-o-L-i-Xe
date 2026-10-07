import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactWidget from './components/ContactWidget'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import RegisterPage from './pages/RegisterPage'
import ContactPage from './pages/ContactPage'
import { CONTACT } from './data/contact'

function PageNavigation() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const title = pathname === '/' ? 'Tư vấn tuyển sinh lái xe tại Thủ Đức' : pathname === '/khoa-hoc' ? 'Các khóa học lái xe' : pathname.startsWith('/khoa-hoc/') ? 'Thông tin khóa học lái xe' : pathname === '/lien-he' ? 'Liên hệ và chat với admin' : 'Tư vấn học lái xe'
    document.title = CONTACT.brandName + ' | ' + title
    const frame = window.requestAnimationFrame(() => {
      if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}
export default function App() {
  return <>
    <PageNavigation />
    <a className="skip-link" href="#main-content">Đến nội dung chính</a>
    <Header />
    <main id="main-content"><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/khoa-hoc" element={<CoursesPage />} />
      <Route path="/khoa-hoc/:slug" element={<CourseDetailPage />} />
      <Route path="/dang-ky" element={<RegisterPage />} />
      <Route path="/lien-he" element={<ContactPage />} />
      <Route path="*" element={<section className="section page-not-found"><div className="container"><span className="section-label">404 · KHÔNG TÌM THẤY TRANG</span><h1>Hãy tiếp tục hành trình.</h1><p>Trang bạn đang tìm hiện không có. Khám phá các khóa học hoặc liên hệ văn phòng Linh Xuân để được hỗ trợ.</p><Link className="btn btn-primary" to="/">Về trang chủ</Link></div></section>} />
    </Routes></main>
    <Footer />
    <ContactWidget />
  </>
}
