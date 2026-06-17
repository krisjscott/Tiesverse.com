import React from 'react'
import { Link } from 'react-router-dom'
import { ImgBg } from './ImgPlaceholder'
import { CAREERS_URL } from '../data/site'

// Shared closing CTA: appears above the footer on every page (uniformity).
export default function CtaBand() {
  return (
    <section className="cta-band">
      <ImgBg src="/work/cta-backdrop.png" label="CTA illustration: 1920×900, warm dusk / India motif" />
      <div className="container cta-band-inner">
        <h2 className="serif">The new standard for how<br />India <span className="ital cta-band-ital">reads the world</span> and<br />the world <span className="ital cta-band-ital">reads about India.</span></h2>
        <p>Subscribe to the network, follow along, or come build it with us.</p>
        <div className="cta-band-btns">
          <Link className="btn btn-light" to="/newsroom">Subscribe free</Link>
          <a className="btn btn-ghost-dark" href="https://www.instagram.com/ties.in/" target="_blank" rel="noreferrer">Follow @ties.in</a>
          <Link className="btn btn-ghost-dark" to="/careers">Join the team</Link>
        </div>
      </div>
      <style>{`
        .cta-band{position:relative;background:var(--dark);color:#fff;text-align:center;padding:130px 0;overflow:hidden}
        .cta-band-inner{position:relative;z-index:2;max-width:1120px}
        .cta-band-inner h2{font-size:clamp(32px,5vw,68px);color:#fff;line-height:1.08}
        .cta-band-ital{color:#fff}
        .cta-band-inner p{color:rgba(255,255,255,.88);font-size:18px;margin:20px 0 34px}
        .cta-band-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
      `}</style>
    </section>
  )
}
