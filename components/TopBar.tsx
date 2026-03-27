'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function TopBar() {
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    document.documentElement.style.setProperty('--topbar-h', isHome && visible ? '36px' : '0px')
    return () => {
      document.documentElement.style.setProperty('--topbar-h', '0px')
    }
  }, [isHome, visible])

  if (!isHome || !visible) return null

  return (
    <div className="topbar">
      <div className="topbar__inner container">
        <span>
          🔥 <strong>FEIRÃO DE MARÇO</strong> — Financiamento em até 60x &nbsp;·&nbsp; Aprovação mesmo com restrições &nbsp;·&nbsp;{' '}
          <a href="#financiamento">Simule agora</a>
        </span>
        <button className="topbar__close" onClick={() => {
          setVisible(false)
          document.documentElement.style.setProperty('--topbar-h', '0px')
        }}>✕</button>
      </div>
    </div>
  )
}
