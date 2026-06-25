import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import { GUESTS } from '../data/site'
import { fetchGuests } from '../apiClient'

const initials = (n) => n.replace(/\(.*?\)/g, '').split(' ').filter((w) => /[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('')

// Speaker-style card: full-bleed portrait, bottom scrim, name + role overlaid.
// Falls back to a neutral toned tile with large faint initials when no photo.
function GuestCard({ g }) {
  // photo_url (Supabase) or legacy photo filename (static fallback)
  const photoSrc = g.photo_url || (g.photo ? `/work/${g.photo}` : null)
  const [ok, setOk] = React.useState(Boolean(photoSrc))
  return (
    <article className="gs-card">
      {ok && photoSrc
        ? <img className="gs-img" src={photoSrc} alt={g.name} onError={() => setOk(false)} />
        : <span className="gs-img gs-img-ph" aria-hidden>{initials(g.name)}</span>}
      <span className="gs-scrim" aria-hidden />
      <div className="gs-meta">
        <strong>{g.name}</strong>
        <span>{g.role}</span>
      </div>
    </article>
  )
}

export default function Guests() {
  const [guests, setGuests] = useState(GUESTS)
  useEffect(() => {
    fetchGuests().then((live) => {
      if (live && live.length) setGuests(live)
    })
  }, [])
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top gs">
        <div className="container">
          <header className="gs-head">
            <span className="eyebrow accent">Engagements · Voices</span>
            <h1 className="serif">The people who've<br /><span className="ital">joined us.</span></h1>
            <p className="gs-sub">Leaders, scholars and policymakers who have shared our summits, panels and editorial sessions, shaping discourse across geopolitics, media and technology.</p>
          </header>
          <div className="gs-grid">
            {guests.map((g, i) => <GuestCard g={g} key={i} />)}
          </div>
        </div>
      </main>
      <CtaBand />
      <Footer />
      <style>{`
        .pad-top{padding-top:74px}.accent{color:var(--ink)}
        .gs{padding:90px 0 var(--sec)}
        .gs-head{max-width:760px;margin-bottom:56px}
        .gs-head h1{font-size:clamp(38px,5.4vw,76px);margin:16px 0 0}
        .gs-sub{color:var(--soft);font-size:18px;line-height:1.6;margin-top:20px}
        .gs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
        .gs-card{position:relative;aspect-ratio:3/4;border-radius:14px;overflow:hidden;background:var(--dark);transition:transform .3s var(--ease),box-shadow .3s}
        .gs-card:hover{transform:translateY(-4px);box-shadow:0 22px 44px rgba(70,40,0,.16)}
        .gs-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s var(--ease)}
        .gs-card:hover .gs-img{transform:scale(1.04)}
        .gs-img-ph{display:grid;place-items:center;background:linear-gradient(160deg,#2a2118,#15140f);color:rgba(255,243,230,.5);font-family:var(--serif);font-size:54px;font-weight:500}
        .gs-scrim{position:absolute;inset:0;background:linear-gradient(180deg,transparent 38%,rgba(12,11,8,.18) 58%,rgba(12,11,8,.82) 100%)}
        .gs-meta{position:absolute;left:0;right:0;bottom:0;padding:20px 18px 18px;z-index:2}
        .gs-meta strong{display:block;color:#fff;font-size:18px;line-height:1.2;letter-spacing:-.01em}
        .gs-meta span{display:block;margin-top:4px;color:rgba(255,243,230,.78);font-size:13px;line-height:1.35}
        @media(max-width:1024px){.gs-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:680px){.gs-grid{grid-template-columns:1fr 1fr;gap:14px}}
        @media(max-width:400px){.gs-grid{grid-template-columns:1fr}}
      `}</style>
    </>
  )
}
