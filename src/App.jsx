import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Careers from './pages/Careers'
import Newsroom from './pages/Newsroom'
import Research from './pages/Research'
import ReportReader from './pages/ReportReader'
import Maps from './pages/Maps'
import Contact from './pages/Contact'
import Brands from './pages/Brands'
import Brand from './pages/Brand'
import Pillar from './pages/Pillar'
import Events from './pages/Events'
import Webinars from './pages/Webinars'
import EventDetail from './pages/EventDetail'
import Guests from './pages/Guests'
import Podcasts from './pages/Podcasts'
import Legal from './pages/Legal'
import Stub from './pages/Stub'
import { applySeo } from './seo'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function RouteSeo() {
  const { pathname } = useLocation()
  useEffect(() => { applySeo(pathname) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <RouteSeo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* What we do */}
        <Route path="/research" element={<Research />} />
        <Route path="/research/:slug" element={<ReportReader />} />
        <Route path="/media" element={<Pillar kind="media" />} />
        <Route path="/technology" element={<Pillar kind="technology" />} />

        {/* Brands */}
        <Route path="/brands" element={<Brands />} />
        <Route path="/brand" element={<Brand />} />

        {/* Newsroom */}
        <Route path="/newsroom" element={<Newsroom />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/webinars/:slug" element={<EventDetail kind="webinar" />} />

        {/* Careers */}
        <Route path="/careers" element={<Careers />} />

        {/* Engagements */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventDetail kind="event" />} />
        <Route path="/guests" element={<Guests />} />

        {/* Company */}
        <Route path="/contact" element={<Contact />} />

        {/* Legal */}
        <Route path="/privacy" element={<Legal kind="privacy" />} />
        <Route path="/terms" element={<Legal kind="terms" />} />
        <Route path="/disclaimer" element={<Legal kind="disclaimer" />} />

        <Route path="*" element={<Stub eyebrow="404" title="Page not found" sub="That page doesn't exist yet." />} />
      </Routes>
    </>
  )
}
