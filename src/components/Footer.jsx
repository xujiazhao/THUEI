import { Link } from 'react-router-dom'
import { asset } from '../utils/asset'
import './Footer.css'

export default function Footer({ onJoinClick }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={asset('/images/branding/THUEIlogo.svg')} alt="THUEI" className="footer__logo-img" />
              <span className="footer__logo-text">清华MBA具身智能俱乐部</span>
            </div>
            <p className="footer__slogan">
              We're born too late to explore the earth
              <br />
              Too early to travel to other galaxies
              <br />
              Just in time to solve robotics
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4 className="footer__col-title">联系我们</h4>
              <a href="mailto:eitechclub@163.com" className="footer__link">
                eitechclub@163.com
              </a>
              <div className="footer__qr-row">
                <div className="footer__qr">
                  <img src={asset('/qrs/subsaccount.png')} alt="订阅号" />
                  <span>订阅号</span>
                </div>
                <div className="footer__qr">
                  <img src={asset('/qrs/videoaccount.png')} alt="视频号" />
                  <span>视频号</span>
                </div>
              </div>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">加入</h4>
              <button className="footer__link" onClick={onJoinClick}>
                加入俱乐部
              </button>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} 清华MBA具身智能俱乐部</p>
        </div>
      </div>
    </footer>
  )
}
