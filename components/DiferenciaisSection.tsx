const DIFS = [
  { bg: '#EBF4FF', color: '#1D6DD4', ico: '🔍', title: 'Veículos revisados', desc: 'Inspeção técnica completa antes de entrar no estoque. Você compra com segurança total.' },
  { bg: '#E6F9EF', color: '#0B7A4A', ico: '💬', title: 'Atendimento ágil', desc: 'Fale com nosso time no WhatsApp em minutos. Resposta real, sem robôs.' },
  { bg: '#FEF2F2', color: '#E8282A', ico: '📄', title: 'Documentação garantida', desc: 'IPVA em dia, sem multas, histórico verificado no Detran e Denatran.' },
  { bg: '#FFF7ED', color: '#C2630A', ico: '💳', title: 'Financiamento fácil', desc: '4 bancos parceiros, aprovação em 2h, entrada facilitada, até 60 meses.' },
  { bg: '#F5F0FF', color: '#7C3AED', ico: '🔒', title: 'Procedência verificada', desc: 'Consultamos leilão, bloqueios e histórico completo de cada veículo.' },
  { bg: '#F0FDFA', color: '#0D9488', ico: '🤝', title: 'Suporte pós-venda', desc: 'Suporte completo para transferência e qualquer dúvida após a compra.' },
]

export default function DiferenciaisSection() {
  return (
    <section className="difs" id="diferenciais">
      <div className="container">
        <h2 className="h2-center">Por que comprar na DE Multimarcas?</h2>
        <p className="sub-center">Transparência e cuidado em cada etapa da sua compra</p>
        <div className="difs__grid">
          {DIFS.map(d => (
            <div key={d.title} className="dif">
              <div className="dif__ico" style={{ background: d.bg, color: d.color }}>{d.ico}</div>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
