// navigation.js - Script universel pour toutes les parties

let currentSlide = 0;
let slides;
let totalSlides;
let slideOffset = 1; // Sera défini par chaque page (1, 9, 21, 33)

function initNavigation(offset) {
    slideOffset = offset;
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
    showSlide(0);
}

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
    
    const slideNumber = n + slideOffset;
    const maxSlide = slideOffset + totalSlides - 1;
    document.getElementById('slideCounter').textContent = `Slide ${slideNumber} / ${maxSlide}`;
    
    document.getElementById('prevBtn').disabled = (n === 0);
    document.getElementById('nextBtn').disabled = (n === totalSlides - 1);
    
    updateIndicators();
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
    showSlide(currentSlide);
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

function updateIndicators() {
    const container = document.getElementById('indicators');
    container.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (i === currentSlide ? ' active' : '');
        indicator.onclick = () => goToSlide(i);
        container.appendChild(indicator);
    }
}

function goHome() {
    // Chercher la racine du site (où se trouve le vrai index.html)
    const currentPath = window.location.pathname;
    
    // Si on est dans un sous-dossier (sequence4/), on remonte
    if (currentPath.includes('/sequence4/')) {
        window.location.href = '../../index.html';  // Remonter de 2 niveaux
    } else {
        window.location.href = '../index.html';     // Remonter de 1 niveau
    }
}

// Navigation clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'Home' || e.key === 'h') goHome(); // Touche Home ou H pour retour menu
});