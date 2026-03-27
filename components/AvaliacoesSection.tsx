const AVALIACOES = [
  {
    ini: 'MR', bg: '#1A4FBF', nome: 'Marcos Ribeiro', when: 'há 2 semanas · Google',
    texto: '"Comprei meu Corolla aqui e foi a melhor experiência que já tive com loja de carros. Sem pressão, documentação toda certa, e me explicaram o financiamento direitinho. Recomendo demais!"',
    tag: '🚗 Toyota Corolla 2022',
  },
  {
    ini: 'AS', bg: '#E8282A', nome: 'Ana Souza', when: 'há 1 mês · Google',
    texto: '"Fui indicada por uma amiga. O carro estava idêntico ao anúncio, sem surpresas. Financiamento aprovado no mesmo dia. Time super atencioso e honesto do início ao fim!"',
    tag: '🚗 Honda HR-V 2023',
  },
  {
    ini: 'FL', bg: '#0B7A4A', nome: 'Felipe Lima', when: 'há 3 semanas · Google',
    texto: '"Processo rápido e transparente. O consultor mandou vídeo do carro antes de eu ir à loja. Fechei em 2 dias. Loja de confiança de verdade. Já indiquei para família e amigos!"',
    tag: '🚗 Jeep Compass 2022',
  },
]

const SELOS = [
  '✅ Loja verificada',
  '🏅 Atendimento bem avaliado',
  '🔒 Compra segura',
  '📍 CNPJ ativo desde 2012',
  '⭐ 4.9 no Google',
]

export default function AvaliacoesSection() {
  return (
    <section className="avs" id="avaliacoes">
      <div className="container">
        <h2 className="h2-center">O que dizem nossos clientes</h2>
        <div className="google-pill">
          <svg viewBox="0 0 48 48" width="28" height="28">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
          </svg>
          <span><strong>4.9</strong> ★★★★★</span>
          <span className="google-pill__count">+420 avaliações no Google</span>
        </div>
        <div className="avs__grid">
          {AVALIACOES.map(a => (
            <div key={a.nome} className="av">
              <div className="av__head">
                <div className="av__av" style={{ background: a.bg }}>{a.ini}</div>
                <div>
                  <div className="av__nome">{a.nome}</div>
                  <div className="av__when">{a.when}</div>
                </div>
                <div className="av__stars">★★★★★</div>
              </div>
              <p>{a.texto}</p>
              <span className="av__tag">{a.tag}</span>
            </div>
          ))}
        </div>
        <div className="selos-row">
          {SELOS.map(s => <div key={s} className="selo">{s}</div>)}
        </div>
      </div>
    </section>
  )
}
