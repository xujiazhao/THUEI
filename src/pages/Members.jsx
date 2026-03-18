import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  mentors,
  advisors,
  founders,
  coreMembers,
} from '../data/members'
import './Members.css'

function MemberCard({ member, size = 'default' }) {
  const initials = member.name ? member.name.slice(-2) : '??'
  const avatarClass = size === 'small' ? 'member-card__avatar member-card__avatar--sm' : 'member-card__avatar'

  return (
    <div className={`member-card member-card--${size}`}>
      <div className={avatarClass}>
        <span>{initials}</span>
      </div>
      <div className="member-card__info">
        <h4 className="member-card__name">{member.name || member.role}</h4>
        <p className="member-card__title">{member.title}</p>
        {member.subtitle && (
          <p className="member-card__subtitle">{member.subtitle}</p>
        )}
        {member.role && size !== 'small' && member.name && (
          <p className="member-card__role">{member.role}</p>
        )}
        {member.description && size !== 'small' && (
          <p className="member-card__desc">{member.description}</p>
        )}
      </div>
    </div>
  )
}

function MemberSection({ title, children }) {
  const [ref, isVisible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`member-section reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="member-section__header">
        <h2 className="section-title">{title}</h2>
      </div>
      {children}
    </div>
  )
}

export default function Members() {
  return (
    <div className="members-page">
      <div className="members-page__spacer" />

      <div className="container members-content">
        <MemberSection title="导师">
          <div className="members-grid members-grid--large">
            {mentors.map((member, i) => (
              <MemberCard key={i} member={member} size="large" />
            ))}
          </div>
        </MemberSection>

        <MemberSection title="顾问">
          <div className="members-grid members-grid--medium">
            {advisors.map((member, i) => (
              <MemberCard key={i} member={member} />
            ))}
          </div>
        </MemberSection>

        <MemberSection title="创始团队">
          <div className="members-grid members-grid--medium">
            {founders.map((member, i) => (
              <MemberCard key={i} member={member} />
            ))}
          </div>
        </MemberSection>

        <MemberSection title="核心成员">
          <div className="members-grid members-grid--small">
            {coreMembers.map((member, i) => (
              <MemberCard key={i} member={member} size="small" />
            ))}
          </div>
        </MemberSection>
      </div>
    </div>
  )
}
