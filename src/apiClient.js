// Public data client for tiesverse.com landing site.
// Landing collections (events, articles, youtube_videos, workshops,
// team_members, guests, webinars) read directly from Supabase.
// Career positions read from the career-site Node proxy (Cloudflare D1).

import { supabase } from './supabaseClient'

// ── helpers ──────────────────────────────────────────────────────────────────

async function query(table, builder) {
  try {
    const q = builder ? builder(supabase.from(table)) : supabase.from(table).select('*')
    const { data, error } = await q
    if (error) { console.warn(`[supabase] ${table}:`, error.message); return null }
    return data
  } catch (e) {
    console.warn(`[supabase] ${table}:`, e.message)
    return null
  }
}

async function cfGet(path) {
  const api = import.meta.env.VITE_API_URL || 'https://api.admin.tiesverse.com'
  try {
    const res = await fetch(`${api}${path}`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

// ── Webinars (Turso canonical, mirrored into Supabase by admin) ───────────────
export const fetchWebinarEvents = () =>
  query('webinars', (q) =>
    q.select('*').order('date', { ascending: false })
  )

// ── City / offline events ─────────────────────────────────────────────────────
export const fetchEvents = () =>
  query('events', (q) =>
    q.select('*').order('date', { ascending: true })
  )

export const fetchFeaturedEvent = () =>
  query('events', (q) =>
    q.select('*').eq('flagship', true).eq('past', false).limit(1).maybeSingle()
  )

// ── Articles & reports ────────────────────────────────────────────────────────
export const fetchArticles = () =>
  query('articles', (q) =>
    q.select('*').eq('published', true).order('created_at', { ascending: false })
  )

export const fetchArticleBySlug = (slug) =>
  query('articles', (q) =>
    q.select('*').eq('slug', slug).eq('published', true).maybeSingle()
  )

// ── YouTube videos ────────────────────────────────────────────────────────────
export const fetchYoutubeVideos = () =>
  query('youtube_videos', (q) =>
    q.select('*').order('published_at', { ascending: false })
  )

// ── Workshops ─────────────────────────────────────────────────────────────────
export const fetchWorkshops = () =>
  query('workshops', (q) =>
    q.select('*').order('date', { ascending: true })
  )

// ── Team members ──────────────────────────────────────────────────────────────
export const fetchTeam = () =>
  query('team_members', (q) =>
    q.select('*').order('display_order', { ascending: true })
  )

// ── Guests ────────────────────────────────────────────────────────────────────
export const fetchGuests = () =>
  query('guests', (q) =>
    q.select('*').order('created_at', { ascending: false })
  )

// ── Career open positions (Cloudflare D1 via Node proxy) ─────────────────────
export const fetchOpenPositions = async () => {
  const data = await cfGet('/api/career/positions')
  if (!data) return []
  return data.filter((p) => p.position_var)
}

// ── Event / webinar registration (Django admin backend → Turso + SES + Razorpay)
const ADMIN_API = import.meta.env.VITE_ADMIN_API_URL || 'https://api.admin.tiesverse.com'

async function adminPost(path, body) {
  const res = await fetch(`${ADMIN_API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  let data = null
  try { data = await res.json() } catch { /* non-JSON response */ }
  if (!res.ok) {
    const msg = (data && data.error) || `Request failed (${res.status})`
    throw new Error(msg)
  }
  return data
}

// Free registration → saves to Turso, sends confirmation email
export const registerForEvent = (payload) =>
  adminPost('/api/webinar/register/', payload)

// Paid registration step 1 → create a Razorpay order
export const createPaymentOrder = (payload) =>
  adminPost('/api/webinar/create-order/', payload)

// Paid registration step 2 → verify the signature, mark paid, send email
export const verifyPayment = (payload) =>
  adminPost('/api/webinar/verify-payment/', payload)
