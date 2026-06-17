import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import ReportCard from '../components/ReportCard'
import { REPORTS, REPORT_BLOCKS, slugify } from '../data/site'

function Block({ b }) {
  switch (b.type) {
    case 'lead':
      return <p className="rr-leadp">{b.text}</p>
    case 'author':
      return (
        <div className="rr-author">
          <span className="rr-author-mark">{b.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
          <span><strong>{b.name}</strong><em>{b.role}{b.note ? ` · ${b.note}` : ''}</em></span>
        </div>
      )
    case 'p':
      return <p className="rr-p">{b.text}</p>
    case 'h2':
      return <h2 id={slugify(b.text)} className="serif rr-h2">{b.text}</h2>
    case 'glance':
      return (
        <aside className="rr-glance">
          <span className="rr-glance-h">{b.title}</span>
          <ul>{b.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
        </aside>
      )
    case 'exhibit':
      return (
        <figure className="rr-exhibit">
          <figcaption className="rr-ex-head"><span className="rr-ex-no">Exhibit {b.n}</span><strong>{b.title}</strong></figcaption>
          <div className="rr-ex-chart"><span>Chart / data visualisation</span></div>
          <figcaption className="rr-ex-foot"><span>{b.caption}</span><em>{b.source}</em></figcaption>
        </figure>
      )
    case 'pull':
      return <blockquote className="rr-pull serif">{b.text}</blockquote>
    case 'ad':
      return <div className="rr-ad"><span>{b.label}</span><em>Author-managed slot</em></div>
    case 'dashboard':
      return (
        <div className="rr-dash">
          <span className="rr-dash-h">{b.title}</span>
          <div className="rr-dash-row">{Array.from({ length: 6 }, (_, i) => <span className="rr-dash-tile" key={i} />)}</div>
          <em className="rr-dash-note">{b.note}</em>
        </div>
      )
    case 'image':
      return <div className="rr-img"><span>{b.label}</span></div>
    case 'glossary':
      return (
        <dl className="rr-gloss">
          {b.items.map((g, i) => (<React.Fragment key={i}><dt>{g.term}</dt><dd>{g.def}</dd></React.Fragment>))}
        </dl>
      )
    default:
      return null
  }
}

export default function ReportReader() {
  const { slug } = useParams()
  const report = REPORTS.find((r) => r.slug === slug) || REPORTS[0]
  const blocks = REPORT_BLOCKS
  const sections = blocks.filter((b) => b.type === 'h2').map((b) => ({ id: slugify(b.text), label: b.text }))
  const [active, setActive] = useState(sections[0]?.id)
  const [titleIn, setTitleIn] = useState(false)
  const articleRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setTitleIn(true), 90)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setTitleIn(false)
    const t = setTimeout(() => setTitleIn(true), 90)
    window.scrollTo(0, 0)
    return () => clearTimeout(t)
  }, [slug])

  // scroll-spy + read progress
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-28% 0px -64% 0px' },
    )
    els.forEach((el) => obs.observe(el))
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      const passed = Math.min(Math.max(window.scrollY - el.offsetTop, 0), Math.max(total, 1))
      setProgress(total > 0 ? passed / total : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [slug])

  const others = REPORTS.filter((r) => r.slug !== report.slug).slice(0, 3)

  return (
    <>
      <Nav variant="overlay" />
      <main className="rr">
        {/* COVER */}
        <header className="rr-cover">
          <div className="rr-cover-bg"><img src={`/work/${report.cover}`} alt="" /></div>
          <div className="rr-cover-scrim" />
          <div className={`rr-cover-in ${titleIn ? 'in' : ''}`}>
            <span className="rr-eyebrow">Ties Research</span>
            <h1 className="serif rr-title">{report.title}</h1>
            <p className="rr-meta">{report.date} &nbsp;|&nbsp; {report.kind}{report.readTime ? ` · ${report.readTime}` : ''}</p>
          </div>
          <span className="rr-scroll" aria-hidden>⌄</span>
        </header>

        {/* BODY */}
        <div className="rr-body container">
          <aside className="rr-rail">
            <div className="rr-rail-sticky">
              <nav className="rr-contents" aria-label="Report sections">
                <span className="rr-rail-h">Contents</span>
                <span className="rr-progress"><span style={{ transform: `scaleX(${progress})` }} /></span>
                <ul>
                  {sections.map((s) => (
                    <li key={s.id}><a className={active === s.id ? 'on' : ''} href={`#${s.id}`}>{s.label}</a></li>
                  ))}
                </ul>
              </nav>
              <div className="rr-actions">
                <button className="btn btn-dark rr-dl" type="button">↓ Download PDF</button>
                <button className="btn btn-outline rr-share" type="button">Share</button>
              </div>
            </div>
          </aside>

          <article className="rr-article" ref={articleRef}>
            <p className="rr-dek">{report.dek}</p>
            {blocks.map((b, i) => <Block key={i} b={b} />)}
          </article>
        </div>

        {/* MORE */}
        <section className="rr-more container">
          <h2 className="serif">More research</h2>
          <div className="rr-more-grid">{others.map((r) => <ReportCard key={r.slug} r={r} />)}</div>
        </section>
      </main>
      <CtaBand />
      <Footer />
      <style>{css}</style>
    </>
  )
}

const css = `
.rr{background:var(--paper)}

/* COVER */
.rr-cover{position:relative;height:clamp(560px,86vh,820px);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;overflow:hidden;color:#fff}
.rr-cover-bg{position:absolute;inset:0}
.rr-cover-bg img{width:100%;height:100%;object-fit:cover}
.rr-cover-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,7,5,.42) 0%,rgba(8,7,5,.30) 38%,rgba(8,7,5,.62) 100%)}
.rr-cover-in{position:relative;z-index:1;max-width:1000px;padding:0 24px}
.rr-eyebrow{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.86);opacity:0;transform:translateY(-8px);transition:opacity .5s var(--ease) .05s,transform .5s var(--ease) .05s}
.rr-title{font-size:clamp(32px,5vw,68px);line-height:1.06;color:#fff;margin:18px 0 0;opacity:0;transform:translateY(-26px);transition:opacity .7s var(--ease) .12s,transform .7s var(--ease) .12s}
.rr-meta{font-size:14px;color:rgba(255,255,255,.82);margin-top:22px;opacity:0;transform:translateY(-8px);transition:opacity .5s var(--ease) .26s,transform .5s var(--ease) .26s}
.rr-cover-in.in .rr-eyebrow,.rr-cover-in.in .rr-title,.rr-cover-in.in .rr-meta{opacity:1;transform:none}
.rr-scroll{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);z-index:1;font-size:26px;color:rgba(255,255,255,.8);animation:rrBob 1.8s ease-in-out infinite}
@keyframes rrBob{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,7px)}}

/* BODY layout */
.rr-body{display:grid;grid-template-columns:248px minmax(0,1fr);gap:64px;padding-top:72px;padding-bottom:40px;align-items:start}
.rr-rail-sticky{position:sticky;top:100px;display:flex;flex-direction:column;gap:26px}
.rr-rail-h{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--soft)}
.rr-progress{display:block;height:3px;border-radius:3px;background:var(--rule);margin:12px 0 16px;overflow:hidden}
.rr-progress span{display:block;height:100%;background:var(--ink);transform-origin:left;transition:transform .15s linear}
.rr-contents ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
.rr-contents a{display:block;font-size:14px;line-height:1.35;color:var(--soft);padding:7px 0 7px 14px;border-left:2px solid var(--rule);transition:color .2s,border-color .2s}
.rr-contents a:hover{color:var(--ink)}
.rr-contents a.on{color:var(--ink);font-weight:700;border-color:var(--ink)}
.rr-actions{display:flex;flex-direction:column;gap:10px}
.rr-dl,.rr-share{width:100%;justify-content:center}

/* ARTICLE */
.rr-article{max-width:720px;font-size:18px}
.rr-dek{font-family:var(--serif);font-size:clamp(20px,2.2vw,27px);line-height:1.4;color:var(--ink);margin:0 0 14px;font-style:italic}
.rr-author{display:flex;align-items:center;gap:13px;padding:18px 0 26px;border-bottom:1px solid var(--rule);margin-bottom:30px}
.rr-author-mark{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:var(--ink);color:var(--paper);font-family:var(--serif);font-size:15px;flex:none}
.rr-author strong{display:block;font-size:14.5px;font-weight:700}
.rr-author em{font-style:normal;font-size:13px;color:var(--soft)}
.rr-p{font-size:18px;line-height:1.72;color:var(--ink-2);margin:0 0 24px}
.rr-h2{font-size:clamp(26px,3vw,38px);line-height:1.12;margin:52px 0 18px;scroll-margin-top:96px}
.rr-leadp{font-size:19px;line-height:1.7;color:var(--ink-2);margin:0 0 24px}

.rr-glance{background:var(--cream);border:1px solid var(--rule);border-radius:14px;padding:26px 28px;margin:30px 0}
.rr-glance-h{display:block;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--soft);margin-bottom:14px}
.rr-glance ul{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:9px}
.rr-glance li{font-size:16px;line-height:1.5;color:var(--ink-2)}

.rr-exhibit{margin:36px 0;border:1px solid var(--rule);border-radius:14px;overflow:hidden;background:#fff}
.rr-ex-head{padding:20px 24px 0}
.rr-ex-no{display:block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);margin-bottom:5px}
.rr-ex-head strong{font-family:var(--serif);font-weight:500;font-size:21px;line-height:1.2;color:var(--ink)}
.rr-ex-chart{margin:18px 24px;aspect-ratio:16/9;border-radius:10px;border:1.5px dashed color-mix(in srgb,var(--ink) 18%,transparent);display:grid;place-items:center;background:repeating-linear-gradient(45deg,#faf6ef,#faf6ef 11px,#fff 11px,#fff 22px);color:var(--soft);font-size:13px;letter-spacing:.04em}
.rr-ex-foot{display:flex;flex-direction:column;gap:4px;padding:0 24px 20px}
.rr-ex-foot span{font-size:14px;color:var(--ink-2)}
.rr-ex-foot em{font-style:normal;font-size:12px;color:var(--soft)}

.rr-pull{font-weight:500;font-size:clamp(24px,3vw,34px);line-height:1.28;color:var(--ink);border-left:3px solid var(--ink);padding:6px 0 6px 26px;margin:40px 0}
.rr-ad{margin:36px 0;border:1.5px dashed var(--rule);border-radius:14px;padding:40px;text-align:center;background:#fff}
.rr-ad span{display:block;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink)}
.rr-ad em{font-style:normal;font-size:12px;color:var(--soft)}

.rr-dash{margin:36px 0;border:1px solid var(--rule);border-radius:14px;padding:26px;background:#fff}
.rr-dash-h{display:block;font-family:var(--serif);font-size:20px;color:var(--ink);margin-bottom:18px}
.rr-dash-row{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}
.rr-dash-tile{aspect-ratio:1/1;border-radius:10px;background:repeating-linear-gradient(45deg,#faf6ef,#faf6ef 8px,#fff 8px,#fff 16px);border:1px solid var(--rule)}
.rr-dash-note{display:block;font-style:normal;font-size:12.5px;color:var(--soft);margin-top:16px}

.rr-img{margin:36px 0;aspect-ratio:16/9;border-radius:14px;border:1.5px dashed color-mix(in srgb,var(--ink) 18%,transparent);display:grid;place-items:center;background:repeating-linear-gradient(45deg,#faf6ef,#faf6ef 12px,#fff 12px,#fff 24px);color:var(--soft);font-size:13px}

.rr-gloss{margin:24px 0 0;display:grid;grid-template-columns:auto 1fr;gap:10px 22px}
.rr-gloss dt{font-weight:700;font-size:15px;color:var(--ink)}
.rr-gloss dd{margin:0;font-size:15px;line-height:1.55;color:var(--soft)}

/* MORE */
.rr-more{padding:30px 40px var(--sec)}
.rr-more h2{font-size:clamp(24px,3vw,38px);margin-bottom:28px}
.rr-more-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}

@media(max-width:980px){
  .rr-body{grid-template-columns:1fr;gap:0}
  .rr-rail-sticky{position:static;flex-direction:row;flex-wrap:wrap;justify-content:space-between;gap:16px;padding-bottom:30px;margin-bottom:20px;border-bottom:1px solid var(--rule)}
  .rr-contents{flex:1;min-width:240px}
  .rr-contents ul{display:none}
  .rr-actions{flex-direction:row}
  .rr-more-grid{grid-template-columns:1fr}
}
@media(max-width:600px){.rr-actions{width:100%}}
`
