import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import { ImgPlaceholder } from '../components/ImgPlaceholder'
import { CITY_EVENTS, CONTACT, slugify } from '../data/site'

const REGISTER = 'https://tiesverse.com/events'

const flagship = CITY_EVENTS.find((e) => e.flagship)
const upcoming = CITY_EVENTS.filter((e) => !e.past).sort((a, b) => new Date(a.date) - new Date(b.date))
const cities = ['All', ...Array.from(new Set(upcoming.map((e) => e.city)))]
const categories = ['All', ...Array.from(new Set(upcoming.map((e) => e.category)))]

const priceLabel = (p) => (p === 0 ? 'Free' : `₹${p}`)
const initials = (n) => n.replace(/\(.*?\)/g, '').split(' ').filter((w) => /[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('')
function dateParts(str) {
  const [md, year] = String(str).split(', ')
  let weekday = ''
  const d = new Date(str)
  if (!isNaN(d.getTime())) weekday = d.toLocaleDateString('en-US', { weekday: 'long' })
  return { md, year, weekday }
}

function EventCard({ e }) {
  const { md, year, weekday } = dateParts(e.date)
  const to = `/events/${slugify(e.title)}`
  return (
    <div className="evt-day">
      <div className="evt-rail">
        <span className="evt-date">{md}</span>
        <span className="evt-year">{year}</span>
        {weekday && <span className="evt-weekday">{weekday}</span>}
      </div>
      <div className="evt-events">
        <Link className="evt-card" to={to}>
          <div className="evt-body">
            <span className="evt-time">{e.time}</span>
            <h3 className="evt-title serif">{e.title}</h3>
            <div className="evt-host"><span className="evt-host-av">{initials(e.host)}</span><span>By <strong>{e.host}</strong></span></div>
            <div className="evt-tags">
              <span className="evt-chip"><span className="evt-chip-ic">📍</span>{e.category} · {e.city}</span>
              {e.price === 0
                ? <span className="evt-free">Free entry</span>
                : (
                  <span className="evt-price-wrap">
                    {e.orig && <span className="evt-price-orig">₹{e.orig}</span>}
                    <span className="evt-price-now">₹{e.price}</span>
                    {e.orig && <span className="evt-save">Save ₹{e.orig - e.price}</span>}
                  </span>
                )}
            </div>
            <span className="btn btn-primary evt-cta">{e.price === 0 ? 'Register' : 'Get tickets'}</span>
          </div>
          <div className="evt-thumb"><ImgPlaceholder label={`${e.category} · ${e.city}`} size="1200×1500" ratio="4 / 5" /></div>
        </Link>
      </div>
    </div>
  )
}

export default function Events() {
  const [city, setCity] = useState('All')
  const [cat, setCat] = useState('All')
  const list = upcoming.filter((e) => (city === 'All' || e.city === city) && (cat === 'All' || e.category === cat))

  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top ce">
        <div className="container">
          <header className="ce-hero">
            <span className="eyebrow accent">Engagements · Events</span>
            <h1 className="serif">Step into the room.</h1>
            <p className="ce-hero-sub">Summits, salons, roundtables and meetups that bring research, media and technology off the screen and into the room, with the people shaping India’s place in the world. Find one in your city and grab a seat.</p>
            <div className="ce-hero-actions">
              <a className="btn btn-primary" href="#browse">Browse events</a>
              <a className="btn btn-outline" href={`mailto:${CONTACT.partnerships}`}>Host with us</a>
              <span className="ce-hero-meta">{upcoming.length} upcoming · {cities.length - 1} cities · across India</span>
            </div>
          </header>

          {/* cover band */}
          <div className="ce-cover-band">
            <span className="ce-cover-eyebrow">On-ground · India</span>
            <h2 className="serif">We bring the conversation into the room.</h2>
          </div>

          {/* browse + filters */}
          <section id="browse" className="ce-browse">
            <div className="ce-browse-head">
              <h2 className="serif">Upcoming events</h2>
            </div>
            <div className="ce-filters">
              <div className="ce-filter-row">
                {cities.map((c) => (
                  <button key={c} className={`ce-pill ${city === c ? 'on' : ''}`} onClick={() => setCity(c)}>{c}</button>
                ))}
              </div>
              <div className="ce-filter-row sub">
                {categories.map((c) => (
                  <button key={c} className={`ce-chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>
                ))}
              </div>
            </div>

            {list.length ? (
              <div className="evt-feed">{list.map((e, i) => <EventCard e={e} key={i} />)}</div>
            ) : (
              <p className="ce-empty">No events match that filter yet. Try another city, or <a href={`mailto:${CONTACT.partnerships}`}>ask us to come to yours</a>.</p>
            )}
          </section>

          {/* flagship */}
          {flagship && (
            <section className="ce-flagship">
              <div className="ce-flagship-copy">
                <span className="ce-no light">Flagship · {flagship.category}</span>
                <h2 className="serif">{flagship.title}</h2>
                <p>{flagship.note}</p>
                <div className="ce-flagship-meta">
                  <span><strong>{flagship.city}</strong>Location</span>
                  <span><strong>Event curator</strong>Our role</span>
                  <span><strong>{flagship.attended}</strong>Participation</span>
                </div>
              </div>
              <div className="ce-flagship-media"><img className="ce-flagship-img" src="/work/event-india-ai.jpg" alt="India AI Impact Summit poster" /></div>
            </section>
          )}

          {/* host with us */}
          <section className="ce-host-band">
            <div className="ce-host-in">
              <span className="eyebrow accent">For hosts &amp; partners</span>
              <h2 className="serif">Bring Tiesverse to your city.</h2>
              <p>Running a venue, a community or a brand that wants a Tiesverse salon, summit or meetup? We co-create events that put research, media and technology in the same room, and fill it.</p>
              <a className="btn btn-light" href={`mailto:${CONTACT.partnerships}`}>Pitch your city</a>
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
.ce{padding:100px 0 var(--sec)}
.ce .container{max-width:1320px}
.ce-no{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink)}
.ce-no.light{color:#ffd9a8}

/* hero */
.ce-hero{margin-bottom:30px;max-width:780px}
.ce-hero h1{font-size:clamp(44px,6.4vw,86px);margin:16px 0 0;line-height:1}
.ce-hero-sub{color:var(--soft);font-size:18px;line-height:1.6;margin:20px 0 26px}
.ce-hero-actions{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.ce-hero-meta{font-size:13.5px;color:var(--soft)}

/* cover band: dark + orange radial fade */
.ce-cover-band{position:relative;overflow:hidden;background:var(--dark);color:var(--on-dark);border-radius:18px;padding:48px 44px;margin-bottom:70px;min-height:180px;display:flex;flex-direction:column;justify-content:center}
.ce-cover-band::before{content:'';position:absolute;inset:0;background:radial-gradient(60% 95% at 85% 25%,rgba(254,122,0,.28),transparent 70%)}
.ce-cover-band>*{position:relative}
.ce-cover-eyebrow{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#ffd9a8;margin-bottom:12px}
.ce-cover-band h2{color:#fff;font-size:clamp(24px,3.2vw,42px);line-height:1.08;max-width:620px}

/* browse + filters */
.ce-browse{margin-bottom:80px}
.ce-browse-head h2{font-size:clamp(26px,3.4vw,44px);margin-bottom:22px}
.ce-filters{display:flex;flex-direction:column;gap:12px;margin-bottom:34px}
.ce-filter-row{display:flex;gap:10px;flex-wrap:wrap}
.ce-pill{background:none;border:1px solid var(--rule);border-radius:30px;padding:9px 18px;font-size:14px;font-weight:600;color:var(--soft);cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.ce-pill:hover{border-color:var(--ink);color:var(--ink)}
.ce-pill.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.ce-chip{background:none;border:none;border-radius:20px;padding:6px 14px;font-size:13px;font-weight:600;color:var(--soft);cursor:pointer;transition:background .2s,color .2s}
.ce-chip:hover{color:var(--ink)}
.ce-chip.on{background:#fff;box-shadow:inset 0 0 0 1px var(--rule);color:var(--ink)}

/* timeline feed (matches webinars) */
.evt-feed{margin-top:6px}
.evt-day{display:grid;grid-template-columns:118px 1fr;gap:30px}
.evt-rail{position:relative;padding-top:5px}
.evt-date{display:block;font-size:18px;font-weight:700;color:var(--ink)}
.evt-year{display:block;font-size:13px;color:var(--soft)}
.evt-weekday{display:block;font-size:13px;color:var(--soft);margin-top:2px}
.evt-events{border-left:1px solid var(--rule);padding-left:30px;padding-bottom:26px;position:relative}
.evt-events::before{content:'';position:absolute;left:-5px;top:8px;width:9px;height:9px;border-radius:50%;background:var(--ink);box-shadow:0 0 0 4px var(--paper)}
.evt-card{display:grid;grid-template-columns:1fr 150px;gap:24px;align-items:center;border:1px solid var(--rule);border-radius:16px;padding:22px;background:#fff;text-decoration:none;color:inherit;transition:box-shadow .25s,border-color .25s,transform .25s}
.evt-card:hover{border-color:rgba(29,22,13,.28);box-shadow:0 18px 40px rgba(70,40,0,.08);transform:translateY(-2px)}
.evt-time{font-size:13.5px;font-weight:600;color:var(--soft)}
.evt-title{font-size:21px;line-height:1.2;margin:8px 0 12px;color:var(--ink)}
.evt-host{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--soft);margin-bottom:14px}
.evt-host strong{color:var(--ink);font-weight:600}
.evt-host-av{width:26px;height:26px;border-radius:50%;background:linear-gradient(150deg,#c9bdab,#a99d88);color:#3a1c00;font-size:10.5px;font-weight:700;display:grid;place-items:center;flex:none}
.evt-tags{display:flex;align-items:center;gap:12px;margin-bottom:18px;flex-wrap:wrap}
.evt-chip{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--ink);background:#fff;border:1px solid var(--rule);border-radius:9px;padding:5px 11px}
.evt-chip-ic{font-size:12px}
.evt-free{font-size:12.5px;font-weight:700;color:var(--ink);background:#fff3e3;border:1px solid rgba(254,122,0,.28);border-radius:9px;padding:5px 11px}
.evt-price-wrap{display:inline-flex;align-items:baseline;gap:8px}
.evt-price-orig{font-size:13px;color:var(--soft);text-decoration:line-through;text-decoration-color:rgba(180,120,40,.55)}
.evt-price-now{font-size:18px;font-weight:800;color:var(--ink);letter-spacing:-.01em}
.evt-save{font-size:11px;font-weight:700;color:var(--ink);background:#fff3e3;border:1px solid rgba(254,122,0,.28);border-radius:6px;padding:2px 7px;transform:translateY(-1px)}
.evt-cta{align-self:flex-start;font-size:13.5px;padding:10px 20px}
.evt-thumb{align-self:center}
.evt-thumb .imgph{width:150px;border-radius:12px}
@media(max-width:760px){.evt-day{grid-template-columns:1fr;gap:8px}.evt-rail{display:flex;gap:10px;align-items:baseline}.evt-events{border-left:none;padding-left:0}.evt-events::before{display:none}.evt-card{grid-template-columns:1fr}.evt-thumb{order:-1}.evt-thumb .imgph{width:100%}}

.ce-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
.ce-card{border:1px solid var(--rule);border-radius:16px;overflow:hidden;background:#fff;display:flex;flex-direction:column;text-decoration:none;color:inherit;transition:box-shadow .25s,border-color .25s,transform .25s}
.ce-card:hover{border-color:rgba(29,22,13,.28);box-shadow:0 20px 44px rgba(70,40,0,.1);transform:translateY(-4px)}
.ce-cover{position:relative}
.ce-cover .imgph{width:100%;border-radius:0}
.ce-cat{position:absolute;top:12px;left:12px;background:rgba(12,11,8,.62);color:#fff;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:5px 11px;border-radius:20px;backdrop-filter:blur(6px)}
.ce-price{position:absolute;top:12px;right:12px;background:var(--ink);color:#fff;font-size:12.5px;font-weight:700;padding:5px 12px;border-radius:20px}
.ce-price.free{background:#fff;color:var(--ink)}
.ce-body{padding:18px 20px 20px;display:flex;flex-direction:column;flex:1}
.ce-date{font-size:12.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--ink)}
.ce-title{font-size:20px;line-height:1.18;margin:8px 0 12px;color:var(--ink)}
.ce-loc{font-size:13.5px;color:var(--soft);margin-bottom:4px}
.ce-host{font-size:13px;color:var(--soft);margin-bottom:18px}
.ce-cta{margin-top:auto;align-self:flex-start;font-size:13.5px;padding:10px 20px}
.ce-empty{color:var(--soft);font-size:16px;padding:30px 0}
.ce-empty a{color:var(--ink);font-weight:600}
@media(max-width:900px){.ce-grid{grid-template-columns:1fr 1fr}}
@media(max-width:620px){.ce-grid{grid-template-columns:1fr}}

/* flagship */
.ce-flagship{display:grid;grid-template-columns:1fr 1fr;background:var(--dark);color:var(--on-dark);border-radius:20px;overflow:hidden;margin-bottom:80px;min-height:400px}
.ce-flagship-copy{padding:48px 44px;display:flex;flex-direction:column;justify-content:center}
.ce-flagship-copy h2{color:#fff;font-size:clamp(28px,3.6vw,46px);margin:12px 0 14px;line-height:1.05}
.ce-flagship-copy p{color:var(--on-dark-soft);font-size:16px;line-height:1.6;max-width:460px}
.ce-flagship-meta{display:flex;gap:36px;margin-top:30px;flex-wrap:wrap}
.ce-flagship-meta span{display:flex;flex-direction:column;font-size:12.5px;color:var(--on-dark-soft)}
.ce-flagship-meta strong{font-family:var(--serif);font-weight:500;font-size:20px;color:#fff;margin-bottom:3px}
.ce-flagship-media{background:var(--dark-2,#0c0b08)}
.ce-flagship-media .imgph{width:100%;height:100%;border-radius:0}
.ce-flagship-img{width:100%;height:100%;object-fit:contain;display:block}
@media(max-width:820px){.ce-flagship{grid-template-columns:1fr}.ce-flagship-media{min-height:260px}}

/* host band */
.ce-host-band{background:linear-gradient(150deg,var(--cream),#ffe9d2);border:1px solid var(--rule);border-radius:20px;padding:56px 44px;text-align:center}
.ce-host-in{max-width:640px;margin:0 auto}
.ce-host-band h2{font-size:clamp(26px,3.4vw,42px);margin:12px 0 14px;line-height:1.08}
.ce-host-band p{color:var(--soft);font-size:16.5px;line-height:1.6;margin-bottom:26px}
`
