import React, { useState } from 'react'
import { WORK, GUESTS, TESTIMONIALS } from '../../data/site'

const WORK_CATS = ['Technology', 'Economy', 'Geopolitics', 'Defence', 'Analysis', 'Briefs', 'Opinion', 'Culture', 'Public Policy']

function useToast() {
  const [toasts, setToasts] = useState([])
  const add = (msg) => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }
  return { toasts, add }
}

export default function AdminContent() {
  const { toasts, add } = useToast()
  const [tab, setTab]         = useState('work')
  const [work, setWork]       = useState(WORK)
  const [guests, setGuests]   = useState(GUESTS)
  const [tmos, setTmos]       = useState(TESTIMONIALS)
  const [modal, setModal]     = useState(null) // { type, mode, data, idx }
  const [form, setForm]       = useState({})
  const [del, setDel]         = useState(null) // { type, idx }

  function openAdd(type) {
    const blank = type === 'work' ? { t: '', cat: 'Geopolitics', img: '' } : type === 'guest' ? { name: '', role: '', photo: '' } : { name: '', role: '', quote: '', photo: '' }
    setForm(blank)
    setModal({ type, mode: 'add' })
  }

  function openEdit(type, data, idx) {
    setForm({ ...data })
    setModal({ type, mode: 'edit', idx })
  }

  function save() {
    const { type, mode, idx } = modal
    if (type === 'work') {
      if (mode === 'add') setWork(w => [form, ...w])
      else setWork(w => w.map((x, i) => i === idx ? form : x))
    } else if (type === 'guest') {
      if (mode === 'add') setGuests(g => [form, ...g])
      else setGuests(g => g.map((x, i) => i === idx ? form : x))
    } else {
      if (mode === 'add') setTmos(t => [form, ...t])
      else setTmos(t => t.map((x, i) => i === idx ? form : x))
    }
    add(mode === 'add' ? 'Item added' : 'Changes saved')
    setModal(null)
  }

  function confirmDelete() {
    const { type, idx } = del
    if (type === 'work') setWork(w => w.filter((_, i) => i !== idx))
    else if (type === 'guest') setGuests(g => g.filter((_, i) => i !== idx))
    else setTmos(t => t.filter((_, i) => i !== idx))
    add('Deleted')
    setDel(null)
  }

  function moveWork(idx, dir) {
    setWork(w => {
      const a = [...w]
      const to = idx + dir
      if (to < 0 || to >= a.length) return a
      ;[a[idx], a[to]] = [a[to], a[idx]]
      return a
    })
  }

  function F({ label, name, type = 'text', opts, full, area }) {
    return (
      <div className={`cn-f ${full ? 'cn-f-full' : ''}`}>
        <label className="cn-fl">{label}</label>
        {opts
          ? <select className="cn-inp" value={form[name] || ''} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}>{opts.map(o => <option key={o}>{o}</option>)}</select>
          : area
            ? <textarea className="cn-inp cn-ta" value={form[name] || ''} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} rows={3} />
            : <input className="cn-inp" type={type} value={form[name] || ''} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} />
        }
      </div>
    )
  }

  const av = (n) => n?.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('') || '?'

  return (
    <div className="cn">
      {/* Toaster */}
      <div className="cn-toaster">
        {toasts.map(t => <div key={t.id} className="cn-toast">{t.msg}</div>)}
      </div>

      {/* ── Tab bar ── */}
      <div className="cn-tabrow">
        <div className="cn-tabs">
          {[['work', `Featured Work (${work.length})`, ], ['guest', `Guests (${guests.length})`], ['tmo', `Testimonials (${tmos.length})`]].map(([v, l]) => (
            <button key={v} className={`cn-tab ${tab === v ? 'on' : ''}`} onClick={() => setTab(v)}>{l}</button>
          ))}
        </div>
        <button className="btn btn-primary cn-add-btn" onClick={() => openAdd(tab === 'work' ? 'work' : tab === 'guest' ? 'guest' : 'tmo')}>
          + Add {tab === 'work' ? 'Item' : tab === 'guest' ? 'Guest' : 'Testimonial'}
        </button>
      </div>

      {/* ── Featured Work ── */}
      {tab === 'work' && (
        <div className="cn-work-grid">
          {work.map((w, i) => (
            <div className="cn-work-card" key={i}>
              <div className="cn-work-img">
                {w.img
                  ? <img src={`/work/${w.img}`} alt={w.t} onError={e => { e.target.style.display = 'none' }} />
                  : <span className="cn-work-ph">No image</span>}
              </div>
              <div className="cn-work-body">
                <span className="cn-work-cat">{w.cat}</span>
                <h4 className="cn-work-title">{w.t || <em className="cn-empty-title">Untitled</em>}</h4>
                <span className="cn-work-file">{w.img || '—'}</span>
              </div>
              <div className="cn-work-acts">
                <button className="cn-act" onClick={() => openEdit('work', w, i)}>Edit</button>
                <div className="cn-order-btns">
                  <button className="cn-order" onClick={() => moveWork(i, -1)} disabled={i === 0}>↑</button>
                  <button className="cn-order" onClick={() => moveWork(i, +1)} disabled={i === work.length - 1}>↓</button>
                </div>
                <button className="cn-act cn-act-del" onClick={() => setDel({ type: 'work', idx: i })}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Guests ── */}
      {tab === 'guest' && (
        <div className="cn-list">
          {guests.map((g, i) => (
            <div className="cn-list-row" key={i}>
              {g.photo
                ? <img className="cn-list-photo" src={`/work/${g.photo}`} alt={g.name} onError={e => { e.target.style.display = 'none' }} />
                : <span className="cn-list-av">{av(g.name)}</span>}
              <div className="cn-list-info">
                <strong>{g.name}</strong>
                <span>{g.role}</span>
              </div>
              {g.photo && <span className="cn-list-file">{g.photo}</span>}
              <div className="cn-list-acts">
                <button className="cn-act" onClick={() => openEdit('guest', g, i)}>Edit</button>
                <button className="cn-act cn-act-del" onClick={() => setDel({ type: 'guest', idx: i })}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Testimonials ── */}
      {tab === 'tmo' && (
        <div className="cn-tmo-grid">
          {tmos.map((t, i) => (
            <div className="cn-tmo-card" key={i}>
              <div className="cn-tmo-head">
                {t.photo
                  ? <img className="cn-tmo-photo" src={`/work/${t.photo}`} alt={t.name} />
                  : <span className="cn-tmo-av">{av(t.name)}</span>}
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
              <blockquote className="cn-tmo-q">"{t.quote}"</blockquote>
              <div className="cn-tmo-acts">
                <button className="cn-act" onClick={() => openEdit('tmo', t, i)}>Edit</button>
                <button className="cn-act cn-act-del" onClick={() => setDel({ type: 'tmo', idx: i })}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      {modal && (
        <div className="cn-modal-ov" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="cn-modal">
            <div className="cn-modal-head">
              <h2 className="serif">{modal.mode === 'add' ? 'Add' : 'Edit'} {modal.type === 'work' ? 'Work Item' : modal.type === 'guest' ? 'Guest' : 'Testimonial'}</h2>
              <button className="cn-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="cn-modal-body">
              {modal.type === 'work' && (
                <div className="cn-fields">
                  <F label="Title" name="t" full />
                  <F label="Category" name="cat" opts={WORK_CATS} />
                  <F label="Image filename (in /work/)" name="img" />
                  <div className="cn-f cn-f-full">
                    <p className="cn-hint">Drop images into <code>public/work/</code> then reference by filename. Leave blank to hide image.</p>
                  </div>
                </div>
              )}
              {modal.type === 'guest' && (
                <div className="cn-fields">
                  <F label="Full name" name="name" full />
                  <F label="Role / affiliation" name="role" full />
                  <F label="Photo filename (in /work/)" name="photo" full />
                </div>
              )}
              {modal.type === 'tmo' && (
                <div className="cn-fields">
                  <F label="Full name" name="name" />
                  <F label="Role / affiliation" name="role" />
                  <F label="Photo filename (in /work/)" name="photo" />
                  <F label="Quote" name="quote" area full />
                </div>
              )}
            </div>
            <div className="cn-modal-foot">
              <button className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>{modal.mode === 'add' ? 'Add' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {del && (
        <div className="cn-modal-ov" onClick={e => e.target === e.currentTarget && setDel(null)}>
          <div className="cn-modal cn-modal-sm">
            <h3 className="serif" style={{ padding: '24px 24px 8px', fontSize: 20 }}>Delete this item?</h3>
            <p style={{ padding: '0 24px', fontSize: 14, color: 'var(--soft)' }}>This cannot be undone.</p>
            <div className="cn-modal-foot">
              <button className="btn btn-outline" onClick={() => setDel(null)}>Cancel</button>
              <button className="btn btn-primary" style={{ background: '#dc2626', borderColor: '#dc2626' }} onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <style>{css}</style>
    </div>
  )
}

const css = `
.cn{display:flex;flex-direction:column;gap:18px}

/* toaster */
.cn-toaster{position:fixed;bottom:24px;right:24px;z-index:200;display:flex;flex-direction:column;gap:8px}
.cn-toast{padding:12px 18px;border-radius:8px;font-size:13.5px;font-weight:600;background:var(--ink);color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.2);animation:cnIn .3s ease}
@keyframes cnIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

/* tabs */
.cn-tabrow{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.cn-tabs{display:flex;gap:6px}
.cn-tab{padding:9px 16px;border:1px solid var(--rule);border-radius:20px;font-size:13px;font-weight:600;color:var(--soft);background:#fff;cursor:pointer;font-family:inherit;transition:all .2s}
.cn-tab.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.cn-add-btn{font-size:13.5px;padding:10px 18px}

/* work grid */
.cn-work-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
@media(max-width:1100px){.cn-work-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:760px){.cn-work-grid{grid-template-columns:1fr 1fr}}
.cn-work-card{background:#fff;border:1px solid var(--rule);border-radius:12px;overflow:hidden;display:flex;flex-direction:column}
.cn-work-img{aspect-ratio:3/2;background:var(--cream);overflow:hidden;position:relative}
.cn-work-img img{width:100%;height:100%;object-fit:cover;display:block}
.cn-work-ph{position:absolute;inset:0;display:grid;place-items:center;font-size:11.5px;color:var(--soft);font-weight:600}
.cn-work-body{padding:12px 14px;flex:1}
.cn-work-cat{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);display:block;margin-bottom:5px}
.cn-work-title{font-size:13.5px;font-weight:700;color:var(--ink);margin-bottom:5px;line-height:1.35}
.cn-empty-title{color:var(--soft);font-style:italic;font-weight:400}
.cn-work-file{font-size:11px;color:var(--soft);font-family:monospace}
.cn-work-acts{padding:10px 14px;border-top:1px solid var(--rule);display:flex;align-items:center;gap:6px}
.cn-order-btns{display:flex;gap:3px;margin-left:auto}
.cn-order{background:none;border:1px solid var(--rule);border-radius:4px;width:24px;height:24px;font-size:12px;cursor:pointer;display:grid;place-items:center;transition:border-color .2s;color:var(--soft)}
.cn-order:disabled{opacity:.3;cursor:not-allowed}
.cn-order:not(:disabled):hover{border-color:var(--ink);color:var(--ink)}

/* guest list */
.cn-list{background:#fff;border:1px solid var(--rule);border-radius:12px;overflow:hidden}
.cn-list-row{display:flex;align-items:center;gap:14px;padding:14px 18px;border-bottom:1px solid var(--rule)}
.cn-list-row:last-child{border-bottom:none}
.cn-list-photo{width:40px;height:40px;border-radius:50%;object-fit:cover;flex:none}
.cn-list-av{width:40px;height:40px;border-radius:50%;background:linear-gradient(150deg,var(--accent),#ffb152);color:#3a1c00;font-family:var(--serif);font-size:14px;font-weight:600;display:grid;place-items:center;flex:none}
.cn-list-info{flex:1}
.cn-list-info strong{display:block;font-size:14px;font-weight:700;color:var(--ink)}
.cn-list-info span{font-size:12.5px;color:var(--soft)}
.cn-list-file{font-size:11.5px;color:var(--soft);font-family:monospace}
.cn-list-acts{display:flex;gap:8px}

/* testimonials */
.cn-tmo-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:760px){.cn-tmo-grid{grid-template-columns:1fr}}
.cn-tmo-card{background:#fff;border:1px solid var(--rule);border-radius:12px;padding:20px}
.cn-tmo-head{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.cn-tmo-photo{width:44px;height:44px;border-radius:50%;object-fit:cover;flex:none}
.cn-tmo-av{width:44px;height:44px;border-radius:50%;background:linear-gradient(150deg,var(--accent),#ffb152);color:#3a1c00;font-family:var(--serif);font-size:16px;font-weight:600;display:grid;place-items:center;flex:none}
.cn-tmo-head strong{display:block;font-size:14.5px;font-weight:700;color:var(--ink)}
.cn-tmo-head span{font-size:12.5px;color:var(--soft)}
.cn-tmo-q{font-family:var(--serif);font-size:15px;line-height:1.55;color:var(--ink);border-left:3px solid var(--accent);padding-left:14px;margin:0 0 16px;font-style:italic;font-weight:400}
.cn-tmo-acts{display:flex;gap:8px}

/* shared action button */
.cn-act{background:none;border:1px solid var(--rule);border-radius:var(--radius);padding:5px 11px;font-size:12px;font-weight:600;color:var(--ink);cursor:pointer;font-family:inherit;transition:all .18s}
.cn-act:hover{border-color:var(--accent);color:var(--accent)}
.cn-act-del:hover{border-color:#dc2626;color:#dc2626}

/* modal */
.cn-modal-ov{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.5);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:24px}
.cn-modal{background:#fff;border-radius:16px;width:100%;max-width:520px;box-shadow:0 40px 80px rgba(0,0,0,.3);animation:cnMod .26s var(--ease)}
.cn-modal-sm{max-width:360px}
@keyframes cnMod{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}
.cn-modal-head{display:flex;align-items:center;justify-content:space-between;padding:20px 22px;border-bottom:1px solid var(--rule)}
.cn-modal-head h2{font-size:20px}
.cn-close{background:none;border:none;font-size:18px;color:var(--soft);cursor:pointer}
.cn-close:hover{color:var(--ink)}
.cn-modal-body{padding:20px 22px}
.cn-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cn-f{display:flex;flex-direction:column;gap:6px}
.cn-f-full{grid-column:1/-1}
.cn-fl{font-size:12px;font-weight:700;color:var(--ink)}
.cn-inp{padding:11px 14px;border:1.5px solid var(--rule);border-radius:var(--radius);font-size:14px;font-family:inherit;color:var(--ink);background:#fff;transition:border-color .2s;width:100%}
.cn-inp:focus{outline:none;border-color:var(--accent)}
.cn-ta{resize:vertical;min-height:80px}
.cn-hint{font-size:12.5px;color:var(--soft);line-height:1.5;background:var(--cream);border-radius:8px;padding:10px 12px}
.cn-hint code{font-family:monospace;font-weight:700;color:var(--ink)}
.cn-modal-foot{padding:16px 22px;border-top:1px solid var(--rule);display:flex;gap:10px;justify-content:flex-end}
`
