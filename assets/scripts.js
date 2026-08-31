/*

TemplateMo 595 3d coverflow
https://templatemo.com/tm-595-3d-coverflow

*/

// JavaScript Document

// Coverflow functionality
const items = document.querySelectorAll('.coverflow-item');
const dotsContainer = document.getElementById('dots');
const currentTitle = document.getElementById('current-title');
const currentDescription = document.getElementById('current-description');
const container = document.querySelector('.coverflow-container');
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
let currentIndex = 3;
let isAnimating = false;

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainMenu.classList.toggle('active');
});

// Close mobile menu when clicking on menu items (except external links)
document.querySelectorAll('.menu-item:not(.external)').forEach(item => {
    item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        mainMenu.classList.remove('active');
    }
});

// Image data with titles and descriptions
const imageData = [
    { title: "Limpeza Técnica de Vidros", description: "Remove sujeira, poeira e manchas, garantindo transparência e brilho." },
    { title: "Restauração Mecânica de Vidros - Lixamento e Polimento Técnico", description: "Remoção de riscos superficiais e danos físicos por lixamento e polimento." },
    { title: "Impermeabilização Técnica de Vidros – Barreira Protetora Hidrorrepelente", description: "Aplica camada protetora hidrofóbica." },
    { title: "Revitalização Estética de Elementos Metálicos – Perfis e Esquadrias", description: "Limpeza técnica e correção estética e revitalização do brilho e cor." },
    { title: "Revitalização Técnica de Acabamentos Cromados – Cabinas e Painéis Inox", description: "Remoção de manchas e oxidação." },
    { title: "Revitalização Técnica de Revestimentos em ACM – Fachadas Arquitetônicas", description: "Recupera brilho e cor das placas de alumínio composto, além de proteção de sujeiras." },
    { title: "Revitalização Estética de Pingadeiras", description: "Limpeza e renovação estética externa, além de trazer novamente brilho e cor." },
    { title: "Limpeza Técnica Pós-Obra – Residencial e Corporativa", description: "Remove resíduos, poeira fina e respingos de obra." },
    { title: "Limpeza Técnica de Forros – Tratamento de Superfícies Elevadas", description: "Higienização de PVC, metálicos ou modulares." }
];

// Create dots
items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => goToIndex(index);
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');
let autoplayInterval = null;
let isPlaying = true;
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

// Atualiza coverflow
function updateCoverflow() {
    if (isAnimating) return;
    isAnimating = true;

    items.forEach((item, index) => {
        let offset = index - currentIndex;
        if (offset > items.length / 2) offset = offset - items.length;
        else if (offset < -items.length / 2) offset = offset + items.length;

        const absOffset = Math.abs(offset);
        const sign = Math.sign(offset);

        let translateX = offset * 220;
        let translateZ = -absOffset * 200;
        let rotateY = -sign * Math.min(absOffset * 60, 60);
        let opacity = 1 - (absOffset * 0.2);
        let scale = 1 - (absOffset * 0.1);

        if (absOffset > 3) {
            opacity = 0;
            translateX = sign * 800;
        }

        item.style.transform = `
            translateX(${translateX}px) 
            translateZ(${translateZ}px) 
            rotateY(${rotateY}deg)
            scale(${scale})
        `;
        item.style.opacity = opacity;
        item.style.zIndex = 100 - absOffset;

        item.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    const currentData = imageData[currentIndex];
    currentTitle.textContent = currentData.title;
    currentDescription.textContent = currentData.description;

    currentTitle.style.animation = 'none';
    currentDescription.style.animation = 'none';
    setTimeout(() => {
        currentTitle.style.animation = 'fadeIn 0.6s forwards';
        currentDescription.style.animation = 'fadeIn 0.6s forwards';
    }, 10);

    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// Navegação
function navigate(direction) {
    if (isAnimating) return;
    currentIndex = (currentIndex + direction + items.length) % items.length;
    updateCoverflow();
}
function goToIndex(index) {
    if (isAnimating || index === currentIndex) return;
    currentIndex = index;
    updateCoverflow();
}

// Autoplay do carrossel
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCoverflow();
    }, 4000);
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
}
function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
}
function toggleAutoplay() {
    if (isPlaying) stopAutoplay();
    else startAutoplay();
}

// Handle interações manuais (desliga autoplay mas mantém botão)
function handleUserInteraction() {
    stopAutoplay();
}

// Listeners básicos
items.forEach((item, index) => item.addEventListener('click', () => goToIndex(index)));
document.querySelector('.nav-button.prev').addEventListener('click', handleUserInteraction);
document.querySelector('.nav-button.next').addEventListener('click', handleUserInteraction);
dots.forEach(dot => dot.addEventListener('click', handleUserInteraction));

// ... (resto do código do scroll, menu e formulários permanece igual)

// Initialize
updateCoverflow();
container.focus();
startAutoplay();


// ============================================================
// Accordion da secao de servicos (5 linhas de atuacao)
// ============================================================
document.querySelectorAll('.servicos-accordion .grupo-head').forEach(head => {
    head.addEventListener('click', () => {
        const grupo = head.closest('.grupo');
        const abrindo = !grupo.classList.contains('aberto');
        grupo.classList.toggle('aberto', abrindo);
        head.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
    });
});


// ============================================================
// Faixa de numeros: conta de 0 ate o valor quando entra na tela
// (os valores vem do Vegon; ver comentario no index.html)
// ============================================================
(function () {
    const alvos = document.querySelectorAll('.stat-number[data-conta]');
    if (!alvos.length) return;

    // sem IntersectionObserver o numero ja esta no HTML: nada a fazer
    if (!('IntersectionObserver' in window)) return;

    const anima = el => {
        const fim = parseInt(el.dataset.conta, 10);
        const prefixo = el.dataset.prefixo || '';
        if (!fim) return;
        const duracao = 1400;
        const inicio = performance.now();
        const passo = agora => {
            const t = Math.min((agora - inicio) / duracao, 1);
            const suave = 1 - Math.pow(1 - t, 3); // desacelera no fim
            el.textContent = prefixo + Math.round(fim * suave);
            if (t < 1) requestAnimationFrame(passo);
        };
        requestAnimationFrame(passo);
    };

    const obs = new IntersectionObserver((entradas) => {
        entradas.forEach(e => {
            if (!e.isIntersecting) return;
            anima(e.target);
            obs.unobserve(e.target); // anima uma vez so
        });
    }, { threshold: 0.4 });

    alvos.forEach(el => obs.observe(el));
})();

/* ---- Galeria "Serviços Executados": lightbox ---- */
(function () {
    const itens = Array.from(document.querySelectorAll('.galeria-item'));
    const caixa = document.getElementById('galeriaLightbox');
    if (!itens.length || !caixa) return;

    const img     = document.getElementById('glImg');
    const titulo  = document.getElementById('glTitulo');
    const legenda = document.getElementById('glLegenda');
    const btnFechar = caixa.querySelector('.gl-fechar');
    const btnPrev   = caixa.querySelector('.gl-prev');
    const btnNext   = caixa.querySelector('.gl-next');

    let atual = 0;
    let origem = null; // pra devolver o foco ao fechar

    const mostra = i => {
        atual = (i + itens.length) % itens.length; // circular nas duas pontas
        const item = itens[atual];
        const foto = item.querySelector('img');
        img.src = foto.getAttribute('src');
        img.alt = foto.getAttribute('alt') || '';
        titulo.textContent  = item.dataset.titulo || '';
        legenda.textContent = item.dataset.legenda || '';
    };

    const abre = i => {
        origem = document.activeElement;
        mostra(i);
        caixa.hidden = false;
        document.body.style.overflow = 'hidden';
        btnFechar.focus();
    };

    const fecha = () => {
        caixa.hidden = true;
        document.body.style.overflow = '';
        img.src = '';
        if (origem && origem.focus) origem.focus();
    };

    itens.forEach((item, i) => {
        item.addEventListener('click', () => abre(i));
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abre(i); }
        });
    });

    btnFechar.addEventListener('click', fecha);
    btnPrev.addEventListener('click', () => mostra(atual - 1));
    btnNext.addEventListener('click', () => mostra(atual + 1));

    // clique no fundo fecha; clique na imagem/botoes nao
    caixa.addEventListener('click', e => { if (e.target === caixa) fecha(); });

    document.addEventListener('keydown', e => {
        if (caixa.hidden) return;
        if (e.key === 'Escape')     fecha();
        if (e.key === 'ArrowLeft')  mostra(atual - 1);
        if (e.key === 'ArrowRight') mostra(atual + 1);
    });
})();
