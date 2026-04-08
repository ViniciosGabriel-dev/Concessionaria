'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { veiculos, Veiculo, formatBRL, formatKm } from '@/lib/veiculos'
import WhatsAppIcon from './WhatsAppIcon'

const WA_NUMBER = '5511977254727'
const HINTS = [
  'Corolla automático 2022',
  'SUV até R$ 150.000',
  'Honda flex câmbio CVT',
  'Jeep Compass com teto solar',
  'Carro para família até 60x',
]

const MARCAS = [
  { nome: 'Toyota', logo: '/toyota.png' },
  { nome: 'Honda', logo: '/honda logo.png' },
  { nome: 'Volkswagen', logo: '/Volkswagen_logo_2019.svg.png' },
  { nome: 'Hyundai', logo: '/Hyundai-Logo-2011.png' },
  { nome: 'Jeep', logo: '/Jeep-Logo-1970-1.png' },
  { nome: 'Fiat', logo: '/1280px-Fiat_logo.svg.png' },
]

function getFiltered(
  keyword: string,
  marca: string,
  preco: string,
  ano: string,
  cambio: string,
  comb: string,
  ordenacao: string,
): Veiculo[] {
  let lista = veiculos.filter(v => {
    const kMatch = !keyword || `${v.marca} ${v.modelo} ${v.versao}`.toLowerCase().includes(keyword.toLowerCase())
    const mMatch = !marca || v.marca === marca
    const cMatch = !cambio || v.cambio === cambio
    const fMatch = !comb || v.combustivel === comb
    const aMatch =
      !ano ||
      (ano === '2024' && v.ano >= 2024) ||
      (ano === '2023' && v.ano === 2023) ||
      (ano === '2022' && v.ano === 2022) ||
      (ano === '2021' && v.ano === 2021) ||
      (ano === '2020 ou anterior' && v.ano <= 2020)
    let pMatch = true
    if (preco === 'Até R$ 50.000') pMatch = v.preco <= 50000
    else if (preco === 'Até R$ 80.000') pMatch = v.preco <= 80000
    else if (preco === 'Até R$ 120.000') pMatch = v.preco <= 120000
    else if (preco === 'Até R$ 200.000') pMatch = v.preco <= 200000
    else if (preco === 'Acima de R$ 200.000') pMatch = v.preco > 200000
    return kMatch && mMatch && cMatch && fMatch && aMatch && pMatch
  })

  if (ordenacao === 'menor-preco') lista.sort((a, b) => a.preco - b.preco)
  else if (ordenacao === 'maior-preco') lista.sort((a, b) => b.preco - a.preco)
  else if (ordenacao === 'menor-km') lista.sort((a, b) => a.km - b.km)
  else lista.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0))

  return lista
}

const PER_PAGE = 9

export default function StockBrowser() {
  const [keyword, setKeyword] = useState('')
  const [marcaFiltro, setMarcaFiltro] = useState('')
  const [precoFiltro, setPrecoFiltro] = useState('')
  const [anoFiltro, setAnoFiltro] = useState('')
  const [cambioFiltro, setCambioFiltro] = useState('')
  const [combFiltro, setCombFiltro] = useState('')
  const [ordenacao, setOrdenacao] = useState('destaque')
  const [activeTab, setActiveTab] = useState('carros')
  const [hintText, setHintText] = useState(HINTS[0])
  const [hintVisible, setHintVisible] = useState(true)
  const [page, setPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = getFiltered(keyword, marcaFiltro, precoFiltro, anoFiltro, cambioFiltro, combFiltro, ordenacao)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // Reset page when filters or sort change
  useEffect(() => { setPage(1) }, [keyword, marcaFiltro, precoFiltro, anoFiltro, cambioFiltro, combFiltro, ordenacao])

  function goToPage(p: number) {
    setPage(p)
    setTimeout(() => {
      document.getElementById('estoque')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  // Animated hint
  useEffect(() => {
    let idx = 1
    const id = setInterval(() => {
      setHintVisible(false)
      setTimeout(() => {
        setHintText(HINTS[idx % HINTS.length])
        setHintVisible(true)
        idx++
      }, 300)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  // Intersection observer for card animations
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.vcard')
    if (!cards) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.06 },
    )
    cards.forEach(c => obs.observe(c))
    return () => obs.disconnect()
  }, [paged])

  function handleFiltrar() {
    document.getElementById('estoque')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleFiltrarPorMarca(marca: string) {
    setMarcaFiltro(marca)
    setTimeout(() => {
      document.getElementById('estoque')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" id="inicio">
        <div className="hero__banner">
          <div className="hero__banner-bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80"
              alt="Veículos DE Multimarcas"
              className="hero__bg-img"
            />
            <div className="hero__bg-overlay" />
          </div>
          <div className="hero__banner-content container">
            <div className="hero__text-block">
              <div className="hero__badge-promo">
                <div className="hero__badge-icon">%</div>
                <div>
                  <div className="promo-name">FEIRÃO</div>
                  <div className="promo-brand">DE Multimarcas</div>
                </div>
              </div>
              <h1 className="hero__h1">
                PARCELE SEU VEÍCULO<br />
                <span className="hero__destaque">EM ATÉ 60X</span>
              </h1>
              <p className="hero__sub">Taxa a partir de 0,89% a.m. · Parceria com os 4 maiores bancos</p>
              <a href="#busca" className="btn-hero">Ver ofertas →</a>
            </div>
            <div className="hero__stats-block">
              <div className="hero__stat"><strong>+200</strong><span>veículos</span></div>
              <div className="hero__stat"><strong>12 anos</strong><span>no mercado</span></div>
              <div className="hero__stat"><strong>4.9★</strong><span>Google</span></div>
              <div className="hero__stat"><strong>2h</strong><span>aprovação</span></div>
            </div>
          </div>
        </div>

        {/* Busca */}
        <div className="busca-outer" id="busca">
          <div className="busca-card container">
            <p className="busca-label">
              Busque por{' '}
              <span className="busca-hint" style={{ opacity: hintVisible ? 1 : 0 }}>
                {hintText}
              </span>
            </p>
            <div className="busca-tabs">
              <button
                className={`btab${activeTab === 'carros' ? ' active' : ''}`}
                onClick={() => setActiveTab('carros')}
              >
                🚗 Buscar carros
              </button>
              <button
                className={`btab${activeTab === 'motos' ? ' active' : ''}`}
                onClick={() => setActiveTab('motos')}
              >
                🏍️ Buscar motos
              </button>
            </div>
            <div className="busca-input-row">
              <span className="busca-icon-spark">✦</span>
              <input
                type="text"
                className="busca-input-grande"
                placeholder="Descreva o que você está procurando..."
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleFiltrar()}
              />
            </div>
            <div className="busca-selects-row">
              <select className="bselect" value={marcaFiltro} onChange={e => setMarcaFiltro(e.target.value)}>
                <option value="">Marca</option>
                <option>Toyota</option><option>Honda</option><option>Volkswagen</option>
                <option>Hyundai</option><option>Chevrolet</option><option>Jeep</option><option>Fiat</option>
              </select>
              <select className="bselect">
                <option value="">Modelo</option>
                <option>Corolla</option><option>HR-V</option><option>Compass</option>
                <option>T-Cross</option><option>Creta</option><option>Pulse</option>
              </select>
              <select className="bselect" value={precoFiltro} onChange={e => setPrecoFiltro(e.target.value)}>
                <option value="">Preço até</option>
                <option>Até R$ 50.000</option><option>Até R$ 80.000</option>
                <option>Até R$ 120.000</option><option>Até R$ 200.000</option>
                <option>Acima de R$ 200.000</option>
              </select>
              <select className="bselect" value={anoFiltro} onChange={e => setAnoFiltro(e.target.value)}>
                <option value="">Ano</option>
                <option>2024</option><option>2023</option><option>2022</option>
                <option>2021</option><option>2020 ou anterior</option>
              </select>
              <select className="bselect" value={cambioFiltro} onChange={e => setCambioFiltro(e.target.value)}>
                <option value="">Câmbio</option>
                <option>Automático</option><option>Manual</option><option>CVT</option>
              </select>
              <select className="bselect" value={combFiltro} onChange={e => setCombFiltro(e.target.value)}>
                <option value="">Combustível</option>
                <option>Flex</option><option>Gasolina</option><option>Elétrico</option>
              </select>
            </div>
            <button className="busca-btn-ver" onClick={handleFiltrar}>
              Ver todas as ofertas ({filtered.length})
            </button>
          </div>
        </div>
      </section>

      {/* ===== MARCAS ===== */}
      <section className="marcas" id="marcas">
        <div className="container">
          <h2 className="marcas__title">Marcas disponíveis</h2>
          <div className="marcas__row">
            {MARCAS.map(m => (
              <button key={m.nome} className="marca-pill" onClick={() => handleFiltrarPorMarca(m.nome)}>
                <Image src={m.logo} alt={m.nome} width={44} height={44} style={{ objectFit: 'contain' }} />
                <span>{m.nome}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ESTOQUE ===== */}
      <section className="estoque" id="estoque">
        <div className="container">
          <div className="estoque__top">
            <div>
              <h2 className="estoque__title">Ofertas em destaque</h2>
              <p className="estoque__sub">Todos revisados, com documentação em dia e procedência verificada</p>
            </div>
            <div className="estoque__sort">
              <span>Ordenar:</span>
              <select value={ordenacao} onChange={e => setOrdenacao(e.target.value)}>
                <option value="destaque">Destaques</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="menor-km">Menor km</option>
              </select>
            </div>
          </div>

          <div className="veiculos__grid" ref={gridRef}>
            {filtered.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: 6 }}>
                  Nenhum veículo encontrado
                </p>
                <p style={{ fontSize: '.85rem' }}>
                  Ajuste os filtros ou{' '}
                  <a href={`https://wa.me/${WA_NUMBER}`} style={{ color: '#E8282A', fontWeight: 600 }}>
                    fale conosco
                  </a>{' '}
                  para buscarmos para você.
                </p>
              </div>
            ) : (
              paged.map((v, i) => <VehicleCard key={v.id} v={v} i={i} />)
            )}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="paginacao">
              <button
                className="pag__btn"
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
              >
                ← Anterior
              </button>

              <div className="pag__pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    className={`pag__num${p === page ? ' active' : ''}`}
                    onClick={() => goToPage(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                className="pag__btn"
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
              >
                Próximo →
              </button>
            </div>
          )}

          <p className="estoque__pag-info">
            Mostrando {Math.min(paged.length, PER_PAGE)} de {filtered.length} veículo{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>
    </>
  )
}

function VehicleCard({ v, i }: { v: Veiculo; i: number }) {
  const waMsg = encodeURIComponent(
    `Olá! Vi o ${v.marca} ${v.modelo} ${v.ano} por ${formatBRL(v.preco)} no site da DE Multimarcas e tenho interesse. Poderia me dar mais detalhes?`,
  )

  return (
    <article
      className="vcard"
      style={{
        transitionDelay: `${i * 70}ms`,
        transition: `opacity .45s ease ${i * 70}ms, transform .45s ease ${i * 70}ms, box-shadow .18s ease`,
      }}
    >
      <Link href={`/veiculo/${v.id}`} className="vcard__img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.img} alt={`${v.marca} ${v.modelo}`} loading="lazy" />
        <span className="vcard__fotos">📷 {v.fotos}</span>
        {v.destaque && <span className="vcard__dest">Destaque</span>}
      </Link>
      <div className="vcard__body">
        <Link href={`/veiculo/${v.id}`} style={{ textDecoration: 'none' }}>
          <div className="vcard__modelo">{v.marca} {v.modelo}</div>
          <div className="vcard__versao">{v.versao}</div>
        </Link>
        <div className="vcard__specs">
          <span className="vcard__spec">📅 {v.ano}</span>
          <span className="vcard__spec">🔢 {formatKm(v.km)}</span>
          <span className="vcard__spec">⚙️ {v.cambio}</span>
          <span className="vcard__spec">⛽ {v.combustivel}</span>
          <span className="vcard__spec">🎨 {v.cor}</span>
        </div>
        <div className="vcard__opts">
          {v.opcionais.map(o => <span key={o} className="vcard__opt">{o}</span>)}
        </div>
      </div>
      <div className="vcard__preco-row">
        <div className="vcard__preco">{formatBRL(v.preco)}</div>
        <div className="vcard__parcela">
          ou <strong>{formatBRL(v.parcela)}/mês</strong> no financiamento
        </div>
      </div>
      <div className="vcard__btns">
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="vbtn vbtn--wa"
        >
          <WhatsAppIcon size={14} />
          Tenho interesse
        </a>
        <Link href={`/veiculo/${v.id}`} className="vbtn vbtn--sim">
          📋 Ver detalhes
        </Link>
      </div>
    </article>
  )
}
