import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CalendarClock, Check, CheckCircle2, ChevronDown, CirclePlay, ClipboardCheck, FileText, GraduationCap, MapPin, MessageCircle, Phone, ShieldCheck, Users, Wallet } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import { TikTokIcon } from '../components/SocialIcons'
import { CONTACT } from '../data/contact'
import { courses } from '../data/courses'
import { getCourseDetailInfo } from '../data/courseDetails'
import { getCourseDetailVideos, type CourseVideo } from '../data/courseVideos'
import instructorPhoto from '../anh/anhnen1.jpg'
import classroomPhoto from '../anh/anhnen2.jpg'
import motorcyclePractice from '../anh/anhgioithieu.jpg'
import practicePhoto from '../anh/giaovientantinh.jpg'

const sectionLinks = [
  { id: 'noi-dung-khoa-hoc', label: 'Nội dung học' },
  { id: 'doi-tuong', label: 'Phù hợp với ai' },
  { id: 'lo-trinh-hoc', label: 'Lộ trình' },
  { id: 'hoc-phi', label: 'Học phí' },
  { id: 'cau-hoi', label: 'Câu hỏi' },
]

function CourseVideoCard({ video }: { video: CourseVideo }) {
  return <article className="course-video-card">
    <div className="course-video-card__media">
      <video controls playsInline preload="none" poster={video.poster} aria-label={video.title}>
        <source src={video.embedUrl} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video. <a href={video.embedUrl}>Mở video hướng dẫn</a>.
      </video>
    </div>
    <div className="course-video-card__body"><span className="section-label">{video.eyebrow}</span><h3>{video.title}</h3><p>{video.description}</p></div>
  </article>
}

export default function CourseDetailPage() {
  const { slug } = useParams()
  const { hash } = useLocation()
  const course = courses.find(item => item.slug === slug)
  if (!course) return <section className="section course-not-found"><div className="container">
    <span className="section-label">KHÓA HỌC</span><h1>Chưa tìm thấy khóa học này.</h1><p>Đường dẫn có thể đã thay đổi. Bạn có thể xem các khóa học hiện có hoặc nhắn admin để được hỗ trợ.</p>
    <div className="course-not-found__actions"><Link to="/khoa-hoc#danh-sach-khoa-hoc" className="btn btn-primary"><ArrowLeft size={17} /> Xem tất cả khóa học</Link><a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Chat với admin <ArrowUpRight size={17} /></a></div>
  </div></section>

  const info = getCourseDetailInfo(course)
  const isMotorcycle = course.code === 'A' || course.code === 'A1'
  const courseVideos = getCourseDetailVideos(course)
  const relatedCourses = courses.filter(item => item.code !== course.code).slice(0, 3)
  const gallery = [
    { src: classroomPhoto, alt: 'Giáo viên Quốc Anh hướng dẫn trong lớp lý thuyết', label: 'Tìm hiểu kiến thức cùng giáo viên' },
    { src: isMotorcycle ? motorcyclePractice : practicePhoto, alt: isMotorcycle ? 'Hướng dẫn học viên thực hành xe máy' : 'Giáo viên trao đổi cùng học viên tại sân tập', label: isMotorcycle ? 'Hướng dẫn thao tác thực hành xe máy' : 'Trao đổi và luyện tập tại sân' },
  ]
  const coursePath = '/khoa-hoc/' + course.slug
  const confirmFees = ['Nội dung khóa học và các khoản học phí', 'Lệ phí, hồ sơ và các khoản liên quan nếu có', 'Lịch học, địa điểm lý thuyết và thực hành', 'Cách thanh toán và điều kiện đăng ký']

  return <div className="course-detail course-detail--complete">
    <section className="course-detail__hero">
      <div className="container">
        <div className="course-detail__topline">
          <nav className="page-breadcrumb course-detail__breadcrumb" aria-label="Đường dẫn trang"><Link to="/">Trang chủ</Link><span aria-hidden="true">/</span><Link to="/khoa-hoc#danh-sach-khoa-hoc">Khóa học</Link><span aria-hidden="true">/</span><span aria-current="page">{course.title}</span></nav>
          <nav className="course-detail__grade-switcher" aria-label="Chọn hạng bằng">{courses.map(item => <Link key={item.code} to={'/khoa-hoc/' + item.slug} className={item.code === course.code ? 'is-active' : undefined} aria-current={item.code === course.code ? 'page' : undefined}>{item.title}</Link>)}</nav>
        </div>
        <div className="course-detail__hero-grid">
          <div className="course-detail__intro">
            <span className="section-label">CHƯƠNG TRÌNH {isMotorcycle ? 'XE MÁY' : course.code === 'C1' ? 'XE TẢI' : 'Ô TÔ'} · LINH XUÂN</span>
            <h1>{course.title}</h1>
            <p className="course-detail__subtitle">{info.headline}</p>
            <p className="course-detail__description">{info.introduction}</p>
            <div className="course-detail__hero-price"><span>Học phí tham khảo</span><strong>{course.price}</strong><small>Trao đổi với văn phòng để xác nhận các khoản liên quan.</small></div>
            <div className="course-detail__hero-actions"><a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><MessageCircle size={18} /> Chat Zalo với admin</a><Link to={coursePath + '#noi-dung-khoa-hoc'} className="course-detail__anchor">Xem nội dung <ArrowRight size={17} /></Link></div>
            <div className="course-detail__hero-note"><ShieldCheck size={16} /><span>Tư vấn 1:1 · Hiểu rõ khóa học trước khi đăng ký</span></div>
          </div>
          <div className="course-detail__visual"><div className="course-detail__image"><img src={course.image} alt={course.title + ' – ' + course.subtitle} decoding="async" /><span>{course.subtitle} · Hình ảnh minh họa phương tiện</span></div><div className="course-detail__visual-note"><span><GraduationCap size={24} /></span><div><strong>Lộ trình riêng cho nhu cầu của bạn</strong><p>Trao đổi kinh nghiệm và mục tiêu với văn phòng Linh Xuân.</p></div></div></div>
        </div>
        <div className="course-detail__quick-facts">{info.quickFacts.map(({ label, value }, index) => {
          const Icon = [BookOpen, CalendarClock, Users][index % 3]
          return <div key={label}><span><Icon size={21} /></span><section><small>{label}</small><strong>{value}</strong></section></div>
        })}</div>
      </div>
    </section>

    <div className="course-detail__tabbar"><nav className="container course-detail__tabs" aria-label="Nội dung khóa học">{sectionLinks.map(({ id, label }) => <Link key={id} to={coursePath + '#' + id} className={hash === '#' + id || (!hash && id === 'noi-dung-khoa-hoc') ? 'is-active' : undefined} aria-current={hash === '#' + id ? 'location' : undefined}>{label}</Link>)}</nav></div>

    <section className="section course-detail__body"><div className="container course-detail__layout">
      <div className="course-detail__main">
        <section className="course-detail__section" id="noi-dung-khoa-hoc"><span className="section-label">NỘI DUNG KHÓA HỌC</span><h2>Học từng kỹ năng.<br />Hiểu từng thao tác.</h2><p>{course.description}</p><div className="course-detail__modules">{info.curriculum.map((module, index) => <article className="course-detail__module" key={module.title}><div className="course-detail__module-heading"><span>0{index + 1}</span><h3>{module.title}</h3></div><p>{module.description}</p><ul>{module.points.map(point => <li key={point}><Check size={15} /><span>{point}</span></li>)}</ul></article>)}</div><div className="course-detail__outcomes"><h3><ShieldCheck size={20} /> Kỹ năng bạn hướng tới</h3><ul>{info.keyOutcomes.map(outcome => <li key={outcome}><CheckCircle2 size={17} /><span>{outcome}</span></li>)}</ul></div></section>

        <section className="course-detail__section" id="doi-tuong"><span className="section-label">LỰA CHỌN THEO NHU CẦU</span><h2>Khóa học này dành cho ai?</h2><p>{course.audience}</p><div className="course-detail__audience-list">{info.whoFits.map((text, index) => <article key={text}><span>{index + 1}</span><p>{text}</p><Check size={16} /></article>)}</div><a href={CONTACT.zaloUrl} className="text-link" target="_blank" rel="noopener noreferrer">Hỏi về lựa chọn phù hợp với bạn <ArrowUpRight size={17} /></a></section>

        <section className="course-detail__section" id="lo-trinh-hoc"><span className="section-label">ĐỒNG HÀNH TỪ BƯỚC ĐẦU</span><h2>Biết rõ hành trình trước khi học.</h2><p>Trao đổi với văn phòng để được tư vấn lịch học và từng bước chuẩn bị theo khóa {course.title}.</p><ol className="course-detail__learning-steps">{info.learningSteps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></section>

        <section className="course-detail__section course-detail__fees" id="hoc-phi"><span className="section-label">THÔNG TIN HỌC PHÍ</span><h2>Rõ thông tin trước khi quyết định.</h2><div className="course-detail__fee-summary"><span className="course-detail__fee-icon"><Wallet size={27} /></span><div><span>Học phí tham khảo · {course.title}</span><strong>{course.price}</strong><p>Mức tham khảo theo thông tin hiện có. Văn phòng xác nhận mức phí, nội dung và các khoản liên quan trước khi đăng ký.</p></div></div><h3>Những thông tin cần xác nhận với admin</h3><ul className="course-detail__fee-checklist">{confirmFees.map(text => <li key={text}><CheckCircle2 size={17} /><span>{text}</span></li>)}</ul><a href={CONTACT.zaloUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Hỏi học phí {course.title} <ArrowUpRight size={17} /></a></section>

        <section className="course-detail__section" id="chuan-bi"><span className="section-label">TRƯỚC KHI ĐĂNG KÝ</span><h2>Chuẩn bị để bắt đầu thuận lợi.</h2><p>Chia sẻ nhu cầu và nhận hướng dẫn riêng từ văn phòng. Danh mục hồ sơ cụ thể được xác nhận theo hạng bằng bạn chọn.</p><ul className="course-detail__preparation">{info.preparation.map(text => <li key={text}><FileText size={20} /><span>{text}</span></li>)}</ul><div className="course-detail__preparation-note"><ClipboardCheck size={21} /><p>Liên hệ trước khi đến văn phòng để được hướng dẫn thông tin cần mang theo và thống nhất thời gian gặp.</p></div></section>

        <section className="course-detail__section course-detail__training-gallery"><span className="section-label">HÌNH ẢNH THỰC TẾ</span><h2>Gần hơn với những buổi học.</h2><p>Hình ảnh từ hoạt động đào tạo cùng giáo viên Quốc Anh.</p><div className="course-detail__gallery-grid">{gallery.map(item => <figure key={item.src}><img src={item.src} alt={item.alt} loading="lazy" /><figcaption>{item.label}</figcaption></figure>)}</div><div className="course-detail__instructor"><img src={instructorPhoto} alt="Giáo viên Quốc Anh" loading="lazy" /><div><span>ĐỒNG HÀNH CÙNG GIÁO VIÊN</span><h3>Quốc Anh</h3><p>Tìm hiểu cách học và trao đổi những băn khoăn từ buổi đầu tiên.</p></div><a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" aria-label="Trao đổi với Quốc Anh qua Zalo"><MessageCircle size={20} /></a></div></section>

        <section className="course-detail__section course-videos" id="video-khoa-hoc"><span className="section-label"><CirclePlay size={15} /> GÓC HỌC LÁI XE</span><h2>Xem trước. Hình dung rõ hơn.</h2>{courseVideos.length > 0 ? <div className="course-videos__grid">{courseVideos.map(video => <CourseVideoCard key={video.id} video={video} />)}</div> : <p>Khám phá nội dung hướng dẫn và các buổi học thực tế được chia sẻ trên kênh TikTok của trung tâm.</p>}<a className="course-detail__tiktok-link" href={CONTACT.tiktokUrl} target="_blank" rel="noopener noreferrer"><span><TikTokIcon size={26} /></span><div><strong>Tiếp tục khám phá trên TikTok</strong><small>@{CONTACT.tiktokUsername}</small></div><ArrowUpRight size={21} /></a></section>

        <section className="course-detail__section course-detail__faq" id="cau-hoi"><span className="section-label">GIẢI ĐÁP VỀ {course.title.toUpperCase()}</span><h2>Những câu hỏi trước khi học.</h2>{info.faqs.map(faq => <details key={faq.question}><summary>{faq.question}<ChevronDown size={18} /></summary><p>{faq.answer}</p></details>)}<a href={CONTACT.zaloUrl} className="text-link" target="_blank" rel="noopener noreferrer">Còn câu hỏi? Trao đổi với admin <ArrowUpRight size={17} /></a></section>
      </div>

      <aside className="course-detail__sidebar" aria-label="Thông tin khóa học và liên hệ"><div className="course-detail__contact-card"><div className="course-detail__office-mark"><img src="/logo-linh-xuan.png" alt="" width="74" height="37" /><span>VĂN PHÒNG HỌC LÁI XE<br /><strong>LINH XUÂN</strong></span></div><span className="section-label">TƯ VẤN RIÊNG CHO BẠN</span><h2>{course.title}</h2><dl className="course-detail__facts"><div><dt>Phương tiện</dt><dd>{course.subtitle}</dd></div><div><dt>Học phí tham khảo</dt><dd className="course-detail__price">{course.price}</dd></div><div><dt>Lịch học &amp; hồ sơ</dt><dd>Trao đổi để xác nhận</dd></div></dl><p>Chia sẻ nhu cầu để văn phòng hỗ trợ bạn tìm hiểu khóa học và các bước đăng ký.</p><a href={CONTACT.zaloUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Chat Zalo với admin</a><a href={CONTACT.phoneUrl} className="btn btn-secondary"><Phone size={17} /> {CONTACT.phoneDisplay}</a><small>Tư vấn trực tiếp 1:1 qua kênh bạn chọn.</small></div><div className="course-detail__sidebar-nav"><h3>Trong trang này</h3>{sectionLinks.map(item => <Link key={item.id} to={coursePath + '#' + item.id} className={hash === '#' + item.id ? 'is-active' : undefined}>{item.label}<ArrowRight size={14} /></Link>)}</div><a className="course-detail__office-link" href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={20} /><span>Ghé văn phòng Linh Xuân<small>Xem vị trí và chỉ đường</small></span><ArrowUpRight size={17} /></a></aside>
    </div></section>

    <section className="course-detail__closing"><div className="container"><div><span>VĂN PHÒNG HỌC LÁI XE LINH XUÂN</span><h2>Khóa {course.title} có phù hợp với bạn?</h2><p>Cùng admin làm rõ nhu cầu, học phí và lịch học trước khi bắt đầu.</p></div><a href={CONTACT.zaloUrl} className="btn btn-white" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Trao đổi ngay <ArrowUpRight size={17} /></a></div></section>
    <section className="section course-detail__related"><div className="container"><div className="section-heading-row"><div><span className="section-label">KHÁM PHÁ THÊM</span><h2>Các lựa chọn khác cho bạn.</h2></div><Link to="/khoa-hoc#danh-sach-khoa-hoc" className="text-link">Tất cả khóa học <ArrowRight size={17} /></Link></div><div className="course-catalog__grid">{relatedCourses.map(item => <CourseCard course={item} key={item.code} />)}</div></div></section>
  </div>
}
