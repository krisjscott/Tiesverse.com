import React from 'react'
import { Link } from 'react-router-dom'

// Research report card — reuses the site's white-card language (cover + serif title).
export default function ReportCard({ r, featured }) {
  return (
    <Link className={`rc ${featured ? 'rc-feat' : ''}`} to={`/research/${r.slug}`}>
      <span className="rc-cover"><img src={`/work/${r.cover}`} alt="" loading="lazy" /></span>
      <span className="rc-body">
        <span className="rc-topic">{r.topic} · {r.kind}</span>
        <strong className="serif rc-title">{r.title}</strong>
        <span className="rc-dek">{r.dek}</span>
        <span className="rc-meta">{r.date} · {r.readTime}</span>
        <span className="rc-go">Read report <span>→</span></span>
      </span>
      <style>{`
        .rc{display:flex;flex-direction:column;background:#fff;border:1px solid var(--rule);border-radius:14px;overflow:hidden;transition:transform .3s var(--ease),box-shadow .3s,border-color .2s}
        .rc:hover{transform:translateY(-4px);box-shadow:0 24px 50px rgba(70,40,0,.12);border-color:#e2d5c2}
        .rc-cover{display:block;aspect-ratio:3/2;overflow:hidden;background:#f1ece4}
        .rc-cover img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s var(--ease)}
        .rc:hover .rc-cover img{transform:scale(1.04)}
        .rc-body{display:flex;flex-direction:column;padding:22px 24px 26px;flex:1}
        .rc-topic{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--soft)}
        .rc-title{font-weight:500;font-size:23px;line-height:1.18;color:var(--ink);margin:8px 0 10px}
        .rc-dek{font-size:14.5px;line-height:1.55;color:var(--soft);flex:1}
        .rc-meta{font-size:12.5px;color:var(--soft);margin-top:16px}
        .rc-go{font-size:13.5px;font-weight:700;color:var(--ink);margin-top:14px;display:inline-flex;gap:7px;align-items:center}
        .rc-go span{transition:transform .2s}
        .rc:hover .rc-go span{transform:translateX(4px)}

        /* featured: large two-column */
        .rc-feat{flex-direction:row;align-items:stretch}
        .rc-feat .rc-cover{flex:1.15;aspect-ratio:auto;min-height:340px}
        .rc-feat .rc-body{flex:1;justify-content:center;padding:48px 52px}
        .rc-feat .rc-title{font-size:clamp(28px,3vw,42px);margin:12px 0 14px}
        .rc-feat .rc-dek{font-size:17px;line-height:1.6;flex:none;max-width:46ch}
        @media(max-width:820px){.rc-feat{flex-direction:column}.rc-feat .rc-cover{min-height:0;aspect-ratio:3/2}.rc-feat .rc-body{padding:30px 26px}}
      `}</style>
    </Link>
  )
}
