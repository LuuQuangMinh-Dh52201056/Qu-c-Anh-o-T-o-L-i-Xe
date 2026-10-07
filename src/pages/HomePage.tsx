import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, CalendarClock, Check, ClipboardCheck, FileText, GraduationCap, MapPin, MessageCircle, Phone, Route, ShieldCheck, Users, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import CourseGroups from '../components/CourseGroups'
import TikTokSocialSection from '../components/TikTokSocialSection'
import { CONTACT } from '../data/contact'
import instructor from '../anh/anhnen1.jpg'
import classroom from '../anh/anhnen2.jpg'
import practice from '../anh/anhgioithieu.jpg'
import students from '../anh/anhnen4.jpg'
import drivingPractice from '../anh/giaovientantinh.jpg'

const strengths = [
  { icon: MessageCircle, title: 'Tư vấn trực tiếp 1:1', text: 'Trao đổi với admin qua Zalo, Messenger hoặc hotline.' },
  { icon: Route, title: 'Lựa chọn đúng nhu cầu', text: 'Tìm hiểu các khóa A, A1, B số sàn, B tự động và C1.' },
  { icon: ClipboardCheck, title: 'Hướng dẫn từng bước', text: 'Tư vấn hồ sơ, học phí và lộ trình trước khi đăng ký.' },
  { icon: MapPin, title: 'Văn phòng tại Linh Xuân', text: 'Kết nối trực tuyến hoặc hẹn gặp tại văn phòng.' },
]
const steps = [
  { icon: MessageCircle, title: 'Trao đổi nhu cầu', text: 'Chọn hạng bằng theo loại xe, mục đích sử dụng và kinh nghiệm của bạn.' },
  { icon: ClipboardCheck, title: 'Xác nhận & chuẩn bị', text: 'Tìm hiểu học phí, lịch lớp và được hướng dẫn các bước chuẩn bị hồ sơ.' },
  { icon: BookOpen, title: 'Học & thực hành', text: 'Làm quen lý thuyết và phương tiện, rèn luyện kỹ năng với giáo viên.' },
  { icon: GraduationCap, title: 'Ôn tập & sát hạch', text: 'Củng cố kiến thức, luyện bài và chuẩn bị cho kỳ sát hạch.' },
]
const services = [
  { icon: Route, title: 'Chọn hạng bằng phù hợp', text: 'Cùng bạn tìm hiểu khóa học theo loại phương tiện và nhu cầu đi lại, công việc.' },
  { icon: Wallet, title: 'Trao đổi rõ về học phí', text: 'Hỏi về nội dung khóa học, mức học phí và các khoản liên quan trước khi quyết định.' },
  { icon: FileText, title: 'Hướng dẫn chuẩn bị hồ sơ', text: 'Admin giải đáp các bước đăng ký và thông tin cần chuẩn bị cho khóa học bạn chọn.' },
  { icon: CalendarClock, title: 'Tìm lịch học phù hợp', text: 'Chia sẻ thời gian rảnh để trao đổi về lớp và lịch thực hành đang được tổ chức.' },
  { icon: Users, title: 'Kết nối với giáo viên', text: 'Tìm hiểu cách học và trao đổi những băn khoăn khi bắt đầu làm quen với tay lái.' },
  { icon: BookOpen, title: 'Làm quen qua video', text: 'Khám phá video hướng dẫn, bài học thực tế và hoạt động đào tạo trên kênh TikTok.' },
]
const questions = [
  { question: 'Chưa biết lái xe thì có thể đăng ký học không?', answer: 'Bạn có thể bắt đầu tìm hiểu khóa học ngay cả khi chưa từng lái xe. Giáo viên sẽ hướng dẫn từ các thao tác cơ bản. Hãy trao đổi với admin về kinh nghiệm hiện tại để được tư vấn lộ trình phù hợp.' },
  { question: 'Văn phòng Linh Xuân hỗ trợ những gì?', answer: 'Văn phòng tư vấn tuyển sinh hỗ trợ bạn tìm hiểu khóa học, trao đổi về học phí và lịch học, chuẩn bị thông tin đăng ký và kết nối với giáo viên. Bạn có thể liên hệ trực tuyến hoặc hẹn đến văn phòng để được tư vấn.' },
  { question: 'Tôi nên chọn B số sàn hay B tự động?', answer: 'Hãy cân nhắc loại xe bạn dự định sử dụng và nhu cầu đi lại hoặc công việc. B tự động tập trung kỹ năng điều khiển xe số tự động; B số sàn có thêm các thao tác côn và chuyển số. Admin sẽ hỗ trợ bạn chọn khóa theo nhu cầu thực tế.' },
  { question: 'Làm sao để biết lịch khai giảng và học phí?', answer: 'Nhấn “Chat Zalo với admin” hoặc gọi ' + CONTACT.phoneDisplay + ' để được xác nhận lịch lớp gần nhất và học phí hiện hành. Mức học phí trên website là thông tin tham khảo; hãy trao đổi các khoản chi phí và nội dung khóa học trước khi đăng ký.' },
  { question: 'Tôi có thể trao đổi riêng với người tư vấn không?', answer: 'Có. Nhấn nút “Chat với admin” và chọn Zalo hoặc Messenger. Cuộc trò chuyện diễn ra trực tiếp trên kênh bạn chọn; bạn không cần điền form tư vấn trên website.' },
]

export default function HomePage() {
  return <>
    <section className="home-hero">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" /><div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-eyebrow"><span /> VĂN PHÒNG TƯ VẤN TUYỂN SINH LINH XUÂN</span>
          <h1>Khởi đầu đúng.<br /><span>Vững tay lái.</span></h1>
          <p className="hero-description">Một hành trình mới bắt đầu từ lựa chọn phù hợp. Linh Xuân cùng bạn tìm hiểu khóa học, chuẩn bị hồ sơ và kết nối với giáo viên Quốc Anh.</p>
          <div className="hero-actions">
            <a className="btn btn-white" href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} /> Chat Zalo với admin <ArrowUpRight size={18} /></a>
            <a className="btn btn-outline-white" href="#khoa-hoc">Khám phá khóa học <ArrowDown size={17} /></a>
          </div>
          <div className="hero-contact-note"><ShieldCheck size={17} /><span>Tư vấn trực tiếp 1:1 · Chọn lộ trình theo nhu cầu của bạn</span></div>
          <div className="hero-bottom"><div className="hero-license-list"><span>A</span><span>A1</span><span>B</span><span>C1</span></div><p>XE MÁY · Ô TÔ · XE TẢI</p></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-frame"><img src={instructor} alt="Giáo viên Quốc Anh bên xe tập lái tại sân thực hành" fetchPriority="high" /><span className="hero-photo-label"><ShieldCheck size={14} /> ĐỒNG HÀNH CÙNG GIÁO VIÊN QUỐC ANH</span></div>
          <div className="hero-photo-card"><span className="hero-photo-card-icon"><Users size={27} /></span><div><strong>Tận tâm trong từng buổi học</strong><span>Từ thao tác đầu tiên đến kỹ năng thực tế</span></div><Check size={19} /></div>
          <div className="hero-location-badge"><MapPin size={16} /><span>Linh Xuân, Thủ Đức<br /><strong>TP. Hồ Chí Minh</strong></span></div>
        </div>
      </div>
      <div className="hero-section-number" aria-hidden="true">LINH XUÂN / TUYỂN SINH LÁI XE</div>
    </section>
    <section className="trust-strip" aria-label="Dịch vụ tư vấn"><div className="container trust-grid">{strengths.map(({ icon: Icon, title, text }) => <div className="trust-item" key={title}><span className="trust-icon"><Icon size={23} /></span><div><h2>{title}</h2><p>{text}</p></div></div>)}</div></section>

    <section className="section home-courses" id="khoa-hoc">
      <div className="container">
        <div className="section-heading section-heading-row"><div><span className="section-label">CÁC CHƯƠNG TRÌNH TUYỂN SINH</span><h2>Chọn khóa học.<br /><span className="heading-accent">Mở lối hành trình.</span></h2></div><div className="section-heading-aside"><p>Từ xe máy đến ô tô, mỗi nhu cầu có một lựa chọn. Khám phá nội dung và trao đổi với văn phòng để tìm khóa học phù hợp.</p><Link to="/khoa-hoc" className="text-link">Xem chi tiết các chương trình <ArrowRight size={18} /></Link></div></div>
        <CourseGroups />
        <p className="home-price-note">Học phí là mức tham khảo theo thông tin hiện có. Liên hệ văn phòng để xác nhận nội dung khóa học, các khoản phí liên quan và lịch lớp.</p>
      </div>
    </section>

    <section className="section about-section" id="gioi-thieu">
      <div className="container about-grid">
        <div className="about-visual"><img className="about-photo-main" src={classroom} loading="lazy" alt="Giáo viên Quốc Anh hướng dẫn trong lớp lý thuyết" /><img className="about-photo-small" src={practice} loading="lazy" alt="Giáo viên Quốc Anh hướng dẫn thực hành xe máy" /><div className="about-photo-caption"><ShieldCheck size={23} /><div><strong>Hiểu rõ trước khi bắt đầu</strong><span>Tư vấn tuyển sinh · Kết nối đào tạo</span></div></div></div>
        <div className="about-copy"><span className="section-label">VĂN PHÒNG TUYỂN SINH LINH XUÂN</span><h2>Một điểm kết nối.<br /><span className="heading-accent">Cả hành trình đồng hành.</span></h2><p>Văn phòng Tư Vấn Tuyển Sinh Linh Xuân là nơi bạn có thể bắt đầu tìm hiểu việc học lái xe một cách rõ ràng: chọn hạng bằng, trao đổi học phí, lịch học và các bước đăng ký.</p><p>Chúng tôi kết nối bạn với giáo viên Quốc Anh và hỗ trợ giải đáp những băn khoăn, để mỗi quyết định trước khi học đều phù hợp với nhu cầu thực tế.</p><div className="about-checklist">{['Tư vấn theo mục tiêu và kinh nghiệm của từng học viên', 'Trao đổi rõ về khóa học, học phí và các khoản liên quan', 'Hướng dẫn từng bước chuẩn bị thông tin đăng ký', 'Kết nối trực tiếp qua Zalo, Messenger hoặc văn phòng'].map(text => <div key={text}><Check size={17} /><span>{text}</span></div>)}</div><Link className="btn btn-primary" to="/lien-he">Tìm hiểu văn phòng Linh Xuân <ArrowUpRight size={17} /></Link></div>
      </div>
    </section>

    <section className="section services-section" id="ho-tro">
      <div className="container"><div className="section-heading section-heading-center"><span className="section-label">HỖ TRỢ TRƯỚC KHI ĐĂNG KÝ</span><h2>Thông tin rõ ràng.<br /><span className="heading-accent">Lựa chọn chủ động.</span></h2><p>Những điều văn phòng có thể cùng bạn tìm hiểu để bắt đầu hành trình học lái xe.</p></div><div className="services-grid">{services.map(({ icon: Icon, title, text }, index) => <article className="service-card" key={title}><div className="service-card-top"><span className="service-icon"><Icon size={25} /></span><span className="service-number">0{index + 1}</span></div><h3>{title}</h3><p>{text}</p><a href={index === 5 ? CONTACT.tiktokUrl : CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" aria-label={index === 5 ? 'Xem video hướng dẫn trên TikTok' : 'Hỏi admin: ' + title} className="service-link">{index === 5 ? 'Xem kênh TikTok' : 'Trao đổi cùng admin'}<ArrowUpRight size={16} /></a></article>)}</div></div>
    </section>

    <section className="section journey-section" id="lo-trinh">
      <div className="container"><div className="section-heading section-heading-row"><div><span className="section-label">TỪ CÂU HỎI ĐẦU TIÊN ĐẾN BUỔI HỌC ĐẦU TIÊN</span><h2>Bắt đầu dễ dàng.<br />Tiến bước vững vàng.</h2></div><p className="journey-intro">Từng giai đoạn được tìm hiểu rõ từ đầu.<br />Bạn luôn có một kênh để trao đổi khi cần.</p></div><div className="journey-grid">{steps.map(({ icon: Icon, title, text }, index) => <article className="journey-step" key={title}><div className="journey-step-top"><span className="journey-number">0{index + 1}</span><Icon size={26} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div>
    </section>

    <section className="section gallery-section"><div className="container"><div className="section-heading section-heading-row"><div><span className="section-label">GÓC NHÌN THỰC TẾ</span><h2>Lớp học. Sân tập.<br /><span className="heading-accent">Những bước tiến mỗi ngày.</span></h2></div><p className="section-heading-aside">Hình ảnh từ hoạt động đào tạo cùng giáo viên Quốc Anh, giúp bạn hình dung hành trình học trước khi đăng ký.</p></div><div className="gallery-grid">{[{ image: students, title: 'Cùng học viên trong lớp lý thuyết', tag: 'KIẾN THỨC NỀN TẢNG', alt: 'Học viên tham gia lớp lý thuyết lái xe' }, { image: practice, title: 'Hướng dẫn từ những thao tác đầu tiên', tag: 'THỰC HÀNH XE MÁY', alt: 'Giáo viên Quốc Anh hướng dẫn học viên thực hành xe máy' }, { image: drivingPractice, title: 'Trao đổi và luyện tập tại sân', tag: 'ĐỒNG HÀNH THỰC TẾ', alt: 'Giáo viên trao đổi cùng học viên tại sân tập' }].map(item => <article className="gallery-card" key={item.tag}><div><img src={item.image} alt={item.alt} loading="lazy" /></div><span>{item.tag}</span><h3>{item.title}</h3></article>)}</div></div></section>
    <TikTokSocialSection />

    <section className="section faq-section" id="cau-hoi"><div className="container faq-grid"><div className="faq-copy"><span className="section-label">GIẢI ĐÁP TRƯỚC KHI HỌC</span><h2>Bạn đặt câu hỏi.<br /><span className="heading-accent">Linh Xuân lắng nghe.</span></h2><p>Những điều bạn thường muốn biết trước khi bắt đầu học lái xe.</p><a href={CONTACT.zaloUrl} className="text-link" target="_blank" rel="noopener noreferrer">Hỏi admin qua Zalo <ArrowUpRight size={17} /></a></div><div className="faq-list">{questions.map(({ question, answer }) => <details className="faq-item" key={question}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="section office-section"><div className="container office-grid"><div className="office-copy"><span className="section-label">HẸN GẶP TẠI LINH XUÂN</span><h2>Văn phòng gần bạn.<br /><span className="heading-accent">Kết nối thật dễ dàng.</span></h2><p>Ghé văn phòng để trao đổi trực tiếp về khóa học. Hãy gọi hoặc nhắn Zalo trước để thống nhất thời gian gặp thuận tiện.</p><div className="office-address"><MapPin size={24} /><div><strong>Văn Phòng Tư Vấn Tuyển Sinh Linh Xuân</strong><p>{CONTACT.address}</p></div></div><div className="office-actions"><a href={CONTACT.mapsUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Xem đường đi <ArrowUpRight size={17} /></a><a href={CONTACT.phoneUrl} className="text-link"><Phone size={17} /> {CONTACT.phoneDisplay}</a></div></div><div className="office-identity-card"><div className="office-logo-wrap"><img src="/logo-linh-xuan.png" alt="Logo Văn Phòng Tư Vấn Tuyển Sinh Linh Xuân" loading="lazy" /></div><span>VĂN PHÒNG TƯ VẤN TUYỂN SINH</span><h3>LINH XUÂN</h3><div className="office-identity-divider" /><p>Chọn đúng lộ trình.<br />Vững bước hành trình.</p><a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer">Trao đổi trực tiếp cùng văn phòng <ArrowUpRight size={17} /></a></div></div></section>

    <section className="contact-cta"><div className="container contact-cta-inner"><div><span className="section-label">HÀNH TRÌNH MỚI BẮT ĐẦU TỪ ĐÂY</span><h2>Sẵn sàng cho chặng đường tiếp theo?</h2><p>Cùng Linh Xuân tìm khóa học phù hợp và giải đáp những câu hỏi của bạn.</p></div><div className="contact-cta-actions"><a href={CONTACT.zaloUrl} className="btn btn-white" target="_blank" rel="noopener noreferrer"><MessageCircle size={19} /> Chat với admin <ArrowUpRight size={17} /></a><a href={CONTACT.phoneUrl} className="contact-cta-phone"><Phone size={17} /> {CONTACT.phoneDisplay}</a></div></div></section>
  </>
}
