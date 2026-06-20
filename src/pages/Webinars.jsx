import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import { ImgPlaceholder } from '../components/ImgPlaceholder'
import { WEBINARS, GUESTS, slugify } from '../data/site'
import { fetchWebinarEvents, fetchGuests } from '../apiClient'

const REGISTER = 'https://tiesverse.com/webinar'
const initials = (n) =>
  n.replace(/\(.*?\)/g, '').split(' ').filter((w) => /[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('')

function dateParts(str) {
  const [md, year] = str.split(', ')
  let weekday = ''
  const d = new Date(str)
  if (!isNaN(d.getTime())) weekday = d.toLocaleDateString('en-US', { weekday: 'long' })
  return { md, year, weekday }
}

// true once the event date is in the past (registration should close)
function isClosed(str) {
  const d = new Date(str)
  if (isNaN(d.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d < today
}

function Thumb({ w }) {
  const [ok, setOk] = useState(Boolean(w.poster))
  if (ok && w.poster)
    return <img className="lu-thumb-img" src={`/work/${w.poster}`} alt={w.topic} onError={() => setOk(false)} />
  return <span className="lu-thumb-ph"><b>{initials(w.speaker)}</b></span>
}

function Feed({ items, isPast }) {
  if (!items.length) return <p className="lu-empty">Nothing here right now. Check back soon.</p>
  return (
    <div className="lu-feed">
      {items.map((w, i) => {
        const { md, year, weekday } = dateParts(w.date)
        const to = `/webinars/${slugify(w.topic)}`
        return (
          <div className="lu-day" key={i}>
            <div className="lu-rail">
              <span className="lu-date">{md}</span>
              <span className="lu-year">{year}</span>
              {weekday && <span className="lu-weekday">{weekday}</span>}
            </div>
            <div className="lu-events">
              {(() => {
                const closed = isPast || isClosed(w.date)
                return (
                  <Link className="lu-event" to={to}>
                    <div className="lu-event-body">
                      <span className="lu-time">{w.time || 'Online · IST'}</span>
                      <h3 className="lu-title serif">{w.topic}</h3>
                      <div className="lu-host">
                        <span className="lu-host-av">{initials(w.speaker)}</span>
                        <span>By <strong>{w.speaker}</strong> · {w.org}</span>
                      </div>
                      <div className="lu-meta">
                        <span className="lu-chip"><span className="lu-chip-ic">▶</span>{w.kind === 'workshop' ? 'Workshop' : 'Webinar'} · Online</span>
                        <span className="lu-free">{w.kind === 'workshop' ? 'Register now' : 'Free entry'}</span>
                      </div>
                      <span className={`btn ${closed ? 'btn-outline' : 'btn-primary'} lu-cta`}>
                        {closed ? 'Watch recording' : 'Register'}
                      </span>
                    </div>
                    <span className="lu-thumb"><Thumb w={w} /></span>
                  </Link>
                )
              })()}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Webinars() {
  const [tab, setTab] = useState('upcoming')
  const [allWebinars, setAllWebinars] = useState(WEBINARS)
  const [allGuests, setAllGuests] = useState(GUESTS)

  useEffect(() => {
    fetchWebinarEvents().then((live) => {
      if (live && Array.isArray(live) && live.length) {
        // Normalize Turso event shape to match static WEBINARS shape
        const normalized = live.map((e) => ({
          date: e.startAt ? new Date(e.startAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
          time: e.startAt ? new Date(e.startAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST' : '',
          speaker: e.organizer?.name || '',
          org: e.organizer?.bio || '',
          topic: e.title || '',
          poster: e.coverImageUrl || null,
          register: e.meetingUrl || '',
        }))
        setAllWebinars(normalized)
      }
    })
    fetchGuests().then((live) => {
      if (live && Array.isArray(live) && live.length) setAllGuests(live)
    })
  }, [])

  const upcoming = allWebinars.filter((w) => w.poster)
  const past = allWebinars.filter((w) => !w.poster)
  const items = tab === 'upcoming' ? upcoming : past
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top lu">
        <div className="container">
          <header className="lu-hero">
            <span className="eyebrow accent">Engagements · Webinars &amp; Workshops</span>
            <h1 className="serif">Webinars &amp; workshops</h1>
            <p className="lu-hero-sub">Online sessions with the people shaping geopolitics, media and technology, plus workshops and competitions for schools, colleges and institutions. Browse what’s coming up and register.</p>
            <div className="lu-hero-actions">
              <a className="btn btn-primary" href={REGISTER} target="_blank" rel="noreferrer">Subscribe to sessions</a>
              <span className="lu-hero-meta">Hosted by Tiesverse · Online · {upcoming.length} upcoming</span>
            </div>
          </header>
          <div className="lu-cover">
            <span className="lu-cover-eyebrow">Live · Online · Free</span>
            <h2 className="serif">Conversations with the people shaping the world.</h2>
          </div>

          <div className="lu-tabs">
            <button className={`lu-tab ${tab === 'upcoming' ? 'on' : ''}`} onClick={() => setTab('upcoming')}>
              Upcoming <span>{upcoming.length}</span>
            </button>
            <button className={`lu-tab ${tab === 'past' ? 'on' : ''}`} onClick={() => setTab('past')}>
              Past <span>{past.length}</span>
            </button>
          </div>

          <Feed items={items} isPast={tab === 'past'} />

          {/* past guests */}
          <section className="lu-guests-sec">
            <div className="lu-guests-head">
              <span className="eyebrow accent">Voices</span>
              <h2 className="serif">People who’ve joined us</h2>
              <Link className="lu-all" to="/guests">All guests →</Link>
            </div>
            <div className="lu-guests">
              {GUESTS.slice(0, 8).map((g, i) => (
                <div className="lu-guest" key={i}>
                  {g.photo
                    ? <img className="lu-guest-photo" src={`/work/${g.photo}`} alt={g.name} />
                    : <span className="lu-guest-mono">{initials(g.name)}</span>}
                  <div><strong>{g.name}</strong><span>{g.role}</span></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <CtaBand />
      <Footer />
      <style>{css}</style>
    </>
  )
}

const css = `
.pad-top{padding-top:74px}.accent{color:var(--ink)}
.lu{padding:100px 0 var(--sec)}
.lu .container{max-width:1040px}

/* hero header */
.lu-hero{margin-bottom:30px}

/* cover banner: dark card with orange radial fade */
.lu-cover{position:relative;overflow:hidden;background:var(--dark);color:var(--on-dark);border-radius:18px;padding:46px 44px;margin-bottom:40px;min-height:172px;display:flex;flex-direction:column;justify-content:center}
.lu-cover::before{content:'';position:absolute;inset:0;background:radial-gradient(60% 95% at 85% 25%,rgba(254,122,0,.3),transparent 70%)}
.lu-cover>*{position:relative}
.lu-cover-eyebrow{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#ffd9a8;margin-bottom:12px}
.lu-cover h2{color:#fff;font-size:clamp(24px,3vw,40px);line-height:1.08;max-width:640px}
.lu-hero h1{font-size:clamp(34px,4.6vw,54px);margin:14px 0 0;line-height:1.04}
.lu-hero-sub{color:var(--soft);font-size:17px;line-height:1.6;margin:16px 0 24px;max-width:640px}
.lu-hero-actions{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.lu-hero-meta{font-size:13.5px;color:var(--soft)}

/* tabs */
.lu-tabs{display:flex;gap:8px;margin-bottom:34px}
.lu-tab{background:none;border:1px solid var(--rule);border-radius:30px;padding:9px 18px;font-size:14px;font-weight:600;color:var(--soft);cursor:pointer;display:inline-flex;gap:8px;align-items:center;transition:background .2s,color .2s,border-color .2s}
.lu-tab span{font-size:12px;background:var(--cream);border-radius:20px;padding:1px 8px;color:var(--soft)}
.lu-tab:hover{border-color:var(--ink);color:var(--ink)}
.lu-tab.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.lu-tab.on span{background:rgba(255,255,255,.18);color:#fff}

/* timeline feed */
.lu-day{display:grid;grid-template-columns:118px 1fr;gap:30px}
.lu-rail{position:relative;padding-top:5px}
.lu-date{display:block;font-size:18px;font-weight:700;color:var(--ink)}
.lu-year{display:block;font-size:13px;color:var(--soft)}
.lu-weekday{display:block;font-size:13px;color:var(--soft);margin-top:2px}
.lu-events{border-left:1px solid var(--rule);padding-left:30px;padding-bottom:26px;position:relative}
.lu-events::before{content:'';position:absolute;left:-5px;top:8px;width:9px;height:9px;border-radius:50%;background:var(--ink);box-shadow:0 0 0 4px var(--paper)}
.lu-event{display:grid;grid-template-columns:1fr 165px;gap:24px;align-items:center;border:1px solid var(--rule);border-radius:16px;padding:22px;background:#fff;text-decoration:none;color:inherit;transition:box-shadow .25s,border-color .25s,transform .25s}
.lu-event:hover{border-color:rgba(29,22,13,.28);box-shadow:0 18px 40px rgba(70,40,0,.08);transform:translateY(-2px)}
.lu-time{font-size:13.5px;font-weight:600;color:var(--soft)}
.lu-title{font-size:21px;line-height:1.2;margin:8px 0 12px;color:var(--ink);transition:color .2s}
.lu-event:hover .lu-title{color:var(--ink)}
.lu-host{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--soft);margin-bottom:14px}
.lu-host strong{color:var(--ink);font-weight:600}
.lu-host-av{width:26px;height:26px;border-radius:50%;background:linear-gradient(150deg,#c9bdab,#a99d88);color:#3a1c00;font-size:10.5px;font-weight:700;display:grid;place-items:center;flex:none}
.lu-meta{display:flex;align-items:center;gap:12px;margin-bottom:18px;flex-wrap:wrap}
.lu-chip{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--ink);background:#fff;border:1px solid var(--rule);border-radius:9px;padding:5px 11px}
.lu-chip-ic{font-size:10px;color:var(--ink)}
.lu-free{font-size:12.5px;font-weight:700;color:var(--ink);background:#fff3e3;border:1px solid rgba(254,122,0,.28);border-radius:9px;padding:5px 11px}
.lu-cta{font-size:13.5px;padding:10px 20px}
.lu-cta-closed{background:var(--cream);color:var(--soft);border:1px solid var(--rule);cursor:not-allowed}
/* FIXED 3:4 poster: never resizes with the title */
.lu-thumb{align-self:center;display:block}
.lu-thumb-img,.lu-thumb-ph{width:165px;height:220px;object-fit:cover;border-radius:12px;display:block}
.lu-thumb-ph{display:grid;place-items:center;background:linear-gradient(150deg,#2a2118,#15140f)}
.lu-thumb-ph b{font-family:var(--serif);font-size:34px;color:var(--on-dark)}
.lu-empty{color:var(--soft);padding:30px 0;font-size:16px}
@media(max-width:760px){
  .lu-day{grid-template-columns:1fr;gap:8px}
  .lu-rail{display:flex;gap:10px;align-items:baseline}
  .lu-events{border-left:none;padding-left:0}
  .lu-events::before{display:none}
  .lu-event{grid-template-columns:1fr;justify-items:start}
  .lu-thumb{order:-1;align-self:stretch;width:100%}
  .lu-thumb-img,.lu-thumb-ph{width:100%;height:230px}
}

/* past guests */
.lu-guests-sec{margin-top:72px;padding-top:50px;border-top:1px solid var(--rule)}
.lu-guests-head{display:flex;align-items:baseline;gap:18px;margin-bottom:26px;flex-wrap:wrap}
.lu-guests-head h2{font-size:clamp(24px,3vw,38px);margin-top:6px}
.lu-all{margin-left:auto;font-size:14px;font-weight:600;color:var(--ink)}
.lu-guests{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.lu-guest{display:flex;align-items:center;gap:14px;border:1px solid var(--rule);border-radius:12px;padding:16px 18px;background:#fff}
.lu-guest-mono{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(150deg,#c9bdab,#a99d88);color:#3a1c00;font-family:var(--serif);font-size:16px;font-weight:600;flex:none}
.lu-guest-photo{width:46px;height:46px;border-radius:50%;object-fit:cover;flex:none}
.lu-guest strong{display:block;font-size:15px;line-height:1.2}
.lu-guest span{font-size:12.5px;color:var(--soft)}
@media(max-width:620px){.lu-guests{grid-template-columns:1fr}}
`
