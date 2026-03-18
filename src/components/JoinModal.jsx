import { useEffect } from 'react'
import './JoinModal.css'

export default function JoinModal({ isOpen, onClose, variant = 'default' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="关闭">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal__icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>

        <h2 className="modal__title">{variant === 'company' ? '加入链接' : '加入我们'}</h2>
        <p className="modal__desc">
          {variant === 'company'
            ? '欢迎企业与清华MBA具身智能俱乐部建立合作链接。'
            : '欢迎加入清华MBA具身智能俱乐部，与行业精英共同探索具身智能的未来。'}
        </p>

        <div className="modal__methods">
          <div className="modal__method">
            <div className="modal__method-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </div>
            <div>
              <h4>业务合作</h4>
              <p>
                发送邮件至{' '}
                <a href="mailto:eitechclub@163.com">eitechclub@163.com</a>
                <br />
                请注明公司/学校与合作诉求
              </p>
            </div>
          </div>

          {variant !== 'company' && (
          <div className="modal__method">
            <div className="modal__method-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <div>
              <h4>加入俱乐部</h4>
              <p>
                直接添加俱乐部小助手微信：<span style={{ color: 'var(--color-primary)' }}>15652800870</span>
                <br />
                请注明个人信息
              </p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
