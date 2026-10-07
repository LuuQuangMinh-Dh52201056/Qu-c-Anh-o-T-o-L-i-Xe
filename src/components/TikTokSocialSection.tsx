import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Facebook, Film, LoaderCircle, RefreshCw } from 'lucide-react'
import { CONTACT } from '../data/contact'
import { TikTokIcon } from './SocialIcons'
import motorcycleVideo from '../anh/huongdanthiA,A1.mp4'
import motorcyclePoster from '../anh/A1.webp'

type FeedStatus = 'loading' | 'ready' | 'unavailable'

const EMBED_SCRIPT = 'https://www.tiktok.com/embed.js'
const LOAD_TIMEOUT = 18000
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000

function TikTokCreatorFeed() {
  const cardRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<FeedStatus>('loading')
  const [attempt, setAttempt] = useState(0)
  const [reservedStageHeight, setReservedStageHeight] = useState<number | null>(null)
  const statusRef = useRef(status)
  statusRef.current = status

  useEffect(() => {
    if (status !== 'ready') return
    const stage = stageRef.current
    if (!stage) return
    const rememberHeight = () => {
      if (statusRef.current !== 'ready') return
      const height = stage.getBoundingClientRect().height
      if (height > 0) setReservedStageHeight(current => current !== null && Math.abs(current - height) < .5 ? current : height)
    }
    rememberHeight()
    // Keep the measured space current as TikTok expands its iframe or the
    // responsive layout changes. Retries then occupy the same space.
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(rememberHeight) : undefined
    observer?.observe(stage)
    window.addEventListener('resize', rememberHeight)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', rememberHeight)
    }
  }, [status])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    let inViewport = !('IntersectionObserver' in window)
    const visibilityObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
        inViewport = entries.some(entry => entry.isIntersecting)
      })
      : undefined
    visibilityObserver?.observe(card)
    const interval = setInterval(() => {
      const activeElement = document.activeElement
      const interactingWithFeed = activeElement instanceof HTMLIFrameElement && hostRef.current?.contains(activeElement)
      if (inViewport && document.visibilityState === 'visible' && statusRef.current !== 'loading' && !interactingWithFeed) {
        setAttempt(current => current + 1)
      }
    }, AUTO_REFRESH_INTERVAL)
    return () => {
      visibilityObserver?.disconnect()
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let disposed = false
    let started = false
    let script: HTMLScriptElement | undefined
    let timeout: ReturnType<typeof setTimeout> | undefined
    let startTimer: ReturnType<typeof setTimeout> | undefined
    const frames = new Map<HTMLIFrameElement, () => void>()
    const loadedFrames = new Set<HTMLIFrameElement>()
    setStatus('loading')

    function markReady() {
      if (disposed) return
      if (timeout) clearTimeout(timeout)
      setStatus('ready')
    }

    function inspectFrames() {
      host?.querySelectorAll<HTMLIFrameElement>('iframe').forEach(frame => {
        if (loadedFrames.has(frame) && frame.getBoundingClientRect().height >= 200) markReady()
        if (frames.has(frame)) return
        // React owns only the host; TikTok owns all markup inside it.
        frame.title = 'Video mới từ TikTok Quốc Anh Đào Tạo Lái Xe'
        const onLoad = () => {
          if (frame.getAttribute('src') && frame.getAttribute('src') !== 'about:blank') {
            loadedFrames.add(frame)
            // The provider expands a working card after its iframe is ready.
            // A browser error iframe stays collapsed and retains the fallback.
            if (frame.getBoundingClientRect().height >= 200) markReady()
          }
        }
        frames.set(frame, onLoad)
        frame.addEventListener('load', onLoad)
      })
    }

    const observer = new MutationObserver(inspectFrames)

    function onResourceError(event: Event) {
      const resource = event.target
      if (!(resource instanceof HTMLScriptElement || resource instanceof HTMLLinkElement)) return
      const url = resource instanceof HTMLScriptElement ? resource.src : resource.href
      // Remove a failed dependency so TikTok's cached loader can retry it.
      // Successful provider resources are retained across route changes.
      if (url.includes('/tiktok/falcon/embed/')) {
        resource.remove()
        if (!disposed) setStatus('unavailable')
      }
    }

    function start() {
      if (started || disposed || !host) return
      started = true
      intersectionObserver?.disconnect()
      host.replaceChildren()

      const blockquote = document.createElement('blockquote')
      blockquote.className = 'tiktok-embed'
      blockquote.setAttribute('cite', CONTACT.tiktokProfileUrl)
      blockquote.dataset.uniqueId = CONTACT.tiktokUsername
      blockquote.dataset.embedType = 'creator'
      blockquote.dataset.embedFrom = 'oembed'
      blockquote.style.maxWidth = '100%'
      blockquote.style.minWidth = '280px'
      const section = document.createElement('section')
      const profile = document.createElement('a')
      profile.href = CONTACT.tiktokProfileUrl
      profile.target = '_blank'
      profile.rel = 'noopener noreferrer'
      profile.textContent = `@${CONTACT.tiktokUsername}`
      section.appendChild(profile)
      blockquote.appendChild(section)
      host.appendChild(blockquote)

      observer.observe(host, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'src'] })
      document.addEventListener('error', onResourceError, true)
      timeout = setTimeout(() => {
        if (!disposed) setStatus(current => current === 'ready' ? current : 'unavailable')
      }, LOAD_TIMEOUT)

      // A fresh official loader scans the new blockquote on SPA mounts/retries.
      // Deferring start lets React StrictMode clean up its trial effect first.
      script = document.createElement('script')
      script.src = EMBED_SCRIPT
      script.async = true
      script.dataset.linhXuanTikTok = 'creator'
      script.onerror = () => {
        if (!disposed) setStatus('unavailable')
      }
      script.onload = inspectFrames
      document.body.appendChild(script)
    }

    const intersectionObserver = 'IntersectionObserver' in window && attempt === 0
      ? new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) startTimer = setTimeout(start, 0)
      }, { rootMargin: '300px 0px' })
      : undefined

    if (intersectionObserver) intersectionObserver.observe(host)
    else startTimer = setTimeout(start, 0)

    return () => {
      disposed = true
      intersectionObserver?.disconnect()
      observer.disconnect()
      if (timeout) clearTimeout(timeout)
      if (startTimer) clearTimeout(startTimer)
      frames.forEach((listener, frame) => frame.removeEventListener('load', listener))
      document.removeEventListener('error', onResourceError, true)
      if (script) {
        script.onload = null
        script.onerror = null
        script.remove()
      }
    }
  }, [attempt])

  return <div ref={cardRef} className="tiktok-feed-card" data-testid="tiktok-feed" data-status={status}>
    <div className="tiktok-feed-heading">
      <div><span className="tiktok-feed-icon"><TikTokIcon size={21} /></span><div><h3>Góc học lái trên TikTok</h3><p>Video mới từ kênh Quốc Anh</p></div></div>
      <button className="tiktok-refresh" type="button" onClick={() => setAttempt(current => current + 1)} disabled={status === 'loading'} aria-label="Tải lại video" title="Tải lại video"><RefreshCw size={17} /><span>Tải lại</span></button>
    </div>
    <div ref={stageRef} className="tiktok-feed-stage" style={status !== 'ready' && reservedStageHeight !== null ? { height: reservedStageHeight } : undefined}>
      <div ref={hostRef} className="tiktok-embed-host" data-testid="tiktok-embed-host" />
      {status === 'loading' && <div className="tiktok-feed-loading" role="status"><LoaderCircle size={30} /><strong>Đang tải video từ TikTok</strong><p>Khám phá những bài học và khoảnh khắc mới từ kênh.</p></div>}
      {status === 'unavailable' && <div className="tiktok-feed-unavailable" role="status"><span className="tiktok-unavailable-icon"><TikTokIcon size={37} /></span><h4>TikTok chưa hiển thị video</h4><p>Bạn có thể mở kênh để xem video mới hoặc thử tải lại tại đây.</p><div><a className="tiktok-open-button" href={CONTACT.tiktokUrl} target="_blank" rel="noopener noreferrer">Mở kênh TikTok <ArrowUpRight size={17} /></a><button className="tiktok-retry-button" type="button" onClick={() => setAttempt(current => current + 1)}><RefreshCw size={16} />Tải lại video</button></div></div>}
    </div>
    <div className="tiktok-feed-footnote"><span>Video mới được cập nhật từ kênh TikTok Quốc Anh.</span><a href={CONTACT.tiktokUrl} target="_blank" rel="noopener noreferrer">Xem toàn bộ video <ArrowUpRight size={15} /></a></div>
  </div>
}

export default function TikTokSocialSection() {
  return <section className="section tiktok-section" id="mang-xa-hoi">
    <div className="container">
      <div className="section-heading section-heading-row"><div><span className="section-label">KẾT NỐI & KHÁM PHÁ</span><h2>Mỗi video, thêm một<br />kinh nghiệm cầm lái.</h2></div><p className="section-heading-aside">Theo dõi các bài hướng dẫn, hoạt động học lái và những khoảnh khắc thực tế trên kênh TikTok Quốc Anh.</p></div>
      <div className="tiktok-section-grid">
        <TikTokCreatorFeed />
        <aside className="tiktok-side-column" aria-label="Kênh mạng xã hội và video hướng dẫn">
          <a className="tiktok-channel-card" href={CONTACT.tiktokUrl} target="_blank" rel="noopener noreferrer">
            <div className="tiktok-channel-top"><span className="tiktok-channel-platform"><TikTokIcon size={18} /> KÊNH TIKTOK</span><ArrowUpRight size={23} /></div>
            <div className="tiktok-channel-brand"><span><TikTokIcon size={28} /></span><div>QUỐC ANH<small>ĐÀO TẠO LÁI XE</small></div></div>
            <h3>Học lái gần hơn.<br />Trải nghiệm nhiều hơn.</h3>
            <p>@{CONTACT.tiktokUsername}</p>
            <span className="tiktok-channel-cta">Theo dõi kênh <ArrowRight size={18} /></span>
          </a>
          <a className="tiktok-facebook-card" href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer"><span className="tiktok-facebook-icon"><Facebook size={24} /></span><div><span>CÙNG KẾT NỐI</span><h3>Ghé thăm Facebook</h3><p>Hoạt động & thông tin tuyển sinh</p></div><ArrowUpRight size={20} /></a>
          <article className="tiktok-tutorial-card">
            <div className="tiktok-tutorial-media"><video controls preload="none" playsInline poster={motorcyclePoster} aria-label="Video hướng dẫn thi sát hạch hạng A và A1"><source src={motorcycleVideo} type="video/mp4" />Trình duyệt chưa hỗ trợ phát video. <a href={motorcycleVideo}>Mở video hướng dẫn</a></video><span><Film size={14} /> VIDEO HƯỚNG DẪN</span></div>
            <div className="tiktok-tutorial-copy"><h3>Làm quen bài thi A & A1</h3><p>Xem trước bài thực hành để tự tin hơn khi đến sân tập.</p></div>
          </article>
        </aside>
      </div>
    </div>
  </section>
}
