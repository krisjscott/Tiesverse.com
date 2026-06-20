import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CITY_EVENTS, WEBINARS, WORK, GUESTS } from '../../data/site'

// ── Mock data (replace with API calls when backend is live) ──
const WEEKLY_TRAFFIC = [
  { d: 'Mon', v: 14200 }, { d: 'Tue', v: 18700 }, { d: 'Wed', v: 16400 },
  { d: 'Thu', v: 22100 }, { d: 'Fri', v: 19800 }, { d: 'Sat', v: 13200 }, { d: 'Sun', v: 9800 },
]

const ACTIVITY = [
  { msg: 'New application: Arjun Mehta → Frontend Engineer (React)',  time: '2h ago',  tag: 'applicant' },
  { msg: 'Delhi Salon: 67 of 80 seats registered',                    time: '4h ago',  tag: 'event' },
  { msg: 'Ananya Krishnan moved to "Offered"',                        time: '5h ago',  tag: 'offer' },
  { msg: 'Carice Witte webinar: 234 total registrations',             time: '1d ago',  tag: 'webinar' },
  { msg: 'Offer letter generated for Ananya Krishnan',                time: '1d ago',  tag: 'offer' },
  { msg: 'New application: Shreya Gupta → Backend Engineer',         time: '2d ago',  tag: 'applicant' },
]

const RECENT_APPLICANTS = [
  { name: 'Arjun Mehta',      role: 'Frontend Engineer (React)', dept: 'Engineering', date: 'Jun 14', status: 'shortlisted' },
  { name: 'Priya Sharma',     role: 'Content Editor',            dept: 'Content',     date: 'Jun 13', status: 'applied' },
  { name: 'Rohan Das',        role: 'AI / ML Engineer',          dept: 'Engineering', date: 'Jun 12', status: 'interviewed' },
  { name: 'Ananya Krishnan',  role: 'UI/UX Designer',            dept: 'Design',      date: 'Jun 10', status: 'offered' },
  { name: 'Vikram Patel',     role: 'Video Editor',              dept: 'Media',       date: 'Jun 9',  status: 'rejected' },
]

// Mock registration count per event (will come from Turso API)
const EVENT_REGS = {
  'India AI Impact Summit':                   350,
  'Geopolitics Live: The Delhi Salon':        67,
  'The Bharat Age: UPSC Strategy Meetup':     45,
  'Newsroom Masterclass: Explainers that Travel': 12,
  'Tabloid Live: Reading the World':          28,
  'Finties Forum: Markets & Macro':           15,
  'Geo Atlas Night: Maps & Power':            8,
}

const STATUS_MAP = {
  applied:     { l: 'Applied',     c: '#2563eb', bg: '#eff6ff', bd: '#bfdbfe' },
  shortlisted: { l: 'Shortlisted', c: '#d97706', bg: '#fffbeb', bd: '#fde68a' },
  interviewed: { l: 'Interviewed', c: '#7c3aed', bg: '#f5f3ff', bd: '#ddd6fe' },
  offered:     { l: 'Offered',     c: '#16a34a', bg: '#f0fdf4', bd: '#bbf7d0' },
  rejected:    { l: 'Rejected',    c: '#dc2626', bg: '#fef2f2', bd: '#fecaca' },
}

const TAG_COLORS = {
  applicant: { bg: '#eff6ff', c: '#2563eb' },
  event:     { bg: '#fff7ed', c: '#d97706' },
  offer:     { bg: '#f0fdf4', c: '#16a34a' },
  webinar:   { bg: '#f5f3ff', c: '#7c3aed' },
}

function StatusPill({ s }) {
  const m = STATUS_MAP[s] || STATUS_MAP.applied
  return (
    <span style={{ color: m.c, background: m.bg, border: `1px solid ${m.bd}`, borderRadius: 20, padding: '3px 10px', fontSize: 11.5, fontWeight: 700, whiteSpace: 'nowrap' }}>
      {m.l}
    </span>
  )
}

function TrafficChart({ data }) {
  const max = Math.max(...data.map(d => d.v))
  const total = data.reduce((s, d) => s + d.v, 0)
  return (
    <div className="tc">
      <div className="tc-head">
        <span className="tc-label">Page views · last 7 days</span>
        <strong className="tc-total">{(total / 1000).toFixed(1)}K total</strong>
      </div>
      <div className="tc-bars">
        {data.map(d => (
          <div key={d.d} className="tc-col">
            <span className="tc-val">{(d.v / 1000).toFixed(1)}K</span>
            <div className="tc-track">
              <div className="tc-bar" style={{ height: `${(d.v / max) * 100}%` }} />
            </div>
            <span className="tc-day">{d.d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const upcomingEvents   = useMemo(() => CITY_EVENTS.filter(e => !e.past), [])
  const upcomingWebinars = useMemo(() => WEBINARS.filter(w => {
    const d = new Date(String(w.date).replace(/(\d+)\s*[–-]\s*\d+/, '$1'))
    return !isNaN(d.getTime()) && d >= today && w.poster
  }), [])

  const now = new Date()
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening'
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const STATS = [
    { label: 'Applicants this month', value: '47',   delta: '+8 this week',  accent: true },
    { label: 'Upcoming events',       value: upcomingEvents.length,   delta: `next: ${upcomingEvents[0]?.date?.slice(0,6) || '—'}`, accent: false },
    { label: 'Upcoming webinars',     value: upcomingWebinars.length, delta: upcomingWebinars[0]?.speaker?.split(' ').slice(-1)[0] || '—', accent: false },
    { label: 'Site content items',    value: WORK.length + GUESTS.length, delta: `${WORK.length} insights · ${GUESTS.length} guests`, accent: false },
  ]

  return (
    <div className="db">
      {/* ── Header ── */}
      <div className="db-header">
        <div>
          <h2 className="serif db-greet">{greeting}, Admin.</h2>
          <p className="db-date">{dateStr}</p>
        </div>
        <div className="db-header-actions">
          <Link className="btn btn-primary db-action-btn" to="/admin/events">+ Add Event</Link>
          <Link className="btn btn-outline db-action-btn" to="/admin/applicants">View Applicants</Link>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="db-stats">
        {STATS.map(s => (
          <div className={`db-card ${s.accent ? 'db-card-accent' : ''}`} key={s.label}>
            <span className="db-card-label">{s.label}</span>
            <strong className="db-card-val">{s.value}</strong>
            <span className="db-card-delta">{s.delta}</span>
          </div>
        ))}
      </div>

      {/* ── Two-col: chart + activity ── */}
      <div className="db-row2">
        <div className="db-panel">
          <TrafficChart data={WEEKLY_TRAFFIC} />
        </div>
        <div className="db-panel">
          <div className="db-panel-head">
            <span className="db-panel-title">Recent activity</span>
          </div>
          <ul className="db-activity">
            {ACTIVITY.map((a, i) => {
              const col = TAG_COLORS[a.tag] || TAG_COLORS.event
              return (
                <li key={i} className="db-act-item">
                  <span className="db-act-dot" style={{ background: col.c }} />
                  <div className="db-act-body">
                    <span className="db-act-msg">{a.msg}</span>
                    <span className="db-act-time">{a.time}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* ── Two-col: recent applicants + upcoming events ── */}
      <div className="db-row2">
        {/* Recent applicants */}
        <div className="db-panel">
          <div className="db-panel-head">
            <span className="db-panel-title">Recent applicants</span>
            <Link className="db-panel-link" to="/admin/applicants">View all →</Link>
          </div>
          <div className="db-table-wrap">
            <table className="db-table">
              <thead>
                <tr><th>Name</th><th>Role</th><th>Applied</th><th>Status</th></tr>
              </thead>
              <tbody>
                {RECENT_APPLICANTS.map((a, i) => (
                  <tr key={i}>
                    <td>
                      <div className="db-app-name">
                        <span className="db-app-av">{a.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
                        <div>
                          <strong>{a.name}</strong>
                          <span>{a.dept}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="db-role-text">{a.role}</span></td>
                    <td><span className="db-date-text">{a.date}</span></td>
                    <td><StatusPill s={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming events */}
        <div className="db-panel">
          <div className="db-panel-head">
            <span className="db-panel-title">Upcoming events</span>
            <Link className="db-panel-link" to="/admin/events">View all →</Link>
          </div>
          <div className="db-events">
            {upcomingEvents.slice(0, 4).map((e, i) => {
              const regs = EVENT_REGS[e.title] || 0
              const pct  = e.capacity ? Math.min(100, Math.round((regs / e.capacity) * 100)) : null
              return (
                <div className="db-ev" key={i}>
                  <div className="db-ev-top">
                    <div>
                      <span className="db-ev-cat">{e.category}</span>
                      <h4 className="db-ev-title">{e.title}</h4>
                      <span className="db-ev-meta">{e.date} · {e.city}</span>
                    </div>
                    <div className="db-ev-price">
                      {e.price ? `₹${e.price}` : <span className="db-ev-free">Free</span>}
                    </div>
                  </div>
                  {pct !== null && (
                    <div className="db-ev-reg">
                      <div className="db-ev-reg-bar">
                        <div className="db-ev-reg-fill" style={{ width: `${pct}%`, background: pct > 80 ? '#16a34a' : 'var(--accent)' }} />
                      </div>
                      <span className="db-ev-reg-txt">{regs}{e.capacity ? `/${e.capacity}` : ''} registered · {pct}%</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{css}</style>
    </div>
  )
}

const css = `
.db{display:flex;flex-direction:column;gap:22px}

/* header */
.db-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap}
.db-greet{font-size:clamp(24px,3vw,34px);margin-bottom:4px}
.db-date{font-size:13.5px;color:var(--soft)}
.db-header-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.db-action-btn{font-size:13.5px;padding:10px 18px}

/* stat cards */
.db-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.db-card{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:22px 20px;display:flex;flex-direction:column;gap:6px;border-top:3px solid var(--rule)}
.db-card-accent{border-top-color:var(--accent)}
.db-card-label{font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--soft)}
.db-card-val{font-size:36px;font-weight:800;color:var(--ink);line-height:1;letter-spacing:-.02em}
.db-card-accent .db-card-val{color:var(--accent)}
.db-card-delta{font-size:12.5px;color:var(--soft)}
@media(max-width:900px){.db-stats{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.db-stats{grid-template-columns:1fr}}

/* panels */
.db-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:900px){.db-row2{grid-template-columns:1fr}}
.db-panel{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:20px;overflow:hidden}
.db-panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.db-panel-title{font-size:13.5px;font-weight:700;color:var(--ink)}
.db-panel-link{font-size:12.5px;font-weight:600;color:var(--accent)}

/* traffic chart */
.tc{width:100%}
.tc-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px}
.tc-label{font-size:13.5px;font-weight:700;color:var(--ink)}
.tc-total{font-size:13px;color:var(--soft)}
.tc-bars{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;height:130px;align-items:end}
.tc-col{display:flex;flex-direction:column;align-items:center;gap:5px;height:100%}
.tc-val{font-size:9px;font-weight:700;color:var(--soft);line-height:1}
.tc-track{flex:1;width:100%;display:flex;flex-direction:column;justify-content:flex-end}
.tc-bar{width:100%;background:linear-gradient(180deg,var(--accent),#ffa040);border-radius:4px 4px 0 0;min-height:4px;transition:height .4s}
.tc-day{font-size:10.5px;color:var(--soft);font-weight:600}

/* activity */
.db-activity{list-style:none;display:flex;flex-direction:column;gap:0}
.db-act-item{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--rule)}
.db-act-item:last-child{border-bottom:none}
.db-act-dot{width:8px;height:8px;border-radius:50%;flex:none;margin-top:4px}
.db-act-body{display:flex;flex-direction:column;gap:2px}
.db-act-msg{font-size:13px;color:var(--ink);line-height:1.45}
.db-act-time{font-size:11.5px;color:var(--soft)}

/* table */
.db-table-wrap{overflow-x:auto}
.db-table{width:100%;border-collapse:collapse;font-size:13px}
.db-table th{text-align:left;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);padding:0 10px 10px 0;border-bottom:1px solid var(--rule)}
.db-table td{padding:10px 10px 10px 0;border-bottom:1px solid var(--rule);vertical-align:middle}
.db-table tr:last-child td{border-bottom:none}
.db-app-name{display:flex;align-items:center;gap:10px}
.db-app-av{width:30px;height:30px;border-radius:50%;background:linear-gradient(150deg,var(--accent),#ffb152);color:#3a1c00;font-family:var(--serif);font-size:11px;font-weight:600;display:grid;place-items:center;flex:none}
.db-app-name strong{display:block;font-size:13px;font-weight:700;white-space:nowrap}
.db-app-name span{display:block;font-size:11.5px;color:var(--soft)}
.db-role-text{font-size:12.5px;color:var(--soft);display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.db-date-text{font-size:12px;color:var(--soft);white-space:nowrap}

/* events */
.db-events{display:flex;flex-direction:column;gap:12px}
.db-ev{border:1px solid var(--rule);border-radius:10px;padding:14px}
.db-ev-top{display:flex;justify-content:space-between;gap:12px;margin-bottom:10px}
.db-ev-cat{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:4px;display:block}
.db-ev-title{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:3px;line-height:1.3}
.db-ev-meta{font-size:11.5px;color:var(--soft)}
.db-ev-price{font-size:14px;font-weight:700;color:var(--ink);white-space:nowrap;flex:none}
.db-ev-free{color:var(--accent)}
.db-ev-reg{margin-top:2px}
.db-ev-reg-bar{height:5px;background:var(--rule);border-radius:6px;overflow:hidden;margin-bottom:4px}
.db-ev-reg-fill{height:100%;border-radius:6px;transition:width .6s var(--ease)}
.db-ev-reg-txt{font-size:11px;color:var(--soft)}
`
