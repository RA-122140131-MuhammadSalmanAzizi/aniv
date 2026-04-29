import './styles/index.css';
import { renderApp } from './app.js';
import { initParticles } from './components/particles.js';
import { initRouter } from './router.js';
import { initPohonCinta } from './components/pohonCinta.js';
import { initMansAi } from './components/mansAi.js';

document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    initParticles();
    initRouter();
    initPohonCinta();
    initMansAi();
});

window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});
