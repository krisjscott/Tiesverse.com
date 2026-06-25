import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import { ImgPlaceholder } from '../components/ImgPlaceholder'
import { WORK, MAPS, MAP_IMAGES } from '../data/site'
import { fetchArticles } from '../apiClient'

const COLORS = ['#FE7A00', '#16A34A', '#00B4D8', '#9B26FF', '#E0A400', '#FF007F']

// Normalize a Supabase article row to the shape the components expect
const toWorkShape = (a) => ({
  t: a.title, cat: a.cat || a.topic, img: null, cover_url: a.cover_url, slug: a.slug,
})

const Cover = ({ i, label, img, cover_url }) => {
  const src = cover_url || (img ? `/work/${img}` : null)
  if (src) return <span className="nw-cover nw-cover-photo"><img src={src} alt={label} /></span>
  const c = COLORS[i % COLORS.length]
  return (
    <span className="nw-cover" style={{ '--bc': c }}>
      <span className="nw-cover-tag">{label}</span>
      <span className="nw-cover-brand">.ties</span>
    </span>
  )
}

export default function Newsroom() {
  const [articles, setArticles] = useState(WORK.map(toWorkShape))
  useEffect(() => {
    fetchArticles().then((live) => {
      if (live && live.length) setArticles(live.map(toWorkShape))
    })
  }, [])
  const featured = articles[0]
  const rest = articles.slice(1)
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top nw">
        <div className="container">
          <header className="nw-head">
            <span className="eyebrow accent">Insights</span>
            <h1 className="serif">Insights on geopolitics,<br />markets <span className="ital">and the world to come.</span></h1>
          </header>

          <article className="nw-featured">
            <div className="nw-featured-copy">
              <span className="nw-date">{featured.cat}</span>
              <h2 className="serif">{featured.t}</h2>
              <p>Original analysis from across the house: research-driven, sharply made, built to be understood.</p>
              <a className="btn btn-primary" href="#">Read more</a>
            </div>
            <div className="nw-featured-cover"><Cover i={0} label={featured.cat} img={featured.img} cover_url={featured.cover_url} /></div>
          </article>

          <div className="nw-grid">
            {rest.map((p, i) => (
              <a className="nw-card" href="#" key={i} style={{ '--bc': COLORS[(i + 1) % COLORS.length] }}>
                <Cover i={i + 1} label={p.cat} img={p.img} cover_url={p.cover_url} />
                <span className="nw-date">{p.cat}</span>
                <h3 className="serif">{p.t}</h3>
              </a>
            ))}
          </div>

          {/* Map illustrations: signature content */}
          <section className="nw-maps">
            <div className="nw-maps-head"><span className="eyebrow accent">Signature</span><h2 className="serif">Map illustrations</h2><p>Geopolitics, drawn: the format that built our following.</p></div>
            <div className="nw-maps-grid">
              {MAPS.map((m, i) => (
                <a className="nw-map" href="#" key={i}>
                  {MAP_IMAGES[m]
                    ? <img className="nw-map-img" src={`/work/${MAP_IMAGES[m]}`} alt={m} />
                    : <ImgPlaceholder label="Map illustration" size="1080×1350" ratio="3 / 4" />}
                  <span className="nw-map-title">{m}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <CtaBand />
      <Footer />
      <style>{css}</style>
    </>
  )
}

const css = `
.pad-top{padding-top:74px}.accent{color:var(--ink)}
.nw{padding:70px 0 var(--sec)}
.nw-head{padding:30px 0 40px;border-bottom:1px solid var(--rule)}
.nw-head h1{font-size:clamp(36px,5vw,72px);margin-top:16px}
.nw-date{font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--soft)}

.nw-featured{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;padding:56px 0;border-bottom:1px solid var(--rule)}
.nw-featured-copy h2{font-size:clamp(28px,3.4vw,44px);margin:14px 0 16px;line-height:1.04}
.nw-featured-copy p{color:var(--soft);font-size:17px;line-height:1.6;margin-bottom:26px;max-width:460px}
.nw-featured-cover{justify-self:end;width:100%;max-width:420px}
@media(max-width:820px){.nw-featured{grid-template-columns:1fr;gap:30px}}

.nw-cover{position:relative;display:flex;flex-direction:column;justify-content:space-between;aspect-ratio:3/4;width:100%;border-radius:10px;padding:22px;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--bc) 26%,#fff),color-mix(in srgb,var(--bc) 8%,#fff));border:1px solid var(--rule)}
.nw-cover-tag{align-self:flex-start;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#fff;background:var(--bc);padding:5px 10px;border-radius:20px}
.nw-cover-brand{font-family:var(--sans);font-weight:800;font-size:20px;color:var(--ink)}
.nw-cover-brand::first-letter{color:var(--bc)}
.nw-cover-photo{padding:0;background:none;border:1px solid var(--rule)}
.nw-cover-photo img{width:100%;height:100%;object-fit:cover;display:block}
.nw-map-img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:8px;margin-bottom:12px;display:block}

.nw-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:36px 24px;padding:56px 0}
.nw-card .nw-cover{aspect-ratio:3/4;margin-bottom:16px}
.nw-card{display:block;transition:transform .25s}
.nw-card:hover{transform:translateY(-4px)}
.nw-card h3{font-size:21px;line-height:1.2;margin-top:8px}
.nw-card:hover h3{color:var(--bc)}
@media(max-width:900px){.nw-grid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.nw-grid{grid-template-columns:1fr}}

.nw-maps{border-top:1px solid var(--rule);padding-top:56px}
.nw-maps-head{margin-bottom:30px}
.nw-maps-head h2{font-size:clamp(28px,3.6vw,46px);margin:12px 0 10px}
.nw-maps-head p{color:var(--soft);font-size:16px}
.nw-maps-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.nw-map{display:block;transition:transform .25s}
.nw-map:hover{transform:translateY(-4px)}
.nw-map .imgph{width:100%;margin-bottom:12px;border-radius:8px}
.nw-map-title{font-family:var(--serif);font-size:17px;line-height:1.25}
.nw-map:hover .nw-map-title{color:var(--ink)}
@media(max-width:900px){.nw-maps-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.nw-maps-grid{grid-template-columns:1fr}}
`
