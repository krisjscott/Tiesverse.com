import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Brands() {
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top brwip">
        <div className="container">
          <section className="brwip-card">
            <span className="brwip-badge"><i className="brwip-dot" />Work in progress</span>
            <h1 className="serif">This wing is being built.</h1>
            <p className="brwip-sub">
              Our house of brands is getting a new home. We’re crafting it with the same
              care as everything else at Tiesverse. It’ll be worth the wait. Check back soon.
            </p>
            <div className="brwip-bar"><span /></div>
            <div className="brwip-actions">
              <Link className="btn btn-primary" to="/">Back to home</Link>
              <Link className="btn btn-outline" to="/newsroom">See our work</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <style>{css}</style>
    </>
  )
}

const css = `
.pad-top{padding-top:74px}
.brwip{min-height:72vh;display:flex;align-items:center;padding:80px 0}
.brwip .container{display:flex;justify-content:center}
.brwip-card{max-width:620px;text-align:center}
.brwip-badge{display:inline-flex;align-items:center;gap:9px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);background:#fff;border:1px solid var(--rule);border-radius:30px;padding:8px 16px}
.brwip-dot{width:8px;height:8px;border-radius:50%;background:var(--ink);box-shadow:0 0 0 0 rgba(254,122,0,.55);animation:brwipPulse 1.8s infinite}
@keyframes brwipPulse{0%{box-shadow:0 0 0 0 rgba(254,122,0,.5)}70%{box-shadow:0 0 0 8px rgba(254,122,0,0)}100%{box-shadow:0 0 0 0 rgba(254,122,0,0)}}
.brwip-card h1{font-size:clamp(38px,5.4vw,72px);line-height:1.04;margin:24px 0 0}
.brwip-sub{color:var(--soft);font-size:18px;line-height:1.65;margin:20px auto 0;max-width:520px}
.brwip-bar{width:220px;height:6px;border-radius:6px;background:var(--cream);margin:34px auto 0;overflow:hidden}
.brwip-bar span{display:block;height:100%;width:45%;border-radius:6px;background:linear-gradient(90deg,#c9bdab,#a99d88);animation:brwipBar 2.2s ease-in-out infinite}
@keyframes brwipBar{0%{transform:translateX(-120%)}100%{transform:translateX(320%)}}
.brwip-actions{display:flex;gap:13px;justify-content:center;margin-top:38px;flex-wrap:wrap}
@media(prefers-reduced-motion:reduce){.brwip-dot,.brwip-bar span{animation:none}.brwip-bar span{width:100%}}
`
