'use client'

import { useEffect, useState } from 'react'

export default function WaFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      className="scroll-top"
      onClick={scrollTop}
      aria-label="Voltar ao topo"
    >
      ↑
    </button>
  )
}
