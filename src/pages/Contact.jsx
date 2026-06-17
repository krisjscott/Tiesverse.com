import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import { CONTACT, SOCIALS, CAREERS_URL } from '../data/site'

const DIRECTORY = [
  { tag: 'Partnerships', value: CONTACT.partnerships, href: `mailto:${CONTACT.partnerships}`, note: 'Collaborations, sponsorships & press.' },
  { tag: 'General enquiries', value: CONTACT.general, href: `mailto:${CONTACT.general}`, note: 'Anything else on your mind.' },
  { tag: 'Operations', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}`, note: CONTACT.lead },
  { tag: 'Careers', value: 'tiesverse.com/careers', href: '/careers', note: 'Open roles across the organisation.' },
]

export default function Contact() {
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top ct">
        <div className="container ct-grid">
          <div className="ct-left">
            <span className="eyebrow accent">Contact</span>
            <h1 className="serif">Let’s talk.</h1>
            <p className="ct-sub">Partnerships, press, or just a good idea. Reach the bureau directly.</p>
            <div className="ct-dir">
              {DIRECTORY.map((d) => (
                <a className="ct-dir-row" key={d.tag} href={d.href} target={d.ext ? '_blank' : undefined} rel="noreferrer">
                  <span className="ct-dir-tag">{d.tag}</span>
                  <span className="ct-dir-value serif">{d.value}</span>
                  <span className="ct-dir-note">{d.note}</span>
                </a>
              ))}
            </div>
            <div className="ct-socials">
              {SOCIALS.map(([s, h]) => <a key={s} href={h} target="_blank" rel="noreferrer">{s}</a>)}
            </div>
          </div>

          <form className="ct-form" onSubmit={(e) => e.preventDefault()}>
            <span className="ct-form-h">Send a message</span>
            <label>Name<input type="text" placeholder="Your name" /></label>
            <label>Email<input type="email" placeholder="your@email.com" /></label>
            <label>Organisation<input type="text" placeholder="Optional" /></label>
            <label>Message<textarea rows="5" placeholder="How can we help?" /></label>
            <button type="submit" className="btn btn-primary">Send message</button>
            <p className="ct-form-note">We typically reply within two working days.</p>
          </form>
        </div>
      </main>
      <CtaBand />
      <Footer />
      <style>{css}</style>
    </>
  )
}

const css = `
.pad-top{padding-top:74px}
.accent{color:var(--ink)}
.ct{padding:90px 0 var(--sec)}
.ct-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:64px;align-items:start}
.ct-left h1{font-size:clamp(44px,6vw,86px);margin:14px 0 0}
.ct-sub{color:var(--soft);font-size:18px;margin:18px 0 40px;max-width:420px;line-height:1.55}
.ct-dir{border-top:1px solid var(--ink)}
.ct-dir-row{display:grid;grid-template-columns:160px 1fr;grid-auto-rows:min-content;gap:2px 20px;padding:22px 4px;border-bottom:1px solid var(--rule);transition:padding .3s var(--ease),background .25s}
.ct-dir-row:hover{padding-left:14px;background:var(--cream)}
.ct-dir-tag{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink);grid-row:1/3;align-self:center}
.ct-dir-value{font-size:22px}
.ct-dir-note{font-size:13.5px;color:var(--soft)}
.ct-socials{display:flex;gap:18px;margin-top:34px;flex-wrap:wrap}
.ct-socials a{font-size:14px;font-weight:600;color:var(--soft)}
.ct-socials a:hover{color:var(--ink)}

.ct-form{background:var(--cream);border:1px solid var(--rule);border-radius:14px;padding:36px 34px;display:flex;flex-direction:column;gap:16px}
.ct-form-h{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--soft)}
.ct-form label{display:flex;flex-direction:column;gap:7px;font-size:13px;font-weight:600;color:var(--ink)}
.ct-form input,.ct-form textarea{font-family:inherit;font-size:15px;padding:13px 14px;border:1px solid var(--rule);border-radius:6px;background:#fff;color:var(--ink);outline:none;resize:vertical}
.ct-form input:focus,.ct-form textarea:focus{border-color:var(--ink)}
.ct-form .btn{margin-top:6px;justify-content:center}
.ct-form-note{font-size:12.5px;color:var(--soft);text-align:center}
@media(max-width:820px){.ct-grid{grid-template-columns:1fr;gap:44px}.ct-left,.ct-right{min-width:0}}
@media(max-width:560px){.ct-dir-row{grid-template-columns:1fr;gap:4px}.ct-dir-value{overflow-wrap:anywhere}}
`
