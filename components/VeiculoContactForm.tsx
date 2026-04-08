'use client'

import { useState } from 'react'
import { Veiculo, formatBRL } from '@/lib/veiculos'
import WhatsAppIcon from './WhatsAppIcon'

const WA_NUMBER = '5511977254727'

function calcParcela(valor: number, entrada: number, prazo: number) {
  const financiado = Math.max(0, valor - entrada)
  if (financiado <= 0) return null
  const taxa = 0.0129
  return financiado * (taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1)
}

export default function VeiculoContactForm({ veiculo }: { veiculo: Veiculo }) {
  // Simulador
  const [showSim, setShowSim] = useState(false)
  const [entrada, setEntrada] = useState(Math.round(veiculo.preco * 0.2))
  const [prazo, setPrazo] = useState(48)

  // Formulário de contato
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [msg, setMsg] = useState(
    `Olá, tenho interesse no ${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}. Por favor entre em contato.`,
  )

  const parcela = calcParcela(veiculo.preco, entrada, prazo)
  const entradaMax = Math.round(veiculo.preco * 0.8)

  const waMsg = encodeURIComponent(
    `Olá! Vi o ${veiculo.marca} ${veiculo.modelo} ${veiculo.ano} por ${formatBRL(veiculo.preco)} no site da DE Multimarcas e tenho interesse!`,
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="det__sidebar-card">
      {/* Preço + botão Ver parcelas */}
      <div className="det__preco-row">
        <div className="det__preco">{formatBRL(veiculo.preco)}</div>
        <button
          className={`det__btn-sim-toggle${showSim ? ' active' : ''}`}
          onClick={() => setShowSim(s => !s)}
        >
          {showSim ? 'Fechar' : 'Ver parcelas'}
        </button>
      </div>

      {/* Simulador expansível */}
      {showSim && (
        <div className="det__sim">
          <div className="det__sim-row">
            <span className="det__sim-label">Valor do veículo</span>
            <strong className="det__sim-fixed">{formatBRL(veiculo.preco)}</strong>
          </div>

          <div className="det__sim-field">
            <div className="det__sim-field-header">
              <span className="det__sim-label">Entrada</span>
              <strong className="det__sim-val">{formatBRL(entrada)}</strong>
            </div>
            <input
              type="range"
              className="det__sim-range"
              min={0}
              max={entradaMax}
              step={1000}
              value={entrada}
              onChange={e => setEntrada(Number(e.target.value))}
            />
          </div>

          <div className="det__sim-field">
            <span className="det__sim-label">Prazo</span>
            <div className="det__sim-prazos">
              {[24, 36, 48, 60].map(p => (
                <button
                  key={p}
                  className={`det__prazo-btn${prazo === p ? ' active' : ''}`}
                  onClick={() => setPrazo(p)}
                >
                  {p}x
                </button>
              ))}
            </div>
          </div>

          <div className="det__sim-resultado">
            <span className="det__sim-resultado-label">Parcela estimada</span>
            <div className="det__sim-resultado-valor">
              {parcela ? `${formatBRL(Math.round(parcela))}/mês` : 'À vista!'}
            </div>
            <span className="det__sim-obs">Taxa 1,29% a.m. · Sujeita à análise de crédito</span>
          </div>

          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Quero simular o financiamento do ${veiculo.marca} ${veiculo.modelo} ${veiculo.ano} (${formatBRL(veiculo.preco)}) com entrada de ${formatBRL(entrada)} em ${prazo}x.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="det__btn-enviar"
            style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}
          >
            Simular com consultor →
          </a>
        </div>
      )}

      {!showSim && (
        <p className="det__parcela-hint">
          ou <strong>{formatBRL(veiculo.parcela)}/mês</strong> no financiamento
        </p>
      )}

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="det__btn-wa"
      >
        <WhatsAppIcon size={18} />
        Falar no WhatsApp
      </a>

      <div className="det__divider">ou envie uma mensagem</div>

      <form className="det__form" onSubmit={handleSubmit}>
        <input
          className="det__input"
          placeholder="Nome*"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          className="det__input"
          type="email"
          placeholder="E-mail*"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="det__input"
          placeholder="Telefone*"
          value={tel}
          onChange={e => setTel(e.target.value)}
          required
        />
        <textarea
          className="det__input det__textarea"
          value={msg}
          onChange={e => setMsg(e.target.value)}
          required
        />
        <button type="submit" className="det__btn-enviar">
          Enviar mensagem
        </button>
      </form>
    </div>
  )
}
