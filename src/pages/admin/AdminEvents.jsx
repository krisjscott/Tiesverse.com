import React, { useState, useMemo } from 'react'
import { CITY_EVENTS, WEBINARS } from '../../data/site'

// Mock registration counts — replace with Turso API call
const REGS = {
  'India AI Impact Summit': 350,
  'Geopolitics Live: The Delhi Salon': 67,
  'The Bharat Age: UPSC Strategy Meetup': 45,
  'Newsroom Masterclass: Explainers that Travel': 12,
  'Tabloid Live: Reading the World': 28,
  'Finties Forum: Markets & Macro': 15,
  'Geo Atlas Night: Maps & Power': 8,
}

const BLANK_EVENT = { title: '', category: 'Salon', city: '', venue: '', date: '', time: '', host: '', price: 0, orig: '', capacity: '', note: '', past: false }
const BLANK_WEBINAR = { date: '', time: '', speaker: '', org: '', topic: '', tag: 'Upcoming', kind: 'webinar', poster: '', register: '' }
const EVENT_CATS = ['Summit', 'Salon', 'Meetup', 'Workshop', 'Roundtable', 'Conference']

function Toast({ toasts }) {
  return (
    <div className="ev-toaster">
      {toasts.map(t => <div key={t.id} className={`ev-toast ev-toast-${t.type}`}>{t.msg}</div>)}
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

export default function AdminEvents() {
  const { toasts, add } = useToast()
  const [tab, setTab]       = useState('events')
  const [events, setEvents] = useState(CITY_EVENTS)
  const [webs, setWebs]     = useState(WEBINARS)
  const [search, setSearch] = useState('')
  const [modal, setModal]   = useState(null)   // null | { mode: 'add'|'edit', data, idx }
  const [form, setForm]     = useState({})
  const [del, setDel]       = useState(null)   // idx to confirm delete

  const isEvent = tab === 'events'

  const filtered = useMemo(() => {
    const src = isEvent ? events : webs
    if (!search) return src
    const q = search.toLowerCase()
    return src.filter(e => (e.title || e.topic || '').toLowerCase().includes(q) || (e.city || '').toLowerCase().includes(q) || (e.speaker || '').toLowerCase().includes(q))
  }, [tab, events, webs, search])

  function openAdd() {
    setForm(isEvent ? { ...BLANK_EVENT } : { ...BLANK_WEBINAR })
    setModal({ mode: 'add' })
  }

  function openEdit(item, idx) {
    setForm({ ...item })
    setModal({ mode: 'edit', idx })
  }

  function clone(item) {
    const copy = { ...item, title: (item.title || item.topic) + ' (Copy)', date: '' }
    if (isEvent) setEvents(e => [copy, ...e])
    else setWebs(e => [copy, ...e])
    add(`Cloned: ${item.title || item.topic}`)
  }

  function save() {
    if (modal.mode === 'add') {
      if (isEvent) setEvents(e => [form, ...e])
      else setWebs(e => [form, ...e])
      add('Event added successfully')
    } else {
      if (isEvent) setEvents(e => e.map((x, i) => i === modal.idx ? form : x))
      else setWebs(e => e.map((x, i) => i === modal.idx ? form : x))
      add('Changes saved')
    }
    setModal(null)
  }

  function confirmDelete() {
    if (isEvent) setEvents(e => e.filter((_, i) => i !== del))
    else setWebs(e => e.filter((_, i) => i !== del))
    add('Deleted', 'error')
    setDel(null)
  }

  function Field({ label, name, type = 'text', options, full }) {
    return (
      <div className={`ev-field ${full ? 'ev-field-full' : ''}`}>
        <label className="ev-fl">{label}</label>
        {options
          ? <select className="ev-inp" value={form[name] || ''} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          : type === 'textarea'
            ? <textarea className="ev-inp ev-ta" value={form[name] || ''} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} rows={3} />
            : <input className="ev-inp" type={type} value={form[name] || ''} onChange={e => setForm(f => ({ ...f, [name]: type === 'number' ? +e.target.value : e.target.value }))} />
        }
      </div>
    )
  }

  return (
    <div className="ev">
      <Toast toasts={toasts} />

      {/* ── Tabs + actions ── */}
      <div className="ev-toprow">
        <div className="ev-tabs">
          {['events', 'webinars'].map(t => (
            <button key={t} className={`ev-tab ${tab === t ? 'on' : ''}`} onClick={() => { setTab(t); setSearch('') }}>
              {t === 'events' ? 'City Events' : 'Webinars & Workshops'}
              <span>{t === 'events' ? events.length : webs.length}</span>
            </button>
          ))}
        </div>
        <div className="ev-actions">
          <input className="ev-search" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
          <button className="btn btn-primary ev-add-btn" onClick={openAdd}>
            + Add {isEvent ? 'Event' : 'Webinar'}
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="ev-table-wrap">
        {isEvent ? (
          <table className="ev-table">
            <thead>
              <tr><th>Event</th><th>Date</th><th>City</th><th>Category</th><th>Price</th><th>Registered</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => {
                const regs = REGS[e.title] || 0
                const pct  = e.capacity ? Math.round((regs / e.capacity) * 100) : null
                return (
                  <tr key={i} className={e.past ? 'ev-row-past' : ''}>
                    <td>
                      <div className="ev-cell-title">
                        <strong>{e.title}</strong>
                        {e.flagship && <span className="ev-flag-badge">Flagship</span>}
                      </div>
                      <span className="ev-cell-sub">{e.host}</span>
                    </td>
                    <td className="ev-td-sm">{e.date}</td>
                    <td className="ev-td-sm">{e.city || '—'}</td>
                    <td><span className="ev-cat-chip">{e.category}</span></td>
                    <td className="ev-td-sm">{e.price ? `₹${e.price}` : 'Free'}</td>
                    <td>
                      <div className="ev-regs">
                        <span>{regs}{e.capacity ? `/${e.capacity}` : ''}</span>
                        {pct !== null && (
                          <div className="ev-reg-bar"><div style={{ width: `${pct}%`, background: pct > 80 ? '#16a34a' : 'var(--accent)' }} /></div>
                        )}
                      </div>
                    </td>
                    <td><span className={`ev-status-chip ${e.past ? 'past' : 'upcoming'}`}>{e.past ? 'Past' : 'Upcoming'}</span></td>
                    <td>
                      <div className="ev-row-acts">
                        <button className="ev-act" onClick={() => openEdit(e, i)}>Edit</button>
                        <button className="ev-act" onClick={() => clone(e)}>Clone</button>
                        <button className="ev-act ev-act-del" onClick={() => setDel(i)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <table className="ev-table">
            <thead>
              <tr><th>Topic</th><th>Date</th><th>Speaker</th><th>Organisation</th><th>Type</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((w, i) => (
                <tr key={i}>
                  <td>
                    <strong className="ev-cell-title-sm">{w.topic}</strong>
                    <span className="ev-cell-sub">{w.time}</span>
                  </td>
                  <td className="ev-td-sm">{w.date}</td>
                  <td className="ev-td-sm">{w.speaker}</td>
                  <td className="ev-td-sm">{w.org}</td>
                  <td><span className="ev-cat-chip">{w.kind === 'workshop' ? 'Workshop' : 'Webinar'}</span></td>
                  <td><span className={`ev-status-chip ${w.tag === 'Upcoming' ? 'upcoming' : 'past'}`}>{w.tag || 'Past'}</span></td>
                  <td>
                    <div className="ev-row-acts">
                      <button className="ev-act" onClick={() => openEdit(w, i)}>Edit</button>
                      <button className="ev-act ev-act-del" onClick={() => setDel(i)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filtered.length === 0 && <p className="ev-empty">No results. Try a different search.</p>}
      </div>

      {/* ── Add/Edit Modal ── */}
      {modal && (
        <div className="ev-modal-ov" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="ev-modal">
            <div className="ev-modal-head">
              <h2 className="serif">{modal.mode === 'add' ? 'Add' : 'Edit'} {isEvent ? 'Event' : 'Webinar'}</h2>
              <button className="ev-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="ev-modal-body">
              {isEvent ? (
                <div className="ev-fields">
                  <Field label="Title"    name="title"    full />
                  <Field label="Category" name="category" options={EVENT_CATS} />
                  <Field label="Host"     name="host" />
                  <Field label="City"     name="city" />
                  <Field label="Venue"    name="venue" />
                  <Field label="Date"     name="date" />
                  <Field label="Time"     name="time" />
                  <Field label="Price (₹, 0=free)" name="price" type="number" />
                  <Field label="Original price (₹)" name="orig" type="number" />
                  <Field label="Capacity" name="capacity" type="number" />
                  <Field label="Description" name="note" type="textarea" full />
                  <div className="ev-field ev-field-check">
                    <label>
                      <input type="checkbox" checked={!!form.past} onChange={e => setForm(f => ({ ...f, past: e.target.checked }))} />
                      Mark as past event
                    </label>
                  </div>
                </div>
              ) : (
                <div className="ev-fields">
                  <Field label="Topic"        name="topic"    full />
                  <Field label="Speaker"      name="speaker" />
                  <Field label="Organisation" name="org" />
                  <Field label="Date"         name="date" />
                  <Field label="Time"         name="time" />
                  <Field label="Type"         name="kind" options={['webinar', 'workshop']} />
                  <Field label="Status tag"   name="tag"  options={['Upcoming', 'Past']} />
                  <Field label="Poster filename (in /work/)" name="poster" />
                  <Field label="Register link" name="register" full />
                </div>
              )}
            </div>
            <div className="ev-modal-foot">
              <button className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>
                {modal.mode === 'add' ? 'Add' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {del !== null && (
        <div className="ev-modal-ov" onClick={e => e.target === e.currentTarget && setDel(null)}>
          <div className="ev-modal ev-modal-sm">
            <h3 className="serif ev-del-h">Delete this {isEvent ? 'event' : 'webinar'}?</h3>
            <p className="ev-del-sub">This action cannot be undone.</p>
            <div className="ev-modal-foot">
              <button className="btn btn-outline" onClick={() => setDel(null)}>Cancel</button>
              <button className="btn btn-primary ev-del-btn" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <style>{css}</style>
    </div>
  )
}

const css = `
.ev{display:flex;flex-direction:column;gap:18px}

/* toaster */
.ev-toaster{position:fixed;bottom:24px;right:24px;z-index:200;display:flex;flex-direction:column;gap:8px}
.ev-toast{padding:12px 18px;border-radius:8px;font-size:13.5px;font-weight:600;background:var(--ink);color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.2);animation:toastIn .3s ease}
.ev-toast-error{background:#dc2626}
@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

/* top row */
.ev-toprow{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.ev-tabs{display:flex;gap:6px}
.ev-tab{display:inline-flex;align-items:center;gap:8px;padding:9px 18px;border:1px solid var(--rule);border-radius:30px;font-size:13.5px;font-weight:600;color:var(--soft);background:#fff;cursor:pointer;transition:all .2s}
.ev-tab span{font-size:11px;background:var(--cream);border-radius:20px;padding:1px 7px;color:var(--soft)}
.ev-tab.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.ev-tab.on span{background:rgba(255,255,255,.16);color:#fff}
.ev-actions{display:flex;gap:10px;align-items:center}
.ev-search{padding:10px 16px;border:1px solid var(--rule);border-radius:var(--radius);font-size:13.5px;font-family:inherit;color:var(--ink);width:200px;transition:border-color .2s}
.ev-search:focus{outline:none;border-color:var(--accent)}
.ev-add-btn{font-size:13.5px;padding:10px 18px}

/* table */
.ev-table-wrap{background:#fff;border:1px solid var(--rule);border-radius:12px;overflow:hidden}
.ev-table{width:100%;border-collapse:collapse;font-size:13px}
.ev-table th{text-align:left;font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);padding:12px 14px;background:#fafaf8;border-bottom:1px solid var(--rule);white-space:nowrap}
.ev-table td{padding:13px 14px;border-bottom:1px solid var(--rule);vertical-align:middle}
.ev-table tr:last-child td{border-bottom:none}
.ev-table tr:hover td{background:#fdfcf9}
.ev-row-past td{opacity:.55}
.ev-cell-title{font-weight:700;color:var(--ink);display:flex;align-items:center;gap:8px;margin-bottom:2px}
.ev-cell-title-sm{font-weight:700;color:var(--ink);display:block;margin-bottom:2px;font-size:13.5px;line-height:1.3}
.ev-flag-badge{font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);background:rgba(254,122,0,.1);border:1px solid rgba(254,122,0,.25);border-radius:12px;padding:1px 7px}
.ev-cell-sub{font-size:11.5px;color:var(--soft)}
.ev-td-sm{white-space:nowrap;font-size:12.5px;color:var(--soft)}
.ev-cat-chip{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);background:var(--cream);border:1px solid var(--rule);border-radius:20px;padding:3px 10px}
.ev-status-chip{font-size:11px;font-weight:700;border-radius:20px;padding:3px 10px}
.ev-status-chip.upcoming{color:#16a34a;background:#f0fdf4;border:1px solid #bbf7d0}
.ev-status-chip.past{color:var(--soft);background:var(--cream);border:1px solid var(--rule)}
.ev-regs{display:flex;flex-direction:column;gap:5px}
.ev-regs span{font-size:12.5px;font-weight:700;color:var(--ink)}
.ev-reg-bar{height:5px;background:var(--rule);border-radius:6px;overflow:hidden;width:60px}
.ev-reg-bar div{height:100%;border-radius:6px}
.ev-row-acts{display:flex;gap:6px}
.ev-act{background:none;border:1px solid var(--rule);border-radius:var(--radius);padding:5px 10px;font-size:12px;font-weight:600;color:var(--ink);cursor:pointer;font-family:inherit;transition:all .18s}
.ev-act:hover{border-color:var(--accent);color:var(--accent)}
.ev-act-del:hover{border-color:#dc2626;color:#dc2626}
.ev-empty{padding:40px 24px;text-align:center;color:var(--soft);font-size:14px}

/* modal */
.ev-modal-ov{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.5);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:24px}
.ev-modal{background:#fff;border-radius:18px;width:100%;max-width:640px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 40px 80px rgba(0,0,0,.35);animation:modalIn .28s var(--ease)}
.ev-modal-sm{max-width:400px}
@keyframes modalIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}
.ev-modal-head{display:flex;align-items:center;justify-content:space-between;padding:22px 26px;border-bottom:1px solid var(--rule);flex-shrink:0}
.ev-modal-head h2{font-size:22px}
.ev-modal-close{background:none;border:none;font-size:18px;color:var(--soft);cursor:pointer;line-height:1;padding:4px}
.ev-modal-close:hover{color:var(--ink)}
.ev-modal-body{flex:1;overflow-y:auto;padding:24px 26px}
.ev-fields{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ev-field{display:flex;flex-direction:column;gap:6px}
.ev-field-full{grid-column:1/-1}
.ev-field-check{flex-direction:row;align-items:center;gap:8px}
.ev-field-check label{display:flex;align-items:center;gap:8px;font-size:13.5px;font-weight:600;cursor:pointer}
.ev-fl{font-size:12px;font-weight:700;color:var(--ink);letter-spacing:.03em}
.ev-inp{padding:11px 14px;border:1.5px solid var(--rule);border-radius:var(--radius);font-size:14px;font-family:inherit;color:var(--ink);background:#fff;transition:border-color .2s;width:100%}
.ev-inp:focus{outline:none;border-color:var(--accent)}
.ev-ta{resize:vertical;min-height:72px}
.ev-modal-foot{padding:18px 26px;border-top:1px solid var(--rule);display:flex;gap:10px;justify-content:flex-end;flex-shrink:0}
.ev-del-h{font-size:22px;padding:26px 26px 8px}
.ev-del-sub{font-size:14px;color:var(--soft);padding:0 26px 4px}
.ev-del-btn{background:#dc2626;border-color:#dc2626}
.ev-del-btn:hover{background:#b91c1c}
`
