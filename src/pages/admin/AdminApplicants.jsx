import React, { useState, useMemo } from 'react'

// ── Mock data — replace with Cloudflare D1 API call ──
const INIT_APPLICANTS = [
  { id: 'app_001', name: 'Arjun Mehta',     email: 'arjun.m@gmail.com',    phone: '+91 98765 43210', role: 'Frontend Engineer (React)',         dept: 'Engineering',      portfolio: 'github.com/arjunm',   github: 'github.com/arjunm',   status: 'shortlisted', date: 'Jun 14, 2026', cover: 'Huge fan of the TIES maps. Built 3 full-stack apps, currently learning Rust.' },
  { id: 'app_002', name: 'Priya Sharma',    email: 'priya.s@outlook.com',  phone: '+91 87654 32109', role: 'Content Editor',                   dept: 'Content',          portfolio: '',                    github: '',            status: 'applied',     date: 'Jun 13, 2026', cover: '4 years writing on geopolitics for regional outlets. Fluent in Hindi, English, Gujarati.' },
  { id: 'app_003', name: 'Rohan Das',       email: 'rohan.d@gmail.com',    phone: '+91 76543 21098', role: 'AI / ML Engineer',                 dept: 'Engineering',      portfolio: 'github.com/rohand',   github: 'github.com/rohand',   status: 'interviewed', date: 'Jun 12, 2026', cover: 'Published two ML papers. Focus on NLP and knowledge graphs.' },
  { id: 'app_004', name: 'Ananya Krishnan', email: 'ananya.k@gmail.com',   phone: '+91 65432 10987', role: 'UI/UX Designer',                   dept: 'Product & Design', portfolio: 'behance.net/ananyak', github: '',            status: 'offered',     date: 'Jun 10, 2026', cover: 'Designed editorial systems at two media startups. Strong motion graphics background.' },
  { id: 'app_005', name: 'Vikram Patel',    email: 'vikram.p@yahoo.com',   phone: '+91 54321 09876', role: 'Video Editor (Reels + YouTube)',    dept: 'Media',            portfolio: '',                    github: '',            status: 'rejected',    date: 'Jun 9, 2026',  cover: '2 years editing for a regional news channel.' },
  { id: 'app_006', name: 'Shreya Gupta',    email: 'shreya.g@gmail.com',   phone: '+91 43210 98765', role: 'Backend Engineer (Node / Python)',  dept: 'Engineering',      portfolio: 'github.com/shreyag',  github: 'github.com/shreyag', status: 'applied',     date: 'Jun 9, 2026',  cover: 'Built the backend for a 50K-user edtech app. Comfortable with microservices and Kafka.' },
  { id: 'app_007', name: 'Karan Singh',     email: 'karan.s@gmail.com',    phone: '+91 32109 87654', role: 'Social Media Manager (Instagram)', dept: 'Media',            portfolio: '',                    github: '',            status: 'shortlisted', date: 'Jun 8, 2026',  cover: 'Grew an Instagram page from 0 to 180K in 14 months in the geopolitics niche.' },
  { id: 'app_008', name: 'Neha Joshi',      email: 'neha.j@gmail.com',     phone: '+91 21098 76543', role: 'Human Resources (HR)',             dept: 'Operations',       portfolio: '',                    github: '',            status: 'applied',     date: 'Jun 7, 2026',  cover: 'HR generalist, 2 years at a Series-B startup (60-person team). Familiar with remote hiring.' },
  { id: 'app_009', name: 'Dev Malhotra',    email: 'dev.m@proton.me',      phone: '+91 90876 54321', role: 'DevOps / Platform Engineer',       dept: 'Engineering',      portfolio: 'github.com/devmlh',   github: 'github.com/devmlh',   status: 'applied',     date: 'Jun 6, 2026',  cover: 'Managed infra for a 10M-user app on AWS. Terraform, k8s, CI/CD pipelines.' },
  { id: 'app_010', name: 'Aisha Siddiqui',  email: 'aisha.s@gmail.com',    phone: '+91 80765 43210', role: 'Content Writer (UPSC)',            dept: 'Content',          portfolio: '',                    github: '',            status: 'interviewed', date: 'Jun 5, 2026',  cover: 'Civil services aspirant + educator. Written UPSC material for 3 coaching platforms.' },
]

const STATUSES = ['applied', 'shortlisted', 'interviewed', 'offered', 'rejected']
const DEPTS = ['All', 'Engineering', 'Content', 'Media', 'Product & Design', 'Operations']

const STATUS_STYLE = {
  applied:     { l: 'Applied',     c: '#2563eb', bg: '#eff6ff', bd: '#bfdbfe' },
  shortlisted: { l: 'Shortlisted', c: '#d97706', bg: '#fffbeb', bd: '#fde68a' },
  interviewed: { l: 'Interviewed', c: '#7c3aed', bg: '#f5f3ff', bd: '#ddd6fe' },
  offered:     { l: 'Offered',     c: '#16a34a', bg: '#f0fdf4', bd: '#bbf7d0' },
  rejected:    { l: 'Rejected',    c: '#dc2626', bg: '#fef2f2', bd: '#fecaca' },
}

function StatusPill({ s, small }) {
  const m = STATUS_STYLE[s] || STATUS_STYLE.applied
  return (
    <span style={{ color: m.c, background: m.bg, border: `1px solid ${m.bd}`, borderRadius: 20, padding: small ? '2px 9px' : '4px 12px', fontSize: small ? 11 : 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
      {m.l}
    </span>
  )
}

function exportCSV(rows) {
  const headers = ['Name', 'Email', 'Phone', 'Role', 'Department', 'Status', 'Applied', 'Portfolio', 'GitHub']
  const body = rows.map(a => [a.name, a.email, a.phone, a.role, a.dept, a.status, a.date, a.portfolio, a.github])
  const csv = [headers, ...body].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = `applicants-${new Date().toISOString().slice(0, 10)}.csv`; a.click()
  URL.revokeObjectURL(url)
}

function Toast({ toasts }) {
  return (
    <div className="ap-toaster">
      {toasts.map(t => <div key={t.id} className={`ap-toast ap-toast-${t.type}`}>{t.msg}</div>)}
    </div>
  )
}
function useToast() {
  const [toasts, setToasts] = useState([])
  const add = (msg, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }
  return { toasts, add }
}

export default function AdminApplicants() {
  const { toasts, add } = useToast()
  const [applicants, setApplicants] = useState(INIT_APPLICANTS)
  const [search, setSearch] = useState('')
  const [deptF, setDeptF]   = useState('All')
  const [statusF, setStatusF] = useState('All')
  const [selected, setSelected] = useState(new Set())
  const [detail, setDetail] = useState(null)        // applicant object for drawer
  const [bulkStatus, setBulkStatus] = useState('')
  const [offerModal, setOfferModal] = useState(null) // applicant object for offer gen
  const [offerLoading, setOfferLoading] = useState(false)

  const counts = useMemo(() => {
    const c = {}
    STATUSES.forEach(s => { c[s] = applicants.filter(a => a.status === s).length })
    return c
  }, [applicants])

  const filtered = useMemo(() => {
    return applicants.filter(a => {
      const q = search.toLowerCase()
      const matchQ = !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
      const matchD = deptF === 'All' || a.dept === deptF
      const matchS = statusF === 'All' || a.status === statusF
      return matchQ && matchD && matchS
    })
  }, [applicants, search, deptF, statusF])

  const allChecked = filtered.length > 0 && filtered.every(a => selected.has(a.id))

  function toggleAll() {
    if (allChecked) setSelected(new Set())
    else setSelected(new Set(filtered.map(a => a.id)))
  }

  function toggleOne(id) {
    setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  function updateStatus(id, s) {
    setApplicants(arr => arr.map(a => a.id === id ? { ...a, status: s } : a))
    add(`Status updated to "${STATUS_STYLE[s].l}"`)
    if (detail?.id === id) setDetail(d => ({ ...d, status: s }))
  }

  function bulkUpdate() {
    if (!bulkStatus || selected.size === 0) return
    setApplicants(arr => arr.map(a => selected.has(a.id) ? { ...a, status: bulkStatus } : a))
    add(`${selected.size} applicants moved to "${STATUS_STYLE[bulkStatus].l}"`)
    setSelected(new Set()); setBulkStatus('')
  }

  function generateOffer() {
    setOfferLoading(true)
    // Replace with real POST /admin/generate-offer API call
    setTimeout(() => {
      setOfferLoading(false)
      setOfferModal(null)
      add(`Offer letter generated for ${offerModal.name}`)
    }, 1800)
  }

  const av = (name) => name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('')

  return (
    <div className="ap">
      <Toast toasts={toasts} />

      {/* ── Status pipeline bar ── */}
      <div className="ap-pipeline">
        {STATUSES.map(s => {
          const m = STATUS_STYLE[s]
          return (
            <button
              key={s}
              className={`ap-pipe-btn ${statusF === s ? 'on' : ''}`}
              style={statusF === s ? { borderColor: m.c, color: m.c, background: m.bg } : {}}
              onClick={() => setStatusF(statusF === s ? 'All' : s)}
            >
              <span className="ap-pipe-n" style={{ color: statusF === s ? m.c : 'var(--ink)' }}>{counts[s]}</span>
              <span className="ap-pipe-l">{m.l}</span>
            </button>
          )
        })}
        <button className={`ap-pipe-btn ${statusF === 'All' ? 'on' : ''}`} style={statusF === 'All' ? { borderColor: 'var(--ink)', color: 'var(--ink)', background: 'var(--cream)' } : {}} onClick={() => setStatusF('All')}>
          <span className="ap-pipe-n">{applicants.length}</span>
          <span className="ap-pipe-l">All</span>
        </button>
      </div>

      {/* ── Filter bar ── */}
      <div className="ap-filterbar">
        <input className="ap-search" placeholder="Search name, email, role…" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="ap-sel" value={deptF} onChange={e => setDeptF(e.target.value)}>
          {DEPTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <div className="ap-filter-right">
          <button className="btn btn-outline ap-export-btn" onClick={() => exportCSV(filtered.length < applicants.length || selected.size > 0 ? (selected.size > 0 ? filtered.filter(a => selected.has(a.id)) : filtered) : applicants)}>
            ↓ Export CSV {selected.size > 0 ? `(${selected.size})` : ''}
          </button>
        </div>
      </div>

      {/* ── Bulk action bar ── */}
      {selected.size > 0 && (
        <div className="ap-bulk">
          <span className="ap-bulk-count">{selected.size} selected</span>
          <select className="ap-sel ap-bulk-sel" value={bulkStatus} onChange={e => setBulkStatus(e.target.value)}>
            <option value="">Move to…</option>
            {STATUSES.map(s => <option key={s} value={s}>{STATUS_STYLE[s].l}</option>)}
          </select>
          <button className="btn btn-dark ap-bulk-btn" onClick={bulkUpdate} disabled={!bulkStatus}>Apply</button>
          <button className="ap-bulk-clear" onClick={() => setSelected(new Set())}>Clear selection</button>
        </div>
      )}

      {/* ── Table ── */}
      <div className="ap-table-wrap">
        <table className="ap-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={allChecked} onChange={toggleAll} /></th>
              <th>Applicant</th>
              <th>Role</th>
              <th>Applied</th>
              <th>Status</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className={selected.has(a.id) ? 'ap-row-sel' : ''}>
                <td><input type="checkbox" checked={selected.has(a.id)} onChange={() => toggleOne(a.id)} /></td>
                <td>
                  <div className="ap-name-cell">
                    <span className="ap-av">{av(a.name)}</span>
                    <div>
                      <button className="ap-name-btn" onClick={() => setDetail(a)}>{a.name}</button>
                      <span className="ap-email">{a.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="ap-role">{a.role}</span>
                  <span className="ap-dept">{a.dept}</span>
                </td>
                <td className="ap-td-sm">{a.date}</td>
                <td>
                  <select className="ap-status-sel" value={a.status} onChange={e => updateStatus(a.id, e.target.value)} style={{ color: STATUS_STYLE[a.status].c }}>
                    {STATUSES.map(s => <option key={s} value={s}>{STATUS_STYLE[s].l}</option>)}
                  </select>
                </td>
                <td>
                  <div className="ap-links">
                    {a.github   && <a className="ap-link" href={`https://${a.github}`} target="_blank" rel="noreferrer">GitHub</a>}
                    {a.portfolio && a.portfolio !== a.github && <a className="ap-link" href={`https://${a.portfolio}`} target="_blank" rel="noreferrer">Portfolio</a>}
                  </div>
                </td>
                <td>
                  <div className="ap-row-acts">
                    <button className="ap-act" onClick={() => setDetail(a)}>View</button>
                    {a.status === 'offered' && <button className="ap-act ap-act-offer" onClick={() => setOfferModal(a)}>Generate Offer</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="ap-empty">No applicants match your filters.</p>}
      </div>

      {/* ── Applicant detail drawer ── */}
      {detail && (
        <>
          <div className="ap-drawer-ov" onClick={() => setDetail(null)} />
          <div className="ap-drawer">
            <div className="ap-drawer-head">
              <div className="ap-drawer-av">{av(detail.name)}</div>
              <div>
                <h2 className="serif ap-drawer-name">{detail.name}</h2>
                <span className="ap-drawer-role">{detail.role}</span>
              </div>
              <button className="ap-drawer-close" onClick={() => setDetail(null)}>✕</button>
            </div>
            <div className="ap-drawer-body">
              <StatusPill s={detail.status} />

              <div className="ap-drawer-section">
                <h4>Contact</h4>
                <p>{detail.email}</p>
                <p>{detail.phone}</p>
              </div>
              <div className="ap-drawer-section">
                <h4>Department</h4>
                <p>{detail.dept}</p>
              </div>
              <div className="ap-drawer-section">
                <h4>Applied</h4>
                <p>{detail.date}</p>
              </div>
              {(detail.github || detail.portfolio) && (
                <div className="ap-drawer-section">
                  <h4>Links</h4>
                  {detail.github    && <p><a href={`https://${detail.github}`} target="_blank" rel="noreferrer" className="ap-drawer-lnk">↗ GitHub</a></p>}
                  {detail.portfolio && detail.portfolio !== detail.github && <p><a href={`https://${detail.portfolio}`} target="_blank" rel="noreferrer" className="ap-drawer-lnk">↗ Portfolio</a></p>}
                </div>
              )}
              {detail.cover && (
                <div className="ap-drawer-section">
                  <h4>Cover note</h4>
                  <p className="ap-drawer-cover">{detail.cover}</p>
                </div>
              )}

              <div className="ap-drawer-section">
                <h4>Update status</h4>
                <div className="ap-drawer-statuses">
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      className={`ap-drawer-s-btn ${detail.status === s ? 'on' : ''}`}
                      style={detail.status === s ? { background: STATUS_STYLE[s].bg, borderColor: STATUS_STYLE[s].bd, color: STATUS_STYLE[s].c } : {}}
                      onClick={() => updateStatus(detail.id, s)}
                    >
                      {STATUS_STYLE[s].l}
                    </button>
                  ))}
                </div>
              </div>

              {detail.status === 'offered' && (
                <button className="btn btn-primary ap-drawer-offer-btn" onClick={() => { setDetail(null); setOfferModal(detail) }}>
                  Generate Offer Letter
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── Offer letter modal ── */}
      {offerModal && (
        <div className="ap-modal-ov" onClick={e => e.target === e.currentTarget && setOfferModal(null)}>
          <div className="ap-modal">
            <div className="ap-modal-head">
              <h2 className="serif">Generate Offer Letter</h2>
              <button className="ap-drawer-close" onClick={() => setOfferModal(null)}>✕</button>
            </div>
            <div className="ap-modal-body">
              <p className="ap-modal-sub">The Python script on EC2 will fill the PDF template from Cloudflare R2 and return a pre-signed download link.</p>
              <div className="ap-modal-info">
                <div className="ap-mi-row"><span>Candidate</span><strong>{offerModal.name}</strong></div>
                <div className="ap-mi-row"><span>Role</span><strong>{offerModal.role}</strong></div>
                <div className="ap-mi-row"><span>Department</span><strong>{offerModal.dept}</strong></div>
              </div>
              <div className="ap-modal-fields">
                <div className="ap-mf">
                  <label>Start date</label>
                  <input type="date" className="ev-inp" defaultValue="2026-07-01" />
                </div>
                <div className="ap-mf">
                  <label>Stipend / CTC</label>
                  <input type="text" className="ev-inp" placeholder="e.g. ₹15,000/month" />
                </div>
                <div className="ap-mf">
                  <label>Duration</label>
                  <input type="text" className="ev-inp" placeholder="e.g. 3 months" />
                </div>
                <div className="ap-mf">
                  <label>City</label>
                  <input type="text" className="ev-inp" placeholder="e.g. Bengaluru" />
                </div>
                <div className="ap-mf" style={{ gridColumn: '1/-1' }}>
                  <label>Template (from R2)</label>
                  <select className="ev-inp">
                    <option>offer-engineering-2026-h1.pdf</option>
                    <option>offer-media-2026-h1.pdf</option>
                    <option>offer-operations-2026-h1.pdf</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="ap-modal-foot">
              <button className="btn btn-outline" onClick={() => setOfferModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={generateOffer} disabled={offerLoading}>
                {offerLoading ? 'Generating…' : 'Generate & Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{css}</style>
    </div>
  )
}

const css = `
.ap{display:flex;flex-direction:column;gap:14px}

/* toaster */
.ap-toaster{position:fixed;bottom:24px;right:24px;z-index:200;display:flex;flex-direction:column;gap:8px}
.ap-toast{padding:12px 18px;border-radius:8px;font-size:13.5px;font-weight:600;background:var(--ink);color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.2);animation:apIn .3s ease}
.ap-toast-error{background:#dc2626}
@keyframes apIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

/* pipeline */
.ap-pipeline{display:flex;gap:8px;flex-wrap:wrap}
.ap-pipe-btn{display:flex;flex-direction:column;align-items:center;padding:10px 16px;border:1.5px solid var(--rule);border-radius:10px;background:#fff;cursor:pointer;transition:all .18s;min-width:80px;font-family:inherit}
.ap-pipe-btn:hover{border-color:var(--ink)}
.ap-pipe-n{font-size:22px;font-weight:800;color:var(--ink);line-height:1}
.ap-pipe-l{font-size:11px;font-weight:700;letter-spacing:.04em;color:var(--soft);margin-top:2px}

/* filter bar */
.ap-filterbar{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.ap-search{flex:1;min-width:200px;padding:10px 16px;border:1px solid var(--rule);border-radius:var(--radius);font-size:13.5px;font-family:inherit;color:var(--ink);transition:border-color .2s}
.ap-search:focus{outline:none;border-color:var(--accent)}
.ap-sel{padding:10px 14px;border:1px solid var(--rule);border-radius:var(--radius);font-size:13.5px;font-family:inherit;color:var(--ink);background:#fff;cursor:pointer}
.ap-filter-right{margin-left:auto}
.ap-export-btn{font-size:13px;padding:9px 16px}

/* bulk bar */
.ap-bulk{display:flex;align-items:center;gap:10px;background:var(--cream);border:1px solid var(--rule);border-radius:10px;padding:10px 16px;flex-wrap:wrap}
.ap-bulk-count{font-size:13.5px;font-weight:700;color:var(--ink)}
.ap-bulk-sel{padding:7px 12px;border:1px solid var(--rule);border-radius:var(--radius);font-size:13px;font-family:inherit;color:var(--ink);background:#fff}
.ap-bulk-btn{font-size:13px;padding:8px 16px}
.ap-bulk-clear{background:none;border:none;font-size:13px;color:var(--soft);cursor:pointer;font-family:inherit}
.ap-bulk-clear:hover{color:var(--ink)}

/* table */
.ap-table-wrap{background:#fff;border:1px solid var(--rule);border-radius:12px;overflow:hidden}
.ap-table{width:100%;border-collapse:collapse;font-size:13px}
.ap-table th{text-align:left;font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);padding:12px 14px;background:#fafaf8;border-bottom:1px solid var(--rule)}
.ap-table td{padding:13px 14px;border-bottom:1px solid var(--rule);vertical-align:middle}
.ap-table tr:last-child td{border-bottom:none}
.ap-row-sel td{background:#fffbeb}
.ap-name-cell{display:flex;align-items:center;gap:10px}
.ap-av{width:32px;height:32px;border-radius:50%;background:linear-gradient(150deg,var(--accent),#ffb152);color:#3a1c00;font-family:var(--serif);font-size:12px;font-weight:600;display:grid;place-items:center;flex:none}
.ap-name-btn{background:none;border:none;font-weight:700;font-size:13.5px;color:var(--ink);cursor:pointer;text-align:left;font-family:inherit;padding:0;display:block;transition:color .2s}
.ap-name-btn:hover{color:var(--accent)}
.ap-email{display:block;font-size:11.5px;color:var(--soft)}
.ap-role{display:block;font-weight:600;font-size:13px;color:var(--ink)}
.ap-dept{display:block;font-size:11.5px;color:var(--soft)}
.ap-td-sm{font-size:12.5px;color:var(--soft);white-space:nowrap}
.ap-status-sel{border:none;background:transparent;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit;padding:0}
.ap-links{display:flex;gap:6px;flex-wrap:wrap}
.ap-link{font-size:11.5px;font-weight:600;color:var(--accent);white-space:nowrap}
.ap-row-acts{display:flex;gap:6px}
.ap-act{background:none;border:1px solid var(--rule);border-radius:var(--radius);padding:5px 10px;font-size:12px;font-weight:600;color:var(--ink);cursor:pointer;font-family:inherit;transition:all .18s}
.ap-act:hover{border-color:var(--accent);color:var(--accent)}
.ap-act-offer{border-color:rgba(254,122,0,.3);color:var(--accent);background:rgba(254,122,0,.06)}
.ap-act-offer:hover{background:rgba(254,122,0,.12)}
.ap-empty{padding:40px;text-align:center;color:var(--soft);font-size:14px}

/* drawer */
.ap-drawer-ov{position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.35)}
.ap-drawer{position:fixed;right:0;top:0;bottom:0;z-index:81;width:360px;max-width:90vw;background:#fff;box-shadow:-20px 0 60px rgba(0,0,0,.15);display:flex;flex-direction:column;animation:drawerIn .28s var(--ease)}
@keyframes drawerIn{from{transform:translateX(40px);opacity:0}to{transform:none;opacity:1}}
.ap-drawer-head{display:flex;align-items:center;gap:13px;padding:20px;border-bottom:1px solid var(--rule);flex-shrink:0}
.ap-drawer-av{width:44px;height:44px;border-radius:50%;background:linear-gradient(150deg,var(--accent),#ffb152);color:#3a1c00;font-family:var(--serif);font-size:16px;font-weight:600;display:grid;place-items:center;flex:none}
.ap-drawer-name{font-size:20px}
.ap-drawer-role{font-size:12.5px;color:var(--soft)}
.ap-drawer-close{margin-left:auto;background:none;border:none;font-size:18px;color:var(--soft);cursor:pointer;line-height:1}
.ap-drawer-close:hover{color:var(--ink)}
.ap-drawer-body{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:18px}
.ap-drawer-section h4{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);margin-bottom:6px}
.ap-drawer-section p{font-size:14px;color:var(--ink)}
.ap-drawer-lnk{color:var(--accent);font-weight:600}
.ap-drawer-cover{font-size:13.5px;color:var(--soft);line-height:1.6;font-style:italic}
.ap-drawer-statuses{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.ap-drawer-s-btn{background:#fff;border:1.5px solid var(--rule);border-radius:20px;padding:5px 13px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .18s}
.ap-drawer-s-btn:hover{border-color:var(--ink)}
.ap-drawer-s-btn.on{font-weight:700}
.ap-drawer-offer-btn{width:100%;justify-content:center;font-size:13.5px}

/* offer modal */
.ap-modal-ov{position:fixed;inset:0;z-index:90;background:rgba(0,0,0,.5);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:24px}
.ap-modal{background:#fff;border-radius:18px;width:100%;max-width:520px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 40px 80px rgba(0,0,0,.3);animation:modalIn .28s var(--ease)}
@keyframes modalIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}
.ap-modal-head{display:flex;align-items:center;justify-content:space-between;padding:22px 24px;border-bottom:1px solid var(--rule);flex-shrink:0}
.ap-modal-head h2{font-size:20px}
.ap-modal-body{flex:1;overflow-y:auto;padding:22px 24px;display:flex;flex-direction:column;gap:16px}
.ap-modal-sub{font-size:13.5px;color:var(--soft);line-height:1.55}
.ap-modal-info{border:1px solid var(--rule);border-radius:10px;overflow:hidden}
.ap-mi-row{display:flex;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--rule);font-size:13.5px}
.ap-mi-row:last-child{border-bottom:none}
.ap-mi-row span{color:var(--soft)}
.ap-mi-row strong{font-weight:700}
.ap-modal-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ap-mf{display:flex;flex-direction:column;gap:6px}
.ap-mf label{font-size:12px;font-weight:700;color:var(--ink)}
.ap-modal-foot{padding:18px 24px;border-top:1px solid var(--rule);display:flex;gap:10px;justify-content:flex-end;flex-shrink:0}
`
