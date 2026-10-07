import { ArrowRight, ArrowUpRight, Check, Facebook, FileText, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT } from '../data/contact'
import { MessengerIcon, TikTokIcon, ZaloIcon } from '../components/SocialIcons'

const steps = [
  { title: 'Chia sẻ nhu cầu của bạn', text: 'Bạn muốn học xe máy, ô tô số sàn, số tự động hay hạng C1? Admin cùng bạn tìm khóa học phù hợp với mục đích sử dụng.' },
  { title: 'Trao đổi rõ trước khi học', text: 'Tìm hiểu học phí, các khoản liên quan, hồ sơ, địa điểm thực hành và lịch học phù hợp với thời gian của bạn.' },
  { title: 'Được hướng dẫn bước tiếp theo', text: 'Sau khi chọn khóa học, văn phòng hỗ trợ chuẩn bị hồ sơ và kết nối để bạn bắt đầu học lái xe.' },
]

const faqs = [
  { question: 'Tôi chưa biết nên chọn hạng nào, có thể hỏi trước không?', answer: 'Có. Bạn có thể chat hoặc gọi văn phòng Linh Xuân để trao đổi về loại xe muốn lái và mục đích sử dụng. Admin sẽ tư vấn lựa chọn phù hợp trước khi bạn quyết định.' },
  { question: 'Tôi cần cung cấp thông tin gì khi liên hệ?', answer: 'Bạn có thể chia sẻ khóa học quan tâm, kinh nghiệm lái xe hiện tại và thời gian có thể học. Các yêu cầu về hồ sơ sẽ được admin hướng dẫn trực tiếp theo khóa học.' },
  { question: 'Làm sao để biết học phí và lịch khai giảng?', answer: 'Liên hệ qua Zalo, Messenger hoặc hotline để nhận thông tin của khóa học bạn quan tâm. Hãy xác nhận học phí, các khoản liên quan và lịch học trước khi đăng ký.' },
  { question: 'Địa chỉ văn phòng có phải địa điểm thực hành không?', answer: 'Địa chỉ Linh Xuân trên website là văn phòng tư vấn tuyển sinh. Địa điểm học lý thuyết, thực hành và sát hạch được trao đổi cụ thể theo từng khóa học. Bạn nên xác nhận các địa điểm này với admin khi tư vấn.' },
]

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumbs"><Link to="/">Trang chủ</Link><span>/</span><span>Liên hệ văn phòng</span></div>
          <span className="eyebrow">VĂN PHÒNG TƯ VẤN TUYỂN SINH LINH XUÂN</span>
          <h1>Một cuộc trò chuyện.<br /><em>Một khởi đầu tự tin.</em></h1>
          <p>Từ lựa chọn khóa học đến chuẩn bị hồ sơ, đội ngũ tư vấn luôn sẵn sàng đồng hành. Kết nối trực tiếp qua kênh thuận tiện nhất với bạn.</p>
          <div className="contact-intro-points"><span><MessageCircle size={16} />Tư vấn 1:1</span><span><FileText size={16} />Hướng dẫn hồ sơ</span><span><MapPin size={16} />Văn phòng tại Linh Xuân</span></div>
        </div>
      </section>
      <section className="section">
        <div className="container contact-layout">
          <div className="contact-main">
            <div className="section-heading"><span className="eyebrow">TƯ VẤN TRỰC TIẾP</span><h2>Kết nối theo cách của bạn</h2><p>Chọn Zalo, Messenger hoặc hotline để trao đổi 1:1 với admin.</p></div>
            <div className="contact-channels">
              <a href={CONTACT.zaloUrl} target="_blank" rel="noopener noreferrer" className="contact-channel-card contact-zalo">
                <span className="contact-channel-icon"><ZaloIcon size={30} /></span><span className="contact-channel-tag">CHAT 1:1</span><h3>Zalo tư vấn</h3><p>Trao đổi khóa học, lịch học và hướng dẫn chuẩn bị hồ sơ.</p><strong>{CONTACT.phoneDisplay}</strong><span className="contact-channel-action">Mở Zalo <ArrowUpRight size={18} /></span>
              </a>
              <a href={CONTACT.messengerUrl} target="_blank" rel="noopener noreferrer" className="contact-channel-card contact-messenger">
                <span className="contact-channel-icon"><MessengerIcon size={30} /></span><span className="contact-channel-tag">CHAT 1:1</span><h3>Messenger</h3><p>Nhắn tin với Quốc Anh qua tài khoản Facebook của trung tâm.</p><strong>Facebook Quốc Anh</strong><span className="contact-channel-action">Mở Messenger <ArrowUpRight size={18} /></span>
              </a>
              <a href={CONTACT.phoneUrl} className="contact-channel-card contact-phone">
                <span className="contact-channel-icon"><Phone size={28} /></span><span className="contact-channel-tag">GỌI TRỰC TIẾP</span><h3>Hotline tư vấn</h3><p>Gọi để trao đổi nhu cầu học lái xe cùng admin văn phòng.</p><strong>{CONTACT.phoneDisplay}</strong><span className="contact-channel-action">Gọi ngay <ArrowUpRight size={18} /></span>
              </a>
            </div>
            <div className="contact-location">
              <span className="contact-location-icon"><MapPin size={26} /></span>
              <div><span className="eyebrow">ĐỊA CHỈ VĂN PHÒNG</span><h3>Hẹn gặp bạn tại Linh Xuân</h3><p>{CONTACT.address}</p><small>Liên hệ trước để thống nhất thời gian tư vấn trực tiếp.</small></div>
              <a className="text-link" href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">Chỉ đường đến văn phòng <ArrowUpRight size={17} /></a>
            </div>
            <a className="contact-email" href={`mailto:${CONTACT.email}`}><Mail size={18} /><span>Gửi email: <strong>{CONTACT.email}</strong></span><ArrowUpRight size={17} /></a>
          </div>
          <aside className="contact-sidebar">
            <div className="contact-steps-card"><span className="eyebrow">HÀNH TRÌNH BẮT ĐẦU TỪ ĐÂY</span><h2>Rõ thông tin.<br />An tâm lựa chọn.</h2>{steps.map((step, index) => <div className="contact-step" key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></div>)}<Link className="text-link" to="/khoa-hoc">Khám phá các khóa học <ArrowRight size={17} /></Link></div>
            <div className="contact-social-card"><h3>Kết nối với Quốc Anh</h3><p>Những buổi thực hành, kỹ năng lái xe và nội dung mới từ trung tâm trên Facebook, TikTok.</p><a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer"><Facebook size={20} /><span>Facebook Quốc Anh</span><ArrowUpRight size={17} /></a><a href={CONTACT.tiktokUrl} target="_blank" rel="noopener noreferrer"><TikTokIcon size={20} /><span>TikTok của trung tâm</span><ArrowUpRight size={17} /></a></div>
          </aside>
        </div>
      </section>
      <section className="section contact-directions-section">
        <div className="container contact-directions-grid">
          <div className="contact-directions-copy"><span className="eyebrow">TƯ VẤN TẠI VĂN PHÒNG</span><h2>Đến đúng nơi.<br />Được hướng dẫn rõ ràng.</h2><p>{CONTACT.brandName}<br />{CONTACT.address}</p><div className="contact-visit-points"><div><Check size={18} /><span>Gọi hoặc nhắn Zalo trước khi đến để hẹn thời gian.</span></div><div><Check size={18} /><span>Chuẩn bị câu hỏi về khóa học, học phí và lịch học.</span></div><div><Check size={18} /><span>Trao đổi địa điểm học và hồ sơ theo khóa bạn chọn.</span></div></div><a className="btn btn-primary" href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={18} />Mở chỉ đường trên Google Maps <ArrowUpRight size={17} /></a></div>
          <div className="contact-map-frame"><iframe title="Bản đồ văn phòng tư vấn tuyển sinh Linh Xuân" src={CONTACT.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a className="contact-map-label" href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={19} /><span><strong>Văn phòng Linh Xuân</strong><small>Đường Số 1 · Khu Phố 4 · Thủ Đức</small></span><ArrowUpRight size={19} /></a></div>
        </div>
      </section>
      <section className="section contact-faq">
        <div className="container"><div className="section-heading"><span className="eyebrow">TRƯỚC KHI LIÊN HỆ</span><h2>Một vài điều bạn có thể muốn biết</h2></div><div className="faq-list">{faqs.map(faq => <details className="faq-item" key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div>
      </section>
    </div>
  )
}
