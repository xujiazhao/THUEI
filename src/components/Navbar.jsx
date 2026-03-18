import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { asset } from '../utils/asset'
import './Navbar.css'

export default function Navbar({ onJoinClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHome = location.pathname === '/'

  return (
    <>
      <div className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
        <Link
          to="/"
          className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`}
        >
          首页
        </Link>
        <Link
          to="/events"
          className={`navbar__link ${location.pathname === '/events' ? 'active' : ''}`}
        >
          往期活动
        </Link>
        <Link
          to="/companies"
          className={`navbar__link ${location.pathname === '/companies' ? 'active' : ''}`}
        >
          企业链接
        </Link>
        <Link
          to="/members"
          className={`navbar__link ${location.pathname === '/members' ? 'active' : ''}`}
        >
          导师与成员
        </Link>
        <button className="btn btn-primary navbar__cta" onClick={onJoinClick}>
          加入我们
          <svg className="navbar__cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${!isHome ? 'navbar--light' : ''}`}>
        <div className="navbar__inner container">
          <Link to="/" className="navbar__logo">
            <img src={asset('/images/branding/THUEIlogo.svg')} alt="THUEI" className="navbar__logo-img" />
            <span className="navbar__logo-text">清华MBA具身智能俱乐部</span>
          </Link>

          <button
            className={`navbar__toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Desktop menu - duplicated for desktop only */}
          <div className="navbar__menu-desktop">
            <Link
              to="/"
              className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`}
            >
              首页
            </Link>
            <Link
              to="/events"
              className={`navbar__link ${location.pathname === '/events' ? 'active' : ''}`}
            >
              往期活动
            </Link>
            <Link
              to="/companies"
              className={`navbar__link ${location.pathname === '/companies' ? 'active' : ''}`}
            >
              企业链接
            </Link>
            <Link
              to="/members"
              className={`navbar__link ${location.pathname === '/members' ? 'active' : ''}`}
            >
              导师与成员
            </Link>
            <button className="btn btn-primary navbar__cta" onClick={onJoinClick}>
              加入我们
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
