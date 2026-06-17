import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'

const EPISODES = [
  { ep: 'EP.01', title: 'The shape of a multipolar world', len: '48 min', tag: 'Strategy' },
  { ep: 'EP.02', title: 'Reading India’s budget like a strategist', len: '52 min', tag: 'Markets' },
  { ep: 'EP.03', title: 'What the data says about first-time voters', len: '41 min', tag: 'Data' },
]

export default function Podcasts() {
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top pc">
        <div className="container">
          <header className="pc-head">
            <span className="eyebrow accent">Insights · Audio</span>
            <h1 className="serif">The Tiesverse<br /><span className="ital">audio archive.</span></h1>
            <p className="pc-sub">Conversations and reporting across geopolitics, markets and culture, for your commute, not just your feed.</p>
          </header>

          <div className="pc-featured">
            <div className="pc-player" aria-hidden>
              <span className="pc-play">▶</span>
              <div className="pc-wave">{Array.from({ length: 40 }, (_, i) => <i key={i} style={{ height: `${20 + Math.abs(Math.sin(i)) * 70}%` }} />)}</div>
            </div>
            <div className="pc-featured-copy">
              <h2 className="serif">The shape of a multipolar world</h2>
              <p>Our researchers unpack how power is being redistributed, and what it means for India’s next decade.</p>
            </div>
          </div>

          <div className="pc-list">
            {EPISODES.map((e) => (
              <a className="pc-row" href="#" key={e.ep}>
                <span className="pc-ep">{e.ep}</span>
                <span className="pc-main"><strong className="serif">{e.title}</strong><span>{e.tag}</span></span>
                <span className="pc-len">{e.len}</span>
                <span className="pc-go">▶</span>
              </a>
            ))}
          </div>
          <p className="pc-note">Episode catalogue coming soon. Connect your real feed to replace these.</p>
        </div>
      </main>
      <CtaBand />
      <Footer />
      <style>{`
        .pad-top{padding-top:74px}.accent{color:var(--ink)}
        .pc{padding:90px 0 var(--sec)}
        .pc-head{max-width:720px;margin-bottom:48px}
        .pc-head h1{font-size:clamp(38px,5.4vw,76px);margin:16px 0 0}
        .pc-sub{color:var(--soft);font-size:18px;line-height:1.6;margin-top:20px}
        .pc-featured{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center;background:var(--dark);color:var(--on-dark);border-radius:14px;padding:36px;margin-bottom:50px}
        .pc-player{background:var(--dark-2);border-radius:10px;padding:26px;display:flex;align-items:center;gap:18px;min-height:150px}
        .pc-play{width:54px;height:54px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-size:18px;padding-left:3px;flex:none}
        .pc-wave{display:flex;align-items:center;gap:3px;height:80px;flex:1}
        .pc-wave i{flex:1;background:linear-gradient(180deg,var(--accent),#ffb152);border-radius:2px;opacity:.9}
        .pc-tag{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#ffd9b0}
        .pc-featured-copy h2{color:#fff;font-size:clamp(24px,3vw,38px);margin:10px 0 12px}
        .pc-featured-copy p{color:var(--on-dark-soft);font-size:16px;line-height:1.55}
        .pc-list{border-top:1px solid var(--ink)}
        .pc-row{display:grid;grid-template-columns:70px 1fr auto auto;gap:20px;align-items:center;padding:22px 6px;border-bottom:1px solid var(--rule);transition:background .25s,padding .3s}
        .pc-row:hover{background:var(--cream);padding-left:14px}
        .pc-ep{font-size:13px;font-weight:700;color:var(--ink)}
        .pc-main strong{font-family:var(--serif);font-weight:500;font-size:21px;display:block}
        .pc-main span{font-size:13px;color:var(--soft)}
        .pc-len{font-size:13px;color:var(--soft)}
        .pc-go{width:36px;height:36px;border-radius:50%;border:1px solid var(--rule);display:grid;place-items:center;font-size:12px;color:var(--ink)}
        .pc-note{margin-top:24px;font-size:13px;color:var(--soft);font-style:italic}
        @media(max-width:820px){.pc-featured{grid-template-columns:1fr}}
        @media(max-width:600px){.pc-row{grid-template-columns:50px 1fr auto;gap:14px}.pc-len{display:none}}
      `}</style>
    </>
  )
}
