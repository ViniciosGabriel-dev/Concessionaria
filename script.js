/* ========================================
   AutoElite Multimarcas — script.js
   ======================================== */

/* ===== DADOS ===== */
const veiculos = [
  {
    id: 1,
    marca: 'Toyota',
    modelo: 'Corolla',
    versao: 'Altis Premium 2.0 Flex',
    ano: 2023,
    km: 18400,
    cambio: 'Automático',
    combustivel: 'Flex',
    cor: 'Prata',
    preco: 139900,
    fotos: 24,
    destaque: true,
    opcionais: ['Couro', 'Teto solar', 'Lane Assist', 'HUD'],
    img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80',
    parcela: 2814
  },
  {
    id: 2,
    marca: 'Honda',
    modelo: 'HR-V',
    versao: 'EXL 1.5 Turbo CVT',
    ano: 2023,
    km: 12100,
    cambio: 'CVT',
    combustivel: 'Gasolina',
    cor: 'Branco',
    preco: 147800,
    fotos: 19,
    destaque: false,
    opcionais: ['Câmera 360°', 'Honda Sensing', 'Couro', 'CarPlay'],
    img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80',
    parcela: 2980
  },
  {
    id: 3,
    marca: 'Jeep',
    modelo: 'Compass',
    versao: 'Limited 1.3 Turbo AT6',
    ano: 2022,
    km: 34200,
    cambio: 'Automático',
    combustivel: 'Flex',
    cor: 'Preto',
    preco: 169900,
    fotos: 31,
    destaque: true,
    opcionais: ['Teto solar', 'Couro', 'Parktronic', 'Câmera 360°'],
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    parcela: 3420
  },
  {
    id: 4,
    marca: 'Volkswagen',
    modelo: 'T-Cross',
    versao: 'Highline 1.4 TSI AT',
    ano: 2023,
    km: 9800,
    cambio: 'Automático',
    combustivel: 'Gasolina',
    cor: 'Azul',
    preco: 131500,
    fotos: 22,
    destaque: false,
    opcionais: ['Rodas 17"', 'CarPlay', 'Câmera re', 'Sensores'],
    img: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=600&q=80',
    parcela: 2648
  },
  {
    id: 5,
    marca: 'Hyundai',
    modelo: 'Creta',
    versao: 'Platinum 2.0 Flex AT',
    ano: 2022,
    km: 28000,
    cambio: 'Automático',
    combustivel: 'Flex',
    cor: 'Cinza',
    preco: 118900,
    fotos: 18,
    destaque: false,
    opcionais: ['Couro', 'Câmera', 'Wireless', 'HUD'],
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80',
    parcela: 2393
  },
  {
    id: 6,
    marca: 'Fiat',
    modelo: 'Pulse',
    versao: 'Impetus 1.0 Turbo 200 AT',
    ano: 2023,
    km: 7200,
    cambio: 'Automático',
    combustivel: 'Flex',
    cor: 'Vermelho',
    preco: 99900,
    fotos: 15,
    destaque: false,
    opcionais: ['Teto solar', 'Câmera', 'Rodas 17"', 'Android Auto'],
    img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80',
    parcela: 2010
  }
];

/* ===== UTILS ===== */
function formatBRL(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
}
function formatKm(v) {
  return v.toLocaleString('pt-BR') + ' km';
}

/* ===== RENDER CARDS ===== */
function renderVeiculos(lista) {
  const grid = document.getElementById('veiculos-grid');
  const total = document.getElementById('total-count');
  if (!grid) return;

  if (total) total.textContent = lista.length;
  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#6B7280">
        <div style="font-size:2.5rem;margin-bottom:12px">🔍</div>
        <p style="font-size:1rem;font-weight:700;color:#111827;margin-bottom:6px">Nenhum veículo encontrado</p>
        <p style="font-size:.85rem">Ajuste os filtros ou <a href="https://wa.me/5511999999999" style="color:#E8282A;font-weight:600">fale conosco</a> para buscarmos para você.</p>
      </div>`;
    return;
  }

  lista.forEach((v, i) => {
    const card = document.createElement('article');
    card.className = 'vcard';
    card.style.transitionDelay = `${i * 70}ms`;
    card.style.transition = `opacity .45s ease ${i * 70}ms, transform .45s ease ${i * 70}ms, box-shadow .18s ease`;

    const waMsg = encodeURIComponent(`Olá! Vi o ${v.marca} ${v.modelo} ${v.ano} por ${formatBRL(v.preco)} no site da AutoElite e tenho interesse. Poderia me dar mais detalhes?`);

    card.innerHTML = `
      <div class="vcard__img">
        <img src="${v.img}" alt="${v.marca} ${v.modelo}" loading="lazy" />
        <span class="vcard__fotos">📷 ${v.fotos}</span>
        ${v.destaque ? '<span class="vcard__dest">Destaque</span>' : ''}
      </div>
      <div class="vcard__body">
        <div class="vcard__modelo">${v.marca} ${v.modelo}</div>
        <div class="vcard__versao">${v.versao}</div>
        <div class="vcard__specs">
          <span class="vcard__spec">📅 ${v.ano}</span>
          <span class="vcard__spec">🔢 ${formatKm(v.km)}</span>
          <span class="vcard__spec">⚙️ ${v.cambio}</span>
          <span class="vcard__spec">⛽ ${v.combustivel}</span>
          <span class="vcard__spec">🎨 ${v.cor}</span>
        </div>
        <div class="vcard__opts">
          ${v.opcionais.map(o => `<span class="vcard__opt">${o}</span>`).join('')}
        </div>
      </div>
      <div class="vcard__preco-row">
        <div class="vcard__preco">${formatBRL(v.preco)}</div>
        <div class="vcard__parcela">ou <strong>${formatBRL(v.parcela)}/mês</strong> no financiamento</div>
      </div>
      <div class="vcard__btns">
        <a href="https://wa.me/5511999999999?text=${waMsg}" target="_blank" class="vbtn vbtn--wa">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Tenho interesse
        </a>
        <a href="#financiamento" class="vbtn vbtn--sim">📊 Simular parcela</a>
      </div>
    `;
    grid.appendChild(card);
  });

  observeCards();
}

/* ===== FILTRAR ===== */
function filtrarVeiculos() {
  const kw = (document.getElementById('busca-keyword')?.value || '').toLowerCase();
  const marca = document.getElementById('busca-marca')?.value || '';
  const cambio = document.getElementById('busca-cambio')?.value || '';
  const comb = document.getElementById('busca-comb')?.value || '';
  const preco = document.getElementById('busca-preco')?.value || '';
  const ano = document.getElementById('busca-ano')?.value || '';

  let filtrados = veiculos.filter(v => {
    const kMatch = !kw || `${v.marca} ${v.modelo} ${v.versao}`.toLowerCase().includes(kw);
    const mMatch = !marca || v.marca === marca;
    const cMatch = !cambio || v.cambio === cambio;
    const fMatch = !comb || v.combustivel === comb;
    const aMatch = !ano
      || (ano === '2024' && v.ano >= 2024)
      || (ano === '2023' && v.ano === 2023)
      || (ano === '2022' && v.ano === 2022)
      || (ano === '2021' && v.ano === 2021)
      || (ano === '2020 ou anterior' && v.ano <= 2020);
    let pMatch = true;
    if (preco === 'Até R$ 50.000') pMatch = v.preco <= 50000;
    else if (preco === 'Até R$ 80.000') pMatch = v.preco <= 80000;
    else if (preco === 'Até R$ 120.000') pMatch = v.preco <= 120000;
    else if (preco === 'Até R$ 200.000') pMatch = v.preco <= 200000;
    else if (preco === 'Acima de R$ 200.000') pMatch = v.preco > 200000;
    return kMatch && mMatch && cMatch && fMatch && aMatch && pMatch;
  });

  renderVeiculos(filtrados);
  document.getElementById('estoque')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ===== FILTRAR POR MARCA (botões de marca) ===== */
function filtrarPorMarca(m) {
  const el = document.getElementById('busca-marca');
  if (el) el.value = m;
  filtrarVeiculos();
}

/* ===== ORDENAR ===== */
function ordenarVeiculos(criterio) {
  let lista = [...veiculos];
  if (criterio === 'menor-preco') lista.sort((a, b) => a.preco - b.preco);
  else if (criterio === 'maior-preco') lista.sort((a, b) => b.preco - a.preco);
  else if (criterio === 'menor-km') lista.sort((a, b) => a.km - b.km);
  else lista.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
  renderVeiculos(lista);
}

/* ===== TABS ===== */
function setTab(btn, tipo) {
  document.querySelectorAll('.btab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ===== OBSERVER CARDS ===== */
function observeCards() {
  const cards = document.querySelectorAll('.vcard');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  cards.forEach(c => obs.observe(c));
}

/* ===== SIMULADOR ===== */
let prazoAtual = 24;

function setPrazo(p, btn) {
  prazoAtual = p;
  document.querySelectorAll('.prazo').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  calcularParcela();
}

function calcularParcela() {
  const valEl = document.getElementById('sim-valor');
  const entEl = document.getElementById('sim-entrada');
  const resEl = document.getElementById('sim-resultado');
  const valDisp = document.getElementById('sim-valor-display');
  const entDisp = document.getElementById('sim-entrada-display');
  if (!valEl || !resEl) return;

  const valor = parseInt(valEl.value);
  const entrada = parseInt(entEl.value);
  valDisp.textContent = formatBRL(valor);
  entDisp.textContent = formatBRL(entrada);

  const financiado = Math.max(0, valor - entrada);
  if (financiado <= 0) { resEl.textContent = 'À vista!'; return; }

  const taxa = 0.0129;
  const n = prazoAtual;
  const parcela = financiado * (taxa * Math.pow(1 + taxa, n)) / (Math.pow(1 + taxa, n) - 1);
  resEl.textContent = `${formatBRL(Math.round(parcela))}/mês`;
  resEl.style.transform = 'scale(1.06)';
  setTimeout(() => resEl.style.transform = 'scale(1)', 150);
}

/* ===== PLACEHOLDER ANIMADO NA BUSCA ===== */
const hints = ['Corolla automático 2022', 'SUV até R$ 150.000', 'Honda flex câmbio CVT', 'Jeep Compass com teto solar', 'Carro para família até 60x'];
let hintIdx = 0;
let hintTimeout;

function animateHint() {
  const el = document.getElementById('busca-placeholder-text');
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = hints[hintIdx % hints.length];
    el.style.opacity = '1';
    hintIdx++;
    hintTimeout = setTimeout(animateHint, 2800);
  }, 300);
}

/* ===== HEADER SCROLL ===== */
function initHeaderScroll() {
  const h = document.getElementById('header');
  if (!h) return;
  window.addEventListener('scroll', () => {
    h.style.boxShadow = window.scrollY > 10 ? '0 2px 16px rgba(0,0,0,.12)' : '0 1px 8px rgba(0,0,0,.08)';
  }, { passive: true });
}

/* ===== HAMBURGER ===== */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));
}

/* ===== SMOOTH SCROLL ===== */
function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
      }
    });
  });
}

/* ===== HINT TRANSITIONS ===== */
function initHintCSS() {
  const el = document.getElementById('busca-placeholder-text');
  if (!el) return;
  el.style.transition = 'opacity .3s ease';
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderVeiculos(veiculos);
  calcularParcela();
  initHeaderScroll();
  initHamburger();
  initScroll();
  initHintCSS();
  setTimeout(animateHint, 600);
});
