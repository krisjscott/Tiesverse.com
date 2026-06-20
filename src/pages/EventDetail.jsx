import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav, { Wordmark } from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import { ImgPlaceholder } from '../components/ImgPlaceholder'
import { WEBINARS, CITY_EVENTS, slugify } from '../data/site'

const WEBINAR_REGISTER = 'https://tiesverse.com/webinar'
const EVENT_REGISTER = 'https://tiesverse.com/events'
const RECORDINGS = 'https://youtube.com/@TiesIndia'

const initials = (n) =>
  n.replace(/\(.*?\)/g, '').split(' ').filter((w) => /[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('')

function isPastDate(str) {
  const d = new Date(str)
  if (isNaN(d.getTime())) return false
  const t = new Date(); t.setHours(0, 0, 0, 0)
  return d < t
}
function dateBits(str) {
  const [md, year] = String(str).split(', ')
  const [mon, day] = (md || '').split(' ')
  let weekday = ''
  const d = new Date(str)
  if (!isNaN(d.getTime())) weekday = d.toLocaleDateString('en-US', { weekday: 'long' })
  return { mon: (mon || '').toUpperCase(), day: day || '', weekday, year }
}

function Poster({ file, label }) {
  const [ok, setOk] = React.useState(Boolean(file))
  if (ok && file) return <img className="ed-poster-img" src={`/work/${file}`} alt={label} onError={() => setOk(false)} />
  return <ImgPlaceholder label={label} size="1080×1350" ratio="4 / 5" dark />
}

export default function EventDetail({ kind }) {
  const { slug } = useParams()
  const webinar = kind === 'webinar'
  const list = webinar ? WEBINARS : CITY_EVENTS
  const item = list.find((x) => slugify(webinar ? x.topic : x.title) === slug)

  if (!item) {
    return (
      <>
        <Nav variant="solid" />
        <main className="pad-top ed"><div className="container ed-missing">
          <h1 className="serif">We couldn’t find that one.</h1>
          <p>It may have moved. Browse what’s on instead.</p>
          <Link className="btn btn-primary" to={webinar ? '/webinars' : '/events'}>{webinar ? 'All webinars' : 'All events'}</Link>
        </div></main>
        <Footer />
      </>
    )
  }

  const title = webinar ? item.topic : item.title
  const { mon, day, weekday } = dateBits(item.date)
  const past = isPastDate(item.date)
  const host = webinar ? item.speaker : item.host
  const hostSub = webinar ? item.org : `${item.category} · ${item.city}`
  const price = webinar ? 0 : (item.price || 0)
  const orig = webinar ? 0 : (item.orig || 0)
  const workshop = webinar && item.kind === 'workshop'
  const registerUrl = item.register || (webinar ? WEBINAR_REGISTER : EVENT_REGISTER)
  const tag = webinar ? (workshop ? 'Workshop · Online' : 'Webinar · Online') : `${item.category} · ${item.city}`

  const about = workshop
    ? [
        `“${item.topic}” is an online workshop by TIES, open to students across schools, colleges and institutions.`,
        'Register your team, get the full format and schedule by email, and compete live. Built to sharpen how young Indians argue, think and read the world.',
        'Spots are limited and registrations are open now.',
      ]
    : webinar
    ? [
        `Join ${item.speaker} (${item.org}) for a live Tiesverse session on “${item.topic}.”`,
        'Part of our ongoing webinar series: free, online and open to all. Come with questions; the conversation is built to be understood, not just admired.',
        'Everyone who registers gets the joining link by email, and a recording afterwards.',
      ]
    : [
        item.note || `A Tiesverse ${item.category.toLowerCase()} in ${item.city}.`,
        `We bring research, media and technology off the screen and into the room: ${item.category.toLowerCase()} format, in ${item.city}. Seats are limited.`,
        'Register to reserve a spot; the exact venue is shared with confirmed guests.',
      ]

  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top ed">
        <div className="container ed-grid">
          {/* left */}
          <aside className="ed-side">
            <div className="ed-poster">
              {webinar
                ? <Poster file={item.poster} label={`${title}: poster (1080×1350)`} />
                : <ImgPlaceholder label={`${item.category} · ${item.city} (1200×1500)`} size="1200×1500" ratio="4 / 5" />}
            </div>
            <div className="ed-block">
              <span className="ed-block-h">Hosted by</span>
              <div className="ed-host-row">
                <span className="ed-host-mark"><Wordmark /></span>
              </div>
              {host && (
                <div className="ed-host-row">
                  <span className="ed-host-av">{initials(host)}</span>
                  <span className="ed-host-name"><strong>{host}</strong>{hostSub && <em>{hostSub}</em>}</span>
                </div>
              )}
            </div>
            <div className="ed-tag"># {webinar ? 'Webinar' : item.category}</div>
          </aside>

          {/* right */}
          <section className="ed-main">
            <span className="ed-feat">{webinar ? 'Live webinar' : `Featured in ${item.city}`}</span>
            <h1 className="serif ed-title">{title}</h1>

            <div className="ed-meta">
              <div className="ed-meta-row">
                <span className="ed-chip"><em>{mon}</em><strong>{day}</strong></span>
                <span className="ed-meta-text"><strong>{weekday ? `${weekday}, ` : ''}{item.date}</strong><span>{item.time || 'Online · IST'}</span></span>
              </div>
              <div className="ed-meta-row">
                <span className="ed-ico"><img src={`/work/${webinar ? 'emoji-globe.webp' : 'emoji-pin.webp'}`} alt="" /></span>
                <span className="ed-meta-text">
                  <strong>{webinar ? 'Online' : item.venue}</strong>
                  <span>{webinar ? 'Joining link shared on registration' : `${item.city}`}</span>
                </span>
              </div>
            </div>

            {/* registration box */}
            <div className="ed-reg">
              <div className="ed-reg-head">Registration</div>
              <div className="ed-reg-body">
                {past ? (
                  <>
                    <div className="ed-reg-status">
                      <span className="ed-reg-ico"><img src="/work/emoji-hourglass.webp" alt="" /></span>
                      <span><strong>{webinar ? 'This session has ended.' : 'This event has ended.'}</strong>
                        <em>{webinar ? 'A recording is available to watch.' : 'Follow us so you don’t miss the next one.'}</em></span>
                    </div>
                    {webinar
                      ? <a className="btn btn-primary ed-reg-cta" href={RECORDINGS} target="_blank" rel="noreferrer">Watch the recording</a>
                      : <Link className="btn btn-outline ed-reg-cta" to="/events">See upcoming events</Link>}
                  </>
                ) : (
                  <>
                    <div className="ed-reg-status">
                      <span className="ed-reg-price">
                        {price === 0
                          ? 'Free'
                          : (
                            <>
                              {orig ? <span className="ed-reg-orig">₹{orig}</span> : null}
                              <span className="ed-reg-now">₹{price}</span>
                              {orig ? <span className="ed-reg-save">Save ₹{orig - price}</span> : null}
                            </>
                          )}
                      </span>
                      <span><strong>{webinar ? 'Online · open to all' : 'In person · limited seats'}</strong>
                        <em>{webinar ? 'Register to get the link.' : 'Register to reserve your spot.'}</em></span>
                    </div>
                    <a className="btn btn-primary ed-reg-cta" href={registerUrl} target="_blank" rel="noreferrer">{price === 0 ? 'Register' : 'Get tickets'}</a>
                  </>
                )}
              </div>
            </div>

            {/* about */}
            <div className="ed-section">
              <h2 className="serif">About this {webinar ? 'session' : 'event'}</h2>
              {about.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* location / joining */}
            <div className="ed-section">
              <h2 className="serif">{webinar ? 'Joining' : 'Location'}</h2>
              {webinar ? (
                <p>This is an online event. Register and we’ll email you the link and a calendar invite before it begins.</p>
              ) : (
                <>
                  <p>{item.venue} · {item.city}. The exact address is shared with confirmed guests.</p>
                  <div className="ed-map">
                    <iframe
                      title={`Map: ${item.city}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(`${item.venue}, ${item.city}, India`)}&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </>
              )}
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
.pad-top{padding-top:74px}
.ed{padding:104px 0 var(--sec)}
.ed .container{max-width:1080px}
.ed-grid{display:grid;grid-template-columns:340px 1fr;gap:48px;align-items:start}

/* left */
.ed-side{position:sticky;top:98px;display:flex;flex-direction:column;gap:24px}
.ed-poster{border-radius:16px;overflow:hidden;border:1px solid var(--rule);background:var(--cream)}
.ed-poster-img{width:100%;display:block}
.ed-poster .imgph{width:100%;border-radius:0}
.ed-block{border-top:1px solid var(--rule);padding-top:18px}
.ed-block-h{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);display:block;margin-bottom:14px}
.ed-host-row{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.ed-host-mark .wm{font-size:24px}
.ed-host-av{width:34px;height:34px;border-radius:50%;background:linear-gradient(150deg,#c9bdab,#a99d88);color:#3a1c00;font-size:12px;font-weight:700;display:grid;place-items:center;flex:none}
.ed-host-name strong{display:block;font-size:14.5px}
.ed-host-name em{font-style:normal;font-size:12.5px;color:var(--soft)}
.ed-tag{font-size:13px;color:var(--soft);border:1px solid var(--rule);border-radius:30px;padding:6px 14px;align-self:flex-start}

/* right */
.ed-main{min-width:0}
.ed-feat{display:inline-block;font-size:12.5px;font-weight:700;letter-spacing:.04em;color:var(--ink);background:#fff;border:1px solid var(--rule);border-radius:30px;padding:6px 14px}
.ed-title{font-size:clamp(32px,4.4vw,52px);line-height:1.05;margin:18px 0 24px}
.ed-meta{display:flex;flex-direction:column;gap:16px;margin-bottom:30px}
.ed-meta-row{display:flex;align-items:center;gap:16px}
.ed-chip{width:52px;height:52px;border-radius:10px;border:1px solid var(--rule);background:var(--paper);display:flex;flex-direction:column;align-items:center;justify-content:center;flex:none;line-height:1}
.ed-chip em{font-style:normal;font-size:10px;font-weight:700;letter-spacing:.06em;color:var(--ink);text-transform:uppercase}
.ed-chip strong{font-size:20px;font-weight:700;color:var(--ink)}
.ed-ico{width:52px;height:52px;border-radius:10px;border:1px solid var(--rule);background:var(--paper);display:grid;place-items:center;flex:none}
.ed-ico img{width:24px;height:24px;display:block}
.ed-reg-ico img{width:26px;height:26px;display:block}
.ed-meta-text strong{display:block;font-size:15.5px;color:var(--ink)}
.ed-meta-text span{font-size:13.5px;color:var(--soft)}

/* registration */
.ed-reg{border:1px solid var(--rule);border-radius:16px;overflow:hidden;background:#fff;margin-bottom:40px}
.ed-reg-head{background:var(--cream);padding:12px 22px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--soft)}
.ed-reg-body{padding:22px}
.ed-reg-status{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.ed-reg-ico{font-size:24px}
.ed-reg-price{display:inline-flex;align-items:baseline;gap:9px;font-family:var(--serif);font-size:26px;color:var(--ink);font-weight:500;min-width:54px}
.ed-reg-orig{font-family:var(--sans);font-size:15px;color:var(--soft);text-decoration:line-through;text-decoration-color:rgba(180,120,40,.55)}
.ed-reg-now{font-family:var(--serif);font-size:26px;color:var(--ink);font-weight:500}
.ed-reg-save{font-family:var(--sans);font-size:11.5px;font-weight:700;color:var(--ink);background:#fff3e3;border:1px solid rgba(254,122,0,.28);border-radius:6px;padding:2px 8px;transform:translateY(-3px)}
.ed-reg-status strong{display:block;font-size:15px;color:var(--ink)}
.ed-reg-status em{font-style:normal;font-size:13px;color:var(--soft)}
.ed-reg-cta{width:100%;justify-content:center;display:flex;font-size:15px;padding:13px}

/* sections */
.ed-section{border-top:1px solid var(--rule);padding:30px 0}
.ed-section h2{font-size:22px;margin-bottom:14px}
.ed-section p{color:var(--ink);font-size:16px;line-height:1.7;margin-bottom:12px}
.ed-section p:last-child{margin-bottom:0}
.ed-map{margin-top:16px}
.ed-map .imgph{width:100%;border-radius:12px}
.ed-map iframe{width:100%;height:340px;border:0;border-radius:12px;display:block}

.ed-missing{max-width:560px;margin:60px auto;text-align:center}
.ed-missing h1{font-size:clamp(30px,4vw,48px);margin-bottom:14px}
.ed-missing p{color:var(--soft);font-size:17px;margin-bottom:24px}

@media(max-width:820px){.ed-grid{grid-template-columns:1fr;gap:32px}.ed-side{position:static}}
`
