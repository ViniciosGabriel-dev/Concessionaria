'use client'

import { useState } from 'react'

export default function VeiculoGallery({ img, nome, fotos }: { img: string; nome: string; fotos: number }) {
  const [current, setCurrent] = useState(0)

  // Simulate multiple angles with the same image (replace with real images in production)
  const imgs = [img, img, img]

  function prev() { setCurrent(c => (c - 1 + imgs.length) % imgs.length) }
  function next() { setCurrent(c => (c + 1) % imgs.length) }

  const left = (current - 1 + imgs.length) % imgs.length
  const right = (current + 1) % imgs.length

  return (
    <div className="det__gallery">
      <div className="det__gallery-grid">
        <div className="det__gallery-side det__gallery-side--left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs[left]} alt={nome} onClick={prev} />
        </div>
        <div className="det__gallery-main">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs[current]} alt={nome} />
          <span className="det__gallery-count">📷 {fotos} fotos</span>
        </div>
        <div className="det__gallery-side det__gallery-side--right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs[right]} alt={nome} onClick={next} />
        </div>
      </div>
      <button className="det__gallery-arrow det__gallery-arrow--left" onClick={prev} aria-label="Anterior">‹</button>
      <button className="det__gallery-arrow det__gallery-arrow--right" onClick={next} aria-label="Próxima">›</button>
    </div>
  )
}
