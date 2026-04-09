'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import WhatsAppIcon from './WhatsAppIcon'

const WA = 'https://wa.me/5511977254727'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isVeiculo = pathname.startsWith('/veiculo/')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const className = isVeiculo
    ? 'header header--veiculo'
    : `header${scrolled ? ' scrolled' : ''}`

  return (
    <header className={className}>
      <div className="header__inner container">
        <Link href="/" className="logo" aria-label="DE Multimarcas">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-moderno.png" alt="DE Multimarcas" className="logo__img" />
        </Link>

        <nav className="nav" id="nav">
        </nav>

        <div className="header__right">
          <span className="header__address">📍 R. Joaquim Lacerda Coelho, 2101 - Jardim Capivari - Campinas - SP</span>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="header__wa">
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
