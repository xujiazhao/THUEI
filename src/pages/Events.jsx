import { useScrollReveal } from '../hooks/useScrollReveal'
import { timelineEvents, eventDetails } from '../data/events'
import './Events.css'

function EventCard({ event }) {
  return (
    <div className="event-card">
      {event.image && (
        <div className="event-card__img-wrap">
          <img src={event.image} alt={event.title} className="event-card__img" />
        </div>
      )}
      <div className="event-card__content">
        <h3 className="event-card__title">{event.title}</h3>
        <div className="event-card__meta">
          <span className="event-card__guest">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {event.guest}
          </span>
          <span className="event-card__attendees">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {event.attendees}
          </span>
        </div>
        <p className="event-card__desc">{event.description}</p>
        <div className="event-card__date">{event.date}</div>
      </div>
    </div>
  )
}

export default function Events() {
  const [timelineRef, timelineVisible] = useScrollReveal()
  const [detailsRef, detailsVisible] = useScrollReveal()
  const [listRef, listVisible] = useScrollReveal()

  return (
    <div className="events-page">
      {/* Spacer for fixed navbar */}
      <div className="events-page__spacer" />

      {/* Horizontal Timeline */}
      <section className="section section-alt timeline-section" ref={timelineRef}>
        <div className={`reveal ${timelineVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <h2 className="section-title">大事记</h2>
            <p className="timeline-hint">
              滑动查看更多
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </p>
          </div>
          <div className="timeline-scroll">
            <div className="timeline">
              <div className="timeline__line" />
              {timelineEvents.map((event, i) => (
                <div className="timeline__item" key={i}>
                  <div
                    className={`timeline__dot ${
                      event.type === 'milestone' ? 'timeline__dot--milestone' : ''
                    }`}
                  />
                  <div className="timeline__date">{event.date}</div>
                  <div className="timeline__title">{event.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="section">
        <div className="container">
          <div ref={detailsRef} className={`section-header reveal ${detailsVisible ? 'visible' : ''}`}>
            <h2 className="section-title">精彩回顾</h2>
            <p className="section-desc">每一场活动都是一次思想的盛宴</p>
          </div>
          <div ref={listRef} className={`events-list reveal ${listVisible ? 'visible' : ''}`}>
            {eventDetails.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
