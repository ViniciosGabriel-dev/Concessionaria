import WhatsAppIcon from './WhatsAppIcon'

const WA = 'https://wa.me/5511999999999'

export default function CTASection() {
  return (
    <section className="cta" id="contato">
      <div className="container cta__inner">
        <div className="cta__left">
          <h2>Pronto para encontrar<br />seu próximo carro?</h2>
          <p>Nossa equipe está online agora. Fale em menos de 2 minutos, sem compromisso.</p>
          <div className="cta__btns">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa-cta">
              <WhatsAppIcon size={20} />
              Falar no WhatsApp agora
            </a>
            <a href="tel:+5511999999999" className="btn-outline-cta">📞 (11) 99999-9999</a>
          </div>
        </div>
        <div className="cta__card">
          <div className="cta__online"><span className="dot-on" /> Equipe online agora</div>
          <p>💬 Última resposta: <strong>3 min atrás</strong></p>
          <p>🕐 Seg–Sáb: <strong>8h às 20h</strong></p>
          <p>⭐ <strong>4.9/5</strong> no Google</p>
          <p>📍 <strong>São Paulo – SP</strong></p>
        </div>
      </div>
    </section>
  )
}
