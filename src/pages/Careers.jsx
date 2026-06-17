import React, { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'
import { CAREERS_APPLY_ENG, CAREERS_APPLY } from '../data/site'
import { Wordmark } from '../components/Nav'
// One wide hero card for a team group photo; shows a labelled placeholder until
// /work/team-group.jpg is added.
function TeamPhoto() {
  const [ok, setOk] = React.useState(true)
  if (ok) return <img className="cr-team-img" src="/work/team-group.jpg" alt="The TIES team" onError={() => setOk(false)} />
  return <div className="cr-team-ph"><span>Team group photo · 1920×820</span></div>
}

const initials = (n) => n.replace(/\(.*?\)/g, '').split(' ').filter((w) => /[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('')

const WHY = [
  { t: 'One of a kind', feat: true, d: 'Not a media house, not a think tank, not a software company. A Research · Media · Technology organisation, built for Bharat.' },
  { t: 'Ownership from day one', d: 'Real challenges, real bylines and real products from your first week. No busywork, no waiting your turn.' },
  { t: 'Reach that matters', d: 'Your work goes out to tens of millions, and helps a generation make sense of the world.' },
  { t: 'Skill over pedigree', d: 'We hire for what you can build and how you think, not the name on your degree.' },
  { t: 'Collegial, not corporate', d: 'No office politics, no performative hustle. Candour, people who genuinely look out for one another, and trust that never has to call itself a “family”.' },
  { t: 'Across India, and beyond', d: 'Over 100 people spread across India’s states and a handful of countries abroad, building in the open.' },
]

// How we work: a living handbook (inspired by public "how we work" docs like
// Warp's), spanning the whole organisation, not just engineering.
const PRINCIPLES = [
  { group: 'First principles', items: [
    'India-First: every decision begins with what serves Bharat.',
    'We would rather build and learn than wait and theorise.',
    'Hold opinions strongly, change them readily. The better argument wins, never the louder title.',
    'Default to writing: anything that matters is documented, not left to memory or a passing message.',
    'High agency, low ego: own the outcome, share the credit.',
  ] },
  { group: 'Research', items: [
    'Evidence over assertion: every claim rests on sources we can stand behind, primary or secondary.',
    'We do not merely report; we interpret what it means and what is likely to follow.',
    'Serious rigour, plainly told: depth that anyone can follow.',
  ] },
  { group: 'Media', items: [
    'Make the complex impossible to scroll past.',
    'Reach is a responsibility: the larger the audience, the higher the bar for accuracy.',
    'Every format, one standard.',
  ] },
  { group: 'Technology', items: [
    'Build for the next billion, on the devices they actually use.',
    'Open information up; never lock it away.',
    'Ship deliberately, learn from real use, and improve in the open.',
  ] },
]

// The Common Room: warm culture window. Seed entries: replace with real team
// essays + author photos as people publish them. Soft pastel covers (c1 → c2),
// muted tag colour (tc).
const VOICES = [
  { theme: 'Leadership', date: 'May 28, 2026', title: 'What nobody tells you about leading at 22', dek: 'On managing people your own age, and slowly learning how.', author: 'Hardik Pathak', role: 'Co-Founder', c1: '#dcebd3', c2: '#c2d8b4', tc: '#5f7a4e' },
  { theme: 'First times', date: 'May 14, 2026', title: 'My first byline reached a million people', dek: 'The thrill, and the typo I caught at 1am, ten minutes before it went out.', author: 'Research desk', role: 'Research', c1: '#d6e6f1', c2: '#bcd4e6', tc: '#436480' },
  { theme: 'After hours', date: 'Apr 30, 2026', title: 'We play Among Us at 1am (and still ship at 9)', dek: 'How a remote team actually unwinds, and why it keeps us close.', author: 'The studio', role: 'Design & media', c1: '#f6e7bf', c2: '#eed79e', tc: '#8a6b1f' },
  { theme: 'FOMO', date: 'Apr 16, 2026', title: 'On missing the story everyone else covered', dek: 'Making peace with not chasing every headline, and trusting the beat you own.', author: 'Media team', role: 'Film & reels', c1: '#f3d7da', c2: '#e8bcc1', tc: '#9c5563' },
  { theme: 'Off days', date: 'Apr 02, 2026', title: 'The week I shipped nothing', dek: 'What a slump taught me about this place, and the people who carried it.', author: 'Engineering', role: 'Product & tech', c1: '#e2d9ef', c2: '#cdbfe3', tc: '#6a5a86' },
  { theme: 'The craft', date: 'Mar 19, 2026', title: 'Running a team spread across ten cities', dek: 'The unglamorous work of keeping a remote team feeling like one room.', author: 'Operations', role: 'Strategy & ops', c1: '#f3dcc7', c2: '#e9c4a4', tc: '#a5683f' },
]

const ROLES = [
  { dept: 'Engineering', tag: 'Internship → full-time · Bengaluru · Bhopal · Delhi · Mumbai', apply: CAREERS_APPLY_ENG, lead: true,
    items: ['AI / ML Engineer', 'Full-Stack Engineer', 'Frontend Engineer (React)', 'Backend Engineer (Node / Python)', 'Mobile Engineer (React Native)', 'Data Engineer', 'DevOps / Platform Engineer', 'QA / SDET'] },
  { dept: 'Product & Design', tag: 'Internship · Remote · India', apply: CAREERS_APPLY,
    items: ['UI/UX Designer', 'Product Designer', 'Graphic Designer (Canva)'] },
  { dept: 'Content', tag: 'Internship · Remote · India', apply: CAREERS_APPLY,
    items: ['Content Editor', 'Content Writer (UPSC)', 'UPSC Content Researcher & Strategist'] },
  { dept: 'Media', tag: 'Internship · Remote · India', apply: CAREERS_APPLY,
    items: ['Video Editor (Reels + YouTube)', 'Social Media Manager (Instagram)', 'YouTube Manager'] },
  { dept: 'Operations', tag: 'Internship · Remote · India', apply: CAREERS_APPLY,
    items: ['Human Resources (HR)', 'Marketing & Outreach', 'Management / Team Coordination', 'Collaboration & Outreach Manager'] },
]

const HIRE = [
  { n: '01', t: 'Apply & share your work', d: 'Send your resume and links to what you have built. For engineering, your GitHub matters more than your CV.' },
  { n: '02', t: 'Intro conversation', d: 'A short call about you, your work, and why India-First. We tell you exactly how the rest runs.' },
  { n: '03', t: 'A real problem', d: 'A practical task close to the work you would actually do. We look at how you think, not trivia.' },
  { n: '04', t: 'Build with us', d: 'A paired session or a small real task. Fit goes both ways: you see us, we see you.' },
  { n: '05', t: 'Offer', d: 'Fast and transparent. Internships convert to full-time, with relocation across our four cities.' },
]

export default function Careers() {
  const [openDept, setOpenDept] = useState('Engineering')
  return (
    <>
      <Nav variant="solid" />
      <main className="pad-top cr">
        {/* hero */}
        <section className="cr-hero">
          <div className="container center">
            <span className="cr-eyebrow">Careers at Tiesverse</span>
            <h1 className="serif cr-h1">Join us in building</h1>
            <span className="cr-wm"><Wordmark /></span>
            <p className="cr-sub">One organisation bringing research, media and technology together into a category of its own, built for Bharat. We are looking for people who want to build that, and who will own it like it is theirs.</p>
            <div className="cr-hero-cta">
              <a className="btn btn-primary" href="#roles">See open roles</a>
              <a className="btn btn-outline" href="#voices">Read the voices</a>
            </div>
          </div>
          <div className="cr-team container"><TeamPhoto /></div>
        </section>

        {/* open roles */}
        <section className="cr-roles container" id="roles">
          <div className="cr-roles-head">
            <div><span className="cr-eyebrow">Open roles</span><h2 className="serif">Find your desk.</h2></div>
            <span className="pill">Engineering-first · internship &amp; full-time · India</span>
          </div>
          <div className="cr-acc-list">
            {ROLES.map((r) => {
              const isOpen = openDept === r.dept
              return (
                <div className={`cr-acc ${isOpen ? 'open' : ''}`} key={r.dept}>
                  <button type="button" className="cr-acc-head" aria-expanded={isOpen} onClick={() => setOpenDept(isOpen ? null : r.dept)}>
                    <span className="cr-acc-name">{r.dept}</span>
                    <span className="cr-acc-tag">{r.tag}</span>
                    {r.lead && <span className="cr-acc-flag">apply by 18 Jun</span>}
                    <span className="cr-acc-count">{r.items.length} {r.items.length === 1 ? 'role' : 'roles'}</span>
                    <span className="cr-acc-chev" aria-hidden>{isOpen ? '–' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="cr-acc-body">
                      <div className="cr-role-grid">
                        {r.items.map((it) => (
                          <a className="cr-role" href={r.apply} target="_blank" rel="noreferrer" key={it}>
                            <span>{it}</span><em>Apply →</em>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <p className="cr-roles-foot">Don&apos;t see your role? Strong builders are always welcome. Send us what you&apos;ve made.</p>
        </section>

        {/* why */}
        {false && (<section className="cr-why container">
          <div className="cr-why-head">
            <span className="cr-eyebrow">Why TIES</span>
            <h2 className="serif">Reasons people stay.</h2>
          </div>
          <div className="cr-why-grid">
            {WHY.map((w) => (
              <div className={`cr-why-item ${w.feat ? 'feat' : ''}`} key={w.t}>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </section>)}

        {/* how we hire */}
        {false && (<section className="cr-hire container">
          <div className="cr-why-head"><span className="cr-eyebrow">How we hire</span><h2 className="serif">Skill, fit, India-First.</h2><p className="cr-hire-sub">No trick questions, no pedigree filters. We want to see how you actually think and build.</p></div>
          <div className="cr-timeline">
            {HIRE.map((s) => (
              <div className="cr-tstep" key={s.t}>
                <span className="cr-tdot" />
                <strong>{s.t}</strong>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </section>)}
        {/* how we work: operating principles (a living handbook) */}
        {false && (<section className="cr-work container">
          <div className="cr-why-head">
            <span className="cr-eyebrow">How we work</span>
            <h2 className="serif">A living handbook.</h2>
            <p className="cr-work-sub">The operating principles we actually make decisions by, across research, media and technology. A living document, meant to change as we grow.</p>
          </div>
          <div className="cr-work-grid">
            {PRINCIPLES.map((g) => (
              <div className="cr-work-col" key={g.group}>
                <h3>{g.group}</h3>
                <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>)}

        {/* first 90 days */}
        {false && (<section className="cr-life container">
          <div className="cr-why-head"><span className="cr-eyebrow">Your first 90 days</span><h2 className="serif">From day one to your own thing.</h2></div>
          <div className="cr-journey">
            {[
              { s: 'Week one', t: 'Find your feet', d: 'Meet the team, find your beat, and ship something small but real in your first week.' },
              { s: 'Month one', t: 'Own a piece', d: 'Take a recurring piece, work across brands, and start finding your own voice.' },
              { s: 'Month three and on', t: 'Lead something', d: 'Run a series, mentor a new joiner, and help shape what we build next.' },
            ].map((j) => (
              <div className="cr-jcard" key={j.s}>
                <span className="cr-jstage">{j.s}</span>
                <h3 className="serif">{j.t}</h3>
                <p>{j.d}</p>
              </div>
            ))}
          </div>
        </section>)}

        {/* THE COMMON ROOM: editorial culture window (humanise-style) */}
        <section className="vo" id="voices">
          <div className="container vo-mast">
            <aside className="vo-edition">
              <span className="vo-ed-label">The Common Room</span>
              <span className="vo-ed-rule" />
              <h2 className="serif vo-ed-title">Life here,<br />in our own words.</h2>
              <span className="vo-ed-rule" />
              <p className="vo-ed-tag">THE GOOD DAYS, THE OFF DAYS, AND EVERYTHING IN BETWEEN</p>
              <div className="vo-ed-art" aria-hidden />
              <p className="vo-ed-blurb">Honest notes from the people who build TIES: leadership and learning, first-time wins, the FOMO, and the games we play long after midnight. Written by the team, not the brand.</p>
            </aside>

            <div className="vo-feed">
              <div className="vo-feed-top"><span className="vo-feed-count">{VOICES.length} STORIES</span><span className="vo-feed-line" /></div>
              {VOICES.map((v) => (
                <article className="vo-row" key={v.title} style={{ '--c1': v.c1, '--c2': v.c2, '--tc': v.tc }}>
                  <div className="vo-row-main">
                    <span className="vo-date">Published {v.date}</span>
                    <h3 className="serif">{v.title}</h3>
                    <p className="vo-dek">{v.dek}</p>
                    <div className="vo-by">
                      <span className="vo-av">{initials(v.author)}</span>
                      <span className="vo-by-txt"><strong>{v.author}</strong>{v.role}</span>
                    </div>
                  </div>
                  <div className="vo-row-thumb"><span className="vo-thumb-img" /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <CtaBand />
      <Footer />
      <style>{css}</style>
    </>
  )
}

const css = `
.pad-top{padding-top:74px}
.cr{background:#fff}
.cr-eyebrow{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink)}
.center{text-align:center}

/* hero */
.cr-hero{padding:84px 0 0}
.cr-hero h1{font-size:clamp(40px,5.8vw,80px);line-height:1.02;margin:0;letter-spacing:-.01em}
.cr-mark{color:var(--accent)}
.cr-wm{display:block;margin:16px auto 0}
.cr-wm .wm{font-size:clamp(46px,7.4vw,98px);letter-spacing:-.04em}
.cr-sub{max-width:680px;margin:24px auto 30px;color:var(--soft);font-size:18px;line-height:1.6}
.cr-hero-cta{display:flex;gap:13px;justify-content:center;flex-wrap:wrap}
.cr-team{margin-top:60px}
.cr-team-img,.cr-team-ph{width:100%;aspect-ratio:21/9;object-fit:cover;border-radius:16px;display:block}
.cr-team-ph{display:grid;place-items:center;background:linear-gradient(135deg,var(--cream),#ffe6cc);border:1px dashed rgba(254,122,0,.4)}
.cr-team-ph span{font-size:13px;font-weight:600;letter-spacing:.04em;color:var(--soft)}
@media(max-width:760px){.cr-team-img,.cr-team-ph{aspect-ratio:16/10}}

.cr-why-head{margin-bottom:42px}
.cr-why-head h2{font-size:clamp(30px,4vw,54px);margin-top:10px;line-height:1.04}

/* why */
.cr-why{padding:var(--sec) var(--gutter)}
.cr-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.cr-why-item{background:#fff;border:1px solid var(--rule);border-radius:16px;padding:30px 28px;transition:transform .25s var(--ease),box-shadow .25s,border-color .25s}
.cr-why-item:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(70,40,0,.07);border-color:rgba(254,122,0,.35)}
.cr-why-item h3{font-size:21px;margin-bottom:10px;letter-spacing:-.01em}
.cr-why-item p{color:var(--soft);font-size:15px;line-height:1.6}
.cr-why-item.feat{border-color:rgba(254,122,0,.45);box-shadow:inset 0 0 0 1px rgba(254,122,0,.18)}
.cr-why-item.feat h3{color:var(--ink)}
@media(max-width:820px){.cr-why-grid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.cr-why-grid{grid-template-columns:1fr}}

/* how we work: living handbook */
.cr-work{padding:0 var(--gutter) var(--sec)}
.cr-work-sub{color:var(--soft);font-size:16.5px;line-height:1.6;margin-top:14px;max-width:600px}
.cr-work-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:30px}
.cr-work-col h3{font-size:12.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--rule)}
.cr-work-col ul{list-style:none;display:flex;flex-direction:column;gap:14px}
.cr-work-col li{font-size:14.5px;line-height:1.5;color:var(--ink)}
@media(max-width:900px){.cr-work-grid{grid-template-columns:1fr 1fr;gap:30px 26px}}
@media(max-width:560px){.cr-work-grid{grid-template-columns:1fr}}

/* THE COMMON ROOM: editorial culture window (humanise-style) */
.vo{background:#fff;padding:var(--sec) var(--gutter)}
.vo-mast{display:grid;grid-template-columns:.82fr 1.18fr;gap:56px;align-items:start}
/* left: edition poster */
.vo-edition{position:sticky;top:96px;background:linear-gradient(180deg,#f8e8ec,#f3dde2);border:1px solid #ecccd4;border-radius:14px;padding:34px 30px;text-align:center}
.vo-ed-label{display:block;font-family:var(--serif);font-style:italic;font-size:15px;color:#8a4a59;margin-bottom:16px}
.vo-ed-rule{display:block;height:1px;background:#cf9aa8}
.vo-ed-title{font-size:clamp(34px,4vw,52px);line-height:1;color:#7d3b49;margin:18px 0}
.vo-ed-tag{font-family:var(--serif);font-size:12.5px;letter-spacing:.06em;color:#8a4a59;margin-top:14px;line-height:1.6}
.vo-ed-art{margin-top:24px;aspect-ratio:4/3;border-radius:10px;background:linear-gradient(150deg,#f3c9b8,#e9b6c2 50%,#cbb6dd)}
.vo-ed-blurb{margin-top:20px;text-align:left;color:#6a4650;font-size:14px;line-height:1.6}
/* right: article feed */
.vo-feed-top{display:flex;align-items:center;gap:16px;margin-bottom:6px}
.vo-feed-count{font-size:12px;font-weight:700;letter-spacing:.16em;color:var(--soft)}
.vo-feed-line{position:relative;flex:1;height:2px;background:var(--rule)}
.vo-feed-line::before,.vo-feed-line::after{content:'';position:absolute;top:-3px;width:2px;height:8px;background:var(--rule)}
.vo-feed-line::before{left:0}.vo-feed-line::after{right:0}
.vo-row{display:grid;grid-template-columns:1fr 188px;gap:30px;align-items:center;padding:28px 0;border-top:1px solid var(--rule)}
.vo-row:first-of-type{border-top:none}
.vo-date{font-size:13px;font-weight:600;color:#9c5563}
.vo-row h3{font-size:25px;line-height:1.15;margin:9px 0 9px;color:var(--ink)}
.vo-dek{color:var(--soft);font-size:15px;line-height:1.5;margin-bottom:16px;max-width:48ch}
.vo-by{display:flex;align-items:center;gap:11px;font-size:13px;color:var(--soft)}
.vo-av{width:34px;height:34px;border-radius:50%;flex:none;display:grid;place-items:center;background:linear-gradient(150deg,var(--c2),var(--c1));color:var(--tc);font-size:12px;font-weight:700}
.vo-by-txt strong{display:block;color:var(--ink);font-size:13.5px;font-weight:600}
.vo-row-thumb{position:relative;padding:6px 16px}
.vo-thumb-img{display:block;aspect-ratio:5/4;border-radius:8px;background:linear-gradient(150deg,var(--c1),var(--c2))}
.vo-row-thumb::before,.vo-row-thumb::after{position:absolute;font-family:var(--serif);font-size:52px;line-height:1;color:#caa0ab}
.vo-row-thumb::before{content:'“';top:-12px;left:0}
.vo-row-thumb::after{content:'”';bottom:-30px;right:0}
@media(max-width:900px){.vo-mast{grid-template-columns:1fr;gap:36px}.vo-edition{position:static}}
@media(max-width:600px){.vo-row{grid-template-columns:1fr}.vo-row-thumb{display:none}}

/* first 90 days */
.cr-life{padding:var(--sec) var(--gutter)}
.cr-journey{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.cr-jcard{background:#fff;border:1px solid var(--rule);border-radius:16px;padding:30px 28px;transition:border-color .25s,box-shadow .25s}
.cr-jcard:hover{border-color:rgba(254,122,0,.35);box-shadow:0 14px 30px rgba(70,40,0,.06)}
.cr-jstage{display:block;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);margin-bottom:10px}
.cr-jcard h3{font-size:23px;margin-bottom:10px}
.cr-jcard p{color:var(--soft);font-size:15px;line-height:1.58}
@media(max-width:820px){.cr-journey{grid-template-columns:1fr}}

/* roles */
.cr-roles{padding:0 var(--gutter) var(--sec)}
.cr-roles-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;margin-bottom:38px}
.cr-roles-head h2{font-size:clamp(30px,4vw,54px);margin-top:10px}
.pill{font-size:13px;font-weight:600;color:var(--soft);border:1px solid var(--rule);border-radius:30px;padding:9px 16px}
/* roles dropdown / accordion */
.cr-acc-list{display:flex;flex-direction:column;gap:12px}
.cr-acc{border:1px solid var(--rule);border-radius:14px;background:#fff;overflow:hidden;transition:border-color .2s,box-shadow .2s}
.cr-acc.open{border-color:rgba(254,122,0,.4);box-shadow:0 14px 32px rgba(70,40,0,.06)}
.cr-acc-head{width:100%;display:flex;align-items:center;gap:14px;padding:20px 24px;background:none;border:none;cursor:pointer;text-align:left;font:inherit;color:inherit}
.cr-acc-name{font-size:18px;font-weight:700;color:var(--ink)}
.cr-acc-tag{font-size:12.5px;color:var(--soft)}
.cr-acc-flag{font-size:11.5px;font-weight:700;color:var(--ink);background:#fff;border:1px solid var(--rule);border-radius:20px;padding:3px 10px}
.cr-acc-count{margin-left:auto;font-size:12px;font-weight:600;color:var(--soft);border:1px solid var(--rule);border-radius:20px;padding:4px 11px}
.cr-acc-chev{font-size:24px;line-height:1;color:var(--ink);width:20px;text-align:center}
.cr-acc-body{padding:0 24px 24px}
.cr-role-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.cr-role{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:18px 20px;border:1px solid var(--rule);border-radius:9px;background:#fff;transition:border-color .25s,box-shadow .25s,transform .2s}
.cr-role:hover{border-color:var(--ink);box-shadow:0 12px 26px rgba(70,40,0,.07);transform:translateY(-2px)}
.cr-role span{font-weight:600;font-size:15px}
.cr-role em{font-style:normal;font-size:13px;font-weight:600;color:var(--ink);white-space:nowrap}
.cr-roles-foot{margin-top:6px;color:var(--soft);font-size:14.5px}
@media(max-width:820px){.cr-role-grid{grid-template-columns:1fr}.cr-dept-flag{margin-left:0}}

/* hire */
.cr-hire{padding:0 var(--gutter) var(--sec)}
.cr-hire-sub{color:var(--soft);font-size:16.5px;line-height:1.6;margin-top:14px;max-width:560px}
.cr-timeline{position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:20px}
.cr-timeline::before{content:'';position:absolute;top:6px;left:7px;right:7px;height:2px;background:var(--rule)}
.cr-tstep{position:relative;padding-top:32px}
.cr-tdot{position:absolute;top:0;left:0;width:14px;height:14px;border-radius:50%;background:var(--ink);box-shadow:0 0 0 5px var(--paper)}
.cr-tstep strong{display:block;font-size:16px;margin-bottom:8px}
.cr-tstep p{color:var(--soft);font-size:13.5px;line-height:1.55}
@media(max-width:820px){
  .cr-timeline{grid-template-columns:1fr;gap:0;padding-top:0;padding-left:28px}
  .cr-timeline::before{top:4px;bottom:4px;left:6px;right:auto;width:2px;height:auto}
  .cr-tstep{padding:0 0 26px}
  .cr-tdot{left:-28px;top:3px}
}
`
