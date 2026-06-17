import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV, BRANDS, CAREERS_URL, FOUNDER_VOICES, NAV_FEATURE } from '../data/site'
import { ImgPlaceholder } from './ImgPlaceholder'

export function Wordmark({ light }) {
  return (
    <span className={`wm ${light ? 'wm-light' : ''}`}>
      <span className="wm-dot">.</span>ties<span className="wm-verse">verse</span>
    </span>
  )
}

export default function Nav({ variant = 'solid' }) {
  const [open, setOpen] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeMobile = () => setMobileOpen(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  const overlay = variant === 'overlay' && !scrolled

  return (
    <header className={`nav ${overlay ? 'nav-overlay' : 'nav-solid'}`} onMouseLeave={() => setOpen(null)}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo"><Wordmark light={overlay} /></Link>

        <nav className="nav-menu" aria-label="Primary">
          {NAV.map((item) => (
            <div className="nav-item" key={item.label} onMouseEnter={() => setOpen(item.label)}>
              <button className="nav-trigger" aria-expanded={open === item.label}>
                <span className="nav-plus">+</span>{item.label}
              </button>
            </div>
          ))}
        </nav>

        <div className="nav-right">
          <Link to="/careers" className="btn btn-primary nav-cta">Join us</Link>
          <button className={`nav-burger ${mobileOpen ? 'on' : ''}`} aria-label="Menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="nav-mobile">
          {NAV.map((item) => (
            <div className="nm-group" key={item.label}>
              <span className="nm-head">{item.label}</span>
              <div className="nm-links">
                {item.col === 'brands'
                  ? BRANDS.map((b) => (
                      <a key={b.key} href={b.url} target={b.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer" onClick={closeMobile}>{b.name}</a>
                    ))
                  : item.col.map((c) =>
                      c.ext
                        ? <a key={c.name} href={c.to} target="_blank" rel="noreferrer" onClick={closeMobile}>{c.name}</a>
                        : <Link key={c.name} to={c.to} onClick={closeMobile}>{c.name}</Link>,
                    )}
              </div>
            </div>
          ))}
          <Link className="btn btn-primary nm-cta" to="/careers" onClick={closeMobile}>Join us</Link>
        </div>
      )}

      {/* mega panel */}
      {open && (
        <div className="mega" onMouseLeave={() => setOpen(null)}>
          <div className="mega-inner">
            {(() => {
              const item = NAV.find((n) => n.label === open)
              if (!item) return null
              if (item.col === 'brands') {
                return (
                  <div className="mega-brands">
                    {BRANDS.map((b) => (
                      <a className="mega-brand" key={b.key} href={b.url} target={b.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                        <span className="mega-brand-mark"><img src={b.mark} alt="" /></span>
                        <span><strong>{b.name}</strong><em>{b.domain}</em></span>
                      </a>
                    ))}
                  </div>
                )
              }
              const qi = NAV.filter((n) => n.col !== 'brands').findIndex((n) => n.label === item.label)
              const tq = FOUNDER_VOICES[((qi < 0 ? 0 : qi) % FOUNDER_VOICES.length)]
              return (
                <div className="mega-layout">
                  <div className="mega-left">
                    <div className="mega-cols">
                      {item.col.map((c) =>
                        c.ext ? (
                          <a className="mega-link" key={c.name} href={c.to} target="_blank" rel="noreferrer">
                            <strong>{c.name}</strong><span>{c.desc}</span>
                          </a>
                        ) : (
                          <Link className="mega-link" key={c.name} to={c.to} onClick={() => setOpen(null)}>
                            <strong>{c.name}</strong><span>{c.desc}</span>
                          </Link>
                        ),
                      )}
                    </div>
                    <figure className="mega-quote">
                      <span className="mega-quote-mark">“</span>
                      <blockquote>{tq.quote}</blockquote>
                      <figcaption>
                        <span className="mega-quote-id"><strong>{tq.name}</strong><span>{tq.role}</span></span>
                        <span className="mega-quote-org"><b>.</b>ties<em>verse</em></span>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="mega-feature">
                    <span className="mega-feat-eyebrow">Latest in {item.label}</span>
                    <div className="mega-feat-list">
                      {(NAV_FEATURE[item.label] || []).map((f) => (
                        <Link className="mega-feat-card" key={f.title} to={f.to} onClick={() => setOpen(null)}>
                          <span className="mega-feat-thumb"><img src={`/work/${f.img}`} alt="" loading="lazy" /></span>
                          <span className="mega-feat-ct">
                            <span className="mega-feat-kind">{f.kind}</span>
                            <strong>{f.title}</strong>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      <style>{css}</style>
    </header>
  )
}

const css = `
.wm{font-family:'Poppins',var(--sans);font-size:22px;font-weight:700;letter-spacing:-.03em;color:var(--ink)}
.wm-dot,.wm-verse{color:var(--accent)}
.wm-light{color:var(--on-dark)}

.nav{position:fixed;top:0;left:0;right:0;z-index:100;transition:background .3s,border-color .3s,box-shadow .3s}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:74px;max-width:1680px;margin:0 auto;padding:0 40px}
.nav-solid{background:#fff;backdrop-filter:blur(12px);border-bottom:1px solid var(--rule)}
.nav-overlay{background:rgba(255,255,255,.10);backdrop-filter:blur(10px) saturate(140%);-webkit-backdrop-filter:blur(10px) saturate(140%);border-bottom:1px solid rgba(255,255,255,.15)}
.nav-overlay .nav-logo .wm{color:var(--on-dark)}
.nav-menu{display:flex;gap:6px}
.nav-trigger{background:none;border:none;font-size:14px;font-weight:600;color:var(--ink);padding:8px 12px;display:inline-flex;align-items:center;gap:6px;transition:color .2s}
.nav-overlay .nav-trigger{color:var(--on-dark)}
.nav-plus{color:inherit;opacity:.5;font-weight:700}
.nav-trigger:hover{color:var(--ink)}
.nav-overlay .nav-trigger:hover{color:#fff}
.nav-right{display:flex;align-items:center;gap:14px}
.nav-sub{font-size:14px;font-weight:600;padding:9px 16px;border:1px solid var(--rule);border-radius:var(--radius)}
.nav-overlay .nav-sub{color:var(--on-dark);border-color:rgba(255,241,229,.3)}
.nav-cta{font-size:14px;padding:11px 18px}

/* mega */
.mega{position:absolute;top:74px;left:0;right:0;background:#fff;border-bottom:1px solid var(--rule);box-shadow:0 30px 60px rgba(70,9,50,.1);animation:megaIn .22s var(--ease)}
@keyframes megaIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.mega-inner{max-width:1680px;margin:0 auto;padding:30px 40px 36px}
.mega-cols{display:flex;flex-direction:column}
.mega-link{display:flex;flex-direction:column;gap:3px;padding:17px 8px;border-bottom:1px solid var(--rule);transition:padding .22s,color .2s}
.mega-link:last-child{border-bottom:none}
.mega-link:hover{padding-left:16px}
.mega-link strong{font-family:var(--serif);font-weight:500;font-size:22px;letter-spacing:-.01em;transition:color .2s}
.mega-link:hover strong{color:var(--ink)}
.mega-link span{font-size:13.5px;color:var(--soft)}
.mega-brands{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.mega-brand{display:flex;align-items:center;gap:12px;padding:14px;border-radius:8px;transition:background .2s}
.mega-brand:hover{background:var(--cream)}
.mega-brand-mark{width:38px;height:38px;border-radius:50%;border:1px solid var(--rule);display:grid;place-items:center;background:#fff;flex:none}
.mega-brand-mark img{width:60%;height:60%;object-fit:contain}
.mega-brand strong{display:block;font-size:15px;font-weight:700}
.mega-brand em{font-style:normal;font-size:12px;color:var(--soft)}
.mega-layout{display:grid;grid-template-columns:minmax(300px,360px) 1fr;gap:56px;align-items:stretch}
.mega-left{display:flex;flex-direction:column}
.mega-feature{display:flex;flex-direction:column;gap:16px;border-left:1px solid var(--rule);padding-left:48px}
.mega-feat-eyebrow{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--soft)}
.mega-feat-list{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.mega-feat-card{display:flex;flex-direction:column;border:1px solid var(--rule);border-radius:14px;overflow:hidden;background:#fff;transition:transform .28s var(--ease),box-shadow .28s,border-color .2s}
.mega-feat-card:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(70,40,0,.12);border-color:#e2d5c2}
.mega-feat-thumb{flex:1;min-height:130px;overflow:hidden;background:#f1ece4}
.mega-feat-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s var(--ease)}
.mega-feat-card:hover .mega-feat-thumb img{transform:scale(1.05)}
.mega-feat-ct{padding:15px 18px 20px}
.mega-feat-kind{display:block;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--soft);margin-bottom:5px}
.mega-feat-ct strong{font-family:var(--serif);font-weight:500;font-size:18px;line-height:1.2;color:var(--ink)}

/* testimonial in dropdown (Plum-style) */
.mega-quote{margin:22px 8px 0;padding-top:22px;border-top:1px solid var(--rule)}
.mega-quote-mark{font-family:var(--serif);font-size:44px;line-height:.4;color:var(--soft);display:block;height:26px}
.mega-quote blockquote{margin:0;font-size:14px;line-height:1.55;color:var(--soft);max-width:400px}
.mega-quote figcaption{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:16px}
.mega-quote-id strong{display:block;font-size:14px;font-weight:700;color:var(--ink)}
.mega-quote-id span{font-size:12.5px;color:var(--soft)}
.mega-quote-org{font-family:'Poppins',var(--sans);font-weight:700;font-size:17px;letter-spacing:-.03em;color:var(--ink);flex:none}
.mega-quote-org b,.mega-quote-org em{color:var(--accent);font-style:normal}
@media(max-width:1100px){.mega-layout{grid-template-columns:1fr}.mega-feature{display:none}}

/* mobile menu */
.nav-burger{display:none;flex-direction:column;justify-content:center;gap:5px;width:42px;height:42px;background:none;border:none;cursor:pointer;padding:0}
.nav-burger span{display:block;width:22px;height:2px;background:var(--ink);margin:0 auto;transition:transform .25s,opacity .2s}
.nav-overlay .nav-burger span{background:var(--on-dark)}
.nav-burger.on span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.nav-burger.on span:nth-child(2){opacity:0}
.nav-burger.on span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.nav-mobile{position:fixed;top:74px;left:0;right:0;height:calc(100vh - 74px);height:calc(100dvh - 74px);background:#fff;overflow-y:auto;padding:8px 24px 40px;z-index:99;animation:megaIn .2s var(--ease)}
.nm-group{border-bottom:1px solid var(--rule);padding:16px 0}
.nm-head{display:block;font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--soft);margin-bottom:8px}
.nm-links{display:flex;flex-direction:column}
.nm-links a{font-family:var(--serif);font-size:20px;color:var(--ink);padding:9px 0}
.nm-links a:hover{color:var(--ink)}
.nm-cta{display:flex;width:100%;justify-content:center;margin-top:24px;font-size:16px;padding:14px}
@media(max-width:980px){.nav-menu,.nav-sub{display:none}.nav-burger{display:flex}}
`
