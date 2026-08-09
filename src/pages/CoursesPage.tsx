import CourseGroups from '../components/CourseGroups'

export default function CoursesPage() {
  return (
    <section className="section normal-page course-catalog-page">
      <div className="container">
        <div className="section-heading course-catalog-page__heading">
          <span className="section-label">
            Danh mục khóa học
          </span>

          <h1>
            Chọn đúng hạng xe,
            <br />
            bắt đầu đúng lộ trình
          </h1>

          <p>
            Hai nhóm đào tạo được trình bày rõ ràng theo loại
            phương tiện để bạn dễ so sánh và lựa chọn hạng bằng
            phù hợp với nhu cầu sử dụng.
          </p>
        </div>

        <CourseGroups />
      </div>
    </section>
  )
}
