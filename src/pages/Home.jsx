import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { ImgPlaceholder, ImgBg } from '../components/ImgPlaceholder'
import CtaBand from '../components/CtaBand'
import {
  PARENT, BRANDS, CAREERS_URL, TESTIMONIALS, WEBINARS, CITY_EVENTS, WORK, ASSOCIATIONS, LOGOS, slugify,
} from '../data/site'

const initials = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('')

const RECOGNITION = [
  { title: 'Anuvadhini Fellow Award', src: 'AICTE, Ministry of Education', logo: 'emoji-trophy.png' },
  { title: 'India AI Impact Summit', src: 'Knowledge partner · New Delhi', logo: 'emoji-sparkles.png' },
  { title: 'Endorsed by national voices', src: 'Shashi Tharoor · Priyanka Chaturvedi', logo: 'emoji-institution.png' },
]
const HERO_STATS = [
  { n: '100M+', l: 'Monthly views' },
  { n: '40.3M', l: 'Accounts reached' },
  { n: '7M+', l: 'Interactions' },
]
const FEATURES = [
  { k: 'Research', flip: false, h: 'Rigorous research, not recycled takes.', p: 'Original analysis and strategic forecasting across the systems shaping a multipolar world.', p2: 'From daily briefs to deep dives, every piece is grounded in primary sources, data and strategic context, built to be understood, not just admired.', list: ['Geopolitics & foreign policy', 'Markets & finance', 'Elections & data'], img: 'Research report cover', image: 'feat-research.png', cta: 'Read the latest research', to: '/research' },
  { k: 'Media', flip: true, h: 'High-fidelity media for millions.', p: 'Films, reels, podcasts and reporting: turning high-level intelligence into stories people finish and share.', p2: 'In every format, across every platform, reaching tens of millions each month without losing the rigour behind the story.', list: ['Films & explainers', 'Reels & shorts', 'Podcasts & reporting'], img: 'Film / reel thumbnail', image: 'feat-media.png', cta: 'Watch our films & reels', to: '/media' },
]
const RMT = [
  { n: '01', t: 'Research', d: 'Briefs, deep dives and strategic forecasts across geopolitics, markets and elections.' },
  { n: '02', t: 'Media', d: 'Films, reels, podcasts and reporting, in every format, reaching millions each month.' },
  { n: '03', t: 'Technology', d: 'Proprietary tools and platforms that open up information and bring the community in.' },
]
const PRODUCE = [
  { title: 'Revitalizing India’s Arctic Policy', file: 'arctic-policy.jpg', img: 'Arctic Policy report cover' },
  { title: 'What is the Mother of All Deals?', file: 'mother-of-all-deals.jpg', img: 'India–EU FTA cover' },
  { title: 'Strait of Hormuz', file: 'strait-of-hormuz.jpg', img: 'Geo Atlas map cover' },
]

// shows /work/<file> if present, else the labelled placeholder
function CoverImg({ file, label }) {
  const [ok, setOk] = React.useState(true)
  if (ok) return <img className="produce-img" src={`/work/${file}`} alt={label} onError={() => setOk(false)} />
  return <ImgPlaceholder label={label} size="900×1200" ratio="3 / 4" />
}

// feature-panel media; shows /work/<file> if present, else the labelled placeholder
function FeatImg({ file, label }) {
  const [ok, setOk] = React.useState(Boolean(file))
  if (ok && file) return <img className="feat-img" src={`/work/${file}`} alt={label} onError={() => setOk(false)} />
  return <ImgPlaceholder label={label} size="1200×1000" dark fill />
}

// tech product-card UI; shows /work/<file> if present, else the labelled placeholder
function TechCardImg({ file, label }) {
  const [ok, setOk] = React.useState(Boolean(file))
  if (ok && file) return <img className="tech-item-img" src={`/work/${file}`} alt={label} onError={() => setOk(false)} />
  return <ImgPlaceholder label={label} size="1200×750" ratio="16 / 10" />
}

// wide product screenshot; shows /work/<file> if present, else the labelled placeholder
function TechImg({ file, label }) {
  const [ok, setOk] = React.useState(true)
  if (ok) return <img className="tech-shot" src={`/work/${file}`} alt={label} onError={() => setOk(false)} />
  return <ImgPlaceholder label={label} size="1200×680" ratio="16 / 9" />
}

// portrait session poster; shows /work/<file> if present, else the placeholder
function PosterImg({ file, label }) {
  const [ok, setOk] = React.useState(Boolean(file))
  if (ok && file) return <img className="poster-img" src={`/work/${file}`} alt={label} onError={() => setOk(false)} />
  return <ImgPlaceholder label="Session poster" size="1080×1350" ratio="4 / 5" dark />
}

// solid rounded-square logo tile; shows /work/<file> if present, else a monogram
function LogoTile({ file, name }) {
  const [ok, setOk] = React.useState(Boolean(file))
  return (
    <span className={`std-card-ic ${ok ? '' : 'std-card-ic-ph'}`}>
      {ok ? <img src={`/work/${file}`} alt="" onError={() => setOk(false)} /> : <b>{name.charAt(0)}</b>}
    </span>
  )
}
// Interim CTA destination: swap to a real form/product link when chosen.
const TECH_LEAD = '/contact'
const TECH = [
  { t: 'Tabloid by Ties', tag: 'Consumer', image: 'tech-tabloid.png', d: 'A Ground News–style reader that shows every side of a story: compare coverage and cut through the bias.', cta: 'Get early access', href: TECH_LEAD },
  { t: 'Geo Atlas', tag: 'Govt & Enterprise', image: 'tech-geoatlas.png', d: 'An intelligence platform bringing geopolitical news, maps and intel together, built for government and enterprise.', cta: 'Request a demo', href: TECH_LEAD },
  { t: 'Naukri X', tag: 'The Bharat Age', image: 'tech-naukrix.png', d: 'A government-jobs platform: opportunities, resources, syllabi and prep, all in one place for aspirants.', cta: 'Notify me at launch', href: TECH_LEAD },
  { t: 'In-house systems', tag: '40-strong eng team', image: 'tech-inhouse.png', d: 'A dedicated engineering team building the internal tooling that powers the whole organisation.', cta: 'Build with us', href: '/careers' },
]

// true once an event date has passed (registration closes, recording goes up)
function isPastDate(str) {
  const d = new Date(str)
  if (isNaN(d.getTime())) return false
  const t = new Date(); t.setHours(0, 0, 0, 0)
  return d < t
}

/* ----------------------------------------------------------------------------
   LIVE SPOTLIGHT: the hero card now flashes whatever is freshest across the
   house: the next webinar, the next event, or the latest report. It leads with
   the most time-sensitive item (soonest upcoming session converts best), then
   rotates through a curated pool, picking a fresh start every visit and
   auto-advancing while you're on the page. Each type gets its own treatment
   and a single, explicit micro-action.
---------------------------------------------------------------------------- */
// 'Apr 10–11, 2026' / 'Jun 04, 2026' → Date (collapses ranges to the first day)
function whenOf(str) {
  if (!str) return null
  const d = new Date(String(str).replace(/(\d+)\s*[–-]\s*\d+/, '$1'))
  return isNaN(d.getTime()) ? null : d
}
const dayMonth = (str) => {
  const d = whenOf(str)
  return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : str
}

// Hand-picked items that always lead the spotlight (flagship pushes with their
// own registration link). Add/remove here as campaigns come and go.
const SPOTLIGHT_FEATURED = [
  {
    flag: 'Registrations open',
    title: 'Checkmate & Chatter',
    meta: 'Debate Competition · by TIES',
    img: '/work/poster-checkmate-chatter.png',
    href: 'https://www.tiesverse.com/workshop',
    cta: 'Register now', why: 'Open to all · Hosted by TIES', when: null, up: true,
  },
]

// Build the prioritised spotlight pool. Featured pushes lead, then only items
// that actually have art ready: soonest upcoming live things, recent
// recordings, and the latest reports. (Events without cover art stay out.)
function buildSpotlight() {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const isUpcoming = (s) => { const d = whenOf(s); return d && d >= today }

  const webinars = WEBINARS
    .filter((w) => w.poster && w.kind !== 'workshop') // workshops are featured separately
    .map((w) => {
      const up = isUpcoming(w.date)
      return {
        flag: up ? 'Happening next' : 'Watch on demand',
        title: w.topic,
        meta: up ? `${dayMonth(w.date)} · Online · Free` : `Recorded · ${w.speaker}`,
        img: `/work/${w.poster}`, to: `/webinars/${slugify(w.topic)}`,
        cta: up ? 'Save my seat' : 'Watch the recording',
        why: `${w.speaker} · ${w.org}`, when: whenOf(w.date), up,
      }
    })

  const events = CITY_EVENTS
    .filter((e) => !e.past && isUpcoming(e.date) && e.cover)
    .map((e) => ({
      flag: 'Coming up',
      title: e.title, meta: `${dayMonth(e.date)} · ${e.city} · ${e.price ? '₹' + e.price : 'Free'}`,
      img: `/work/${e.cover}`, to: `/events/${slugify(e.title)}`,
      cta: e.price ? 'Get tickets' : 'Register free', why: `Hosted by ${e.host}`,
      when: whenOf(e.date), up: true,
    }))

  const reports = WORK
    .filter((w) => w.img)
    .slice(0, 4)
    .map((w) => ({
      flag: 'Just published',
      title: w.t, meta: w.cat, img: `/work/${w.img}`, to: '/newsroom',
      cta: 'Read the report', why: `${w.cat} · TIES Research`, when: null, up: false,
    }))

  const live = [...webinars.filter((w) => w.up), ...events].sort((a, b) => a.when - b.when)
  const recordings = webinars.filter((w) => !w.up).sort((a, b) => b.when - a.when)
  return [...SPOTLIGHT_FEATURED, ...live, ...recordings.slice(0, 2), ...reports.slice(0, 2)].slice(0, 6)
}

// spotlight cover: renders the poster at its natural ratio (no cropping)
function SpotMedia({ item }) {
  const [ok, setOk] = useState(Boolean(item.img))
  if (ok && item.img)
    return <img className="sp-img" src={item.img} alt={item.title} onError={() => setOk(false)} />
  return <span className="sp-img sp-img-ph" aria-hidden="true" />
}

function Spotlight() {
  const pool = useMemo(buildSpotlight, [])
  // fresh start every visit; rotate while on the page
  const [i, setI] = useState(() => (pool.length ? Math.floor(Date.now() / 1000) % pool.length : 0))
  useEffect(() => {
    if (pool.length < 2) return undefined
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined
    const t = setInterval(() => setI((n) => (n + 1) % pool.length), 6000)
    return () => clearInterval(t)
  }, [pool.length])

  if (!pool.length)
    return (
      <div className="hero-card">
        <ImgPlaceholder label="Latest cover" size="248×150" ratio="16 / 9" dark />
        <span className="hero-card-tag">Latest</span>
        <p>What 14 million first-time voters actually want</p>
        <span className="hero-card-brand">India Elections →</span>
      </div>
    )

  const it = pool[i % pool.length]
  const inner = (
    <>
      <div className="sp-media">
        <SpotMedia item={it} />
      </div>
      <div className="sp-body">
        <span className="sp-flag"><i className="sp-dot" />{it.flag}</span>
        <p className="sp-title">{it.title}</p>
        <span className="sp-meta">{it.meta}</span>
        <span className="sp-foot">
          <span className="sp-cta">{it.cta}<b>→</b></span>
          <span className="sp-why">{it.why}</span>
        </span>
      </div>
    </>
  )
  return (
    <div className="sp-wrap">
      {it.href
        ? <a className="sp-card" href={it.href} target="_blank" rel="noreferrer" key={i}>{inner}</a>
        : <Link className="sp-card" to={it.to} key={i}>{inner}</Link>}
      {pool.length > 1 && (
        <div className="sp-dots" role="tablist" aria-label="Latest from TIES">
          {pool.map((_, n) => (
            <button
              key={n}
              type="button"
              className={`sp-dotnav ${n === i % pool.length ? 'on' : ''}`}
              aria-label={`Show item ${n + 1}`}
              aria-selected={n === i % pool.length}
              onClick={() => setI(n)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [ti, setTi] = useState(0)
  const [tt, setTt] = useState(0)
  const tm = TESTIMONIALS[ti]
  const tp = TECH[tt]
  const txPause = React.useRef(false)
  useEffect(() => {
    const id = setInterval(() => { if (!txPause.current) setTt((n) => (n + 1) % TECH.length) }, 4500)
    return () => clearInterval(id)
  }, [])
  return (
    <>
      <Nav variant="solid" />

      {/* HERO */}
      <section className="hero">
        <ImgBg src="/work/hero.png" label="hero illustration: 1920×1080, dark atmospheric (maps · research · tech)" />
        <div className="container hero-inner">
          <h1 className="serif">India's leading youth-led org. in<br /><span className="ital hero-ital">research, media &amp; tech.</span></h1>
          <p className="hero-sub">We combine rigorous research, influential digital media, and cutting-edge technology to identify opportunities, engage large audiences, and deliver impactful outcomes.</p>
          <div className="hero-cta">
            <Link className="btn btn-primary" to="/brands">Explore the brands</Link>
            <Link className="btn btn-ghost-dark" to="/newsroom">See our work</Link>
          </div>
        </div>
        <Spotlight />
      </section>

      {/* STANDARD (dark) */}
      <section className="dark-sec standard">
        <div className="std-wrap">
          <div className="sec-head center">
            <h2 className="serif on-dark-h">Read by millions.<br />Trusted by institutions.</h2>
            <p className="on-dark-sub">Tens of millions reached every month, recognised across the industry, and backed by the institutions shaping India.</p>
          </div>
          <div className="std-panel">
            <div className="std-cards">
              {RECOGNITION.map((r) => (
                <div className="std-card" key={r.title}>
                  <LogoTile file={r.logo} name={r.title} />
                  <div>
                    <h4>{r.title}</h4>
                    <span className="std-card-src">{r.src}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="std-stats">
              {HERO_STATS.map((s) => (<div key={s.l} className="std-stat"><strong>{s.n}</strong><span>{s.l}</span></div>))}
            </div>
          </div>
          <div className="std-logos">
            {ASSOCIATIONS.map((a) => (
              <div className="std-logo" key={a}>
                {LOGOS[a]
                  ? <img className="std-logo-img" src={`/work/${LOGOS[a]}`} alt={a} />
                  : <ImgPlaceholder label={a} size="400×160" ratio="5 / 2" dark />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL SPECTRUM (dark) */}
      <section className="dark-sec spectrum">
        <div className="container">
          <div className="sec-head center">
            <h2 className="serif on-dark-h big">We decode it, tell it,<br />and build for it.</h2>
            <p className="on-dark-sub">Research, media and technology: three disciplines, moving as one.</p>
          </div>
          {FEATURES.map((f) => (
            <div className={`feat-panel ${f.flip ? 'flip' : ''}`} key={f.k}>
              <div className="feat-copy">
                <div className="feat-top">
                  <span className="eyebrow accent">{f.k}</span>
                  <h3 className="serif">{f.h}</h3>
                  <p className="feat-intro">{f.p}</p>
                  <p className="feat-detail">{f.p2}</p>
                  <ul className="feat-list">{f.list.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <Link className="feat-cta" to={f.to}>{f.cta} <span>→</span></Link>
              </div>
              <div className="feat-media"><FeatImg file={f.image} label={f.img} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH SHOWCASE (cream) */}
      <section className="tech">
        <div className="container">
          <h2 className="serif tech-h">Technology that turns information into understanding.</h2>
          <p className="tech-sub">The products we build in-house, for India.</p>

          {/* tabbed product showcase (Sarvam-style) */}
          <div className="tx-card" onMouseEnter={() => { txPause.current = true }} onMouseLeave={() => { txPause.current = false }}>
            <div className="tx-tabs" role="tablist">
              {TECH.map((t, i) => (
                <button key={t.t} role="tab" aria-selected={i === tt} className={`tx-tab ${i === tt ? 'on' : ''}`} onClick={() => setTt(i)}>
                  {t.t}
                </button>
              ))}
            </div>
            <div className="tx-body">
              <div className="tx-shot"><TechCardImg file={tp.image} label={`${tp.t} UI`} /></div>
              <div className="tx-copy">
                <span className="tx-tag">{tp.tag}</span>
                <h3 className="serif">{tp.t}</h3>
                <p>{tp.d}</p>
                <Link className="btn btn-primary tx-cta" to={tp.href}>{tp.cta} <span>→</span></Link>
              </div>
            </div>
          </div>
          <div className="tech-band">
            <div className="tech-band-copy">
              <h3 className="serif">Want to build with us?</h3>
              <p>License a product, run a pilot for your organisation, or partner with our engineering team.</p>
            </div>
            <Link className="btn btn-primary" to="/contact">Talk to us</Link>
          </div>
        </div>
      </section>

      {/* RMT: one-of-a-kind (cream) */}
      <section className="rmt" id="about-teaser">
        <div className="container rmt-grid">
          <div className="rmt-copy">
            <h2 className="serif">A one-of-a-kind organisation working across research, media &amp; tech.</h2>
            <p>One organisation, three disciplines, built for the AI-led era: by the youth, for the youth.</p>
            <div className="rmt-cta">
              <Link className="btn btn-dark" to="/newsroom">Subscribe to the network</Link>
              <a className="btn btn-outline" href="https://discord.gg/fpfKFwxa" target="_blank" rel="noreferrer">Join the community</a>
            </div>
          </div>
          <div className="rmt-visual"><img className="rmt-img" src="/work/rmt-visual.png" alt="Research, media and technology: Tiesverse" /></div>
          <div className="rmt-steps">
            {RMT.map((s) => (
              <div className="rmt-step" key={s.n}>
                <h4 className="serif">{s.t}</h4><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO ROWS (cream) */}
      <section className="portfolio">
        <div className="container">
          <div className="portfolio-head">
            <h2 className="serif">One house.<br />Seven mastheads.</h2>
            <span className="pill">Trusted across India · 100M+ monthly views</span>
          </div>
          <div className="rows">
            {BRANDS.map((b) => (
              <a className="row" href={b.url} target={b.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer" key={b.key} style={{ '--bc': b.color }}>
                <span className="row-head">
                  <span className="row-mark"><img src={b.mark} alt="" /></span>
                  <span className="row-name serif">{b.name}</span>
                </span>
                <span className="row-blurb">{b.blurb}</span>
                <span className="row-go">Enter <span>↗</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE PRODUCE (cream, image-rich) */}
      <section className="produce">
        <div className="produce-wrap">
          <div className="sec-head center"><h2 className="serif">Featured this month.</h2><p className="produce-sub">Reports, opinion and maps from across the organisation.</p></div>
          <div className="produce-row">
            {PRODUCE.map((p) => (
              <Link className="produce-card" to="/newsroom" key={p.title}>
                <div className="produce-cover">
                  <CoverImg file={p.file} label={p.img} />
                  <span className="produce-arrow">↗</span>
                </div>
                <figcaption>{p.title}</figcaption>
              </Link>
            ))}
          </div>
          <div className="produce-foot">
            <Link className="btn btn-dark" to="/newsroom">Read all our work</Link>
          </div>
        </div>
      </section>

      {/* UPCOMING SESSIONS (dark, poster row) */}
      <section className="dark-sec sessions">
        <div className="container">
          <div className="sec-head sec-head-split"><div><span className="eyebrow accent">Webinars</span><h2 className="serif on-dark-h">Recent sessions.</h2></div><Link className="sessions-all" to="/webinars">All webinars →</Link></div>
          <div className="sessions-row">
            {WEBINARS.slice(0, 4).map((w, i) => {
              const past = isPastDate(w.date)
              return (
                <article className="poster" key={i}>
                  <Link to={`/webinars/${slugify(w.topic)}`} className="poster-link"><PosterImg file={w.poster} label={w.topic} /></Link>
                  <span className="poster-date">{w.date}</span>
                  <h4><Link to={`/webinars/${slugify(w.topic)}`}>{w.topic}</Link></h4>
                  <span className="poster-speaker">{w.speaker}</span>
                  <Link className={`btn ${past ? 'btn-ghost-dark' : 'btn-primary'} poster-cta`} to={`/webinars/${slugify(w.topic)}`}>{past ? 'Watch recording' : 'Register'}</Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* FOUNDERS LETTER: card over full-bleed image (Plum format) */}
      <section className="letter">
        <div className="letter-bg"><ImgBg src="/work/letter-backdrop.png" label="Founders / team: full-bleed background (1920×1000)" /></div>
        <div className="letter-card">
          <h2 className="serif">A letter from<br />the founders</h2>
          <p className="letter-sub">Every idea is built for Bharat.</p>
          <p>We started TIES as an Instagram page with one belief: that young Indians deserve to decode the world on their own terms. Today we're a Research, Media &amp; Technology organisation reaching millions, built and run by a team of 100+.</p>
          <p>We don't just inform. We educate, engage and mobilise. Everything you see here is made by the youth, for the youth. Bold, clear and accessible.</p>
          <p className="letter-warmly">Warmly,</p>
          <div className="letter-sign">
            <span><img className="sig-img" src="/work/sig-hardik.png" alt="Hardik Pathak signature" /><strong>Hardik Pathak</strong><em>Co-Founder</em></span>
            <span><img className="sig-img" src="/work/sig-pruthaviraj.png" alt="Pruthavirajsingh Dulat signature" /><strong>Pruthavirajsingh Dulat</strong><em>Co-Founder</em></span>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL (dark) */}
      <section className="dark-sec tmo">
        <div className="container">
          <h2 className="serif on-dark-h tmo-title">What India's voices say.</h2>
          <span className="tmo-watermark" aria-hidden>{tm.name.split(' ').slice(-1)[0]}</span>
          <div className="tmo-inner tmo-mono-layout">
            {tm.photo
              ? <img className="tmo-photo" src={`/work/${tm.photo}`} alt={tm.name} />
              : <span className="tmo-mono">{initials(tm.name)}</span>}
            <div>
              <blockquote className="tmo-quote serif">“{tm.quote}”</blockquote>
              <div className="tmo-name"><strong>{tm.name}</strong><span>{tm.role}</span></div>
            </div>
          </div>
          <div className="tmo-nav">
            <button onClick={() => setTi((ti - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} aria-label="Previous">‹</button>
            <span>{String(ti + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}</span>
            <button onClick={() => setTi((ti + 1) % TESTIMONIALS.length)} aria-label="Next">›</button>
          </div>
        </div>
      </section>

      <CtaBand />
      <Footer />
      <style>{css}</style>
    </>
  )
}

const css = `
.accent{color:var(--accent)}
.sec-head.center{text-align:center;max-width:680px;margin:0 auto 56px}
.sec-head-split{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:40px}
.dark-sec{background:var(--dark);color:var(--on-dark)}
.on-dark-h{color:#fff;font-size:clamp(30px,4.6vw,64px)}
.on-dark-h.big{font-size:clamp(32px,5.4vw,64px)}
.on-dark-sub{color:var(--on-dark-soft);font-size:16px;margin-top:14px;line-height:1.4}

/* hero */
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:var(--on-dark);overflow:hidden}
.hero-inner{position:relative;z-index:2;max-width:1320px;padding-top:74px}
.hero h1{font-size:clamp(40px,5.2vw,72px);color:#fff;line-height:1.08;text-shadow:0 2px 40px rgba(0,0,0,.4)}
.hero-ital{color:#fff}
.hero-sub{max-width:620px;margin:26px auto 0;font-size:clamp(16px,1.6vw,19px);line-height:1.6;color:rgba(255,255,255,.88)}
.hero-cta{display:flex;gap:13px;justify-content:center;margin-top:36px;flex-wrap:wrap}
.hero-form{display:flex;gap:8px;max-width:440px;margin:34px auto 0;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);padding:6px;border-radius:var(--radius);backdrop-filter:blur(8px)}
.hero-form input{flex:1;background:transparent;border:none;outline:none;color:#fff;font-size:15px;padding:0 16px}
.hero-form input::placeholder{color:rgba(255,255,255,.65)}
.hero-form button{background:var(--accent);color:#fff;border:none;font-weight:600;font-size:15px;padding:12px 24px;border-radius:var(--radius)}
.hero-form button:hover{background:var(--accent-d)}
.hero-card{position:absolute;right:4%;bottom:7%;z-index:2;width:248px;text-align:left;background:rgba(12,11,8,.6);border:1px solid rgba(255,255,255,.16);border-radius:10px;padding:14px;backdrop-filter:blur(10px)}
.hero-card .imgph{margin-bottom:12px}
.hero-card-tag{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#ffd9a8}
.hero-card p{font-family:var(--serif);font-size:17px;line-height:1.2;color:#fff;margin:6px 0 10px}
.hero-card-brand{font-size:13px;font-weight:600;color:var(--accent)}

/* live spotlight: rotating "what's freshest" card, bottom-right of hero */
.sp-wrap{position:absolute;right:4%;bottom:7%;z-index:3;width:292px}
.sp-card{display:block;text-align:left;background:rgba(12,11,8,.62);border:1px solid rgba(255,255,255,.16);border-radius:14px;overflow:hidden;backdrop-filter:blur(12px);box-shadow:0 20px 50px rgba(0,0,0,.4);transition:transform .25s,border-color .25s,box-shadow .25s;animation:spIn .5s ease both}
.sp-card:hover{transform:translateY(-3px);border-color:rgba(254,122,0,.55);box-shadow:0 26px 60px rgba(0,0,0,.5)}
@keyframes spIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.sp-media{position:relative;overflow:hidden;background:#15140f}
/* poster shown at its natural ratio, never cropped; card height follows it */
.sp-img{display:block;width:100%;height:auto}
.sp-img-ph{aspect-ratio:4/5;background:linear-gradient(150deg,#2a2118,#15140f)}
.sp-body{padding:13px 15px 15px}
.sp-flag{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#ffd9a8}
.sp-dot{width:7px;height:7px;border-radius:50%;background:#fff;box-shadow:0 0 0 0 rgba(255,255,255,.6);animation:spPulse 1.8s infinite}
@keyframes spPulse{0%{box-shadow:0 0 0 0 rgba(255,255,255,.5)}70%{box-shadow:0 0 0 7px rgba(255,255,255,0)}100%{box-shadow:0 0 0 0 rgba(255,255,255,0)}}
.sp-title{font-family:var(--serif);font-size:17px;line-height:1.18;color:#fff;margin:8px 0 7px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.sp-meta{display:block;font-size:12.5px;color:rgba(255,255,255,.72);margin-bottom:12px}
.sp-foot{display:flex;flex-direction:column;gap:3px;border-top:1px solid rgba(255,255,255,.12);padding-top:11px}
.sp-cta{display:inline-flex;align-items:center;gap:7px;font-size:14px;font-weight:700;color:#fff}
.sp-cta b{transition:transform .2s}
.sp-card:hover .sp-cta b{transform:translateX(4px)}
.sp-why{font-size:11.5px;color:rgba(255,255,255,.6)}
.sp-dots{display:flex;gap:6px;justify-content:center;margin-top:11px}
.sp-dotnav{width:7px;height:7px;border-radius:50%;border:none;padding:0;cursor:pointer;background:rgba(255,255,255,.3);transition:background .2s,width .2s}
.sp-dotnav.on{width:18px;border-radius:6px;background:#fff}
@media(prefers-reduced-motion:reduce){.sp-card{animation:none}.sp-dot{animation:none}}
@media(max-width:820px){.hero-card,.sp-wrap{display:none}}

/* standard */
.standard{padding:var(--sec) 0;text-align:center}
.std-wrap{max-width:1560px;margin:0 auto;padding:0 48px}
.std-panel{position:relative;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.022),rgba(255,255,255,0) 52%);padding:60px 72px 68px}
.std-panel::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(180deg,rgba(255,243,230,.3),rgba(255,243,230,0) 68%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.std-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:60px;text-align:left}
.std-card{display:flex;gap:16px;align-items:center;border:1px solid rgba(255,243,230,.14);border-radius:8px;padding:18px 20px;background:rgba(255,255,255,.025)}
.std-card-ic{width:56px;height:56px;flex:none;border-radius:8px;overflow:hidden;display:grid;place-items:center;background:rgba(255,255,255,.07);border:1px solid rgba(255,243,230,.12)}
.std-card-ic img{width:100%;height:100%;object-fit:contain;padding:7px}
.std-card-ic-ph b{font-family:var(--serif);font-weight:600;font-size:27px;color:var(--on-dark);line-height:1}
.std-card h4{font-weight:700;font-size:16px;color:#fff;margin:0 0 4px;line-height:1.2}
.std-card-src{font-size:12.5px;color:var(--on-dark-soft)}
.std-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;text-align:center}
.std-stat strong{display:block;font-weight:800;font-size:clamp(42px,6vw,88px);color:#fff;line-height:1;letter-spacing:-.02em}
.std-stat span{font-size:13px;color:var(--on-dark-soft)}
.std-logos{margin-top:70px;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,243,230,.1);border-left:1px solid rgba(255,243,230,.1)}
.std-logo{aspect-ratio:2/1;display:flex;align-items:center;justify-content:center;padding:14px;border-right:1px solid rgba(255,243,230,.1);border-bottom:1px solid rgba(255,243,230,.1)}
.std-logo .imgph{width:100%}
.std-logo-img{max-width:90%;max-height:78%;width:auto;height:auto;object-fit:contain;display:block;opacity:.95}
@media(max-width:980px){.std-wrap{padding:0 24px}.std-panel{padding:40px 28px 44px}}
@media(max-width:880px){.std-cards{grid-template-columns:1fr}.std-stats{gap:30px}.std-logos{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.std-stats{grid-template-columns:1fr;gap:22px}}

/* spectrum */
.spectrum{padding:0 0 var(--sec)}
/* feature panels: measured 1:1 from Plum (heading 40/40·400, intro 16/26·500, detail 16/22.4·400, list 16px + 16px pad + 1px divider) */
/* exact Plum: container 1252, 2 equal cols, gap 42, panel pad 16, radius 8, image 580×598 */
.spectrum .container{max-width:1560px;padding-left:48px;padding-right:48px}
/* uniform wide track across content sections */
.tech .container,.portfolio .container,.sessions .container,.rmt .container{max-width:1560px;padding-left:48px;padding-right:48px}
.feat-panel{display:grid;grid-template-columns:1fr 1fr;gap:42px;align-items:stretch;background:#1d1a13;border-radius:16px;overflow:hidden;margin-bottom:20px;min-height:630px;padding:16px}
.feat-panel.flip .feat-copy{order:2}
.feat-copy{display:flex;flex-direction:column;justify-content:space-between;text-align:left;padding:30px 24px 24px 30px}
.feat-panel.flip .feat-copy{padding:30px 30px 24px 24px}
.feat-copy h3{font-size:36px;line-height:1.06;color:#fff;margin:12px 0 16px}
.feat-intro{font-size:16px;line-height:25px;font-weight:600;color:#fff;margin-bottom:14px}
.feat-detail{font-size:15px;line-height:23px;font-weight:400;color:var(--on-dark-soft)}
.feat-list{list-style:none;margin-top:20px;display:flex;flex-direction:column;gap:11px}
.feat-list li{display:flex;align-items:center;gap:11px;font-size:15px;font-weight:500;color:var(--on-dark)}
.feat-list li::before{content:'';width:6px;height:6px;border-radius:50%;background:rgba(255,243,230,.55);flex:none}
.feat-cta{margin-top:26px;align-self:flex-start;display:inline-flex;align-items:center;gap:8px;font-size:14.5px;font-weight:700;color:#fff;background:var(--accent);padding:12px 20px;border-radius:var(--radius);transition:background .2s,transform .2s}
.feat-cta:hover{background:var(--accent-d);transform:translateY(-1px)}
.feat-cta span{transition:transform .2s}
.feat-cta:hover span{transform:translateX(4px)}
.feat-media{display:flex}
.feat-media .imgph{width:100%;height:auto;border-radius:12px}
.feat-img{width:100%;height:100%;object-fit:cover;border-radius:12px;display:block}
@media(max-width:880px){.feat-panel,.feat-panel.flip{grid-template-columns:1fr;min-height:0;gap:16px}.feat-panel.flip .feat-copy{order:0}.feat-copy,.feat-panel.flip .feat-copy{padding:24px 22px}.feat-copy h3{font-size:32px;line-height:34px}.feat-media{min-height:320px}}

/* tech showcase */
.tech{padding:var(--sec) 0;text-align:center;background:#fff}
.tech-h{font-size:clamp(30px,4.6vw,56px);max-width:900px;margin:0 auto}
.tech-sub{color:var(--soft);font-size:17px;margin:16px auto 0}

/* tabbed product showcase (Sarvam-style) */
.tx-card{max-width:1100px;margin:48px auto 0;background:#fff;border:1px solid var(--rule);border-radius:22px;box-shadow:0 30px 70px rgba(70,40,0,.08);overflow:hidden;text-align:left}
.tx-tabs{display:flex;gap:28px;flex-wrap:wrap;padding:20px 36px 0}
.tx-tab{background:none;border:none;cursor:pointer;font:inherit;font-size:15px;font-weight:600;color:var(--soft);padding:6px 0 14px;position:relative;transition:color .2s}
.tx-tab:hover{color:var(--ink)}
.tx-tab.on{color:var(--ink)}
.tx-tab.on::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--ink)}
.tx-body{display:grid;grid-template-columns:1.25fr .75fr;gap:0;align-items:stretch;border-top:1px solid var(--rule)}
.tx-shot{position:relative;padding:28px;display:flex;align-items:center;justify-content:center;background:repeating-linear-gradient(45deg,#f4f0ea,#f4f0ea 12px,#fbfaf7 12px,#fbfaf7 24px)}
.tx-shot::before{content:'';position:absolute;inset:14px;border:1.6px dashed rgba(29,22,13,.2);border-radius:14px;pointer-events:none}
.tx-shot::after{content:'Backdrop image — 1400 × 920px';position:absolute;top:20px;left:22px;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--soft);background:rgba(255,255,255,.82);padding:5px 10px;border-radius:20px;pointer-events:none}
.tx-shot .tech-item-img,.tx-shot .imgph{position:relative;z-index:1;margin:0;border-radius:12px;box-shadow:0 18px 44px rgba(70,40,0,.16)}
.tx-copy{padding:40px 40px;display:flex;flex-direction:column;justify-content:center;border-left:1px solid var(--rule)}
.tx-tag{font-size:12.5px;font-weight:600;color:var(--soft)}
.tx-copy h3{font-size:clamp(24px,2.4vw,34px);margin:8px 0 12px;line-height:1.1}
.tx-copy p{color:var(--soft);font-size:15.5px;line-height:1.6;margin-bottom:24px}
.tx-cta{align-self:flex-start}
.tx-cta span{transition:transform .2s}
.tx-cta:hover span{transform:translateX(4px)}
@media(max-width:820px){.tx-body{grid-template-columns:1fr}.tx-copy{border-left:none;border-top:1px solid var(--rule);padding:30px 26px}.tx-shot{padding:22px}}
.tech-stage{max-width:980px;margin:48px auto 0;border-radius:18px;padding:30px;background:linear-gradient(150deg,var(--cream),#ffe9d2);border:1px solid var(--rule)}
.tech-shot{width:100%;display:block;aspect-ratio:16/9;object-fit:cover;border-radius:10px;box-shadow:0 18px 50px rgba(70,40,0,.18)}
.tech-grid{max-width:1180px;margin:48px auto 0;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:left;border-top:1px solid var(--rule);padding-top:38px}
.tech-item .imgph{width:100%;margin-bottom:14px}
.tech-item-img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:12px;margin-bottom:14px;display:block}
.tech-tag{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--soft)}
.tech-item{display:flex;flex-direction:column}
.tech-item h4{font-size:20px;margin:6px 0 8px}
.tech-item p{color:var(--soft);font-size:14px;line-height:1.5;flex:1}
.tech-cta{margin-top:14px;align-self:flex-start;font-size:13.5px;font-weight:700;color:var(--accent);display:inline-flex;align-items:center;gap:7px}
.tech-cta span{transition:transform .2s}
.tech-cta:hover span{transform:translateX(4px)}
.tech-band{position:relative;overflow:hidden;max-width:1100px;margin:28px auto 0;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;background:linear-gradient(160deg,var(--dark-3),var(--dark-2));color:var(--on-dark);border-radius:18px;padding:38px 44px}
.tech-band::before{content:'';position:absolute;inset:0;background:radial-gradient(62% 95% at 15% 18%,rgba(254,122,0,.30),transparent 70%);pointer-events:none}
.tech-band-copy,.tech-band>.btn{position:relative;z-index:1}
.tech-band-copy h3{color:#fff;font-size:clamp(22px,2.6vw,32px);line-height:1.1}
.tech-band-copy p{color:var(--on-dark-soft);font-size:15.5px;line-height:1.55;margin-top:8px;max-width:560px}
@media(max-width:900px){.tech-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.tech-grid{grid-template-columns:1fr}.tech-stage{padding:18px}.tech-band{padding:28px 24px}}

/* rmt */
.rmt{padding:var(--sec) 0;background:#fff}
.rmt-grid{display:grid;grid-template-columns:1fr 1.18fr 1fr;gap:56px;align-items:stretch}
.rmt-copy{display:flex;flex-direction:column}
.rmt-copy h2{font-size:clamp(30px,3.4vw,48px);margin:14px 0 18px;line-height:1.04}
.rmt-copy p{color:var(--soft);font-size:16px;line-height:1.6;margin-bottom:24px;max-width:430px}
.rmt-cta{display:flex;flex-direction:column;gap:10px;align-items:flex-start;margin-top:auto}
.rmt-visual{display:flex}
.rmt-visual .imgph{width:100%}
.rmt-img{width:100%;height:auto;border-radius:14px;display:block}
.rmt-steps{display:flex;flex-direction:column;justify-content:space-between}
.rmt-step{padding:22px 0;border-top:1px solid var(--rule)}
.rmt-step:first-child{border-top:none;padding-top:0}
.rmt-step h4{font-size:22px;margin-bottom:6px}
.rmt-step p{color:var(--soft);font-size:14.5px;line-height:1.55}
@media(max-width:980px){.rmt-grid{grid-template-columns:1fr;gap:34px}.rmt-cta{flex-direction:row;flex-wrap:wrap}}

/* portfolio rows */
.portfolio{padding:0 0 var(--sec);background:#fff}
.portfolio-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:48px;flex-wrap:wrap}
.portfolio-head h2{font-size:clamp(32px,5vw,64px)}
.pill{font-size:13px;font-weight:600;color:var(--soft);border:1px solid var(--rule);border-radius:30px;padding:10px 18px}
.rows{border-top:1px solid var(--ink)}
.row{display:grid;grid-template-columns:1.1fr 1.5fr auto;gap:40px;align-items:center;padding:38px 4px;border-bottom:1px solid var(--rule);transition:background .3s}
.row:hover{background:var(--cream)}
.row-head{display:flex;align-items:center;gap:20px}
.row-mark{width:48px;height:48px;border-radius:50%;border:1px solid var(--rule);display:grid;place-items:center;background:#fff;flex:none}
.row-mark img{width:60%;height:60%;object-fit:contain}
.row-name{font-size:clamp(24px,2.6vw,34px)}
.row:hover .row-name{color:var(--bc)}
.row-blurb{color:var(--soft);font-size:15px;line-height:1.5;max-width:360px}
.row-go{justify-self:end;display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);border:1px solid var(--rule);border-radius:var(--radius);padding:13px 22px;white-space:nowrap;transition:border-color .25s,color .25s}
.row:hover .row-go{border-color:var(--bc);color:var(--bc)}
.row-go span{transition:transform .25s}
.row:hover .row-go span{transform:translate(3px,-3px)}
@media(max-width:820px){.row{grid-template-columns:1fr auto;gap:14px 18px}.row-blurb{display:none}}

/* produce: full-width canvas like Plum */
.produce{padding:var(--sec) 0;background:#fff}
.produce-wrap{max-width:1560px;margin:0 auto;padding:0 48px}
.produce .sec-head.center{max-width:920px;margin:0 auto 56px}
.produce .sec-head.center h2{font-size:clamp(40px,5.4vw,72px);line-height:1.04}
.produce-sub{color:var(--soft);font-size:17px;margin-top:16px}
.produce-row{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
.produce-foot{text-align:center;margin-top:42px}
.produce-card{display:block;text-align:left;transition:transform .25s}
.produce-card:hover{transform:translateY(-5px)}
.produce-cover{position:relative;border-radius:14px;overflow:hidden}
.produce-cover .imgph{width:100%;border-radius:14px}
.produce-img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:14px;display:block}
.produce-arrow{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);width:50px;height:50px;border-radius:50%;background:rgba(255,255,255,.92);color:var(--ink);display:grid;place-items:center;font-size:17px;transition:background .2s,color .2s}
.produce-card:hover .produce-arrow{background:var(--ink);color:#fff}
.produce-card figcaption{margin-top:18px;font-size:19px;font-weight:600}
@media(max-width:980px){.produce-wrap{padding:0 24px}}
@media(max-width:600px){.produce-row{grid-template-columns:1fr;max-width:420px;margin:0 auto}}

/* sessions */
.sessions{padding:var(--sec) 0}
.sessions-all{margin-left:auto;font-size:14px;font-weight:600;color:var(--on-dark)}
.sessions-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.poster{display:flex;flex-direction:column}
.poster-img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:10px;display:block}
.poster-date{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.7);margin:14px 0 6px}
.poster-link{display:block}
.poster h4{font-family:var(--serif);font-weight:500;font-size:18px;color:#fff;line-height:1.2;margin-bottom:6px}
.poster h4 a{color:inherit;transition:color .2s}
.poster:hover h4 a{color:#fff}
.poster-speaker{font-size:13px;color:var(--on-dark-soft);margin-bottom:14px}
.poster-cta{margin-top:auto;align-self:flex-start;font-size:13px;padding:10px 18px}
@media(max-width:900px){.sessions-row{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.sessions-row{grid-template-columns:1fr}}

/* founders letter: card over full-bleed image */
.letter{position:relative;display:flex;justify-content:center;align-items:center;padding:110px 24px;overflow:hidden;min-height:700px}
.letter-bg{position:absolute;inset:0;z-index:0}
.letter-bg .imgph{width:100%;height:100%;border-radius:0}
.letter-card{position:relative;z-index:2;width:min(560px,100%);aspect-ratio:210/297;display:flex;flex-direction:column;justify-content:center;background:#fffdf7;border:1px solid rgba(0,0,0,.07);border-radius:0;padding:60px 56px;box-shadow:0 30px 90px rgba(0,0,0,.45)}
.letter-card h2{font-size:clamp(30px,3.6vw,46px);line-height:1.04;margin-bottom:18px;letter-spacing:-.01em}
.letter-sub{font-family:var(--serif);font-style:italic;font-size:19px;color:#6b5f4d;margin-bottom:26px}
.letter-card p{color:#4a4133;font-size:16px;line-height:1.75;margin-bottom:20px}
.letter-warmly{margin-top:30px!important;margin-bottom:26px!important;color:#4a4133!important}
.letter-sign{display:flex;gap:40px;align-items:flex-end}
.letter-sign span{display:flex;flex-direction:column;align-items:center;text-align:center}
.sig-img{height:82px;width:auto;display:block;margin-bottom:-8px;object-fit:contain}
.letter-sign strong{font-size:14px;font-weight:700;color:var(--ink)}
.letter-sign em{font-style:normal;font-size:12px;color:var(--soft);margin-top:3px}
@media(max-width:600px){.letter{padding:70px 18px;min-height:0}.letter-card{aspect-ratio:auto;padding:40px 28px}.letter-sign{flex-direction:column;gap:26px;align-items:flex-start}}

/* testimonial */
.tmo{padding:var(--sec) 0;position:relative;overflow:hidden;text-align:center}
.tmo-title{position:relative;z-index:2;margin-bottom:40px}
.tmo-watermark{position:absolute;top:48%;left:50%;transform:translate(-50%,-50%);font-family:var(--serif);font-weight:500;font-size:24vw;line-height:1;color:rgba(255,243,230,.05);pointer-events:none;z-index:0}
.tmo-inner{position:relative;z-index:2;max-width:1000px;margin:0 auto;display:grid;gap:48px;align-items:center;text-align:left}
.tmo-quote{font-weight:400;font-size:clamp(22px,2.8vw,34px);line-height:1.32;color:#fff;min-height:152px;display:flex;align-items:center}
.tmo-mono-layout{grid-template-columns:120px 1fr}
.tmo-mono{width:120px;height:120px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(150deg,var(--accent),#ffb152);color:#3a1c00;font-family:var(--serif);font-size:38px;font-weight:600;align-self:start}
.tmo-photo{width:120px;height:120px;border-radius:50%;object-fit:cover;align-self:start;border:2px solid rgba(255,243,230,.18)}
.tmo-mono-layout .tmo-name{margin-top:20px}
.tmo-mono-layout .tmo-name strong{display:block;font-size:18px}.tmo-mono-layout .tmo-name span{display:block;font-size:13px;color:var(--on-dark-soft);margin-top:2px}
.tmo-nav{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;gap:24px;margin-top:54px;color:var(--on-dark-soft)}
.tmo-nav button{width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,243,230,.25);background:transparent;color:#fff;font-size:18px}
.tmo-nav button:hover{background:rgba(255,255,255,.12)}
.tmo-nav span{font-size:14px;letter-spacing:.1em}
@media(max-width:760px){.tmo-mono-layout{grid-template-columns:1fr}}

/* cta */
.cta{position:relative;text-align:center;padding:130px 0;overflow:hidden;color:#fff}
.cta-inner{position:relative;z-index:2;max-width:840px}
.cta-inner h2{font-size:clamp(34px,5.6vw,76px)}
.cta-ital{color:#ffd9a8}
.cta-inner p{color:rgba(255,255,255,.88);font-size:18px;margin:20px 0 34px}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
`
