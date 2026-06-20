import React, { useState } from 'react'

// ── Mock analytics data — wire to real analytics API (Plausible / CF Analytics) ──
const DATASETS = {
  '7d': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    views:   [14200, 18700, 16400, 22100, 19800, 13200, 9800],
    uniques: [9800,  12300, 11200, 14700, 13500, 8900,  6700],
  },
  '30d': {
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
    views:   [78400, 91200, 103700, 114300],
    uniques: [54000, 62800,  71500,  79400],
  },
  '90d': {
    labels: ['Apr', 'May', 'Jun'],
    views:   [312000, 380000, 387400],
    uniques: [210000, 254000, 260000],
  },
}

const TOP_PAGES = [
  { path: '/',           title: 'Home',                views: 48200, bounce: '41%', avg: '2m 18s' },
  { path: '/webinars',   title: 'Webinars',            views: 22400, bounce: '29%', avg: '3m 45s' },
  { path: '/careers',    title: 'Careers',             views: 18700, bounce: '27%', avg: '4m 12s' },
  { path: '/events',     title: 'Events',              views: 14300, bounce: '36%', avg: '2m 50s' },
  { path: '/about',      title: 'About',               views: 11200, bounce: '44%', avg: '1m 55s' },
  { path: '/newsroom',   title: 'Newsroom',            views: 9800,  bounce: '33%', avg: '3m 05s' },
  { path: '/brands',     title: 'Brands',              views: 7400,  bounce: '51%', avg: '1m 30s' },
  { path: '/guests',     title: 'Guests',              views: 5100,  bounce: '38%', avg: '2m 00s' },
]

const SOURCES = [
  { name: 'Organic Search', pct: 38, c: '#2563eb' },
  { name: 'Social Media',   pct: 34, c: '#d97706' },
  { name: 'Direct',         pct: 18, c: '#16a34a' },
  { name: 'Referral',       pct: 10, c: '#7c3aed' },
]

const DEVICES = [
  { name: 'Mobile', pct: 64, c: 'var(--accent)' },
  { name: 'Desktop', pct: 30, c: 'var(--ink)' },
  { name: 'Tablet', pct: 6, c: 'var(--soft)' },
]

const COUNTRIES = [
  { name: 'India', pct: 72 },
  { name: 'United States', pct: 8 },
  { name: 'United Kingdom', pct: 5 },
  { name: 'UAE', pct: 4 },
  { name: 'Canada', pct: 3 },
  { name: 'Other', pct: 8 },
]

function BarChart({ data, color = 'var(--accent)', color2 = null }) {
  const max = Math.max(...data.views, ...data.uniques)
  return (
    <div className="an-chart">
      <div className="an-chart-bars">
        {data.labels.map((l, i) => (
          <div key={l} className="an-col">
            <div className="an-col-bars">
              <div className="an-bar an-bar-v" style={{ height: `${(data.views[i] / max) * 100}%`, background: color }} title={`Views: ${data.views[i].toLocaleString()}`} />
              <div className="an-bar an-bar-u" style={{ height: `${(data.uniques[i] / max) * 100}%`, background: color2 || 'rgba(254,122,0,.28)' }} title={`Uniques: ${data.uniques[i].toLocaleString()}`} />
            </div>
            <span className="an-col-l">{l}</span>
          </div>
        ))}
      </div>
      <div className="an-legend">
        <span><span style={{ background: color }} />Page views</span>
        <span><span style={{ background: color2 || 'rgba(254,122,0,.28)' }} />Unique visitors</span>
      </div>
    </div>
  )
}

export default function AdminAnalytics() {
  const [range, setRange] = useState('7d')
  const data = DATASETS[range]

  const totalViews   = data.views.reduce((s, v) => s + v, 0)
  const totalUniques = data.uniques.reduce((s, v) => s + v, 0)

  const fmtN = (n) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n)

  const SUMMARY = [
    { l: 'Page views',       v: fmtN(totalViews),   delta: '↑ 12% vs prev period' },
    { l: 'Unique visitors',  v: fmtN(totalUniques),  delta: '↑ 9% vs prev period' },
    { l: 'Avg. session',     v: '2m 44s',            delta: '↑ 18s vs prev period' },
    { l: 'Bounce rate',      v: '38%',               delta: '↓ 3% vs prev period' },
  ]

  return (
    <div className="an">
      {/* ── Range selector ── */}
      <div className="an-toprow">
        <div className="an-ranges">
          {[['7d', 'Last 7 days'], ['30d', 'Last 30 days'], ['90d', 'Last 90 days']].map(([v, l]) => (
            <button key={v} className={`an-range ${range === v ? 'on' : ''}`} onClick={() => setRange(v)}>{l}</button>
          ))}
        </div>
        <span className="an-note">Data is illustrative · connect Plausible or CF Analytics for live stats</span>
      </div>

      {/* ── Summary cards ── */}
      <div className="an-summary">
        {SUMMARY.map(s => (
          <div className="an-stat-card" key={s.l}>
            <span className="an-stat-l">{s.l}</span>
            <strong className="an-stat-v">{s.v}</strong>
            <span className="an-stat-d">{s.delta}</span>
          </div>
        ))}
      </div>

      {/* ── Traffic chart ── */}
      <div className="an-panel">
        <div className="an-panel-head">
          <span className="an-panel-title">Traffic overview</span>
        </div>
        <BarChart data={data} color="var(--accent)" />
      </div>

      {/* ── Two col: pages + sources ── */}
      <div className="an-row2">
        {/* Top pages */}
        <div className="an-panel">
          <div className="an-panel-head">
            <span className="an-panel-title">Top pages</span>
          </div>
          <table className="an-table">
            <thead>
              <tr><th>Page</th><th>Views</th><th>Bounce</th><th>Avg time</th></tr>
            </thead>
            <tbody>
              {TOP_PAGES.map(p => {
                const maxV = TOP_PAGES[0].views
                return (
                  <tr key={p.path}>
                    <td>
                      <span className="an-page-title">{p.title}</span>
                      <span className="an-page-path">{p.path}</span>
                    </td>
                    <td>
                      <div className="an-page-bar-wrap">
                        <div className="an-page-bar" style={{ width: `${(p.views / maxV) * 100}%` }} />
                        <span className="an-page-views">{fmtN(p.views)}</span>
                      </div>
                    </td>
                    <td className="an-td-sm">{p.bounce}</td>
                    <td className="an-td-sm">{p.avg}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Sources + devices + geo */}
        <div className="an-right-col">
          <div className="an-panel">
            <div className="an-panel-head"><span className="an-panel-title">Traffic sources</span></div>
            <div className="an-sources">
              {SOURCES.map(s => (
                <div key={s.name} className="an-src-row">
                  <span className="an-src-name">{s.name}</span>
                  <div className="an-src-bar-wrap">
                    <div className="an-src-bar" style={{ width: `${s.pct}%`, background: s.c }} />
                  </div>
                  <span className="an-src-pct">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="an-panel">
            <div className="an-panel-head"><span className="an-panel-title">Devices</span></div>
            <div className="an-devices">
              {DEVICES.map(d => (
                <div key={d.name} className="an-dev-row">
                  <span className="an-dev-name">{d.name}</span>
                  <div className="an-dev-track">
                    <div className="an-dev-fill" style={{ width: `${d.pct}%`, background: d.c }} />
                  </div>
                  <span className="an-dev-pct">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="an-panel">
            <div className="an-panel-head"><span className="an-panel-title">Top countries</span></div>
            <div className="an-countries">
              {COUNTRIES.map(c => (
                <div key={c.name} className="an-ctr-row">
                  <span className="an-ctr-name">{c.name}</span>
                  <div className="an-ctr-track">
                    <div className="an-ctr-fill" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="an-ctr-pct">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{css}</style>
    </div>
  )
}

const css = `
.an{display:flex;flex-direction:column;gap:18px}

/* top row */
.an-toprow{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.an-ranges{display:flex;gap:6px}
.an-range{padding:8px 16px;border:1px solid var(--rule);border-radius:20px;font-size:13px;font-weight:600;color:var(--soft);background:#fff;cursor:pointer;transition:all .2s;font-family:inherit}
.an-range:hover{border-color:var(--ink);color:var(--ink)}
.an-range.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.an-note{font-size:12px;color:var(--soft);font-style:italic}

/* summary cards */
.an-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.an-stat-card{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:5px}
.an-stat-l{font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--soft)}
.an-stat-v{font-size:34px;font-weight:800;color:var(--ink);line-height:1;letter-spacing:-.02em}
.an-stat-d{font-size:12px;color:#16a34a;font-weight:600}
@media(max-width:900px){.an-summary{grid-template-columns:1fr 1fr}}

/* panels */
.an-panel{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:20px;overflow:hidden}
.an-panel-head{margin-bottom:18px}
.an-panel-title{font-size:13.5px;font-weight:700;color:var(--ink)}

/* chart */
.an-chart{width:100%}
.an-chart-bars{display:grid;grid-template-columns:repeat(var(--cols,7),1fr);gap:6px;height:160px;align-items:end}
.an-col{display:flex;flex-direction:column;align-items:center;gap:5px;height:100%}
.an-col-bars{flex:1;width:100%;display:flex;align-items:flex-end;gap:2px}
.an-bar{flex:1;min-height:4px;border-radius:4px 4px 0 0}
.an-col-l{font-size:10.5px;font-weight:600;color:var(--soft)}
.an-legend{display:flex;gap:20px;margin-top:14px;font-size:12px;font-weight:600;color:var(--soft)}
.an-legend span{display:flex;align-items:center;gap:6px}
.an-legend span span{width:12px;height:12px;border-radius:3px;flex:none}

/* main layout */
.an-row2{display:grid;grid-template-columns:1fr 340px;gap:14px;align-items:start}
@media(max-width:1100px){.an-row2{grid-template-columns:1fr}}
.an-right-col{display:flex;flex-direction:column;gap:14px}

/* top pages table */
.an-table{width:100%;border-collapse:collapse;font-size:13px}
.an-table th{text-align:left;font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);padding:0 12px 10px 0;border-bottom:1px solid var(--rule)}
.an-table td{padding:11px 12px 11px 0;border-bottom:1px solid var(--rule);vertical-align:middle}
.an-table tr:last-child td{border-bottom:none}
.an-page-title{display:block;font-weight:700;font-size:13.5px;color:var(--ink)}
.an-page-path{display:block;font-size:11.5px;color:var(--soft)}
.an-page-bar-wrap{display:flex;align-items:center;gap:8px}
.an-page-bar{height:6px;background:var(--accent);border-radius:4px;min-width:4px;opacity:.8}
.an-page-views{font-size:12.5px;font-weight:700;color:var(--ink);white-space:nowrap}
.an-td-sm{font-size:12.5px;color:var(--soft);white-space:nowrap}

/* sources */
.an-sources{display:flex;flex-direction:column;gap:10px}
.an-src-row{display:grid;grid-template-columns:110px 1fr 36px;align-items:center;gap:10px}
.an-src-name{font-size:12.5px;color:var(--ink);font-weight:500}
.an-src-bar-wrap{height:6px;background:var(--rule);border-radius:6px;overflow:hidden}
.an-src-bar{height:100%;border-radius:6px}
.an-src-pct{font-size:12px;font-weight:700;color:var(--ink);text-align:right}

/* devices */
.an-devices,.an-countries{display:flex;flex-direction:column;gap:10px}
.an-dev-row,.an-ctr-row{display:grid;grid-template-columns:70px 1fr 36px;align-items:center;gap:10px}
.an-ctr-row{grid-template-columns:100px 1fr 36px}
.an-dev-name,.an-ctr-name{font-size:12.5px;color:var(--ink);font-weight:500}
.an-dev-track,.an-ctr-track{height:6px;background:var(--rule);border-radius:6px;overflow:hidden}
.an-dev-fill,.an-ctr-fill{height:100%;background:var(--accent);border-radius:6px}
.an-ctr-fill{background:var(--ink);opacity:.7}
.an-dev-pct,.an-ctr-pct{font-size:12px;font-weight:700;color:var(--ink);text-align:right}
`
