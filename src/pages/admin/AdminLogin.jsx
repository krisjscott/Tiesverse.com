import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'ties@admin2026'

export default function AdminLogin() {
  const nav = useNavigate()
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [show, setShow] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (!pw) { setErr('Password required.'); return }
    setBusy(true)
    // Replace setTimeout with real API call when backend is live
    setTimeout(() => {
      if (pw === ADMIN_PASS) {
        sessionStorage.setItem('tv_admin', '1')
        nav('/admin/dashboard', { replace: true })
      } else {
        setErr('Incorrect password.')
        setBusy(false)
      }
    }, 380)
  }

  return (
    <div className="lg-page">
      <div className="lg-card">
        <div className="lg-top">
          <span className="lg-wm"><span className="lg-accent">.</span>ties<span className="lg-accent">verse</span></span>
          <span className="lg-tag">Admin</span>
        </div>
        <h1 className="serif lg-h">Sign in</h1>
        <p className="lg-sub">Tiesverse team members only.</p>
        <form onSubmit={submit} className="lg-form">
          <div className="lg-field">
            <label className="lg-label">Password</label>
            <div className="lg-pw-wrap">
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                autoFocus
                placeholder="Enter admin password"
                onChange={e => { setPw(e.target.value); setErr('') }}
                className="lg-input"
              />
              <button type="button" className="lg-show" onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {err && <p className="lg-err">{err}</p>}
          <button className="btn btn-primary lg-btn" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>
        <div className="lg-divider" />
        <a className="lg-back" href="/">← Back to tiesverse.com</a>
      </div>
      <p className="lg-foot">Tiesverse Foundation · Admin Portal · Secured</p>
      <style>{css}</style>
    </div>
  )
}

const css = `
.lg-page{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0c0b08;padding:24px;gap:18px}
.lg-card{width:100%;max-width:400px;background:#fff;border-radius:18px;padding:44px 40px;box-shadow:0 48px 96px rgba(0,0,0,.55)}
.lg-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px}
.lg-wm{font-family:'Poppins',var(--sans);font-size:21px;font-weight:700;letter-spacing:-.03em;color:var(--ink)}
.lg-accent{color:var(--accent)}
.lg-tag{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--soft);border:1px solid var(--rule);border-radius:20px;padding:4px 10px}
.lg-h{font-size:30px;margin-bottom:6px}
.lg-sub{color:var(--soft);font-size:14px;margin-bottom:28px}
.lg-form{display:flex;flex-direction:column;gap:14px}
.lg-field{display:flex;flex-direction:column;gap:7px}
.lg-label{font-size:12.5px;font-weight:700;color:var(--ink);letter-spacing:.03em}
.lg-pw-wrap{position:relative}
.lg-input{width:100%;padding:13px 56px 13px 16px;border:1.5px solid var(--rule);border-radius:var(--radius);font-size:15px;font-family:inherit;color:var(--ink);background:#fff;transition:border-color .2s}
.lg-input:focus{outline:none;border-color:var(--accent)}
.lg-show{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:12.5px;font-weight:700;color:var(--soft);cursor:pointer;font-family:inherit}
.lg-show:hover{color:var(--accent)}
.lg-err{font-size:13px;font-weight:600;color:#dc2626;margin:-4px 0}
.lg-btn{width:100%;justify-content:center;font-size:15px}
.lg-divider{border:none;border-top:1px solid var(--rule);margin:6px 0}
.lg-back{display:block;text-align:center;font-size:13px;color:var(--soft);transition:color .2s}
.lg-back:hover{color:var(--ink)}
.lg-foot{font-size:11.5px;color:rgba(255,243,230,.25);letter-spacing:.04em}
`
