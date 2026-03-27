'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import WhatsAppIcon from './WhatsAppIcon'

const WA = 'https://wa.me/5511977254727'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`header${(!isHome || scrolled) ? ' scrolled' : ''}`}>
      <div className="header__inner container">
        <Link href="/" className="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-light.png" alt="Top Multimarcas" className="logo__img" />
        </Link>

        <nav className={`nav${menuOpen ? ' open' : ''}`} id="nav">
        </nav>

        <div className="header__right">
          <span className="header__address">📍 Avenida Itaquera, 1307 - Jardim Maringá - São Paulo - SP</span>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="header__wa">
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
