// Centralised SEO. RouteSeo (in App.jsx) calls applySeo on every navigation.
export const SITE = {
  name: 'Tiesverse',
  url: 'https://www.tiesverse.com',
  image: 'https://www.tiesverse.com/og.webp',
  desc: "India's leading youth-led Research, Media & Technology organisation. Seven brands, one way of reading the world.",
}

// path -> { t: page title (without brand), d: description }
const ROUTE_META = {
  '/': { t: '', d: SITE.desc },
  '/about': { t: 'About', d: 'A youth-led Research, Media & Technology organisation of 100+, building for Bharat. Our story, founders and team.' },
  '/research': { t: 'Research', d: 'Rigorous geopolitical, economic and electoral research, from daily briefs to deep dives, grounded in primary and secondary sources.' },
  '/media': { t: 'Media', d: 'High-fidelity films, reels, podcasts and reporting that turn high-level intelligence into stories millions finish and share.' },
  '/technology': { t: 'Technology', d: 'Homegrown products and platforms that turn information into understanding, built for the next billion.' },
  '/brands': { t: 'Our brands', d: 'One house, seven mastheads, across geopolitics, finance, civic and creative.' },
  '/brand': { t: 'Brand', d: 'The Tiesverse identity: an operating manual for a civilization that studies the world.' },
  '/newsroom': { t: 'Insights & analysis', d: 'Original analysis, explainers and maps from across the organisation, built to be understood.' },
  '/maps': { t: 'Map illustrations', d: 'Geopolitics, drawn: complex systems made legible in a single frame.' },
  '/podcasts': { t: 'Podcasts', d: 'Long-form conversations with the people shaping geopolitics, media and technology.' },
  '/webinars': { t: 'Webinars & workshops', d: 'Live online sessions and workshops with leaders and scholars. Free, online, open to all.' },
  '/events': { t: 'Events', d: 'Summits, salons, roundtables and meetups that bring research, media and technology into the room.' },
  '/guests': { t: 'Past guests', d: 'Leaders, scholars and policymakers who have joined Tiesverse.' },
  '/careers': { t: 'Careers', d: 'Join us in building Tiesverse: engineering, research, media and more. A category of its own, built for Bharat.' },
  '/contact': { t: 'Contact', d: 'Partnerships, press, careers and general enquiries.' },
  '/privacy': { t: 'Privacy Policy', d: 'How Tiesverse Foundation collects, uses and protects your information.' },
  '/terms': { t: 'Terms of Use', d: 'The terms that govern your use of the Tiesverse website and services.' },
  '/disclaimer': { t: 'Disclaimer', d: 'Editorial, accuracy and liability disclaimers for Tiesverse content.' },
}

function setTag(selector, attr, key, content) {
  let el = document.head.querySelector(selector)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', content)
}

export function applySeo(pathname) {
  const meta = ROUTE_META[pathname] || (
    pathname.startsWith('/research/') ? { t: 'Research report', d: ROUTE_META['/research'].d }
    : pathname.startsWith('/webinars/') ? { t: 'Webinars & workshops', d: ROUTE_META['/webinars'].d }
    : pathname.startsWith('/events/') ? { t: 'Events', d: ROUTE_META['/events'].d }
    : { t: '', d: SITE.desc }
  )
  const title = meta.t
    ? `${meta.t} · ${SITE.name}`
    : `${SITE.name}: Research, Media & Technology for Bharat`
  const url = SITE.url + (pathname === '/' ? '/' : pathname)

  document.title = title
  setTag('meta[name="description"]', 'name', 'description', meta.d)

  let canon = document.head.querySelector('link[rel="canonical"]')
  if (!canon) { canon = document.createElement('link'); canon.setAttribute('rel', 'canonical'); document.head.appendChild(canon) }
  canon.setAttribute('href', url)

  setTag('meta[property="og:title"]', 'property', 'og:title', title)
  setTag('meta[property="og:description"]', 'property', 'og:description', meta.d)
  setTag('meta[property="og:url"]', 'property', 'og:url', url)
  setTag('meta[property="og:image"]', 'property', 'og:image', SITE.image)
  setTag('meta[property="og:type"]', 'property', 'og:type', 'website')
  setTag('meta[property="og:site_name"]', 'property', 'og:site_name', SITE.name)
  setTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
  setTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)
  setTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.d)
  setTag('meta[name="twitter:image"]', 'name', 'twitter:image', SITE.image)
}
