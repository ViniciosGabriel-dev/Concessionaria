'use client'

import { useState } from 'react'

export default function TopBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="topbar">
      <div className="topbar__inner container">
        <span>
          🔥 <strong>FEIRÃO DE MARÇO</strong> — Financiamento em até 60x &nbsp;·&nbsp; Aprovação mesmo com restrições &nbsp;·&nbsp;{' '}
          <a href="#financiamento">Simule agora</a>
        </span>
        <button className="topbar__close" onClick={() => setVisible(false)}>✕</button>
      </div>
    </div>
  )
}
