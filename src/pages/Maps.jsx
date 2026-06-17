import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import { ImgPlaceholder } from '../components/ImgPlaceholder'
import { MAPS, MAP_IMAGES, MAP_LINKS } from '../data/site'

// One pin in the masonry feed. Links to MAP_LINKS[title] (external or internal),
// falling back to the newsroom until a specific destination is set.
function MapPin({ title }) {
  const [ok, setOk] = React.useState(Boolean(MAP_IMAGES[title]))
  const dest = MAP_LINKS[title] || '/newsroom'
  const external = /^https?:/.test(dest)
  const media = ok && MAP_IMAGES[title]
    ? <img className="mp-img" src={`/work/${MAP_IMAGES[title]}`} alt={title} loading="lazy" onError={() => setOk(false)} />
    : <ImgPlaceholder className="mp-ph" label="Map illustration" size="1080×1350" ratio="4 / 5" />
  const inner = (
    <>
      {media}
      <span className="mp-scrim" aria-hidden />
      <span className="mp-title">{title}</span>
    </>
  )
  return external
    ? <a className="mp-card" href={dest} target="_blank" rel="noreferrer">{inner}</a>
    : <Link className="mp-card" to={dest}>{inner}</Link>
}

export default function Maps() {
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top mp">
        <div className="container">
          <header className="mp-head">
            <h1 className="serif">Map illustrations.</h1>
            <p className="mp-sub">Geopolitics, drawn. The format that built our following: complex systems made legible in a single frame. Tap any map to read the story behind it.</p>
          </header>
          <div className="mp-feed">
            {MAPS.map((m) => <MapPin title={m} key={m} />)}
          </div>
        </div>
      </main>
      <CtaBand />
      <Footer />
      <style>{`
        .pad-top{padding-top:74px}
        .mp{padding:90px 0 var(--sec)}
        .mp .container{max-width:1320px}
        .mp-head{max-width:760px;margin-bottom:48px}
        .mp-head h1{font-size:clamp(38px,5.4vw,76px);line-height:1.02}
        .mp-sub{color:var(--soft);font-size:18px;line-height:1.6;margin-top:18px}
        /* Pinterest-style masonry via CSS columns */
        .mp-feed{column-count:4;column-gap:18px}
        .mp-card{position:relative;display:block;break-inside:avoid;margin:0 0 18px;border-radius:14px;overflow:hidden;background:var(--cream);transition:transform .3s var(--ease),box-shadow .3s}
        .mp-card:hover{transform:translateY(-4px);box-shadow:0 22px 44px rgba(70,40,0,.14)}
        .mp-img{width:100%;display:block}
        .mp-ph{width:100%;display:block}
        .mp-scrim{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(12,11,8,.78) 100%);opacity:0;transition:opacity .25s}
        .mp-card:hover .mp-scrim{opacity:1}
        .mp-title{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:16px 16px 15px;font-family:var(--serif);font-size:17px;line-height:1.2;color:#fff;opacity:0;transform:translateY(6px);transition:opacity .25s,transform .25s}
        .mp-card:hover .mp-title{opacity:1;transform:none}
        @media(max-width:1100px){.mp-feed{column-count:3}}
        @media(max-width:720px){.mp-feed{column-count:2;column-gap:14px}.mp-card{margin-bottom:14px}}
        @media(max-width:420px){.mp-feed{column-count:1}}
      `}</style>
    </>
  )
}
