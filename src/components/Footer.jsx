import React from 'react'
import { Link } from 'react-router-dom'
import { Wordmark } from './Nav'
import { BRANDS, SOCIALS, CAREERS_URL, PARENT } from '../data/site'

const ICONS = {
  X: <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5-6.6L5.5 22H2.3l8-9.2L1.6 2h7l4.5 6 5.8-6Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />,
  Instagram: (
    <>
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.3" cy="6.7" r="1.25" fill="currentColor" />
    </>
  ),
  YouTube: <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.77-1.77C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.83.42A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.77 1.77C4.7 18.9 12 18.9 12 18.9s7.3 0 8.83-.42a2.5 2.5 0 0 0 1.77-1.77C23 15.2 23 12 23 12Zm-13 3.3V8.7l5.7 3.3-5.7 3.3Z" />,
  LinkedIn: <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.6h3.5V21H3.2V8.6Zm5.9 0h3.36v1.7h.05c.47-.85 1.6-1.74 3.3-1.74 3.53 0 4.18 2.2 4.18 5.06V21h-3.5v-5.5c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.88V21H9.1V8.6Z" />,
  Substack: <path d="M4 4h16v2.5H4V4Zm0 4.3h16V22l-8-4.4L4 22V8.3Z" />,
  Discord: <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />,
}

export default function Footer() {
  return (
    <footer className="ft">
      <div className="container">
        <div className="ft-grid">
          {/* left link columns */}
          <div className="ft-side">
            <div className="ft-col">
              <span className="ft-h">Brands</span>
              {BRANDS.map((b) => (
                <a key={b.key} href={b.url} target={b.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{b.name}</a>
              ))}
            </div>
            <div className="ft-col">
              <span className="ft-h">What we do</span>
              <Link to="/research">Research</Link>
              <Link to="/media">Media</Link>
              <Link to="/technology">Technology</Link>
              <Link to="/newsroom">Insights</Link>
            </div>
          </div>

          {/* center brand block */}
          <div className="ft-center">
            <a href="#top" className="ft-wm"><Wordmark light /></a>
            <p className="ft-addr">Tiesverse Foundation<br /><span>Registered office · Delhi, India</span></p>
            <div className="ft-socials">
              {SOCIALS.map(([s, h]) => (
                <a key={s} href={h} target="_blank" rel="noreferrer" aria-label={s}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">{ICONS[s]}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* right link columns */}
          <div className="ft-side ft-side-r">
            <div className="ft-col">
              <span className="ft-h">Company</span>
              <Link to="/about">About</Link>
              <Link to="/brand">Brand</Link>
              <Link to="/events">Engagements</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="ft-col">
              <span className="ft-h">Insights</span>
              <Link to="/newsroom">Analysis</Link>
              <Link to="/podcasts">Podcasts</Link>
              <Link to="/webinars">Webinars &amp; Workshops</Link>
              <Link to="/guests">Past guests</Link>
            </div>
          </div>
        </div>

        <div className="ft-reg">Tiesverse Foundation · CIN U88900MP2025NPL079342</div>
        <div className="ft-bottom">
          <span className="ft-made">© 2026 Tiesverse Foundation · Made with <img className="ft-heart" src="/work/emoji-orange-heart.png" alt="love" /> by the Tech Team at TIES</span>
          <div className="ft-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>

      <style>{css}</style>
    </footer>
  )
}

const css = `
.ft{background:var(--dark);color:var(--on-dark);padding:72px 0 38px}
.ft-grid{display:grid;grid-template-columns:1fr auto 1fr;gap:40px;padding-bottom:48px;border-bottom:1px solid rgba(255,243,230,.12)}
.ft-side{display:grid;grid-template-columns:1fr 1fr;gap:30px}
.ft-h{display:block;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--on-dark-soft);margin-bottom:15px}
.ft-col a{display:block;font-size:14.5px;color:var(--on-dark);margin-bottom:10px;transition:color .2s}
.ft-col a:hover{color:#fff}
.ft-center{text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:0 20px;min-width:280px}
.ft-wm .wm{font-size:clamp(40px,5vw,68px)}
.ft-addr{margin:18px 0 20px;font-size:13.5px;line-height:1.6;color:var(--on-dark)}
.ft-addr span{color:var(--on-dark-soft)}
.ft-socials{display:flex;gap:10px}
.ft-socials a{width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,243,230,.22);display:grid;place-items:center;font-weight:700;font-size:14px;color:var(--on-dark);transition:all .2s}
.ft-socials a:hover{background:#fff;border-color:#fff;color:var(--dark)}
.ft-reg{padding:22px 0 0;text-align:center;font-size:12.5px;color:var(--on-dark-soft)}
.ft-bottom{display:flex;justify-content:space-between;align-items:center;gap:14px;padding-top:14px;color:var(--on-dark-soft);font-size:13px;flex-wrap:wrap}
.ft-tag{font-style:italic}
.ft-made{display:inline-flex;align-items:center;gap:5px}
.ft-heart{width:15px;height:15px;vertical-align:middle;display:inline-block}
.ft-legal{display:flex;gap:18px}
.ft-legal a{color:var(--on-dark-soft)}
.ft-legal a:hover{color:#fff}
@media(max-width:900px){.ft-grid{grid-template-columns:1fr;gap:36px}.ft-center{order:-1;align-items:flex-start;text-align:left;padding:0}.ft-side{grid-template-columns:1fr 1fr}}
`
