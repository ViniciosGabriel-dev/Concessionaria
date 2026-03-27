'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Veiculo, formatBRL, formatKm } from '@/lib/veiculos'

export default function SimilarCarousel({ veiculos }: { veiculos: Veiculo[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'left' | 'right') {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.sim-car__card') as HTMLElement
    const amount = card ? card.offsetWidth + 14 : 220
    trackRef.current.scrollBy({ left: dir === 'right' ? amount * 3 : -amount * 3, behavior: 'smooth' })
  }

  return (
    <div className="sim-car">
      <button className="sim-car__arrow sim-car__arrow--left" onClick={() => scroll('left')} aria-label="Anterior">‹</button>
      <div className="sim-car__track" ref={trackRef}>
        {veiculos.map(v => (
          <Link key={v.id} href={`/veiculo/${v.id}`} className="sim-car__card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.img} alt={`${v.marca} ${v.modelo}`} className="sim-car__img" />
            <div className="sim-car__info">
              <strong className="sim-car__nome">{v.marca} {v.modelo}</strong>
              <span className="sim-car__versao">{v.versao}</span>
              <div className="sim-car__preco">{formatBRL(v.preco)}</div>
              <div className="sim-car__meta">
                <span>{v.ano}</span>
                <span>{formatKm(v.km)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button className="sim-car__arrow sim-car__arrow--right" onClick={() => scroll('right')} aria-label="Próximo">›</button>
    </div>
  )
}
