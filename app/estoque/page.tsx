'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WaFloat from '@/components/WaFloat'
import { veiculos, Veiculo, formatBRL, formatKm } from '@/lib/veiculos'

const MARCAS = ['Toyota', 'Honda', 'Volkswagen', 'Hyundai', 'Jeep', 'Fiat']
const CAMBIOS = ['Automático', 'Manual', 'CVT']
const COMBUSTIVEIS = ['Flex', 'Gasolina', 'Elétrico']
const FAIXAS_PRECO = [
  { label: 'Até R$ 50.000', max: 50000 },
  { label: 'Até R$ 80.000', max: 80000 },
  { label: 'Até R$ 120.000', max: 120000 },
  { label: 'Até R$ 200.000', max: 200000 },
  { label: 'Acima de R$ 200.000', min: 200000 },
]
const ANOS = ['2024', '2023', '2022', '2021', '2020 ou anterior']

function getFiltered(
  marcas: string[],
  cambios: string[],
  combs: string[],
  precoMax: number | null,
  precoMin: number | null,
  anos: string[],
  keyword: string,
  sort: string,
): Veiculo[] {
  let lista = veiculos.filter(v => {
    const mMatch = marcas.length === 0 || marcas.includes(v.marca)
    const cMatch = cambios.length === 0 || cambios.includes(v.cambio)
    const fMatch = combs.length === 0 || combs.includes(v.combustivel)
    const pMatch =
      (precoMax === null || v.preco <= precoMax) &&
      (precoMin === null || v.preco > precoMin)
    const aMatch =
      anos.length === 0 ||
      anos.some(a =>
        (a === '2024' && v.ano >= 2024) ||
        (a === '2023' && v.ano === 2023) ||
        (a === '2022' && v.ano === 2022) ||
        (a === '2021' && v.ano === 2021) ||
        (a === '2020 ou anterior' && v.ano <= 2020),
      )
    const kMatch = !keyword || `${v.marca} ${v.modelo} ${v.versao}`.toLowerCase().includes(keyword.toLowerCase())
    return mMatch && cMatch && fMatch && pMatch && aMatch && kMatch
  })

  if (sort === 'menor-preco') lista.sort((a, b) => a.preco - b.preco)
  else if (sort === 'maior-preco') lista.sort((a, b) => b.preco - a.preco)
  else if (sort === 'menor-km') lista.sort((a, b) => a.km - b.km)
  else lista.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0))

  return lista
}

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
}

export default function EstoquePage() {
  const [keyword, setKeyword] = useState('')
  const [marcasSel, setMarcasSel] = useState<string[]>([])
  const [cambiosSel, setCambiosSel] = useState<string[]>([])
  const [combsSel, setCombsSel] = useState<string[]>([])
  const [precoFaixa, setPrecoFaixa] = useState<string>('')
  const [anosSel, setAnosSel] = useState<string[]>([])
  const [sort, setSort] = useState('destaque')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const faixa = FAIXAS_PRECO.find(f => f.label === precoFaixa)
  const filtered = getFiltered(
    marcasSel, cambiosSel, combsSel,
    faixa?.max ?? null, faixa?.min ?? null,
    anosSel, keyword, sort,
  )

  const totalFiltros = marcasSel.length + cambiosSel.length + combsSel.length + (precoFaixa ? 1 : 0) + anosSel.length

  function clearAll() {
    setMarcasSel([]); setCambiosSel([]); setCombsSel([])
    setPrecoFaixa(''); setAnosSel([]); setKeyword('')
  }

  function removeTag(type: string, val: string) {
    if (type === 'marca') setMarcasSel(a => a.filter(x => x !== val))
    else if (type === 'cambio') setCambiosSel(a => a.filter(x => x !== val))
    else if (type === 'comb') setCombsSel(a => a.filter(x => x !== val))
    else if (type === 'preco') setPrecoFaixa('')
    else if (type === 'ano') setAnosSel(a => a.filter(x => x !== val))
  }

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.lst__card')
    if (!cards) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.04 })
    cards.forEach(c => obs.observe(c))
    return () => obs.disconnect()
  }, [filtered])

  return (
    <>
      <Header />
      <main className="lst">
        {/* Breadcrumb + título */}
        <div className="lst__top container">
          <nav className="lst__breadcrumb">
            <Link href="/">Home</Link> › <span>Carros</span> › <span>São Paulo</span>
          </nav>
          <h1 className="lst__h1">Carros usados, seminovos e novos em São Paulo</h1>
        </div>

        <div className="lst__body container">
          {/* Botão mobile para abrir sidebar */}
          <button className="lst__filter-toggle" onClick={() => setSidebarOpen(o => !o)}>
            ⚙ Filtros {totalFiltros > 0 && <span className="lst__badge">{totalFiltros}</span>}
          </button>

          {/* ===== SIDEBAR ===== */}
          <aside className={`lst__sidebar${sidebarOpen ? ' open' : ''}`}>

            {/* Filtros aplicados */}
            {totalFiltros > 0 && (
              <div className="lst__filter-group">
                <div className="lst__filter-header">
                  <span className="lst__filter-title">
                    Filtros aplicados <span className="lst__badge">{totalFiltros}</span>
                  </span>
                  <button className="lst__clear" onClick={clearAll}>Limpar todos</button>
                </div>
                <div className="lst__tags">
                  {marcasSel.map(m => <button key={m} className="lst__tag" onClick={() => removeTag('marca', m)}>{m} ×</button>)}
                  {cambiosSel.map(c => <button key={c} className="lst__tag" onClick={() => removeTag('cambio', c)}>{c} ×</button>)}
                  {combsSel.map(c => <button key={c} className="lst__tag" onClick={() => removeTag('comb', c)}>{c} ×</button>)}
                  {precoFaixa && <button className="lst__tag" onClick={() => removeTag('preco', '')}>{precoFaixa} ×</button>}
                  {anosSel.map(a => <button key={a} className="lst__tag" onClick={() => removeTag('ano', a)}>{a} ×</button>)}
                </div>
              </div>
            )}

            {/* Busca */}
            <div className="lst__filter-group">
              <div className="lst__filter-title">Buscar</div>
              <input
                className="lst__search"
                placeholder="Marca, modelo, versão..."
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
              />
            </div>

            {/* Marca */}
            <div className="lst__filter-group">
              <div className="lst__filter-title">Marca</div>
              {MARCAS.map(m => (
                <label key={m} className="lst__check-label">
                  <input
                    type="checkbox"
                    className="lst__check"
                    checked={marcasSel.includes(m)}
                    onChange={() => setMarcasSel(a => toggle(a, m))}
                  />
                  <span>{m}</span>
                </label>
              ))}
            </div>

            {/* Preço */}
            <div className="lst__filter-group">
              <div className="lst__filter-title">Preço</div>
              {FAIXAS_PRECO.map(f => (
                <label key={f.label} className="lst__check-label">
                  <input
                    type="radio"
                    name="preco"
                    className="lst__check"
                    checked={precoFaixa === f.label}
                    onChange={() => setPrecoFaixa(precoFaixa === f.label ? '' : f.label)}
                  />
                  <span>{f.label}</span>
                </label>
              ))}
            </div>

            {/* Câmbio */}
            <div className="lst__filter-group">
              <div className="lst__filter-title">Câmbio</div>
              {CAMBIOS.map(c => (
                <label key={c} className="lst__check-label">
                  <input
                    type="checkbox"
                    className="lst__check"
                    checked={cambiosSel.includes(c)}
                    onChange={() => setCambiosSel(a => toggle(a, c))}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>

            {/* Combustível */}
            <div className="lst__filter-group">
              <div className="lst__filter-title">Combustível</div>
              {COMBUSTIVEIS.map(c => (
                <label key={c} className="lst__check-label">
                  <input
                    type="checkbox"
                    className="lst__check"
                    checked={combsSel.includes(c)}
                    onChange={() => setCombsSel(a => toggle(a, c))}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>

            {/* Ano */}
            <div className="lst__filter-group">
              <div className="lst__filter-title">Ano</div>
              {ANOS.map(a => (
                <label key={a} className="lst__check-label">
                  <input
                    type="checkbox"
                    className="lst__check"
                    checked={anosSel.includes(a)}
                    onChange={() => setAnosSel(arr => toggle(arr, a))}
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>

          </aside>

          {/* ===== CONTENT ===== */}
          <div className="lst__content">
            <div className="lst__content-top">
              <span className="lst__count">
                <strong>{filtered.length}</strong> anúncio{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
              </span>
              <div className="lst__sort">
                <span>Ordenar por:</span>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="destaque">Mais relevantes</option>
                  <option value="menor-preco">Menor preço</option>
                  <option value="maior-preco">Maior preço</option>
                  <option value="menor-km">Menor km</option>
                </select>
              </div>
            </div>

            <div className="lst__grid" ref={gridRef}>
              {filtered.length === 0 ? (
                <div className="lst__empty">
                  <div>🔍</div>
                  <p>Nenhum veículo encontrado com esses filtros.</p>
                  <button className="lst__clear-btn" onClick={clearAll}>Limpar filtros</button>
                </div>
              ) : (
                filtered.map((v, i) => <ListingCard key={v.id} v={v} i={i} />)
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WaFloat />
    </>
  )
}

function ListingCard({ v, i }: { v: Veiculo; i: number }) {
  return (
    <Link
      href={`/veiculo/${v.id}`}
      className="lst__card"
      style={{ transitionDelay: `${i * 50}ms` }}
    >
      <div className="lst__card-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.img} alt={`${v.marca} ${v.modelo}`} loading="lazy" />
        <span className="lst__card-fotos">1/{v.fotos}</span>
        {v.destaque && <span className="lst__card-badge">⭐ Destaque</span>}
      </div>
      <div className="lst__card-body">
        <strong className="lst__card-nome">{v.marca} {v.modelo}</strong>
        <span className="lst__card-versao">{v.versao}</span>
        <div className="lst__card-meta">
          <span>🗓 {v.ano}/{v.ano}</span>
          <span>📏 {formatKm(v.km)}</span>
        </div>
        <div className="lst__card-local">📍 São Paulo (SP)</div>
        <div className="lst__card-preco">{formatBRL(v.preco)}</div>
        <div className="lst__card-cta">Ver parcelas</div>
      </div>
    </Link>
  )
}
