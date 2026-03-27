'use client'

import { useState } from 'react'
import WhatsAppIcon from './WhatsAppIcon'

const WA_NUMBER = '5511999999999'

const MARCAS = ['Toyota', 'Honda', 'Volkswagen', 'Hyundai', 'Chevrolet', 'Jeep', 'Fiat', 'Renault', 'Nissan', 'Outra']
const ANOS = Array.from({ length: 15 }, (_, i) => String(new Date().getFullYear() - i))

const ETAPAS = [
  { num: '01', titulo: 'Preencha o formulário', desc: 'Informe os dados do seu veículo em menos de 1 minuto.' },
  { num: '02', titulo: 'Avaliação gratuita', desc: 'Nossa equipe analisa e te contacta em até 2 horas.' },
  { num: '03', titulo: 'Receba o valor', desc: 'Aprovando a proposta, pagamos à vista no mesmo dia.' },
]

const BENEFICIOS = [
  { ico: '💵', txt: 'Pagamento à vista no mesmo dia' },
  { ico: '📄', txt: 'Sem burocracia — cuidamos de tudo' },
  { ico: '🔒', txt: 'Processo 100% seguro e transparente' },
  { ico: '🚗', txt: 'Aceitamos qualquer marca e modelo' },
]

export default function VenderSection() {
  const [nome, setNome] = useState('')
  const [tel, setTel] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [ano, setAno] = useState('')
  const [km, setKm] = useState('')
  const [estado, setEstado] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const msg = `Olá! Quero vender meu carro.\n\n👤 Nome: ${nome}\n📞 Telefone: ${tel}\n🚗 Veículo: ${marca} ${modelo} ${ano}\n📏 KM: ${km}\n⭐ Estado: ${estado}\n\nAguardo a avaliação!`
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section className="vender" id="vender">
      <div className="container vender__inner">

        {/* Esquerda */}
        <div className="vender__esq">
          <span className="vender__tag">Venda seu carro</span>
          <h2 className="vender__h2">
            Receba uma proposta<br />
            <span className="vender__h2-dest">em até 2 horas</span>
          </h2>
          <p className="vender__desc">
            Compramos seu veículo com agilidade, segurança e sem complicações.
            Você não precisa ir a lugar nenhum — fazemos tudo por você.
          </p>

          {/* Etapas */}
          <div className="vender__etapas">
            {ETAPAS.map(e => (
              <div key={e.num} className="vender__etapa">
                <div className="vender__etapa-num">{e.num}</div>
                <div>
                  <div className="vender__etapa-titulo">{e.titulo}</div>
                  <div className="vender__etapa-desc">{e.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefícios */}
          <div className="vender__beneficios">
            {BENEFICIOS.map(b => (
              <div key={b.txt} className="vender__beneficio">
                <span className="vender__beneficio-ico">{b.ico}</span>
                <span>{b.txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Direita — Formulário */}
        <div className="vender__form-card">
          <h3 className="vender__form-title">Dados do seu veículo</h3>
          <p className="vender__form-sub">Preencha abaixo e receba sua proposta grátis</p>

          <form className="vender__form" onSubmit={handleSubmit}>
            <div className="vender__form-row">
              <div className="vender__field">
                <label>Seu nome</label>
                <input
                  className="vender__input"
                  placeholder="Nome completo"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="vender__field">
                <label>Telefone / WhatsApp</label>
                <input
                  className="vender__input"
                  placeholder="(11) 99999-9999"
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="vender__form-row">
              <div className="vender__field">
                <label>Marca</label>
                <select className="vender__select" value={marca} onChange={e => setMarca(e.target.value)} required>
                  <option value="">Selecione</option>
                  {MARCAS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="vender__field">
                <label>Modelo</label>
                <input
                  className="vender__input"
                  placeholder="Ex: Corolla, HR-V..."
                  value={modelo}
                  onChange={e => setModelo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="vender__form-row">
              <div className="vender__field">
                <label>Ano</label>
                <select className="vender__select" value={ano} onChange={e => setAno(e.target.value)} required>
                  <option value="">Selecione</option>
                  {ANOS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="vender__field">
                <label>Quilometragem</label>
                <input
                  className="vender__input"
                  placeholder="Ex: 45.000 km"
                  value={km}
                  onChange={e => setKm(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="vender__field">
              <label>Estado de conservação</label>
              <div className="vender__estados">
                {['Excelente', 'Bom', 'Regular'].map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`vender__estado-btn${estado === s ? ' active' : ''}`}
                    onClick={() => setEstado(s)}
                  >
                    {s === 'Excelente' ? '⭐ ' : s === 'Bom' ? '👍 ' : '🔧 '}
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="vender__btn-submit">
              <WhatsAppIcon size={18} />
              Quero uma proposta gratuita
            </button>
          </form>

          <p className="vender__form-nota">
            🔒 Seus dados são protegidos e não serão compartilhados com terceiros.
          </p>
        </div>

      </div>
    </section>
  )
}
