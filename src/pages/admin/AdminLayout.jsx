import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'

// Inline SVG icons — no external library needed
const IC = {
  dash:    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  chart:   <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="2" y="16" width="4" height="6" rx="1"/><rect x="9" y="10" width="4" height="12" rx="1"/><rect x="16" y="4" width="4" height="18" rx="1"/></svg>,
  cal:     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  people:  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"/></svg>,
  doc:     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/></svg>,
  logout:  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu:    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
  bell:    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
}

const NAV = [
  { h: 'Overview', items: [
    { to: '/admin/dashboard',  label: 'Dashboard',        ic: 'dash' },
    { to: '/admin/analytics',  label: 'Analytics',        ic: 'chart' },
  ]},
  { h: 'Manage', items: [
    { to: '/admin/events',     label: 'Events & Webinars', ic: 'cal' },
    { to: '/admin/applicants', label: 'Applicants',        ic: 'people' },
    { to: '/admin/content',    label: 'Newsroom',          ic: 'doc' },
  ]},
]

const TITLES = {
  '/admin/dashboard':  'Dashboard',
  '/admin/analytics':  'Analytics',
  '/admin/events':     'Events & Webinars',
  '/admin/applicants': 'Applicants',
  '/admin/content':    'Newsroom Content',
}

export default function AdminLayout() {
  const nav = useNavigate()
  const loc = useLocation()
  const [mob, setMob] = useState(false)

  const authed = sessionStorage.getItem('tv_admin') === '1'
  if (!authed) {
    // Redirect happens synchronously in render; use effect if needed in strict mode
    nav('/admin/login', { replace: true })
    return null
  }

  const logout = () => {
    sessionStorage.removeItem('tv_admin')
    nav('/admin/login', { replace: true })
  }

  const title = TITLES[loc.pathname] || 'Admin'

  return (
    <div className="adm">
      {mob && <div className="adm-ov" onClick={() => setMob(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`adm-side ${mob ? 'mob-open' : ''}`}>
        <div className="adm-brand">
          <a href="/" className="adm-wm">
            <span className="adm-accent">.</span>ties<span className="adm-accent">verse</span>
          </a>
          <span className="adm-badge">Admin</span>
        </div>

        <nav className="adm-nav">
          {NAV.map(s => (
            <div key={s.h} className="adm-grp">
              <span className="adm-grp-h">{s.h}</span>
              {s.items.map(it => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  className={({ isActive }) => `adm-link${isActive ? ' on' : ''}`}
                  onClick={() => setMob(false)}
                >
                  <span className="adm-ic">{IC[it.ic]}</span>
                  {it.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="adm-foot">
          <a href="/" className="adm-site-lnk">↗ View live site</a>
          <button className="adm-lo-btn" onClick={logout}>
            {IC.logout} Sign out
          </button>
        </div>
      </aside>

      {/* ── Body ── */}
      <div className="adm-body">
        <header className="adm-topbar">
          <button className="adm-mob-tog" onClick={() => setMob(!mob)} aria-label="Menu">
            {IC.menu}
          </button>
          <h1 className="adm-page-title">{title}</h1>
          <div className="adm-topbar-r">
            <button className="adm-bell" aria-label="Notifications">{IC.bell}<span className="adm-bell-dot" /></button>
            <div className="adm-avatar">A</div>
          </div>
        </header>
        <main className="adm-main">
          <Outlet />
        </main>
      </div>

      <style>{css}</style>
    </div>
  )
}

const css = `
/* ── Layout shell ── */
.adm{display:grid;grid-template-columns:220px 1fr;min-height:100vh;background:var(--paper)}
.adm-ov{position:fixed;inset:0;z-index:39;background:rgba(0,0,0,.45);backdrop-filter:blur(2px)}

/* ── Sidebar ── */
.adm-side{background:#0c0b08;display:flex;flex-direction:column;height:100vh;position:sticky;top:0;z-index:40;overflow-y:auto}
.adm-brand{padding:20px 18px;display:flex;align-items:center;gap:9px;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0}
.adm-wm{font-family:'Poppins',var(--sans);font-size:19px;font-weight:700;letter-spacing:-.03em;color:var(--on-dark)}
.adm-accent{color:var(--accent)}
.adm-badge{font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);background:rgba(254,122,0,.14);border:1px solid rgba(254,122,0,.25);border-radius:12px;padding:2px 8px}
.adm-nav{flex:1;padding:12px 10px}
.adm-grp{margin-bottom:22px}
.adm-grp-h{display:block;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,243,230,.3);padding:0 10px 8px}
.adm-link{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:8px;font-size:13.5px;font-weight:500;color:rgba(255,243,230,.58);transition:background .18s,color .18s;margin-bottom:1px}
.adm-link:hover{background:rgba(255,255,255,.06);color:rgba(255,243,230,.9)}
.adm-link.on{background:rgba(254,122,0,.14);color:#fff;font-weight:600}
.adm-link.on .adm-ic{color:var(--accent)}
.adm-ic{flex:none;display:grid;place-items:center;color:rgba(255,243,230,.4)}
.adm-link:hover .adm-ic{color:rgba(255,243,230,.7)}
.adm-foot{padding:12px 10px;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0}
.adm-site-lnk{display:block;font-size:12px;color:rgba(255,243,230,.35);padding:7px 11px;border-radius:8px;transition:color .2s,background .2s}
.adm-site-lnk:hover{color:var(--on-dark);background:rgba(255,255,255,.05)}
.adm-lo-btn{display:flex;align-items:center;gap:8px;width:100%;padding:9px 11px;background:none;border:none;color:rgba(255,243,230,.45);font-size:13px;font-weight:500;cursor:pointer;border-radius:8px;transition:background .18s,color .18s;font-family:inherit;margin-top:2px}
.adm-lo-btn:hover{background:rgba(220,38,38,.14);color:#f87171}

/* ── Top bar ── */
.adm-body{display:flex;flex-direction:column;overflow:hidden;min-height:100vh}
.adm-topbar{height:56px;background:#fff;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:14px;padding:0 26px;position:sticky;top:0;z-index:30;flex-shrink:0}
.adm-page-title{font-size:15px;font-weight:700;color:var(--ink)}
.adm-topbar-r{margin-left:auto;display:flex;align-items:center;gap:12px}
.adm-bell{background:none;border:none;color:var(--soft);cursor:pointer;position:relative;display:grid;place-items:center;padding:4px}
.adm-bell:hover{color:var(--ink)}
.adm-bell-dot{position:absolute;top:3px;right:3px;width:7px;height:7px;background:var(--accent);border-radius:50%;border:1.5px solid #fff}
.adm-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(150deg,var(--accent),#ffb152);color:#3a1c00;font-family:var(--serif);font-size:14px;font-weight:600;display:grid;place-items:center}
.adm-mob-tog{display:none;background:none;border:none;color:var(--ink);padding:4px;cursor:pointer}
.adm-main{flex:1;padding:28px;overflow-y:auto}

/* ── Mobile ── */
@media(max-width:820px){
  .adm{grid-template-columns:1fr}
  .adm-side{position:fixed;left:-220px;top:0;height:100%;transition:left .28s var(--ease)}
  .adm-side.mob-open{left:0}
  .adm-mob-tog{display:grid}
  .adm-main{padding:18px}
}
`
