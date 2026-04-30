// app.js — Main app renderer
import { renderQuiz } from './games/quiz.js';
import { renderCatch } from './games/catchHearts.js';
import { renderMemory } from './games/memory.js';
import { renderWheel } from './games/spinWheel.js';
import { renderScratch } from './games/scratch.js';
import { renderBubbles } from './games/bubbles.js';

const games = [
  { id: 'quiz', icon: '🧠', title: 'Tebak Siapa?', desc: 'Quiz seru tentang hubungan Salman & Nabila! Seberapa kenal kamu sama pasanganmu?', render: renderQuiz },
  { id: 'catch', icon: '🧺', title: 'Tangkap Cintaku!', desc: 'Gerakkan keranjang untuk tangkap hati & item farmasi yang jatuh! Hindari yang jahat!', render: renderCatch },
  { id: 'memory', icon: '🃏', title: 'Memory Cinta', desc: 'Cocokkan kartu-kartu romantis! Uji daya ingatmu tentang simbol cinta kita.', render: renderMemory },
  { id: 'wheel', icon: '🎰', title: 'Roda Bucin', desc: 'Putar roda dan lakukan tantangan romantis! Berani coba? Dare kamu menunggu!', render: renderWheel },
  { id: 'scratch', icon: '🎟️', title: 'Kupon Cinta', desc: 'Gosok kupon dan dapatkan hadiah spesial dari Salman! Bisa ditukar kapan aja!', render: renderScratch },
  { id: 'bubbles', icon: '🫧', title: 'Pop Gelembung', desc: 'Pecahkan gelembung dan temukan pesan cinta tersembunyi di dalamnya!', render: renderBubbles },
];

export function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- AUDIO BG & SFX -->
    <audio id="bg-music" src="/assets/music.mp3" loop autoplay></audio>
    <audio id="flip-sfx" src="/assets/flip.mp3" preload="auto"></audio>
    <button id="music-toggle" class="music-toggle-btn">
      <svg id="icon-mute" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"/></svg>
      <svg id="icon-unmute" style="display:none;width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/></svg>
    </button>

    <!-- WELCOME ANIMATION OVERLAY -->
    <div class="welcome-overlay" id="welcome-overlay" style="cursor: pointer;">
      <div class="welcome-content">
        <h1 class="welcome-text">Untuk Nabila Tersayang</h1>
        <div class="welcome-line"></div>
        <p style="font-size: 1rem; opacity: 0; margin-top: 25px; animation: fadeInText 1s 2s forwards ease; font-family: var(--font-sans); color: rgba(255,255,255,0.7);">( Ketuk layar untuk membuka kenangan )</p>
      </div>
    </div>

    <!-- CANVAS PARTICLES BG -->
    <canvas id="particles-canvas"></canvas>
    <!-- NAVBAR -->
    <nav class="navbar" id="navbar">
      <div class="nav-brand"><img src="/assets/logo.png" alt="S&N Logo" style="height: 36px; object-fit: contain;"></div>
      <div class="nav-links">
        <a href="#hero-ai" class="active">Mans.AI</a>
        <a href="#games">Games</a>
        <a href="#pohon">Pohon Cinta</a>
        <a href="#letter">Surat</a>
        <a href="#chemistry">Formula</a>
      </div>
      <button class="nav-toggle" id="nav-toggle"><span></span><span></span><span></span></button>
    </nav>
    <div class="mobile-overlay" id="mobile-overlay">
      <a href="#hero-ai">Mans.AI</a><a href="#games">Games</a><a href="#pohon">Pohon Cinta</a><a href="#letter">Surat</a><a href="#chemistry">Formula</a>
    </div>

    <!-- PREMIUM HERO AI SECTION -->
    <section id="hero-ai" class="hero-ai-section">
      <div class="hero-ai-container reveal">
        <!-- Quote at the top -->
        <div class="hero-ai-header">
          <h1 class="hero-ai-title">Virtual Salman</h1>
          <p class="hero-ai-quote">"Kamu adalah obat terbaik yang pernah Tuhan resepkan untukku — tanpa efek samping, tapi bikin kecanduan"</p>
        </div>
        
        <!-- Mans.AI Interface -->
        <div class="hero-ai-chatbox">
          <div class="ai-avatar-wrapper">
             <img src="/assets/mansAI-datar.png" id="ai-avatar-img" alt="Virtual Salman" class="ai-avatar-img">
          </div>
          <div class="ai-chat-content">
            <div class="ai-message-bubble" id="mans-ai-response">
              Halo sayang... Aku Mans.AI, versi virtual dari Salman. Masukkan PIN untuk mulai ngobrol ya!
            </div>
            
            <div class="ai-input-group" id="ai-chat-controls" style="display:none;">
              <input type="text" id="chat-input" placeholder="Tulis pesan untuk Salman virtual..." autocomplete="off">
              <button id="chat-send" class="btn btn-primary">Kirim</button>
            </div>
            
            <div class="ai-input-group" id="ai-pin-controls" style="display:flex;">
              <input type="password" id="ai-pin-input" placeholder="Masukkan PIN rahasia..." autocomplete="off" maxlength="6">
              <button id="ai-pin-submit" class="btn btn-primary">Buka Kunci</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="hero-scroll"><div class="scroll-mouse"><div class="scroll-dot"></div></div></div>
    </section>

    <!-- COUNTDOWN ANNIVERSARY -->
    <section id="countdown" class="countdown-section">
      <div class="sec-head">
        <span class="sec-badge">Menuju 2 Mei 2026</span>
        <h2 class="sec-title">Anniversary Kita!</h2>
      </div>
      <div class="countdown-container glass reveal">
        <div class="time-box"><span id="cd-days">00</span><p>Hari</p></div>
        <div class="time-box"><span id="cd-hours">00</span><p>Jam</p></div>
        <div class="time-box"><span id="cd-mins">00</span><p>Menit</p></div>
        <div class="time-box"><span id="cd-secs">00</span><p>Detik</p></div>
      </div>
    </section>

    <!-- GAMES -->
    <section id="games" class="games-section">
      <div class="sec-head">
        <span class="sec-badge">Mini Games</span>
        <h2 class="sec-title">Arena Bucin Anti Mainstream</h2>
        <p class="sec-sub">Pilih game dan mainkan bersama! Siapa bilang bucin itu membosankan?</p>
      </div>
      <div class="games-grid">
        ${games.map(g => `
          <div class="game-card glass reveal" data-game="${g.id}">
            <span class="game-icon">${g.icon}</span>
            <h3>${g.title}</h3>
            <p>${g.desc}</p>
            <span class="play-hint">▶ Main Sekarang</span>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- GALLERY (MINI FLIPBOOK) -->
    <section id="gallery" class="gallery-section">
      <div class="sec-head">
        <span class="sec-badge">Memori Kita</span>
        <h2 class="sec-title">Album Kenangan</h2>
      </div>
      <div class="flipbook-wrapper">
        <div class="flipbook" id="flipbook">
          <div class="page page-cover">
            <h2>Album Kita</h2>
            <p>S & N</p>
          </div>
          ${[...Array(10)].map((_, i) => `
          <div class="page">
            <img src="/assets/foto${i+1}.jpg" alt="Foto ${i+1}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23222%22/><text y=%2250%22 x=%2250%22 text-anchor=%22middle%22 fill=%22%23fff%22 font-size=%2210%22>foto${i+1}.jpg</text></svg>'">
          </div>`).join('')}
          <div class="page page-cover">
            <h2>The End...</h2>
            <p>Atau Baru Permulaan?</p>
          </div>
        </div>
        <div class="flipbook-controls">
          <button class="btn btn-primary" id="btn-prev-page">❮ Back</button>
          <button class="btn btn-primary" id="btn-next-page">Next ❯</button>
        </div>
      </div>
    </section>

    <!-- POHON CINTA -->
    <section id="pohon" class="pohon-section">
      <div class="sec-head">
        <span class="sec-badge">Pohon Cinta</span>
        <h2 class="sec-title">Pohon Memori Kita</h2>
        <p class="sec-sub">Tempat kita menyimpan kenangan dan harapan baik.</p>
      </div>
      <div class="pohon-container reveal" id="pohon-container" style="height: 40vh; min-height: 250px; max-height: 400px; position: relative; margin: 0 auto; max-width: 600px;">
        <!-- Tree SVG -->
        <svg class="pohon-img" id="pohon-svg" viewBox="0 -50 800 650" preserveAspectRatio="xMidYMid meet" style="position:absolute; bottom:0; left:0; width:100%; height:100%;">
          <!-- Trunk -->
          <path class="tree-part" d="M380,600 C380,500 370,400 350,300 L450,300 C430,400 420,500 420,600 Z" fill="#3e2723"/>
          <path class="tree-part" d="M400,400 C380,350 320,300 280,280 L290,260 C340,290 390,340 410,400 Z" fill="#4e342e"/>
          <path class="tree-part" d="M420,420 C450,360 520,310 560,290 L550,270 C500,290 430,350 410,420 Z" fill="#4e342e"/>
          
          <!-- Glowing Leaves -->
          <g class="tree-part" fill="rgba(137,207,240,0.8)" stroke="rgba(255,255,255,0.4)" stroke-width="2">
            <circle cx="400" cy="150" r="140" filter="drop-shadow(0 0 20px rgba(137,207,240,0.6))"/>
            <circle cx="280" cy="220" r="110" filter="drop-shadow(0 0 20px rgba(137,207,240,0.6))"/>
            <circle cx="520" cy="220" r="110" filter="drop-shadow(0 0 20px rgba(137,207,240,0.6))"/>
            <circle cx="220" cy="320" r="90" filter="drop-shadow(0 0 20px rgba(137,207,240,0.6))"/>
            <circle cx="580" cy="320" r="90" filter="drop-shadow(0 0 20px rgba(137,207,240,0.6))"/>
            <circle cx="340" cy="360" r="100" filter="drop-shadow(0 0 20px rgba(137,207,240,0.6))"/>
            <circle cx="460" cy="360" r="100" filter="drop-shadow(0 0 20px rgba(137,207,240,0.6))"/>
            <!-- Lavender accents -->
            <circle cx="300" cy="120" r="80" fill="rgba(196,181,253,0.7)"/>
            <circle cx="500" cy="120" r="80" fill="rgba(196,181,253,0.7)"/>
            <circle cx="400" cy="80" r="90" fill="rgba(196,181,253,0.8)"/>
          </g>
          <!-- SVG group for letters -->
          <g id="pohon-letters-group"></g>
        </svg>
      </div>
      
      <!-- Write Area (Moved outside tree container) -->
      <div class="pohon-controls glass reveal" style="max-width: 600px; margin: 15px auto 0; padding: 15px; display: flex; flex-direction: column; gap: 10px; text-align: center;">
        <textarea id="pohon-input" placeholder="Tulis sesuatu untuk Nabila... (Contoh: Semangat belajarnya cantik!)" rows="2" maxlength="150" style="width: 100%; padding: 12px; border-radius: var(--r-md); background: rgba(0,0,0,0.3); border: 1px solid rgba(137,207,240,0.3); color: white; resize: vertical; font-family: var(--font-sans);"></textarea>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" id="btn-create-letter">Tempel Surat ke Pohon</button>
          <button class="btn btn-primary" id="btn-clear-letters" style="background: rgba(255,107,107,0.15); border-color: rgba(255,107,107,0.5); color: #ff6b6b;">Gugurkan Daun Surat</button>
        </div>
      </div>
    </section>

    <!-- LOVE LETTER -->
    <section id="letter" class="letter-section">
      <div class="sec-head">
        <span class="sec-badge">Surat Cinta</span>
        <h2 class="sec-title">Dari Hati Salman</h2>
        <p class="sec-sub">Untuk Nabila yang paling spesial di dunia ini</p>
      </div>
      <div class="letter-card glass reveal">
        <div class="letter-stamp"></div>
        <p class="letter-greeting">Untuk Nabila tersayang,</p>
        <div class="letter-body">
          <p>Aku mungkin bukan orang yang paling romantis, bukan juga yang paling jago ngomong. Tapi satu hal yang pasti, aku sayang kamu dengan cara yang ngga bisa aku jelaskan pakai kata-kata.</p>
          <p>Kamu itu kayak kapsul obat, Bil. Di luar keliatan biasa aja, tapi di dalamnya ada sesuatu yang luar biasa, yang bisa nyembuhin semua luka dan lelah yang aku rasain.</p>
          <p>Terima kasih sudah jadi alasan aku senyum setiap hari. Terima kasih sudah sabar sama aku. Terima kasih sudah pilih aku, di antara semua pilihan yang kamu punya.</p>
          <p>Aku janji akan terus belajar jadi yang terbaik buat kamu. emg blm sempurna, tapi aku akan selalu berusaha.</p>
        </div>
        <p class="letter-sig">Salman</p>
      </div>
    </section>

    <!-- CHEMISTRY FORMULA -->
    <section id="chemistry" class="chem-section">
      <div class="chem-card glass reveal">
        <h2>Rumus Kimia Cinta Kita</h2>
        <div class="chem-formula">
          <div class="chem-el"><span class="chem-sym">Sa</span><span class="chem-name">Salman</span></div>
          <span class="chem-op">+</span>
          <div class="chem-el"><span class="chem-sym">Na</span><span class="chem-name">Nabila</span></div>
          <span class="chem-op">=</span>
          <div class="chem-el result"><span class="chem-sym">💙</span><span class="chem-name">Cinta Abadi</span></div>
        </div>
        <p class="chem-note">*Reaksi irreversible, tanpa efek samping (kecuali baper & kangen berlebihan)</p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-hearts"><span>💙</span><span>💙</span><span>💙</span></div>
      <h3 class="footer-title">Salman & Nabila</h3>
      <p class="footer-text">"Dulu, sekarang, dan selamanya."</p>
      <p class="footer-small">Dibuat dengan cinta dan sedikit rumus farmasi<br>Made with love by Salman untuk Nabila</p>
    </footer>

    <!-- GAME MODAL -->
    <div class="game-modal" id="game-modal">
      <div class="game-modal-inner">
        <div class="game-modal-header">
          <h2 id="modal-title">Game</h2>
          <button class="modal-close" id="modal-close">✕</button>
        </div>
        <div class="game-modal-body" id="modal-body"></div>
      </div>
    </div>
  `;

  // Game card click handlers
  document.querySelectorAll('[data-game]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.game;
      const game = games.find(g => g.id === id);
      if (!game) return;
      openModal(game);
    });
  });

  // Modal close
  document.getElementById('modal-close').onclick = closeModal;
  document.getElementById('game-modal').addEventListener('click', e => {
    if (e.target.id === 'game-modal') closeModal();
  });

  // --- NEW LOGIC: PIN, MUSIC, COUNTDOWN ---
  
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const iconMute = document.getElementById('icon-mute');
  const iconUnmute = document.getElementById('icon-unmute');

  // Handle Start Experience via Welcome Overlay
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const startExperience = () => {
    bgMusic.muted = false;
    bgMusic.volume = 1.0;
    bgMusic.play().then(() => {
      console.log("Music started successfully");
      if(iconMute) iconMute.style.display = 'none';
      if(iconUnmute) iconUnmute.style.display = 'block';
    }).catch(e => console.log("Playback failed:", e));

    if(welcomeOverlay) {
      welcomeOverlay.style.opacity = '0';
      setTimeout(() => {
        welcomeOverlay.style.display = 'none';
      }, 500);
    }
  };

  if (welcomeOverlay) {
    welcomeOverlay.addEventListener('click', startExperience);
  }
  
  // Ensure Audio Loops
  bgMusic.addEventListener('ended', () => {
    bgMusic.currentTime = 0;
    bgMusic.play();
  });
  

  
  // 1. AI PIN Logic
  const isAiUnlocked = localStorage.getItem('anivsn_ai_unlocked') === 'true';
  const aiChatControls = document.getElementById('ai-chat-controls');
  const aiPinControls = document.getElementById('ai-pin-controls');
  const aiPinSubmit = document.getElementById('ai-pin-submit');
  const aiPinInput = document.getElementById('ai-pin-input');
  const aiResponse = document.getElementById('mans-ai-response');

  if (isAiUnlocked) {
    if(aiChatControls) aiChatControls.style.display = 'flex';
    if(aiPinControls) aiPinControls.style.display = 'none';
    if(aiResponse) aiResponse.innerText = "Halo sayang... Aku Mans.AI, versi virtual dari Salman. Ada yang mau kamu ceritain atau tanyain ke aku hari ini?";
  } else {
    if(aiPinSubmit) {
      aiPinSubmit.addEventListener('click', () => {
        if(aiPinInput.value === '020525') {
          localStorage.setItem('anivsn_ai_unlocked', 'true');
          aiChatControls.style.display = 'flex';
          aiPinControls.style.display = 'none';
          aiResponse.innerText = 'Kunci terbuka! Ada yang mau kamu ceritain hari ini sayang?';
        } else {
          aiResponse.innerText = 'kamu bukan nabila ya!!';
        }
      });
    }
  }

  // 2. Music Toggle Logic
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      iconMute.style.display = 'none';
      iconUnmute.style.display = 'block';
    } else {
      bgMusic.pause();
      iconMute.style.display = 'block';
      iconUnmute.style.display = 'none';
    }
  });

  // 3. Countdown Logic
  const targetDate = new Date("May 2, 2026 00:00:00").getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) return; // Time passed
    
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const s = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    
    const elDays = document.getElementById('cd-days');
    if (elDays) {
      elDays.innerText = d;
      document.getElementById('cd-hours').innerText = h;
      document.getElementById('cd-mins').innerText = m;
      document.getElementById('cd-secs').innerText = s;
    }
  }, 1000);

  // 4. Flipbook Logic
  let currentPage = 0;
  const pages = document.querySelectorAll('.flipbook .page');
  const flipSfx = document.getElementById('flip-sfx');
  pages.forEach((p, i) => { p.style.zIndex = pages.length - i; });
  
  document.getElementById('btn-prev-page')?.addEventListener('click', () => {
    if (currentPage > 0) {
      if(flipSfx) { flipSfx.currentTime = 0; flipSfx.play().catch(e=>console.log(e)); }
      currentPage--;
      pages[currentPage].classList.remove('flipped');
    }
  });
  document.getElementById('btn-next-page')?.addEventListener('click', () => {
    if (currentPage < pages.length - 1) { // -1 because last page shouldn't flip
      if(flipSfx) { flipSfx.currentTime = 0; flipSfx.play().catch(e=>console.log(e)); }
      pages[currentPage].classList.add('flipped');
      currentPage++;
    }
  });
}

function openModal(game) {
  const modal = document.getElementById('game-modal');
  document.getElementById('modal-title').innerHTML = `${game.icon} ${game.title}`;
  const body = document.getElementById('modal-body');
  body.innerHTML = '';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  game.render(body);
}

function closeModal() {
  document.getElementById('game-modal').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('modal-body').innerHTML = '';
}
