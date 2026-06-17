import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import { CAREERS_URL } from '../data/site'

const DATA = {
  research: {
    eyebrow: 'What we do',
    title: 'Research',
    lead: 'Rigorous analysis of geopolitical shifts and strategic forecasting for a multi-polar world.',
    features: [
      { t: 'Geopolitics & foreign policy', d: 'Tracking the forces reshaping India’s place in the world: alliances, corridors, and the new logic of power.' },
      { t: 'Markets & economics', d: 'Following the money: trade, capital, credit and the macro currents that move a billion lives.' },
      { t: 'Elections & data', d: 'Real-time analysis of electoral trends, grounded in primary data, not punditry.' },
    ],
    quote: 'We don’t recycle takes. We do the reading so the next generation doesn’t have to guess.',
  },
  media: {
    eyebrow: 'What we do',
    title: 'Media',
    lead: 'Translating high-level intelligence into high-fidelity visual storytelling for millions.',
    features: [
      { t: 'Films & explainers', d: 'Long and short-form video that makes the complicated feel obvious, and worth sharing.' },
      { t: 'Reels & shorts', d: 'Daily, scroll-native storytelling that meets a generation where it already is.' },
      { t: 'Podcasts & reporting', d: 'Conversations and on-the-ground reporting across geopolitics, markets and culture.' },
    ],
    quote: 'If it’s true but no one finishes it, it didn’t land. We build for attention and for trust.',
  },
  technology: {
    eyebrow: 'What we do',
    title: 'Technology',
    lead: 'Proprietary tools that democratise information access and enhance community participation.',
    features: [
      { t: 'Reader tools', d: 'Products that help people find the signal, follow a story, and go deeper on demand.' },
      { t: 'Data & dashboards', d: 'Living datasets and visual tools that turn raw numbers into understanding.' },
      { t: 'Community products', d: 'Software for a generation that reads, debates and builds the picture together.' },
    ],
    quote: 'Technology should open information up, not lock it behind a paywall or an algorithm.',
  },
}

export default function Pillar({ kind }) {
  const d = DATA[kind]
  if (!d) return null
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top pl">
        <section className="pl-hero">
          <div className="container">
            <span className="eyebrow accent">{d.eyebrow}</span>
            <h1 className="serif">{d.title}.</h1>
            <p className="pl-lead">{d.lead}</p>
            <div className="pl-hero-cta">
              <Link className="btn btn-dark" to="/newsroom">See the work</Link>
              <Link className="btn btn-outline" to="/careers">Join the desk</Link>
            </div>
          </div>
        </section>

        <section className="container pl-features">
          {d.features.map((f, i) => (
            <div className={`pl-feat ${i % 2 ? 'flip' : ''}`} key={f.t}>
              <div className="pl-feat-copy">
                <span className="pl-feat-no">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="serif">{f.t}</h2>
                <p>{f.d}</p>
              </div>
              <div className="pl-feat-visual"><span>visual placeholder</span></div>
            </div>
          ))}
        </section>

        <section className="pl-quote">
          <div className="container">
            <p className="serif">“{d.quote}”</p>
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
.pad-top{padding-top:74px}.accent{color:var(--ink)}
.pl-hero{padding:100px 0 70px;border-bottom:1px solid var(--rule)}
.pl-hero h1{font-size:clamp(52px,9vw,140px);margin:14px 0 0}
.pl-lead{max-width:560px;font-size:clamp(18px,2vw,24px);line-height:1.5;color:var(--soft);margin-top:22px}
.pl-hero-cta{display:flex;gap:12px;margin-top:32px;flex-wrap:wrap}
.pl-features{padding:var(--sec) var(--gutter)}
.pl-feat{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;margin-bottom:40px}
.pl-feat.flip .pl-feat-copy{order:2}
.pl-feat-no{font-size:13px;font-weight:700;color:var(--ink)}
.pl-feat-copy h2{font-size:clamp(26px,3.4vw,44px);margin:12px 0 14px}
.pl-feat-copy p{color:var(--soft);font-size:17px;line-height:1.6;max-width:440px}
.pl-feat-visual{aspect-ratio:4/3;border-radius:12px;background:linear-gradient(150deg,var(--cream),#ffe7d6);border:1px solid var(--rule);display:grid;place-items:center;color:var(--soft);font-size:13px;letter-spacing:.08em;text-transform:uppercase}
@media(max-width:820px){.pl-feat{grid-template-columns:1fr;gap:24px}.pl-feat.flip .pl-feat-copy{order:0}}
.pl-quote{background:var(--dark);color:var(--on-dark);padding:110px 0;text-align:center}
.pl-quote p{font-size:clamp(26px,3.6vw,48px);line-height:1.25;color:#fff;max-width:900px;margin:0 auto}
`
