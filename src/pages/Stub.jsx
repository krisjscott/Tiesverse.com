import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CtaBand from '../components/CtaBand'

export default function Stub({ eyebrow = 'Tiesverse', title = 'Coming soon', sub = 'This page is being built next.' }) {
  return (
    <>
      <Nav variant="solid" />
      <main className="stub">
        <div className="container center">
          <span className="eyebrow accent">{eyebrow}</span>
          <h1 className="serif">{title}</h1>
          <p>{sub}</p>
          <Link className="btn btn-dark" to="/">Back to home</Link>
        </div>
      </main>
      <CtaBand />
      <Footer />
      <style>{`
        .stub{padding:200px 0 180px;text-align:center}
        .stub .accent{color:var(--ink)}
        .stub h1{font-size:clamp(40px,6vw,84px);margin:16px 0 18px}
        .stub p{color:var(--soft);font-size:18px;max-width:520px;margin:0 auto 30px;line-height:1.6}
      `}</style>
    </>
  )
}
