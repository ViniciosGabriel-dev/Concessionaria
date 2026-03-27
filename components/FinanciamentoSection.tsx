'use client'

import { useState } from 'react'
import WhatsAppIcon from './WhatsAppIcon'

const WA = 'https://wa.me/5511999999999'

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
}

function calcParcela(valor: number, entrada: number, prazo: number) {
  const financiado = Math.max(0, valor - entrada)
  if (financiado <= 0) return null
  const taxa = 0.0129
  const n = prazo
  return financiado * (taxa * Math.pow(1 + taxa, n)) / (Math.pow(1 + taxa, n) - 1)
}

export default function FinanciamentoSection() {
  const [valor, setValor] = useState(80000)
  const [entrada, setEntrada] = useState(20000)
  const [prazo, setPrazo] = useState(24)

  const parcela = calcParcela(valor, entrada, prazo)

  return (
    <section className="fin" id="financiamento">
      <div className="container fin__inner">
        <div className="fin__esq">
          <span className="fin__tag">Crédito facilitado</span>
          <h2 className="fin__h2">Financiamento sem burocracia</h2>
          <p className="fin__p">
            Aprovação em até 2 horas. Parceria com os 4 maiores bancos do Brasil.
            Condições reais para o seu perfil.
          </p>
          <ul className="fin__lista">
            <li>✔ Taxa a partir de 0,89% a.m.</li>
            <li>✔ Prazo de até 60 meses</li>
            <li>✔ Aprovação mesmo com restrições</li>
            <li>✔ Entrada facilitada</li>
            <li>✔ Banco do Brasil, Bradesco, Santander, Itaú</li>
          </ul>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa-fin">
            <WhatsAppIcon size={18} />
            Falar com consultor de crédito
          </a>
        </div>

        <div className="sim__card">
          <h3>Simule sua parcela</h3>
          <div className="sim__f">
            <label>Valor do veículo</label>
            <input
              type="range"
              min={30000}
              max={300000}
              step={5000}
              value={valor}
              onChange={e => setValor(Number(e.target.value))}
            />
            <div className="sim__val">{formatBRL(valor)}</div>
          </div>
          <div className="sim__f">
            <label>Entrada</label>
            <input
              type="range"
              min={0}
              max={100000}
              step={2000}
              value={entrada}
              onChange={e => setEntrada(Number(e.target.value))}
            />
            <div className="sim__val">{formatBRL(entrada)}</div>
          </div>
          <div className="sim__f">
            <label>Prazo</label>
            <div className="sim__prazos">
              {[24, 36, 48, 60].map(p => (
                <button
                  key={p}
                  className={`prazo${prazo === p ? ' active' : ''}`}
                  onClick={() => setPrazo(p)}
                >
                  {p}x
                </button>
              ))}
            </div>
          </div>
          <div className="sim__resultado">
            <div className="sim__label">Parcela estimada</div>
            <div className="sim__parcela">
              {parcela ? `${formatBRL(Math.round(parcela))}/mês` : 'À vista!'}
            </div>
            <div className="sim__obs">Taxa 1,29% a.m. · Sujeita à análise de crédito</div>
          </div>
          <a
            href={`${WA}?text=${encodeURIComponent('Quero simular meu financiamento!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red-full"
          >
            Simular com consultor →
          </a>
        </div>
      </div>
    </section>
  )
}
