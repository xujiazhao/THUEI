import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCounter } from '../hooks/useCounter'
import './Home.css'

/* ---- Sub-components ---- */

function StatItem({ number, suffix, label, isVisible }) {
  const count = useCounter(number, 1800, isVisible)
  return (
    <div className="stat">
      <div className="stat__number">
        {count}
        <span className="stat__suffix">{suffix}</span>
      </div>
      <div className="stat__label">{label}</div>
    </div>
  )
}

const activityTypes = [
  {
    image: '/images/sharing.webp',
    title: '行业专家分享',
    description: '邀请具身智能领域领军者解析前沿趋势与商业化路径，深度探讨技术变革与产业机遇',
  },
  {
    image: '/images/grouping.webp',
    title: '创新小组实践',
    description: '通过场景化项目孵化跨学科协作能力，探索具身智能在服务、工业等领域的应用落地',
  },
  {
    image: '/images/topicdis.webp',
    title: '专题研究会',
    description: '组织跨界研讨聚焦技术突破与产业落地挑战，推动算法、硬件与场景融合的务实对话',
  },
]

const partners = [
  '清华x-lab',
  '北大创新学社',
  '战略节奏研习社',
  '清华FuRoC未来智能机器人兴趣团队',
  '清华经管学院MBA中心',
  '清华经管学院职业发展中心',
  '清华学生创业协会',
  '清华商业智慧设计协会',
  '清华学生通用人工智能研究会',
  '清华学生开源芯片协会',
  '清华学生元宇宙协会',
  '清华学生国际科技设计协会',
  '清华未来航空学生兴趣团队',
]

/* ---- Page ---- */

export default function Home({ onJoinClick }) {
  const [statsRef, statsVisible] = useScrollReveal()
  const [aboutRef, aboutVisible] = useScrollReveal()
  const [typesRef, typesVisible] = useScrollReveal()
  const [partnersRef, partnersVisible] = useScrollReveal()


  useEffect(() => {
    if (!statsVisible) return
    const canvas = document.getElementById('statsCanvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const section = canvas.parentElement

    const resize = () => {
      canvas.width = section.offsetWidth * window.devicePixelRatio
      canvas.height = section.offsetHeight * window.devicePixelRatio
      canvas.style.width = section.offsetWidth + 'px'
      canvas.style.height = section.offsetHeight + 'px'
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    const w = section.offsetWidth
    const h = section.offsetHeight
    const angle = (30 * Math.PI) / 180
    const spacing = 28
    const lineLength = Math.sqrt(w * w + h * h)
    const count = Math.ceil((w + h * Math.tan(angle)) / spacing) + 5

    const lines = []
    for (let i = 0; i < count; i++) {
      const startX = -h * Math.tan(angle) + i * spacing
      const maxProgress = 0.3 + Math.random() * 0.65
      lines.push({
        x0: startX,
        y0: h,
        x1: startX + h / Math.tan(Math.PI / 2 - angle),
        y1: 0,
        progress: 0,
        maxProgress,
        delay: i * 20,
      })
    }

    let startTime = null
    const duration = 1800
    let rafId

    function draw(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      ctx.clearRect(0, 0, w, h)

      for (const line of lines) {
        const t = Math.min(Math.max((elapsed - line.delay) / duration, 0), 1)
        const eased = 1 - Math.pow(1 - t, 3)
        line.progress = eased * line.maxProgress

        if (line.progress <= 0) continue

        const cx = line.x0 + (line.x1 - line.x0) * line.progress
        const cy = line.y0 + (line.y1 - line.y0) * line.progress

        ctx.beginPath()
        ctx.moveTo(line.x0, line.y0)
        ctx.lineTo(cx, cy)
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)'
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(cx, cy, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(130, 49, 142, 0.5)'
        ctx.fill()
      }

      const allDone = lines.every((l) => l.progress >= l.maxProgress * 0.99)
      if (!allDone) {
        rafId = requestAnimationFrame(draw)
      }
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [statsVisible])

  return (
    <div className="home">
      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="hero__grid" />
        <div className="hero__content">
          <p className="hero__badge">Tsinghua MBA Embodied Intelligence Club</p>
          <h1 className="hero__title">
            清华MBA
            <br />
            具身智能俱乐部
          </h1>
          <p className="hero__subtitle">
            We're born too late to explore the earth
            <br />
            Too early to travel to other galaxies
            <br />
            Just in time to solve robotics
          </p>
          <div className="hero__actions">
            <button className="btn btn-primary" onClick={onJoinClick}>
              加入我们
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
        <div className="hero__scroll">
          <span>了解更多</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="section" ref={aboutRef}>
        <div className={`container reveal ${aboutVisible ? 'visible' : ''}`}>
          <div className="about">
            <div className="about__label">
              <span className="section-label">目标与愿景</span>
            </div>
            <h2 className="about__heading">
              助力资源整合与推动跨领域合作
            </h2>
            <p className="about__text">
              俱乐部成立于2024年12月，致力于推动跨领域合作，为行业发展商业化提供支持。我们的愿景是成为清华具身智能商业化的精英网络和桥梁，链接学术研究、产业实践与投资资源。
            </p>
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="stats-section" ref={statsRef}>
        <canvas className="stats-section__canvas" id="statsCanvas" />
        <div className={`container reveal ${statsVisible ? 'visible' : ''}`}>
          <div className="stats">
            <StatItem number={5000} suffix="+" label="高知会员" isVisible={statsVisible} />
            <StatItem number={100} suffix="+" label="TOP头部公司交流合作" isVisible={statsVisible} />
            <StatItem number={30} suffix="+" label="场重磅活动" isVisible={statsVisible} />
            <StatItem number={25000} suffix="+" label="全域观众" isVisible={statsVisible} />
            <StatItem number={150} suffix="+" label="高校具身智能博士" isVisible={statsVisible} />
          </div>
        </div>
      </section>

      {/* ===== Activity Types ===== */}
      <section className="section" ref={typesRef}>
        <div className={`container reveal ${typesVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-label">俱乐部活动</span>
            <h2 className="section-title">通过丰富多样的活动形式，连接学术前沿与产业实践</h2>
          </div>
          <div className="types-grid">
            {activityTypes.map((type, i) => (
              <div className="type-card" key={i}>
                <div className="type-card__img-wrap">
                  <img src={type.image} alt={type.title} className="type-card__img" />
                </div>
                <div className="type-card__body">
                  <h3 className="type-card__title">{type.title}</h3>
                  <p className="type-card__desc">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="section-action">
            <Link to="/events" className="btn-secondary">
              查看往期活动
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Partners ===== */}
      <section className="section section-alt" ref={partnersRef}>
        <div className={`container reveal ${partnersVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-label">对外合作</span>
            <h2 className="section-title">生态支持与合作单位</h2>
            <p className="partners-hint">
              滑动查看更多
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </p>
          </div>
          <div className="partners-scroll">
            <div className="partners-grid">
              {partners.map((partner, i) => (
                <div className="partner-item" key={i}>
                  {partner}
                </div>
              ))}
            </div>
            <div className="partners-rows">
              {[0, 1, 2].map((row) => (
                <div className="partners-row" key={row}>
                  {partners
                    .filter((_, i) => i % 3 === row)
                    .map((partner, j) => (
                      <div className="partner-item" key={j}>
                        {partner}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2 className="cta-card__title">与我们一起，探索具身智能的未来</h2>
            <button className="btn btn-primary" onClick={onJoinClick}>
              立即加入
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
