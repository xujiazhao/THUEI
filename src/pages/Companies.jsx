import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { linkedCompanies } from '../data/companies'
import JoinModal from '../components/JoinModal'
import './Companies.css'

export default function Companies() {
  const [gridRef, gridVisible] = useScrollReveal()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="companies-page">
      <div className="companies-page__spacer" />

      <section className="section" ref={gridRef}>
        <div className={`container reveal ${gridVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <h2 className="section-title">已链接具身智能头部公司</h2>
            <p className="section-desc">
              俱乐部已与多家具身智能领域头部企业建立合作或成员来自这些公司
            </p>
          </div>
          <div className="companies-grid">
            {linkedCompanies.map((company, i) => (
              <div className="company-item" key={i}>
                <div className="company-item__logo">
                  <img src={company.logo} alt={company.name} />
                </div>
                <span className="company-item__name">{company.name}</span>
              </div>
            ))}
          </div>
          <div className="section-action">
            <button className="btn-secondary" onClick={() => setShowModal(true)}>
              加入链接
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <JoinModal isOpen={showModal} onClose={() => setShowModal(false)} variant="company" />
    </div>
  )
}
