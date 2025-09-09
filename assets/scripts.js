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
    { title: "Revitalização Técnica de Acabamentos Cromados – Cabinas e Painéis Inox", description: "Remoção de manchas, oxidação e polimento." },
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

// Música de fundo
const music = document.getElementById("bg-music");
if (music) {
    music.loop = true;
    music.muted = true; // começa mudo (evita bloqueio do navegador)
}

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

// Autoplay + música
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCoverflow();
    }, 4000);
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';

    if (music) {
        music.muted = false;
        music.play().catch(() => {
            console.log("Navegador bloqueou o autoplay, clique para liberar.");
        });
    }
}
function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';

    if (music) music.pause();
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
