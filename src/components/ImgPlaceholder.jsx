import React from 'react'

// Inline image placeholder: swap for a real AI image later.
export function ImgPlaceholder({ label, size, ratio = '16 / 9', dark = false, fill = false, className = '', style = {} }) {
  const st = fill ? { ...style } : { aspectRatio: ratio, ...style }
  return (
    <div className={`imgph ${dark ? 'dark' : ''} ${fill ? 'imgph-fill' : ''} ${className}`} style={st} aria-hidden>
      <div className="imgph-in">
        <span className="imgph-ic">⬚</span>
        <span className="imgph-label">{label}</span>
        {size && <span className="imgph-size">{size}</span>}
      </div>
    </div>
  )
}

// Full-bleed background (text overlays on top). Pass `src` for a real image,
// otherwise it falls back to the labelled placeholder.
export function ImgBg({ label, src }) {
  return (
    <div className={`imgbg ${src ? 'has-img' : ''}`} aria-hidden>
      {src && <img className="imgbg-img" src={src} alt="" />}
      <div className="imgbg-scrim" />
      {!src && label && <span className="imgbg-badge">image · {label}</span>}
    </div>
  )
}
