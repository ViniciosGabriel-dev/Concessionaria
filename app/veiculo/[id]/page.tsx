import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WaFloat from '@/components/WaFloat'
import VeiculoGallery from '@/components/VeiculoGallery'
import VeiculoContactForm from '@/components/VeiculoContactForm'
import SimilarCarousel from '@/components/SimilarCarousel'
import { veiculos, formatBRL, formatKm } from '@/lib/veiculos'

export function generateStaticParams() {
  return veiculos.map(v => ({ id: String(v.id) }))
}

export default function VeiculoPage({ params }: { params: { id: string } }) {
  const veiculo = veiculos.find(v => v.id === Number(params.id))
  if (!veiculo) notFound()

  const relacionados = veiculos.filter(v => v.id !== veiculo.id)

  const specs = [
    { label: 'Ano', value: `${veiculo.ano}/${veiculo.ano}` },
    { label: 'KM', value: formatKm(veiculo.km) },
    { label: 'Câmbio', value: veiculo.cambio },
    { label: 'Combustível', value: veiculo.combustivel },
    { label: 'Cor', value: veiculo.cor },
    { label: 'Destaque', value: veiculo.destaque ? 'Sim' : 'Não' },
  ]

  return (
    <>
      <Header />
      <main className="det">
        {/* Gallery */}
        <VeiculoGallery img={veiculo.img} nome={`${veiculo.marca} ${veiculo.modelo}`} fotos={veiculo.fotos} />

        {/* Content + Sidebar */}
        <div className="det__body container">
          <div className="det__main">

            {/* Title */}
            <div className="det__title-row">
              <div>
                <h1 className="det__h1">
                  {veiculo.marca} <span className="det__modelo-dest">{veiculo.modelo}</span>
                </h1>
                <p className="det__versao">{veiculo.versao}</p>
              </div>
              {veiculo.destaque && <span className="det__badge-dest">⭐ Destaque</span>}
            </div>

            <p className="det__cidade">📍 São Paulo – SP</p>

            {/* Specs grid */}
            <div className="det__specs">
              {specs.map(s => (
                <div key={s.label} className="det__spec-item">
                  <span className="det__spec-label">{s.label}</span>
                  <strong className="det__spec-value">{s.value}</strong>
                </div>
              ))}
            </div>

            {/* Opcionais */}
            <div className="det__opts-section">
              <h2 className="det__section-title">Opcionais</h2>
              <div className="det__opts">
                {veiculo.opcionais.map(o => (
                  <span key={o} className="det__opt">✔ {o}</span>
                ))}
              </div>
            </div>

            {/* Price comparison */}
            <div className="det__price-compare">
              <div className="det__price-col">
                <span>Valor anunciado</span>
                <strong>{formatBRL(veiculo.preco)}</strong>
              </div>
              <div className="det__price-col">
                <span>Parcela estimada</span>
                <strong>{formatBRL(veiculo.parcela)}<small>/mês</small></strong>
                <em>Taxa 1,29% a.m. em 60x</em>
              </div>
              <div className="det__price-col">
                <span>Tabela FIPE aprox.</span>
                <strong>{formatBRL(Math.round(veiculo.preco * 0.94))}</strong>
                <em>Valor de referência</em>
              </div>
            </div>

          </div>

          {/* Sticky Sidebar */}
          <aside className="det__sidebar">
            <VeiculoContactForm veiculo={veiculo} />
          </aside>
        </div>

        {/* Você também pode gostar — carrossel com todos os carros */}
        <div className="det__similar-outer">
          <div className="container">
            <h2 className="det__similar-title">Você também pode gostar</h2>
            <SimilarCarousel veiculos={relacionados} />
          </div>
        </div>
      </main>
      <Footer />
      <WaFloat />
    </>
  )
}
