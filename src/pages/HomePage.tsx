import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, BookOpen, CalendarClock, CheckCircle2, ClipboardCheck, FileText, GraduationCap, MapPin, MessageCircle, Phone, Route, ShieldCheck, Users, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import HomeCourseShowcase from '../components/HomeCourseShowcase'
import TikTokSocialSection from '../components/TikTokSocialSection'
import { ZaloIcon, MessengerIcon } from '../components/SocialIcons'
import { CONTACT } from '../data/contact'
import instructor from '../anh/anhnen1.jpg'
import classroom from '../anh/anhnen2.jpg'
import practice from '../anh/anhgioithieu.jpg'
import students from '../anh/anhnen4.jpg'
import drivingPractice from '../anh/giaovientantinh.jpg'

const heroPoints = [
  { icon: BadgeCheck, title: 'Giáo viên đồng hành', text: 'Hướng dẫn từng bước' },
  { icon: ClipboardCheck, title: 'Hỗ trợ hồ sơ', text: 'Trao đổi rõ trước khi học' },
  { icon: CalendarClock, title: 'Tìm lịch phù hợp', text: 'Theo nhu cầu của bạn' },
  { icon: MessageCircle, title: 'Tư vấn trực tiếp', text: 'Kết nối riêng 1:1' },
]
const steps = [
  { icon: MessageCircle, title: 'Tư vấn & chọn hạng', text: 'Chia sẻ nhu cầu, tìm hiểu loại xe và khóa học phù hợp.' },
  { icon: FileText, title: 'Chuẩn bị hồ sơ', text: 'Nhận hướng dẫn thông tin đăng ký và các bước cần chuẩn bị.' },
  { icon: BookOpen, title: 'Học lý thuyết', text: 'Làm quen kiến thức, biển báo và các tình huống giao thông.' },
  { icon: Route, title: 'Thực hành lái xe', text: 'Rèn thao tác, quan sát và điều khiển phương tiện cùng giáo viên.' },
  { icon: ClipboardCheck, title: 'Ôn tập & sát hạch', text: 'Củng cố bài học, luyện kỹ năng và chuẩn bị trước kỳ sát hạch.' },
  { icon: GraduationCap, title: 'Hoàn tất lộ trình', text: 'Theo dõi kết quả và trao đổi về các bước sau kỳ sát hạch.' },
]
const benefits = [
  { icon: MessageCircle, title: 'Tư vấn tận tâm', text: 'Giải đáp thắc mắc và hỗ trợ lựa chọn khóa học.' },
  { icon: CalendarClock, title: 'Tìm lịch học phù hợp', text: 'Trao đổi thời gian học theo nhu cầu của bạn.' },
  { icon: Wallet, title: 'Học phí rõ ràng', text: 'Xác nhận nội dung và các khoản liên quan trước khi học.' },
  { icon: FileText, title: 'Hướng dẫn hồ sơ', text: 'Tìm hiểu từng bước chuẩn bị thông tin đăng ký.' },
  { icon: BookOpen, title: 'Làm quen qua video', text: 'Xem hướng dẫn và hoạt động thực tế trên TikTok.' },
  { icon: Users, title: 'Kết nối giáo viên', text: 'Đồng hành cùng Quốc Anh từ những thao tác đầu tiên.' },
]
const gallery = [
  { image: classroom, title: 'Học lý thuyết cùng giáo viên', tag: 'KIẾN THỨC NỀN TẢNG', alt: 'Giáo viên Quốc Anh hướng dẫn trong lớp lý thuyết' },
  { image: practice, title: 'Hướng dẫn thực hành từng bước', tag: 'THỰC HÀNH XE MÁY', alt: 'Giáo viên Quốc Anh hướng dẫn học viên thực hành xe máy' },
  { image: students, title: 'Đồng hành cùng học viên', tag: 'KHOẢNH KHẮC LỚP HỌC', alt: 'Học viên tham gia lớp lý thuyết lái xe' },
  { image: drivingPractice, title: 'Trao đổi tại sân tập', tag: 'GÓC NHÌN THỰC TẾ', alt: 'Giáo viên trao đổi cùng học viên tại sân thực hành' },
]
const questions = [
  { question: 'Chưa biết lái xe thì có thể đăng ký học không?', answer: 'Bạn có thể bắt đầu tìm hiểu khóa học ngay cả khi chưa từng lái xe. Giáo viên sẽ hướng dẫn từ các thao tác cơ bản. Hãy chia sẻ kinh nghiệm hiện tại với admin để được tư vấn lộ trình phù hợp.' },
  { question: 'Học phí bao gồm những khoản nào?', answer: 'Mức trên website là học phí tham khảo theo thông tin hiện có. Văn phòng sẽ xác nhận nội dung khóa học, học phí, lệ phí và các khoản liên quan trước khi bạn quyết định đăng ký.' },
  { question: 'Tôi có thể chọn lịch học phù hợp không?', answer: 'Hãy chia sẻ thời gian rảnh và khóa học bạn quan tâm với văn phòng. Admin sẽ trao đổi về lịch lớp, thời gian thực hành và lựa chọn đang có để bạn cân nhắc.' },
  { question: 'B số sàn hay B tự động phù hợp với tôi?', answer: 'Hãy cân nhắc loại xe bạn dự định sử dụng và nhu cầu đi lại hoặc công việc. B tự động tập trung điều khiển xe số tự động; B số sàn có thêm thao tác côn và chuyển số. Admin sẽ hỗ trợ bạn chọn khóa theo nhu cầu thực tế.' },
  { question: 'Đến văn phòng cần chuẩn bị gì?', answer: 'Gọi hoặc nhắn Zalo trước để thống nhất thời gian gặp. Bạn có thể chuẩn bị câu hỏi về hạng bằng, học phí, lịch học và kinh nghiệm lái xe hiện tại; hồ sơ cụ thể được hướng dẫn theo khóa bạn chọn.' },
  { question: 'Tôi có thể trao đổi riêng với admin không?', answer: 'Có. Chọn Zalo hoặc Messenger để mở cuộc trò chuyện 1:1, hoặc gọi ' + CONTACT.phoneDisplay + ' để trao đổi trực tiếp với văn phòng Linh Xuân.' },
]

export default function HomePage() {
  return <div className="reference-home">
    <section className="ref-hero">
      <div className="container ref-hero__grid">
        <div className="ref-hero__copy">
          <span className="ref-hero__eyebrow"><MapPin size={12} /> {CONTACT.brandName.toUpperCase()}</span>
          <h1>Học lái xe vững vàng.<br /><span>Tự tin trên mọi hành trình.</span></h1>
          <p>Linh Xuân đồng hành cùng bạn từ những bước đầu tiên: tìm hiểu khóa học, chuẩn bị hồ sơ và kết nối với giáo viên Quốc Anh để học bài bản, thực hành từng bước.</p>
          <div className="ref-hero__actions"><a href={CONTACT.zaloUrl} className="btn btn-primary" aria-label="Chat Zalo với admin" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Tư vấn trực tiếp <ArrowRight size={17} /></a><Link to="/#khoa-hoc" className="btn btn-secondary">Xem khóa học <ArrowDown size={16} /></Link></div>
          <div className="ref-hero__points">{heroPoints.map(({ icon: Icon, title, text }) => <div key={title}><Icon size={19} /><section><strong>{title}</strong><span>{text}</span></section></div>)}</div>
        </div>
        <div className="ref-hero__visual"><div className="ref-hero__photo"><img src={instructor} alt="Giáo viên Quốc Anh bên xe tập lái tại sân thực hành" fetchPriority="high" /></div><div className="ref-hero__handnote">Linh Xuân<br /><span>Đồng hành trên mỗi hành trình.</span></div><div className="ref-hero__teacher"><span><ShieldCheck size={21} /></span><div><strong>Giáo viên Quốc Anh</strong><small>Tận tâm từ những buổi học đầu tiên</small></div><CheckCircle2 size={17} /></div><span className="ref-hero__location"><MapPin size={13} /> Linh Xuân · Thủ Đức · TP. Hồ Chí Minh</span></div>
      </div>
    </section>

    <HomeCourseShowcase />

    <section className="ref-fees" id="hoc-phi"><div className="container ref-fees__grid">
      <div className="ref-fees__title"><span className="ref-kicker ref-kicker--light"><Wallet size={13} /> THÔNG TIN HỌC PHÍ</span><h2>Rõ học phí.<br /><span>Chủ động lộ trình.</span></h2></div>
      <div className="ref-fees__content"><div className="ref-fees__intro"><p>Trao đổi về nội dung khóa học và các khoản liên quan trước khi đăng ký. Văn phòng cùng bạn chọn hạng bằng và lịch học phù hợp.</p><Link to="/khoa-hoc#danh-sach-khoa-hoc" className="btn btn-white">Xem học phí từng hạng <ArrowRight size={16} /></Link></div><div className="ref-fees__points">{[{ icon: Wallet, title: 'Xác nhận học phí', text: 'Thông tin rõ ràng' }, { icon: CalendarClock, title: 'Trao đổi lịch học', text: 'Theo nhu cầu của bạn' }, { icon: MessageCircle, title: 'Tư vấn riêng 1:1', text: 'Kết nối trực tiếp' }].map(({ icon: Icon, title, text }) => <div key={title}><Icon size={23} /><section><strong>{title}</strong><span>{text}</span></section></div>)}</div></div>
    </div></section>

    <section className="ref-section ref-journey" id="lo-trinh"><div className="container"><div className="ref-heading"><span className="ref-kicker">QUY TRÌNH HỌC & THI LÁI XE</span><h2>Hành trình học từng bước, vững từng kỹ năng</h2></div><div className="ref-journey__steps">{steps.map(({ icon: Icon, title, text }, index) => <article key={title}><div className="ref-journey__icon"><Icon size={25} /></div><span className="ref-journey__number">0{index + 1}</span><h3>{title}</h3><p>{text}</p>{index < steps.length - 1 && <ArrowRight className="ref-journey__arrow" size={17} aria-hidden="true" />}</article>)}</div></div></section>

    <section className="ref-section ref-benefits" id="ho-tro"><div className="container"><div className="ref-heading"><span className="ref-kicker">VÌ SAO LỰA CHỌN VĂN PHÒNG HỌC LÁI XE LINH XUÂN?</span><h2>Tư vấn rõ ràng – Đồng hành từng bước</h2></div><div className="ref-benefits__grid">{benefits.map(({ icon: Icon, title, text }) => <article key={title}><span><Icon size={23} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="ref-section ref-gallery"><div className="container"><div className="ref-heading ref-heading--row"><div><span className="ref-kicker">HÌNH ẢNH ĐÀO TẠO THỰC TẾ</span><h2>Những buổi học, những bước tiến</h2></div><a href={CONTACT.tiktokUrl} className="text-link" target="_blank" rel="noopener noreferrer">Theo dõi hành trình <ArrowUpRight size={15} /></a></div><div className="ref-gallery__grid">{gallery.map(item => <article key={item.tag}><div><img src={item.image} alt={item.alt} loading="lazy" /></div><section><span>{item.tag}</span><h3>{item.title}</h3></section></article>)}</div><p className="ref-gallery__caption">Hình ảnh từ hoạt động đào tạo cùng giáo viên Quốc Anh.</p></div></section>

    <TikTokSocialSection />

    <section className="ref-office" id="gioi-thieu"><div className="container ref-office__grid">
      <div className="ref-office__copy"><span className="ref-kicker ref-kicker--light">LIÊN HỆ & ĐỊA CHỈ</span><h2>Văn phòng gần bạn.<br /><span>Kết nối dễ dàng.</span></h2><p>{CONTACT.brandName} hỗ trợ tìm hiểu khóa học, học phí, lịch học và các bước đăng ký. Hãy liên hệ trước để thống nhất thời gian tư vấn tại văn phòng.</p><a href={CONTACT.mapsUrl} className="ref-office__address" target="_blank" rel="noopener noreferrer"><MapPin size={20} /><span>{CONTACT.address}</span><ArrowUpRight size={17} /></a><div className="ref-office__quick-links"><a href={CONTACT.phoneUrl}><Phone size={20} /><span>Hotline<strong>{CONTACT.phoneDisplay}</strong></span></a><a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer"><ZaloIcon size={23} /><span>Zalo<strong>Tư vấn trực tiếp</strong></span></a></div></div>
      <div className="ref-office__map"><iframe src={CONTACT.mapsEmbedUrl} title="Vị trí Văn Phòng Học Lái Xe Linh Xuân" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={19} /><span>Văn Phòng Học Lái Xe<br /><strong>Linh Xuân</strong></span><ArrowUpRight size={17} /></a></div>
      <aside className="ref-office__consultation"><span className="ref-office__consult-icon"><MessageCircle size={23} /></span><h3>Cùng bạn chọn khóa học phù hợp</h3><p>Trao đổi riêng với admin về hạng bằng, lịch học, học phí và hồ sơ.</p><a href={CONTACT.zaloUrl} className="ref-office__channel ref-office__channel--zalo" target="_blank" rel="noopener noreferrer"><ZaloIcon size={22} /><span>Chat tư vấn qua Zalo<small>{CONTACT.phoneDisplay}</small></span><ArrowUpRight size={17} /></a><a href={CONTACT.messengerUrl} className="ref-office__channel" target="_blank" rel="noopener noreferrer"><MessengerIcon size={21} /><span>Nhắn tin Messenger<small>Kết nối với Quốc Anh</small></span><ArrowUpRight size={17} /></a><Link to="/lien-he" className="ref-office__more">Thông tin liên hệ đầy đủ <ArrowRight size={15} /></Link></aside>
    </div></section>

    <section className="ref-section ref-faq" id="cau-hoi"><div className="container ref-faq__grid"><div className="ref-heading"><span className="ref-kicker">GIẢI ĐÁP THẮC MẮC</span><h2>Câu hỏi<br />thường gặp</h2><a href={CONTACT.zaloUrl} className="text-link" target="_blank" rel="noopener noreferrer">Hỏi admin <ArrowUpRight size={15} /></a></div><div className="ref-faq__list">{questions.map(({ question, answer }) => <details className="faq-item" key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
  </div>
}
