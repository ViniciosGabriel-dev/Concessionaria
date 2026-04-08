import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WaFloat from '@/components/WaFloat'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre | DE Multimarcas',
  description: 'Conheça a DE Multimarcas, uma das revendas de automóveis de grande prestígio na região de São Paulo.',
}

const DIFERENCIAIS = [
  { ico: '🔍', title: 'Veículos revisados', desc: 'Inspeção técnica completa antes de entrar no estoque. Você compra com segurança total.' },
  { ico: '💬', title: 'Atendimento ágil', desc: 'Fale com nosso time no WhatsApp em minutos. Resposta real, sem robôs.' },
  { ico: '📄', title: 'Documentação garantida', desc: 'IPVA em dia, sem multas, histórico verificado no Detran e Denatran.' },
  { ico: '💳', title: 'Financiamento fácil', desc: '4 bancos parceiros, aprovação em 2h, entrada facilitada, até 60 meses.' },
  { ico: '🔒', title: 'Procedência verificada', desc: 'Consultamos leilão, bloqueios e histórico completo de cada veículo.' },
  { ico: '🤝', title: 'Suporte pós-venda', desc: 'Suporte completo para transferência e qualquer dúvida após a compra.' },
]

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="sobre">

        {/* Hero */}
        <section className="sobre__hero">
          <div className="container sobre__hero-inner">
            <div className="sobre__hero-text">
              <span className="sobre__badge">Quem somos</span>
              <h1 className="sobre__h1">DE Multimarcas</h1>
              <p className="sobre__lead">
                Uma das revendas de automóveis de maior prestígio na região de São Paulo.
                Especializados na venda de veículos nacionais, importados, zero quilômetro e seminovos.
              </p>
              <a href="/#estoque" className="sobre__btn">Ver estoque →</a>
            </div>
            <div className="sobre__hero-stats">
              <div className="sobre__stat">
                <strong>+200</strong>
                <span>Veículos disponíveis</span>
              </div>
              <div className="sobre__stat">
                <strong>4.9★</strong>
                <span>Avaliação no Google</span>
              </div>
              <div className="sobre__stat">
                <strong>2h</strong>
                <span>Aprovação de crédito</span>
              </div>
              <div className="sobre__stat">
                <strong>4</strong>
                <span>Bancos parceiros</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quem somos */}
        <section className="sobre__sec">
          <div className="container sobre__two-col">
            <div className="sobre__text-block">
              <h2>Sobre a empresa</h2>
              <p>
                A <strong>DE Multimarcas</strong> é uma revenda especializada em veículos nacionais e importados,
                novos e seminovos, localizada na Av. Itaquera, 1307 — Jardim Maringá, São Paulo – SP.
              </p>
              <p>
                Nosso compromisso é oferecer transparência em cada etapa da negociação: da busca do veículo
                ideal até a finalização da documentação e transferência. Cada carro que entra no nosso
                estoque passa por inspeção técnica rigorosa e verificação de procedência.
              </p>
              <p>
                Trabalhamos com financiamento facilitado em parceria com os maiores bancos do país,
                garantindo aprovação rápida e condições acessíveis para todos os perfis.
              </p>
            </div>
            <div className="sobre__contact-card">
              <h3>Fale conosco</h3>
              <p>📍 Av. Itaquera, 1307<br />Jardim Maringá, São Paulo – SP</p>
              <p>📞 <a href="tel:+551122695575">(11) 2269-5575</a></p>
              <p>📱 <a href="tel:+5511977254727">(11) 97725-4727</a></p>
              <a
                href="https://wa.me/5511977254727"
                target="_blank"
                rel="noopener noreferrer"
                className="sobre__wa-btn"
              >
                💬 Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="sobre__sec sobre__sec--gray">
          <div className="container">
            <h2 className="h2-center">Por que comprar na DE Multimarcas?</h2>
            <p className="sub-center">Transparência e cuidado em cada etapa da sua compra</p>
            <div className="sobre__difs">
              {DIFERENCIAIS.map(d => (
                <div key={d.title} className="sobre__dif">
                  <span className="sobre__dif-ico">{d.ico}</span>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WaFloat />
    </>
  )
}
