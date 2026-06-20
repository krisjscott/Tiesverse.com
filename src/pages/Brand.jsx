import React, { useEffect, useRef } from 'react'
import Nav, { Wordmark } from '../components/Nav'
import Footer from '../components/Footer'
import { ImgPlaceholder } from '../components/ImgPlaceholder'

const LEGEND = [
  ['Observatory', 'Research'],
  ['River', 'Media'],
  ['Archive', 'Knowledge'],
  ['Tower', 'Foresight'],
  ['Constellation', 'Connection'],
]

const SYMBOLS = [
  { sym: 'Observatory', maps: 'Research', dim: '1000 × 1250', c: '#B8742A',
    d: 'The instrument of the patient mind: stone shaped precisely enough to hold the sky still. It asks the first question every researcher asks: what is actually happening, beneath what we are told?',
    use: 'Research, reports, deep analysis: anything that begins with a question.',
    never: 'Never a temple or a figure at prayer. The structure is the character, not the worshipper.' },
  { sym: 'River', maps: 'Media', dim: '1000 × 1250', c: '#A8472B',
    d: 'Knowledge is born at the observatory and dies there unless it moves. The river carries it outward; along its banks rise cities, ports and towers, the proof that understanding became reach.',
    use: 'Media, distribution, anything about scale and the spread of an idea.',
    never: 'Never a camera, microphone or film reel. We show the flow, not the equipment.' },
  { sym: 'Archive', maps: 'Knowledge', dim: '1000 × 1250', c: '#846328',
    d: 'A civilization is only as deep as what it bothered to write down. Maps, measurements, charts: the memory we keep so the next mind begins where we ended.',
    use: 'Knowledge bases, briefs, the long record, anything cumulative.',
    never: 'Never decorative manuscripts as costume. The archive is working memory, not antiquity.' },
  { sym: 'Tower', maps: 'Foresight', dim: '1000 × 1250', c: '#93431F',
    d: 'Built for a single purpose: to see further than the valley allows. The habit of looking ahead while others look around. Where the next thing is seen first, and named.',
    use: 'Forecasting, strategy, predictions, the view over the horizon.',
    never: 'Never a fortress or a weapon. The tower watches; it does not threaten.' },
  { sym: 'Constellation', maps: 'Connection', dim: '1000 × 1250', c: '#234A5C',
    d: 'Stars are only points until a mind draws the lines. The work of meaning itself: joining an election here to a war there, a market to a monsoon, until the scattered world reads as one story.',
    use: 'Connections, networks, the lines between events: covers and social geometry.',
    never: 'Never a generic tech “network” of glowing nodes. These are stars, not servers.' },
]

const MOOD = [
  'Vast sky at dusk', 'Observatory instrument · detail', 'Endless valley in haze', 'Old chart / measurement',
  'Sandstone monolith', 'River through a city', 'Navigation instrument', 'Tower over the valley',
]

const FORMULAS = [
  { k: 'Research', subject: 'An observatory or instrument emerging from the land', palette: 'Terracotta + saffron', light: 'A single low sun', comp: '70% atmosphere, monumental mass', forbidden: 'Cyberpunk · blue UI · holograms · people at prayer' },
  { k: 'Media', subject: 'A luminous river of ideas; cities, ports and towers on its banks', palette: 'Saffron + sandstone', light: 'Dawn haze', comp: 'Movement across the frame', forbidden: 'Cameras · microphones · film reels' },
  { k: 'Technology', subject: 'A Jantar Mantar built today: ancient geometry as impossible architecture', palette: 'Sandstone + ember', light: 'Hard golden rim-light', comp: 'Stone and intelligence fused', forbidden: 'Circuits · glowing screens · robot/AI brains' },
]

const SWATCHES = [
  { name: 'Saffron', meaning: 'The will to understand', use: 'The one raised voice: actions, the dot, the live signal', hex: '#FE7A00', fg: '#fff' },
  { name: 'Ember', meaning: 'Heat, held', use: 'Pressed and hovered states', hex: '#E56D00', fg: '#fff' },
  { name: 'Ink', meaning: 'The weight of the record', use: 'Primary text, the wordmark body', hex: '#1D160D', fg: '#fff' },
  { name: 'Night', meaning: 'The observatory after dark', use: 'Dark surfaces, statement bands', hex: '#15140F', fg: '#fff' },
  { name: 'Paper', meaning: 'Sandstone, sunlit', use: 'The base every page sits on', hex: '#FFFAF2', fg: '#1d160d' },
  { name: 'Cream', meaning: 'Sandstone, in shade', use: 'Raised cards and surfaces', hex: '#FFF3E3', fg: '#1d160d' },
]

const VOICE_USE = ['understanding', 'systems', 'institutions', 'civilization', 'strategy', 'intelligence', 'foresight', 'decode', 'read the world']
const VOICE_AVOID = ['disruption', 'revolution', 'game-changing', 'world-class', 'cutting-edge', 'synergy', 'unlock', 'next-gen']

const COVERS = ['insight-ai-wars.webp', 'insight-pax-silica.webp', 'strait-of-hormuz.webp', 'mother-of-all-deals.webp', 'insight-unesco.webp', 'insight-budget-2026.webp']
const FUTURE = ['Research', 'Media', 'Technology', 'Education', 'Events']

const FUNCTIONS = [
  ['To observe', 'Observatory'],
  ['To remember', 'Archive'],
  ['To communicate', 'River'],
  ['To anticipate', 'Tower'],
  ['To connect', 'Constellation'],
]
const TIMELINE = ['Ancient skywatchers', 'Observatories', 'Maps', 'Libraries', 'Printing press', 'Broadcast', 'Internet', 'AI', 'Tiesverse']
const FAILURES = [
  { k: 'Research', items: ['A person at a laptop', 'An AI “brain”', 'A hologram', 'A stock-photo analyst'] },
  { k: 'Media', items: ['A podcast microphone', 'A camera lens', 'A film reel'] },
  { k: 'Technology', items: ['Blue circuitry', 'A robot', 'A neural-network diagram'] },
]

// real image if present in /work, else the labelled placeholder
function Asset({ file, label, className, ratio, dark, fill }) {
  const [ok, setOk] = React.useState(true)
  if (ok) return <img className={className} src={`/work/${file}`} alt={label || ''} onError={() => setOk(false)} />
  return <ImgPlaceholder label={label} ratio={ratio} dark={dark} fill={fill} />
}

export default function Brand() {
  const wmRef = useRef(null)
  useEffect(() => {
    const el = wmRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('brx-wm-band-in'); io.disconnect() } })
    }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top brx">
        {/* founding principle: the opening */}
        <section className="brx-founding">
          <div className="container">
            <h2 className="serif">Understanding is a civilizational act.</h2>
            <p className="brx-founding-sub">Not a brand guide. An operating manual for a civilization that studies the world: how we think, write, draw, move and build.</p>
          </div>
        </section>

        {/* establishing banner */}
        <section className="brx-band brx-zoom">
          <Asset file="brand-establishing.webp" className="brx-fill" label="Brand establishing shot: observatory at dawn, lone scale, saffron haze (1920×900)" dark fill />
        </section>

        {/* manifesto */}
        <section className="container brx-prose">
          <p className="brx-lead">Every civilization that endured began the same way. It learned to read the sky.</p>
          <p>Babylon charted the stars to know when the rivers would rise. In Jaipur, kings carved instruments from stone large enough to catch the turning of the heavens. The pattern has never changed: power belongs to those who understand the world a moment before everyone else does. Tiesverse is built on that one ancient advantage: the will to study the world, and the nerve to say plainly what we find.</p>
        </section>

        {/* THE WORLD OF TIES: visual universe */}
        <section className="container brx-block brx-universe">
          <div className="brx-prose"><h2 className="serif">The world of Tiesverse</h2>
            <p>One landscape holds the whole brand. An observatory reads the sky; a river carries what it learns past cities and towers; an archive keeps the record; a tower watches the horizon; constellations draw the lines between. Every image we ever make is a corner of this single world.</p>
          </div>
          <div className="brx-universe-grid">
            <div className="brx-zoom brx-universe-map"><Asset file="brand-universe-map.webp" className="brx-fill" label="The world of Tiesverse, one map: observatory · river · archive · tower · constellation (1440×900)" dark fill /></div>
            <ul className="brx-legend">
              {LEGEND.map(([s, m]) => (
                <li key={s}><strong>{s}</strong><span>{m}</span></li>
              ))}
            </ul>
          </div>
        </section>

        {/* built for bharat */}
        <section className="brx-feature brx-zoom">
          <Asset file="brand-bharat.webp" className="brx-fill" label="Built for Bharat: wide hero, monumental sandstone at dusk (1920×640)" dark fill />
          <div className="brx-feature-cap"><h2 className="serif">Built for Bharat.</h2></div>
        </section>

        {/* thesis */}
        <section className="container brx-prose brx-thesis">
          <h2 className="serif">Civilizations that study the world.</h2>
          <p>This is not a brand about ancient India. It is a brand about the oldest instinct there is: to look up, to measure, to map, to know. India is our ground, never our subject. We draw observatories, not temples; rivers, not gods; the act of understanding, never the costume of the past.</p>
          <div className="brx-thesis-img brx-zoom"><ImgPlaceholder label="A Jantar Mantar built today: ancient geometry as impossible architecture (1280×760)" ratio="16 / 9" /></div>
        </section>

        {/* why we look different */}
        <section className="container brx-block brx-prose">
          <h2 className="serif">Why we look different.</h2>
          <p>We do not look like a technology company, and that is deliberate. Technology changes every decade; civilizations endure for centuries. So we borrow our visual language from the institutions that survive longest: observatories, archives, maps, rivers, cities. That is why our imagery looks ancient and futuristic at once. The day it begins to look like a tech startup (circuits, glow, gradients-as-product) it is wrong.</p>
        </section>

        {/* FIVE SIGNS */}
        <section className="container brx-block brx-symbols">
          <div className="brx-prose"><h2 className="serif">The five signs.</h2>
            <p>Before maps existed, before nations, before institutions, every civilization that endured learned to do five things: to observe, to remember, to communicate, to anticipate, to connect. The five signs are not symbols we invented. They are functions: the oldest work a thinking society performs. That is why the system feels inevitable, not designed.</p>
          </div>
          <div className="brx-functions">
            {FUNCTIONS.map(([fn, s]) => (
              <div className="brx-function" key={s}><span className="brx-function-fn">{fn}</span><strong>{s}</strong></div>
            ))}
          </div>
          <div className="brx-prose brx-symbols-sub"><p>A logo is recognised; a world is remembered. Wherever Tiesverse appears, at least one of these is present. Learn them, and you will know our work before you ever see our name.</p></div>
        </section>
        <section className="brx-signs-band">
          {SYMBOLS.map((s) => (
            <article className="sign-card" key={s.sym} style={{ '--c': s.c }}>
              <div className="sign-img"><Asset file={`sign-${s.sym.toLowerCase()}.webp`} className="brx-fill" label={`${s.sym} (${s.maps}): ${s.dim}`} /></div>
              <div className="sign-panel">
                <h3 className="sign-name">{s.sym}</h3>
                <span className="sign-maps">{s.maps}</span>
                <p className="sign-desc">{s.d}</p>
                <p className="sign-rule"><b>Use for</b> {s.use}</p>
                <p className="sign-rule"><b>Never</b> {s.never}</p>
              </div>
              <div className="sign-strip">
                {[88, 70, 52, 34, 18].map((o) => <i key={o} style={{ background: `color-mix(in srgb, var(--c) ${o}%, #fff)` }} />)}
              </div>
            </article>
          ))}
        </section>

        {/* evolution timeline */}
        <section className="container brx-block">
          <div className="brx-prose"><h2 className="serif">The evolution of understanding.</h2>
            <p>We are the latest instrument in a line that runs back to the first people who looked up and kept a record. Every step below is the same impulse, to read the world, fitted with a better tool. Tiesverse is not a break from that history. It is its continuation.</p>
          </div>
          <ol className="brx-timeline">
            {TIMELINE.map((t, i) => (
              <li className={`brx-tl-step ${i % 2 === 0 ? 'up' : 'down'} ${i === TIMELINE.length - 1 ? 'on' : ''}`} key={t}>
                <span className="brx-tl-node" aria-hidden />
                <span className="brx-tl-label">{t}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* moodboard */}
        <section className="container brx-block brx-mood-sec">
          <div className="brx-prose"><h2 className="serif">The world it lives in.</h2>
            <p>Build only from these, and nothing breaks. Knowledge, scale, curiosity, civilization: observatories and maps, vast skies and endless valleys, instruments and archives, rivers and trade routes and towers. The vocabulary is narrow on purpose. A narrow world is a recognisable one.</p>
          </div>
          <div className="brx-moodboard brx-zoom"><Asset file="moodboard.webp" className="brx-moodboard-img" ratio="1 / 1" label="The world it lives in: moodboard (1600×1600)" /></div>
        </section>

        {/* statement */}
        <section className="brx-statement">
          <div className="brx-statement-glow" aria-hidden />
          <h2 className="serif">This is old,<br />and it is the future.</h2>
        </section>

        {/* PROMPT ARCHITECTURE */}
        <section className="container brx-block">
          <div className="brx-prose"><h2 className="serif">Prompt architecture</h2>
            <p className="brx-lead">Every image must feel as if it were commissioned by a civilization that has spent centuries trying to understand the world.</p>
            <p>Hold that one sentence and the rest follows. Each pillar still has a formula (keep the constants of warm palette, single sun, scale, painterly matte, and vary only the subject), but the sentence above decides every call the formula doesn't.</p>
          </div>
          <div className="brx-formulas">
            {FORMULAS.map((f) => (
              <div className="brx-formula" key={f.k}>
                <h3 className="serif">{f.k}</h3>
                <dl>
                  <div><dt>Subject</dt><dd>{f.subject}</dd></div>
                  <div><dt>Palette</dt><dd>{f.palette}</dd></div>
                  <div><dt>Light</dt><dd>{f.light}</dd></div>
                  <div><dt>Composition</dt><dd>{f.comp}</dd></div>
                  <div><dt>Forbidden</dt><dd className="brx-forbidden">{f.forbidden}</dd></div>
                </dl>
                <div className="brx-formula-strip"><ImgPlaceholder label="Indian architecture pattern (1200×140)" size="1200×140" dark fill /></div>
              </div>
            ))}
          </div>
        </section>

        {/* failure modes */}
        <section className="container brx-block">
          <div className="brx-prose"><h2 className="serif">Failure modes.</h2>
            <p>The fastest way to protect a world is to name what would break it. If an image reaches for any of these, it has left the civilization and joined the stock library. Make none of them.</p>
          </div>
          <div className="brx-failures">
            {FAILURES.map((f) => (
              <div className="brx-failure" key={f.k}>
                <h3 className="serif">{f.k}</h3>
                <ul>{f.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* wordmark */}
        <section className="container brx-block brx-prose">
          <h2 className="serif">The wordmark</h2>
          <p>A full stop that opens instead of ends. <span className="brx-wm-inline"><Wordmark /></span> is set in the plainest modern letters we could find, because the idea needs no decoration. The leading dot is a domain and a declaration at once; saffron falls only on the dot and on “verse,” the part that means a world. Ink holds the rest. Small, lowercase, certain.</p>
          <div className="brx-wm-stage"><Wordmark /></div>
        </section>

        {/* colour */}
        <section className="container brx-block">
          <div className="brx-prose"><h2 className="serif">Colour</h2>
            <p>These are not swatches; they are the emotional states of the civilization. One warm light does all the pointing: saffron is the sun, and the only colour permitted to raise its voice. Ink and night carry the weight; sandstone paper carries everything else.</p>
          </div>
          <div className="brx-swatches">
            {SWATCHES.map((s) => (
              <div className="brx-swatch" key={s.name} style={{ background: s.hex, color: s.fg }}>
                <strong>{s.name}</strong>
                <span className="brx-swatch-mean">{s.meaning}</span>
                <span className="brx-swatch-use">{s.use}</span>
                <span className="brx-swatch-hex">{s.hex}</span>
              </div>
            ))}
          </div>
        </section>

        {/* typography */}
        <section className="container brx-block">
          <div className="brx-prose"><h2 className="serif">Typography</h2>
            <p>Two voices, centuries apart, in agreement. Fraunces, a serif with the high contrast of an old engraving, for anything meant to be felt. Manrope, clean, geometric, modern, for anything meant to be understood. The old voice and the new, never competing for the same line.</p>
          </div>
          <div className="brx-type">
            <div className="brx-type-card"><span className="brx-type-label">Display · Fraunces</span><p className="serif brx-type-spec">The future belongs to those who understand it.</p><span className="brx-type-meta">weights 300–600 · italic</span></div>
            <div className="brx-type-card"><span className="brx-type-label">Text · Manrope</span><p className="brx-type-spec sans">Research, media &amp; technology.</p><span className="brx-type-meta">weights 400–800</span></div>
          </div>
        </section>

        {/* imagery */}
        <section className="container brx-block">
          <div className="brx-prose"><h2 className="serif">Imagery</h2>
            <p>The structure is the character. No person required, no glowing screen, no floating interface: only mass, light and distance. When an image arrives cold, we hold it in saffron until it belongs.</p>
          </div>
          <div className="brx-imgrules">
            <figure className="brx-zoom-fig"><div className="brx-zoom"><ImgPlaceholder label="One light, one grade: dusk, single sun (1280×800)" ratio="16 / 10" /></div><figcaption>One light, one grade</figcaption></figure>
            <figure className="brx-zoom-fig"><div className="brx-zoom"><ImgPlaceholder label="Scale &amp; stillness: vast structure, small life (1280×800)" ratio="16 / 10" /></div><figcaption>Scale &amp; stillness</figcaption></figure>
          </div>
        </section>

        {/* CARTOGRAPHY */}
        <section className="container brx-block">
          <div className="brx-prose"><h2 className="serif">Cartography</h2>
            <p>The world is understood through maps, and the GeoAtlas is becoming our sharpest instrument. Satellite relief, a saffron key, sparing labels: geopolitics drawn so a thirteen-year-old and a diplomat read it the same way. The map is an argument with the noise removed.</p>
          </div>
          <div className="brx-maps">
            <figure className="brx-zoom-fig"><div className="brx-zoom"><img src="/work/map-airspace.webp" alt="Division of Indian airspace" /></div><figcaption>Division of Indian airspace</figcaption></figure>
            <figure className="brx-zoom-fig"><div className="brx-zoom"><img src="/work/map-trade.webp" alt="Trade &amp; security in the Indian Ocean" /></div><figcaption>Trade &amp; security in the Indian Ocean</figcaption></figure>
          </div>
        </section>

        {/* civilization atlas: master plate */}
        <section className="container brx-block brx-prose">
          <h2 className="serif">The civilization atlas.</h2>
          <p>One master plate: maps, rivers, observatories, trade routes, measurements, cities and constellations on a single sheet, as if torn from the operating manual of a civilization. Generated once, reused everywhere: report covers, social graphics, event walls, the annual report.</p>
        </section>
        <section className="brx-band brx-zoom">
          <ImgPlaceholder label="The civilization atlas: master cartographic plate, everything on one sheet (1920×1080)" dark fill />
        </section>

        {/* PORTRAITS */}
        <section className="container brx-block">
          <div className="brx-prose"><h2 className="serif">Portraits</h2>
            <p>The people we host enter the same world. One warm key light from the side, a near-black ground, framing kept tight at 4:5. We preserve the face and grade the rest into saffron and shadow, so a guest belongs beside an observatory without ever being lit like one.</p>
          </div>
          <div className="brx-portraits">
            <figure className="brx-zoom-fig"><div className="brx-zoom"><img src="/work/guest-tharoor.webp" alt="Graded portrait example" /></div><figcaption>Graded: warm key, near-black ground, 4:5</figcaption></figure>
            <figure className="brx-zoom-fig"><div className="brx-zoom"><ImgPlaceholder label="Source portrait, before grade (1000×1250)" ratio="4 / 5" /></div><figcaption>Source, before grade</figcaption></figure>
          </div>
        </section>

        {/* MOTION */}
        <section className="container brx-block">
          <div className="brx-prose"><h2 className="serif">Motion</h2>
            <p className="brx-lead">Motion reflects thought. Ideas do not bounce. Institutions do not twitch. Civilizations do not rush.</p>
            <p>Movement should feel deliberate, inevitable and measured: the pace of something monumental. Things ease in and settle; they never spring, snap or play. If an animation feels playful, it is wrong.</p>
          </div>
          <div className="brx-spec">
            <div className="brx-spec-card"><span>Duration</span><strong>300 / 600 / 1200ms</strong><em>cards · images · sections</em></div>
            <div className="brx-spec-card"><span>Easing</span><strong>cubic-bezier(.22,1,.36,1)</strong><em>ease-out, never elastic</em></div>
            <div className="brx-spec-card"><span>Image hover</span><strong>scale 1.02 · 600ms</strong><em>alive, not obvious</em></div>
            <div className="brx-spec-card"><span>Card hover</span><strong>translateY(−4px) · 300ms</strong><em>a quiet lift</em></div>
          </div>
        </section>

        {/* VOICE */}
        <section className="container brx-block">
          <div className="brx-prose"><h2 className="serif">Voice</h2>
            <p>We write like a research institution that happens to be young: plain, certain, a little severe. We name systems and forces, not products and hype. The test: would it sound right in a brief, and wrong in a pitch deck?</p>
          </div>
          <div className="brx-voice">
            <div className="brx-voice-col brx-voice-use">
              <span className="brx-voice-h">Words we use</span>
              <div className="brx-tags">{VOICE_USE.map((w) => <span key={w}>{w}</span>)}</div>
            </div>
            <div className="brx-voice-col brx-voice-avoid">
              <span className="brx-voice-h">Words we avoid</span>
              <div className="brx-tags">{VOICE_AVOID.map((w) => <span key={w}>{w}</span>)}</div>
            </div>
          </div>
        </section>

        {/* RESEARCH COVERS */}
        <section className="container brx-block brx-apply-sec">
          <div className="brx-prose"><h2 className="serif">In application</h2>
            <p>The test of an identity is never the logo. It is the hundredth thing made with it, a report, a brief, a map, a midnight post, still unmistakably ours. The covers below were made months apart, and read as one shelf.</p>
          </div>
          <div className="brx-covers">
            {COVERS.map((c) => (<div className="brx-cover brx-zoom" key={c}><img src={`/work/${c}`} alt="Tiesverse cover" /></div>))}
          </div>
        </section>

        {/* EXPANDING */}
        <section className="container brx-block brx-expand">
          <div className="brx-prose"><h2 className="serif">Expanding the universe.</h2>
            <p>The system is built to grow. New domains will arrive, but each enters the same world, lit by the same sun, carrying at least one of the five signs. The brand is not finished. A civilization never is.</p>
          </div>
          <div className="brx-expand-row">{FUTURE.map((d) => <span className="brx-expand-pill" key={d}>{d}</span>)}</div>
        </section>

        {/* wordmark band */}
        <section className="brx-wordmark-band" ref={wmRef}>
          <span className="brx-bigwm"><b className="brx-wm-dot">.</b><span className="brx-wm-ties">ties</span><em className="brx-wm-verse">verse</em></span>
        </section>
      </main>
      <Footer />
      <style>{css}</style>
    </>
  )
}

const css = `
.pad-top{padding-top:74px}.accent{color:var(--ink)}
.brx{overflow:hidden;background:var(--paper)}
.brx .container{max-width:1240px}

/* subtle, cinematic hover */
.brx-zoom{overflow:hidden;border-radius:20px}
.brx-zoom>*,.brx-zoom .imgph,.brx-zoom img{transition:transform .6s cubic-bezier(.22,1,.36,1)}
.brx-zoom:hover .imgph,.brx-zoom:hover img,.brx-zoom:hover>*{transform:scale(1.03)}

/* hero */
.brx-hero{position:relative;text-align:center;padding:90px 0 76px;overflow:hidden}
.brx-hero-grad{position:absolute;inset:0;background:linear-gradient(180deg,#fff 0%,var(--paper) 42%,#ffd9a8 84%,var(--accent) 132%);opacity:.92}
.brx-hero-in{position:relative}
.brx-wm{margin:20px 0 0}
.brx-wm .wm{font-size:clamp(54px,10vw,128px)}
.brx-hero-sub{max-width:600px;margin:24px auto 0;color:var(--soft);font-size:18px;line-height:1.6}

/* founding principle */
.brx-founding{padding:84px 0 64px;text-align:center}
.brx-founding h2{font-size:clamp(40px,8.4vw,116px);line-height:1;max-width:15ch;margin:0 auto;letter-spacing:-.015em}
.brx-founding-sub{color:var(--soft);font-size:clamp(17px,1.8vw,20px);line-height:1.6;max-width:600px;margin:26px auto 0}

/* functions strip */
.brx-functions{display:grid;grid-template-columns:repeat(5,1fr);margin-top:48px;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.brx-function{padding:28px 18px;border-right:1px solid var(--rule)}
.brx-function:last-child{border-right:none}
.brx-function-fn{display:block;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);margin-bottom:8px}
.brx-function strong{font-family:var(--serif);font-weight:500;font-size:22px}
.brx-symbols-sub{margin-top:40px}
@media(max-width:820px){.brx-functions{grid-template-columns:1fr 1fr}.brx-function{border-bottom:1px solid var(--rule)}}

/* evolution timeline: alternating rail */
.brx-timeline{list-style:none;margin:64px 0 0;padding:0;display:flex;position:relative;height:170px}
.brx-timeline::before{content:'';position:absolute;left:0;right:0;top:50%;height:2px;transform:translateY(-1px);background:linear-gradient(90deg,var(--rule) 0%,var(--rule) 55%,var(--ink) 100%)}
.brx-tl-step{flex:1;position:relative}
.brx-tl-node{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:13px;height:13px;border-radius:50%;background:#d8c7ad;border:3px solid var(--paper);z-index:2}
.brx-tl-step.on .brx-tl-node{width:20px;height:20px;background:var(--ink);box-shadow:0 0 0 6px rgba(29,22,13,.12)}
.brx-tl-label{position:absolute;left:50%;transform:translateX(-50%);width:130px;text-align:center;font-size:13px;color:var(--soft);line-height:1.3}
.brx-tl-label::after{content:'';position:absolute;left:50%;width:1px;height:16px;background:var(--rule)}
.brx-tl-step.up .brx-tl-label{bottom:calc(50% + 24px)}
.brx-tl-step.up .brx-tl-label::after{top:100%}
.brx-tl-step.down .brx-tl-label{top:calc(50% + 24px)}
.brx-tl-step.down .brx-tl-label::after{bottom:100%}
.brx-tl-step.on .brx-tl-label{color:var(--ink);font-weight:700;font-family:var(--serif);font-size:17px}
@media(max-width:760px){
  .brx-timeline{flex-direction:column;height:auto;padding-left:8px}
  .brx-timeline::before{left:0;top:0;bottom:0;right:auto;width:2px;height:auto;background:linear-gradient(180deg,var(--rule) 0%,var(--rule) 55%,var(--ink) 100%)}
  .brx-tl-step{flex:none;width:100%;min-height:52px}
  .brx-tl-node{left:0;top:18px;transform:translate(-50%,0)}
  .brx-tl-step.on .brx-tl-node{left:0}
  .brx-tl-label{position:static;transform:none;width:auto;text-align:left;padding:12px 0 0 28px}
  .brx-tl-label::after{display:none}
}

/* failure modes */
.brx-failures{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:48px}
.brx-failure{border:1px solid var(--rule);border-radius:20px;padding:28px;background:#fffdf8}
.brx-failure h3{font-family:var(--serif);font-weight:500;font-size:22px;margin-bottom:14px}
.brx-failure ul{list-style:none;margin:0;padding:0}
.brx-failure li{display:flex;gap:11px;align-items:flex-start;padding:8px 0;font-size:14.5px;color:var(--soft)}
.brx-failure li::before{content:'✕';color:#c0392b;font-weight:700;flex:none}
@media(max-width:820px){.brx-failures{grid-template-columns:1fr}}

/* real-image fills */
.brx-fill{width:100%;height:100%;object-fit:cover;display:block}
.brx-sign-img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:20px;display:block}
.brx-moodboard{position:relative;left:50%;transform:translateX(-50%);width:calc(100vw - 80px);max-width:1500px;margin:48px 0 0}
.brx-moodboard-img{width:100%;aspect-ratio:16/9;object-fit:cover;object-position:center;display:block}
@media(max-width:600px){.brx-moodboard{width:calc(100vw - 44px)}.brx-moodboard-img{aspect-ratio:4/3}}

/* full-bleed bands */
.brx-band{position:relative;height:clamp(380px,58vh,620px);border-radius:0}
.brx-band .imgph{width:100%;height:100%;border-radius:0}

/* prose */
.brx-prose{max-width:860px;margin:0 auto}
.brx-prose h2{font-size:clamp(32px,4.2vw,56px);line-height:1.04;margin-bottom:24px}
.brx-prose p{color:var(--ink);font-size:19px;line-height:1.72;margin-bottom:18px}
.brx-prose p:last-child{margin-bottom:0}
.brx-lead{font-family:var(--serif);font-size:clamp(26px,3.2vw,38px)!important;line-height:1.28!important}

.brx-block{padding:150px 0 0}
.container.brx-prose{padding-top:150px}

/* universe */
.brx-universe-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:40px;align-items:center;margin-top:48px}
.brx-universe-map{height:100%;min-height:420px}
.brx-universe-map .imgph{width:100%;height:100%;border-radius:0}
.brx-legend{list-style:none;display:flex;flex-direction:column;gap:0}
.brx-legend li{display:flex;justify-content:space-between;align-items:baseline;gap:20px;padding:20px 0;border-bottom:1px solid var(--rule)}
.brx-legend li:last-child{border-bottom:none}
.brx-legend strong{font-family:var(--serif);font-weight:500;font-size:26px}
.brx-legend span{color:var(--ink);font-size:14px;font-weight:600;letter-spacing:.02em}
@media(max-width:860px){.brx-universe-grid{grid-template-columns:1fr}.brx-universe-map{min-height:300px}}

/* built for bharat */
.brx-feature{position:relative;height:clamp(340px,48vh,540px);margin-top:150px;border-radius:0}
.brx-feature .imgph{width:100%;height:100%;border-radius:0}
.brx-feature-cap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}
.brx-feature-cap h2{color:#fff;font-size:clamp(40px,7vw,84px);text-shadow:0 2px 30px rgba(0,0,0,.45)}

/* thesis */
.brx-thesis-img{margin-top:44px}
.brx-thesis-img .imgph{width:100%;border-radius:24px}

/* five signs */
/* five signs: palette-card band */
.brx-signs-band{display:grid;grid-template-columns:repeat(5,1fr);width:100%;margin-top:50px}
.sign-card{display:flex;flex-direction:column;background:var(--c);color:#fff;min-width:0}
.sign-img{aspect-ratio:3/4;overflow:hidden}
.sign-img img,.sign-img .imgph{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.22,1,.36,1)}
.sign-card:hover .sign-img img{transform:scale(1.05)}
.sign-panel{flex:1;padding:28px 24px 24px}
.sign-name{font-family:var(--serif);font-weight:500;font-size:30px;line-height:1;color:#fff;margin-bottom:7px}
.sign-maps{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.72)}
.sign-desc{font-size:13.5px;line-height:1.55;margin:18px 0 16px;color:rgba(255,255,255,.94)}
.sign-rule{font-size:12.5px;line-height:1.5;color:rgba(255,255,255,.82);margin-top:10px}
.sign-rule b{display:block;color:#fff;font-weight:700;letter-spacing:.02em}
.sign-strip{display:flex;height:16px}
.sign-strip i{flex:1}
@media(max-width:1000px){.brx-signs-band{grid-template-columns:1fr 1fr 1fr}}
@media(max-width:620px){.brx-signs-band{grid-template-columns:1fr 1fr}}

/* moodboard */
.brx-mood{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
.brx-mood-tile .imgph{width:100%;border-radius:16px}
@media(max-width:820px){.brx-mood{grid-template-columns:repeat(2,1fr)}}

/* statement */
.brx-statement{position:relative;overflow:hidden;background:var(--dark);text-align:center;padding:150px 24px;margin-top:150px}
.brx-statement-glow{position:absolute;inset:0;background:radial-gradient(55% 110% at 50% 120%,rgba(254,122,0,.45),transparent 70%)}
.brx-statement h2{position:relative;color:#fff;font-size:clamp(40px,6.6vw,90px);line-height:1.03}

/* prompt architecture */
.brx-formulas{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:48px}
.brx-formula{background:var(--dark);color:var(--on-dark);border-radius:20px;padding:30px 28px;overflow:hidden;display:flex;flex-direction:column}
.brx-formula dl{flex:1}
.brx-formula-strip{margin:24px -28px -30px;height:64px}
.brx-formula-strip .imgph{width:100%;height:100%;border-radius:0}
.brx-formula h3{font-family:var(--serif);font-weight:500;font-size:24px;color:#fff;margin-bottom:18px}
.brx-formula dl{margin:0}
.brx-formula dl>div{padding:11px 0;border-top:1px solid rgba(255,243,230,.12);display:grid;grid-template-columns:96px 1fr;gap:14px}
.brx-formula dt{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#ffd9a8;padding-top:2px}
.brx-formula dd{margin:0;font-size:14px;line-height:1.5;color:var(--on-dark)}
.brx-forbidden{color:var(--on-dark-soft)}
@media(max-width:860px){.brx-formulas{grid-template-columns:1fr}}

/* wordmark */
.brx-wm-inline{display:inline-flex;vertical-align:baseline}
.brx-wm-inline .wm{font-size:1em}
.brx-wm-stage{margin-top:44px;background:var(--cream);border:1px solid var(--rule);border-radius:24px;padding:88px;display:grid;place-items:center}
.brx-wm-stage .wm{font-size:clamp(48px,8vw,96px)}

/* swatches */
.brx-swatches{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:48px}
.brx-swatch{border-radius:20px;padding:30px 26px 22px;min-height:220px;display:flex;flex-direction:column;justify-content:flex-end;border:1px solid rgba(0,0,0,.06)}
.brx-swatch strong{font-size:22px;font-family:var(--serif);font-weight:500}
.brx-swatch-mean{font-size:13.5px;opacity:.9;margin-top:4px;font-style:italic}
.brx-swatch-use{font-size:13px;opacity:.78;margin-top:12px;line-height:1.45}
.brx-swatch-hex{font-size:12.5px;letter-spacing:.05em;margin-top:12px;opacity:.88;font-weight:600}
@media(max-width:640px){.brx-swatches{grid-template-columns:1fr 1fr}}

/* type */
.brx-type{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:48px}
.brx-type-card{border:1px solid var(--rule);border-radius:20px;padding:40px;background:#fffdf8}
.brx-type-label{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink)}
.brx-type-spec{font-size:clamp(30px,3.6vw,44px);line-height:1.08;margin:18px 0;color:var(--ink)}
.brx-type-spec.sans{font-family:var(--sans);font-weight:700;letter-spacing:-.02em}
.brx-type-meta{font-size:13px;color:var(--soft)}
@media(max-width:640px){.brx-type{grid-template-columns:1fr}}

/* imagery / maps / portraits shared */
.brx-imgrules,.brx-maps,.brx-portraits{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:48px}
.brx-zoom-fig{margin:0}
.brx-zoom-fig img{width:100%;display:block}
.brx-imgrules .imgph{width:100%;border-radius:20px}
.brx-maps img,.brx-maps .imgph{width:100%;border-radius:20px;aspect-ratio:4/5;object-fit:cover}
.brx-portraits img,.brx-portraits .imgph{width:100%;border-radius:20px;aspect-ratio:4/5;object-fit:cover}
.brx-zoom-fig figcaption{margin-top:14px;font-size:14px;color:var(--soft)}
@media(max-width:640px){.brx-imgrules,.brx-maps,.brx-portraits{grid-template-columns:1fr}}

/* motion specs */
.brx-spec{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
.brx-spec-card{border:1px solid var(--rule);border-radius:20px;padding:26px;background:#fffdf8;display:flex;flex-direction:column;gap:6px}
.brx-spec-card span{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink)}
.brx-spec-card strong{font-size:18px;font-family:var(--serif);font-weight:500;color:var(--ink)}
.brx-spec-card em{font-size:13px;color:var(--soft);font-style:normal}
@media(max-width:820px){.brx-spec{grid-template-columns:1fr 1fr}}

/* voice */
.brx-voice{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:48px}
.brx-voice-col{border-radius:20px;padding:30px;border:1px solid var(--rule)}
.brx-voice-use{background:#fffdf8}
.brx-voice-avoid{background:#fbf3ec}
.brx-voice-h{display:block;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}
.brx-voice-use .brx-voice-h{color:var(--ink)}
.brx-voice-avoid .brx-voice-h{color:var(--soft)}
.brx-tags{display:flex;flex-wrap:wrap;gap:10px}
.brx-tags span{font-size:14.5px;padding:8px 15px;border-radius:30px;background:#fff;border:1px solid var(--rule);color:var(--ink)}
.brx-voice-avoid .brx-tags span{color:var(--soft);text-decoration:line-through;text-decoration-color:rgba(29,22,13,.3);background:transparent;border:1px solid var(--rule)}
@media(max-width:640px){.brx-voice{grid-template-columns:1fr}}

/* covers */
.brx-covers{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:48px}
.brx-cover img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block}
@media(max-width:820px){.brx-covers{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.brx-covers{grid-template-columns:1fr}}

/* expanding */
.brx-expand-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:36px}
.brx-expand-pill{font-family:var(--serif);font-size:20px;padding:12px 24px;border-radius:40px;border:1px solid var(--rule);background:#fffdf8}

/* wordmark band */
.brx-wordmark-band{background:linear-gradient(180deg,#f5efe6,#ffd9a8 60%,var(--accent));text-align:center;padding:120px 24px;margin-top:150px}
.brx-bigwm{font-family:'Poppins',var(--sans);font-weight:700;letter-spacing:-.04em;font-size:clamp(64px,16vw,210px);color:var(--ink);display:inline-flex;align-items:baseline}
.brx-bigwm b,.brx-bigwm em{color:#fff;font-style:normal}
.brx-bigwm>*{display:inline-block;opacity:0;transform:translateY(.4em) scale(.96);filter:blur(6px)}
.brx-wm-band-in .brx-bigwm>*{animation:brxWmIn .85s cubic-bezier(.22,1,.36,1) forwards}
.brx-wm-band-in .brx-wm-dot{animation-delay:0s}
.brx-wm-band-in .brx-wm-ties{animation-delay:.14s}
.brx-wm-band-in .brx-wm-verse{animation-delay:.28s}
@keyframes brxWmIn{to{opacity:1;transform:none;filter:blur(0)}}
@media(prefers-reduced-motion:reduce){.brx-bigwm>*{opacity:1;transform:none;filter:none}}
`
