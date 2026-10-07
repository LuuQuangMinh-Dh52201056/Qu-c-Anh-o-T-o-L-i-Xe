import { Link, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactWidget from './components/ContactWidget'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import RegisterPage from './pages/RegisterPage'
import ContactPage from './pages/ContactPage'
import PageNavigation from './components/PageNavigation'
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
