import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import ReportCard from '../components/ReportCard'
import { REPORTS, REPORT_TOPICS } from '../data/site'

export default function Research() {
  const [topic, setTopic] = useState('All')
  const featured = REPORTS.find((r) => r.featured) || REPORTS[0]
  const rest = REPORTS.filter((r) => r.slug !== featured.slug)
  const shown = topic === 'All' ? rest : rest.filter((r) => r.topic === topic)

  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top rs">
        <section className="rs-hero container">
          <span className="eyebrow accent">What we do · Research</span>
          <h1 className="serif">Research <span className="ital">that does the reading</span> so the next generation doesn’t have to guess.</h1>
          <p className="rs-lead">Rigorous analysis of geopolitical shifts, markets and strategic forecasting for a multipolar world — published as briefs, deep dives and reports.</p>
        </section>

        <section className="container rs-featured">
          <div className="rs-section-head"><h2 className="serif">Featured report</h2></div>
          <ReportCard r={featured} featured />
        </section>

        <section className="container rs-list">
          <div className="rs-section-head">
            <h2 className="serif">Latest research</h2>
            <div className="rs-topics">
              {REPORT_TOPICS.map((t) => (
                <button key={t} className={`rs-topic ${topic === t ? 'on' : ''}`} onClick={() => setTopic(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="rs-grid">
            {shown.map((r) => <ReportCard key={r.slug} r={r} />)}
          </div>
          {shown.length === 0 && <p className="rs-empty">No reports in this topic yet.</p>}
        </section>
      </main>
      <CtaBand />
      <Footer />
      <style>{`
        .pad-top{padding-top:74px}.accent{color:var(--ink)}
        .rs-hero{padding:96px 0 64px}
        .rs-hero h1{font-size:clamp(38px,5.6vw,82px);margin:16px 0 0;max-width:18ch;line-height:1.02}
        .rs-lead{max-width:620px;font-size:clamp(17px,1.9vw,21px);line-height:1.6;color:var(--soft);margin-top:24px}
        .rs-section-head{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:28px}
        .rs-section-head h2{font-size:clamp(22px,2.6vw,34px)}
        .rs-featured{padding-bottom:72px}
        .rs-topics{display:flex;flex-wrap:wrap;gap:8px}
        .rs-topic{background:#fff;border:1px solid var(--rule);border-radius:30px;padding:8px 16px;font-size:13.5px;font-weight:600;color:var(--soft);cursor:pointer;transition:color .2s,border-color .2s,background .2s}
        .rs-topic:hover{color:var(--ink)}
        .rs-topic.on{background:var(--ink);color:#fff;border-color:var(--ink)}
        .rs-list{padding-bottom:var(--sec)}
        .rs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .rs-empty{color:var(--soft);font-style:italic}
        @media(max-width:900px){.rs-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:600px){.rs-grid{grid-template-columns:1fr}}
      `}</style>
    </>
  )
}
