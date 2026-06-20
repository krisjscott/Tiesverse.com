import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import {
  PARENT, WHO_WE_ARE, MISSION, STATS, CO_FOUNDERS, VALUES, GENESIS,
  TALENT_POOL, ASSOCIATIONS, ACHIEVEMENT, CAREERS_URL,
} from '../data/site'
const initials = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('')

// associations → real logo files in /public/work
const ASSOC_LOGOS = {
  'Government of India': 'logo-govt-india.webp',
  'Govt of NCT of Delhi': 'logo-govt-delhi.webp',
  'Government of Uttar Pradesh': 'logo-govt-up.webp',
  'Government of Maharashtra': 'logo-govt-maharashtra.webp',
  'Ministry of Finance': 'logo-min-finance.webp',
  'Ministry of External Affairs': 'logo-min-mea.webp',
  'Ministry of Electronics & IT': 'logo-min-meity.webp',
  'Ministry of Road Transport & Highways': 'logo-min-roadtransport.webp',
  'Ministry of Education': 'logo-min-education.webp',
  'Indian Council of World Affairs': 'logo-icwa.webp',
  'UNESCO': 'logo-unesco.webp',
  'INDIAai': 'logo-indiaai.webp',
}

// talent-pool institution logos fetched from Wikipedia (real colour marks → render as-is).
// Names without an entry fall back to a clean serif wordmark cell.
const TALENT_LOGOS = {
  'AIIMS': 'logos/aiims.webp',
  'IIT Dhanbad': 'logos/iit-dhanbad.webp',
  'NIT Bhopal': 'logos/nit-bhopal.webp',
  "King's College London": 'logos/kings-college-london.svg',
  'University of Glasgow': 'logos/university-of-glasgow.webp',
  'University of Oxford': 'logos/university-of-oxford.svg',
  'Manipal University': 'logos/manipal-university.webp',
  'Christ University': 'logos/christ-university.webp',
  'Symbiosis': 'logos/symbiosis.webp',
  'University of Delhi': 'logos/university-of-delhi.webp',
  'JNU': 'logos/jnu.svg',
  'University of Mumbai': 'logos/university-of-mumbai.webp',
  'MS University of Baroda': 'logos/ms-university-of-baroda.webp',
  'Savitribai Phule Pune University': 'logos/savitribai-phule-pune-university.webp',
  'BBAU Lucknow': 'logos/bbau-lucknow.webp',
  'University of Calcutta': 'logos/university-of-calcutta.webp',
  'Jadavpur University': 'logos/jadavpur-university.webp',
}

// colour logos that must render as-is (everything else is white artwork → inverted to mono)
const ASIS_LOGOS = new Set(['logo-unesco.webp', 'logo-indiaai.webp'])

function LogoCell({ name, src, asIs }) {
  const [ok, setOk] = React.useState(Boolean(src))
  return (
    <div className="logo-cell" title={name}>
      <span className="logo-mark">
        {ok
          ? <img className={asIs ? 'logo-asis' : ''} src={src} alt={name} loading="lazy" onError={() => setOk(false)} />
          : <span className="logo-word">{name}</span>}
      </span>
      {ok && <span className="logo-name">{name}</span>}
    </div>
  )
}

function FamilyPhoto() {
  const [ok, setOk] = React.useState(true)
  if (!ok) return (
    <div className="ab-family ab-family-ph">
      <span>The Tiesverse team</span>
      <em>Add a wide group photo at /public/work/team-group.jpg</em>
    </div>
  )
  return <div className="ab-family"><img src="/work/team-group.webp" alt="The Tiesverse team" onError={() => setOk(false)} /></div>
}

export default function About() {
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top">
        {/* HERO + photo strip */}
        <section className="ab-hero">
          <div className="container center">
            <span className="eyebrow accent">About</span>
            <h1 className="serif">India’s leading youth-led organisation in <span className="ital">research, media & tech.</span></h1>
            <p className="ab-sub">{WHO_WE_ARE}</p>
          </div>
          <div className="container"><FamilyPhoto /></div>
        </section>

        {/* WHY */}
        <section className="ab-why container">
          <div className="ab-why-grid">
            <div><h2 className="serif">Every idea, every policy, every initiative is <span className="ital">built for Bharat.</span></h2></div>
            <div className="ab-why-body">
              <p>{MISSION.vision.body}</p>
              <p className="ab-why-quote ital">“{MISSION.vision.quote}”</p>
            </div>
          </div>
        </section>

        {/* CO-FOUNDERS */}
        <section className="ab-founders container">
          <h2 className="serif center-h">Co-founders</h2>
          <p className="ab-founders-sub">United by a shared vision, building TIES as a next-generation Research, Media & Technology organisation for the AI-led era.</p>
          <div className="ab-founders-grid">
            {CO_FOUNDERS.map((f) => (
              <article className="founder" key={f.name}>
                <span className="founder-mono">{initials(f.name)}</span>
                <div>
                  <h3 className="serif">{f.name}</h3>
                  <span className="founder-role">{f.role}</span>
                  <p>{f.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* VALUES */}
        <section className="ab-values container">
          <h2 className="serif center-h">Our values</h2>
          <div className="ab-values-grid">
            {VALUES.map((v) => (
              <article className="val-card" key={v.t}>
                <h3 className="serif">{v.t}</h3>
                <p>{v.d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* GENESIS */}
        <section className="ab-genesis container">
          <h2 className="serif center-h">The genesis of TIES</h2>
          <div className="ab-timeline">
            {GENESIS.map((g, i) => (
              <div className="ab-step" key={i}>
                <span className="ab-step-dot" />
                {g.yr && <span className="ab-step-yr">{g.yr}</span>}
                <h4>{g.t}</h4>
                <p>{g.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="ab-stats">
          <div className="container ab-stats-grid">
            {STATS.map((s) => (<div key={s.l} className="ab-stat"><strong className="serif">{s.n}</strong><span>{s.l}</span></div>))}
          </div>
        </section>

        {/* TALENT POOL */}
        <section className="ab-pool container">
          <div className="ab-pool-head"><h2 className="serif">Our talent pool</h2><p>A team of 100+ from India’s and the world’s leading institutions.</p></div>
          <div className="ab-logos">{TALENT_POOL.map((t) => <LogoCell key={t} name={t} src={TALENT_LOGOS[t] ? `/work/${TALENT_LOGOS[t]}` : null} asIs />)}</div>
        </section>

        {/* ASSOCIATIONS */}
        <section className="ab-assoc container">
          <div className="ab-pool-head"><h2 className="serif">Our associations</h2><p>{ACHIEVEMENT}</p></div>
          <div className="ab-logos">{ASSOCIATIONS.map((t) => <LogoCell key={t} name={t} src={ASSOC_LOGOS[t] ? `/work/${ASSOC_LOGOS[t]}` : null} asIs={ASIS_LOGOS.has(ASSOC_LOGOS[t])} />)}</div>
        </section>

        {/* CAREERS teaser */}
        <section className="ab-careers">
          <div className="container center">
            <h2 className="serif">Build it with us</h2>
            <p>Roles across content, design, media, operations and tech, open to a youth-led team across India.</p>
            <a className="btn btn-primary" href="/careers">View open roles</a>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
      <style>{css}</style>
    </>
  )
}

const css = `
.pad-top{padding-top:74px}.accent{color:var(--ink)}.center{text-align:center}.center-h{text-align:center}

.ab-hero{padding:90px 0 0}
.ab-hero h1{font-size:clamp(36px,5.2vw,72px);margin:18px auto 0;max-width:16ch}
.ab-sub{max-width:620px;margin:22px auto 0;font-size:18px;color:var(--soft);line-height:1.6}
.ab-family{margin-top:56px;border-radius:14px;overflow:hidden}
.ab-family img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block}
.ab-family-ph{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;aspect-ratio:16/9;border:1.5px dashed var(--rule);background:repeating-linear-gradient(45deg,#faf6ef,#faf6ef 11px,#fff 11px,#fff 22px);color:var(--soft)}
.ab-family-ph span{font-family:var(--serif);font-size:clamp(22px,3vw,34px);color:var(--ink)}
.ab-family-ph em{font-size:13px;font-style:normal}

.ab-why{padding:var(--sec) var(--gutter)}
.ab-why-grid{display:grid;grid-template-columns:1fr 1fr;gap:54px;align-items:start}
.ab-why-grid h2{font-size:clamp(28px,3.6vw,46px)}
.ab-why-body p{color:var(--soft);font-size:17.5px;line-height:1.65;margin-bottom:16px}
.ab-why-quote{color:var(--ink)!important;font-size:22px}
@media(max-width:820px){.ab-why-grid{grid-template-columns:1fr;gap:24px}}

.ab-founders{padding:0 var(--gutter) var(--sec)}
.ab-founders .center-h{font-size:clamp(30px,4vw,52px)}
.ab-founders-sub{text-align:center;max-width:620px;margin:14px auto 48px;color:var(--soft);font-size:17px;line-height:1.6}
.ab-founders-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.founder{display:grid;grid-template-columns:96px 1fr;gap:22px;align-items:start;border:1px solid var(--rule);border-radius:14px;padding:30px}
.founder-mono{width:96px;height:96px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(150deg,#c9bdab,#a99d88);color:#3a1c00;font-family:var(--serif);font-size:30px;font-weight:600}
.founder h3{font-size:25px}
.founder-role{display:block;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink);margin:4px 0 12px}
.founder p{color:var(--soft);font-size:15px;line-height:1.6}
@media(max-width:820px){.ab-founders-grid{grid-template-columns:1fr}}
@media(max-width:480px){.founder{grid-template-columns:1fr}}

.ab-values{padding:0 var(--gutter) var(--sec)}
.ab-values .center-h{font-size:clamp(30px,4vw,52px);margin-bottom:42px}
.ab-values-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.val-card{position:relative;border-radius:14px;padding:46px 40px;color:var(--on-dark);overflow:hidden;background:linear-gradient(160deg,var(--dark-3),var(--dark-2));min-height:240px;display:flex;flex-direction:column;justify-content:flex-end}
.val-card::before{content:'';position:absolute;inset:0;background:radial-gradient(70% 60% at 20% 12%,rgba(254,122,0,.32),transparent 70%)}
.val-card h3{position:relative;font-size:30px;color:#fff;margin-bottom:12px}
.val-card p{position:relative;font-size:15.5px;color:var(--on-dark-soft);line-height:1.6}
@media(max-width:760px){.ab-values-grid{grid-template-columns:1fr}}

.ab-genesis{padding:0 var(--gutter) var(--sec)}
.ab-genesis .center-h{font-size:clamp(30px,4vw,52px);margin-bottom:48px}
.ab-timeline{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;border-top:2px solid var(--rule);padding-top:34px}
.ab-step{position:relative}
.ab-step-dot{position:absolute;top:-43px;left:0;width:14px;height:14px;border-radius:50%;background:var(--ink);box-shadow:0 0 0 4px var(--paper)}
.ab-step-yr{font-family:var(--serif);font-size:22px;color:var(--ink);display:block;margin-bottom:4px}
.ab-step h4{font-size:17px;margin-bottom:8px}
.ab-step p{color:var(--soft);font-size:13.5px;line-height:1.5}
@media(max-width:880px){.ab-timeline{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.ab-timeline{grid-template-columns:1fr}}

.ab-stats{background:var(--dark);color:var(--on-dark)}
.ab-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;padding:64px var(--gutter)}
.ab-stat strong{display:block;font-size:clamp(36px,5vw,68px);color:#fff;line-height:1}
.ab-stat span{font-size:13px;color:var(--on-dark-soft)}
@media(max-width:640px){.ab-stats-grid{grid-template-columns:1fr 1fr;gap:30px}}

.ab-pool,.ab-assoc{padding:var(--sec) var(--gutter) 0}
.ab-assoc{padding-bottom:var(--sec)}
.ab-pool-head{margin-bottom:28px}
.ab-pool-head h2{font-size:clamp(26px,3.4vw,44px)}
.ab-pool-head p{color:var(--soft);font-size:16px;margin-top:10px}
.ab-logos{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
.logo-cell{min-height:158px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:22px 16px;border:1px solid var(--rule);border-radius:12px;background:#fff;text-align:center}
.logo-mark{flex:1;display:flex;align-items:center;justify-content:center;width:100%}
.logo-cell img{max-width:100%;max-height:60px;object-fit:contain;filter:brightness(0);opacity:.62;transition:opacity .35s}
.logo-cell img.logo-asis{filter:none;opacity:.9}
.logo-cell:hover img{opacity:1}
.logo-name{font-size:11.5px;font-weight:600;letter-spacing:.01em;color:var(--soft);line-height:1.25}
.logo-word{font-family:var(--serif);font-size:16px;line-height:1.25;color:var(--ink)}
@media(max-width:900px){.ab-logos{grid-template-columns:repeat(3,1fr)}}
@media(max-width:560px){.ab-logos{grid-template-columns:repeat(2,1fr)}}

.ab-careers{text-align:center;padding:0 0 var(--sec)}
.ab-careers h2{font-size:clamp(30px,4vw,52px)}
.ab-careers p{max-width:560px;margin:16px auto 28px;color:var(--soft);font-size:17px;line-height:1.6}
`
