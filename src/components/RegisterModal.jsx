import React, { useState, useEffect } from 'react'
import { registerForEvent, createPaymentOrder, verifyPayment } from '../apiClient'

const RAZORPAY_SDK = 'https://checkout.razorpay.com/v1/checkout.js'

// Load the Razorpay checkout script once, on demand.
let razorpayLoader = null
function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(true)
  if (razorpayLoader) return razorpayLoader
  razorpayLoader = new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = RAZORPAY_SDK
    s.onload = () => resolve(true)
    s.onerror = () => { razorpayLoader = null; resolve(false) }
    document.body.appendChild(s)
  })
  return razorpayLoader
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/**
 * Registration + payment modal.
 *
 * Props:
 *   event      — { id, title, type ('event'|'webinar'), price, date }
 *   onClose()  — close the modal
 */
export default function RegisterModal({ event, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '' })
  const [status, setStatus] = useState('idle')   // idle | submitting | success | error
  const [message, setMessage] = useState('')

  const price = Number(event?.price || 0)
  const paid = price > 0

  // close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && status !== 'submitting') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status, onClose])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const basePayload = () => ({
    event_id:    String(event?.id || ''),
    event_title: event?.title || '',
    event_type:  event?.type || 'event',
    event_date:  event?.date || '',
    name:        form.name.trim(),
    email:       form.email.trim(),
    phone:       form.phone.trim(),
    city:        form.city.trim(),
  })

  function validate() {
    if (!form.name.trim()) return 'Please enter your name.'
    if (!isEmail(form.email.trim())) return 'Please enter a valid email address.'
    return null
  }

  async function handleFree() {
    await registerForEvent(basePayload())
    setStatus('success')
    setMessage('You’re registered! Check your email for confirmation and joining details.')
  }

  async function handlePaid() {
    const ok = await loadRazorpay()
    if (!ok) throw new Error('Could not load the payment gateway. Please try again.')

    const order = await createPaymentOrder({ ...basePayload(), amount: price })

    // Open Razorpay checkout and wait for the user to pay.
    await new Promise((resolve, reject) => {
      const rzp = new window.Razorpay({
        key:      order.key_id,
        amount:   order.amount,
        currency: order.currency || 'INR',
        order_id: order.order_id,
        name:     'Tiesverse',
        description: event?.title || 'Event registration',
        prefill: { name: form.name.trim(), email: form.email.trim(), contact: form.phone.trim() },
        notes:   { event: event?.title || '' },
        theme:   { color: '#fe7a00' },
        modal: {
          ondismiss: () => reject(new Error('Payment cancelled. You have not been charged.')),
        },
        handler: async (resp) => {
          try {
            await verifyPayment({
              razorpay_order_id:   resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature:  resp.razorpay_signature,
            })
            resolve()
          } catch (err) {
            reject(err)
          }
        },
      })
      rzp.on('payment.failed', (resp) => {
        reject(new Error(resp?.error?.description || 'Payment failed. Please try again.'))
      })
      rzp.open()
    })

    setStatus('success')
    setMessage('Payment received — you’re registered! Check your email for confirmation.')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const err = validate()
    if (err) { setStatus('error'); setMessage(err); return }

    setStatus('submitting')
    setMessage('')
    try {
      if (paid) await handlePaid()
      else await handleFree()
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="rm-overlay" onClick={() => status !== 'submitting' && onClose()}>
      <div className="rm-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="rm-close" onClick={onClose} aria-label="Close" disabled={status === 'submitting'}>×</button>

        {status === 'success' ? (
          <div className="rm-done">
            <div className="rm-done-ic">✓</div>
            <h3 className="serif">You’re in.</h3>
            <p>{message}</p>
            <button className="btn btn-primary rm-cta" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <span className="rm-eyebrow">{event?.type === 'webinar' ? 'Webinar registration' : 'Event registration'}</span>
            <h3 className="serif rm-title">{event?.title}</h3>
            <div className="rm-price">
              {paid ? <><span className="rm-price-now">₹{price}</span><span className="rm-price-tag">per seat</span></>
                    : <span className="rm-free">Free entry</span>}
            </div>

            <form className="rm-form" onSubmit={handleSubmit}>
              <label className="rm-field">
                <span>Full name *</span>
                <input value={form.name} onChange={set('name')} placeholder="Your name" autoFocus />
              </label>
              <label className="rm-field">
                <span>Email *</span>
                <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
              </label>
              <div className="rm-row">
                <label className="rm-field">
                  <span>Phone</span>
                  <input value={form.phone} onChange={set('phone')} placeholder="Optional" />
                </label>
                <label className="rm-field">
                  <span>City</span>
                  <input value={form.city} onChange={set('city')} placeholder="Optional" />
                </label>
              </div>

              {status === 'error' && <p className="rm-error">{message}</p>}

              <button className="btn btn-primary rm-submit" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting'
                  ? (paid ? 'Opening payment…' : 'Registering…')
                  : (paid ? `Pay ₹${price} & register` : 'Register')}
              </button>
              <p className="rm-note">
                {paid
                  ? 'Secure payment via Razorpay. A confirmation email follows on success.'
                  : 'We’ll email you a confirmation and the joining details.'}
              </p>
            </form>
          </>
        )}
      </div>
      <style>{css}</style>
    </div>
  )
}

const css = `
.rm-overlay{position:fixed;inset:0;z-index:1000;background:rgba(12,11,8,.55);backdrop-filter:blur(3px);display:grid;place-items:center;padding:20px;animation:rmfade .18s ease}
@keyframes rmfade{from{opacity:0}to{opacity:1}}
.rm-modal{position:relative;width:100%;max-width:460px;background:#fff;border-radius:18px;padding:34px 32px 28px;box-shadow:0 30px 80px rgba(40,20,0,.28);animation:rmpop .2s ease}
@keyframes rmpop{from{transform:translateY(10px) scale(.98);opacity:0}to{transform:none;opacity:1}}
.rm-close{position:absolute;top:14px;right:16px;background:none;border:none;font-size:26px;line-height:1;color:var(--soft);cursor:pointer;padding:4px 8px;border-radius:8px;transition:background .15s,color .15s}
.rm-close:hover:not(:disabled){background:var(--cream);color:var(--ink)}
.rm-close:disabled{opacity:.4;cursor:not-allowed}
.rm-eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#c2691a}
.rm-title{font-size:23px;line-height:1.18;margin:8px 0 14px;color:var(--ink);padding-right:20px}
.rm-price{display:flex;align-items:baseline;gap:8px;margin-bottom:22px}
.rm-price-now{font-size:24px;font-weight:800;color:var(--ink)}
.rm-price-tag{font-size:13px;color:var(--soft)}
.rm-free{font-size:13px;font-weight:700;color:var(--ink);background:#fff3e3;border:1px solid rgba(254,122,0,.28);border-radius:9px;padding:5px 12px}
.rm-form{display:flex;flex-direction:column;gap:14px}
.rm-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.rm-field{display:flex;flex-direction:column;gap:6px}
.rm-field>span{font-size:13px;font-weight:600;color:var(--ink)}
.rm-field input{border:1px solid var(--rule);border-radius:10px;padding:11px 13px;font-size:14.5px;font-family:inherit;color:var(--ink);transition:border-color .15s,box-shadow .15s}
.rm-field input:focus{outline:none;border-color:#fe7a00;box-shadow:0 0 0 3px rgba(254,122,0,.14)}
.rm-error{font-size:13.5px;color:#b42318;background:#fef3f2;border:1px solid #fecdca;border-radius:9px;padding:9px 12px;margin:0}
.rm-submit{margin-top:6px;font-size:15px;padding:13px 20px;width:100%}
.rm-submit:disabled{opacity:.65;cursor:not-allowed}
.rm-note{font-size:12px;color:var(--soft);text-align:center;margin:4px 0 0;line-height:1.5}
.rm-done{text-align:center;padding:14px 0 6px}
.rm-done-ic{width:56px;height:56px;border-radius:50%;background:#e7f7ed;color:#067647;font-size:30px;display:grid;place-items:center;margin:0 auto 16px}
.rm-done h3{font-size:24px;margin:0 0 10px;color:var(--ink)}
.rm-done p{font-size:15px;color:var(--soft);line-height:1.55;margin:0 0 22px}
.rm-cta{width:100%;font-size:15px;padding:12px 20px}
@media(max-width:520px){.rm-row{grid-template-columns:1fr}}
`
