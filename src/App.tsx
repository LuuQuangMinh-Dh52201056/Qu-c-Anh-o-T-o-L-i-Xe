import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import RegisterPage from './pages/RegisterPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>

          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/khoa-hoc"
            element={<CoursesPage />}
          />

          <Route
            path="/khoa-hoc/:slug"
            element={<CourseDetailPage />}
          />

          <Route
            path="/dang-ky"
            element={<RegisterPage />}
          />

          <Route
            path="/lien-he"
            element={<ContactPage />}
          />

        </Routes>
      </main>

      <Footer />
    </>
  )
}