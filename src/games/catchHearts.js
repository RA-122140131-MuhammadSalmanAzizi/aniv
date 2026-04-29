// Catch Hearts Game — hold & drag basket control
export function renderCatch(container) {
  let score = 0, lives = 3, basketX = 50, running = false, animId = null;
  let items = [], dragging = false;
  const emojis = ['💙','🩵','💊','🧪','💎','⭐','💌'];
  const bad = ['💔','🦠','😈'];

  function start() {
    score = 0; lives = 3; items = []; running = true; dragging = false;
    render();
    loop();
    spawnLoop();
  }

  function render() {
    container.innerHTML = `
      <div class="catch-hud">
        <span>💙 Skor: <span id="c-score">${score}</span></span>
        <span>❤️ Nyawa: <span id="c-lives">${'❤️'.repeat(lives)}</span></span>
      </div>
      <p style="font-size:.75rem;color:var(--text3);text-align:center;margin-bottom:8px">
        Klik & tahan keranjang lalu geser kiri-kanan
      </p>
      <div class="catch-area" id="catch-area">
        <div class="catch-basket" id="basket" style="left:calc(${basketX}% - 35px)"></div>
      </div>`;
    const area = container.querySelector('#catch-area');
    const basket = container.querySelector('#basket');

    // Smooth hold & drag control
    let startX = 0;
    let startBasketX = 50;

    const onStart = (clientX) => {
      dragging = true;
      startX = clientX;
      startBasketX = basketX;
      if (basket) basket.style.transition = 'none'; // remove transition for smooth drag
    };

    const onMove = (clientX, rect) => {
      if (!dragging) return;
      const deltaX = ((clientX - startX) / rect.width) * 100;
      basketX = Math.max(5, Math.min(95, startBasketX + deltaX));
    };

    const onEnd = () => {
      dragging = false;
    };

    // Use basket element to initiate drag, so we don't jump when clicking elsewhere
    basket.addEventListener('mousedown', e => { e.stopPropagation(); onStart(e.clientX); });
    document.addEventListener('mousemove', e => onMove(e.clientX, area.getBoundingClientRect()));
    document.addEventListener('mouseup', onEnd);
    // area.addEventListener('mouseleave', onEnd); // remove this so leaving area doesn't stop drag

    basket.addEventListener('touchstart', e => { e.stopPropagation(); onStart(e.touches[0].clientX); }, { passive: false });
    document.addEventListener('touchmove', e => { 
      if(dragging) {
        e.preventDefault(); 
        onMove(e.touches[0].clientX, area.getBoundingClientRect()); 
      }
    }, { passive: false });
    document.addEventListener('touchend', onEnd);
  }

  // Removed moveBasket and moveTouchBasket, update is handled in loop
  
  function updateBasket() {
    const b = container.querySelector('#basket');
    if (b) b.style.left = `calc(${basketX}% - 35px)`;
  }

  function spawnItem() {
    if (!running) return;
    const isBad = Math.random() < 0.2;
    const pool = isBad ? bad : emojis;
    items.push({
      x: Math.random() * 90 + 5, y: -5,
      emoji: pool[Math.floor(Math.random() * pool.length)],
      speed: Math.random() * 0.8 + 0.5, bad: isBad, el: null
    });
  }

  let spawnTimer;
  function spawnLoop() {
    if (!running) return;
    spawnItem();
    spawnTimer = setTimeout(spawnLoop, Math.max(400, 1000 - score * 10));
  }

  function loop() {
    if (!running) return;
    const area = container.querySelector('#catch-area');
    if (!area) return;
    
    // Update basket position smoothly in the animation loop
    updateBasket();

    items.forEach(item => {
      item.y += item.speed * 0.4; // slow down the fall further
      if (!item.el) {
        item.el = document.createElement('span');
        item.el.className = 'catch-item';
        item.el.textContent = item.emoji;
        area.appendChild(item.el);
      }
      item.el.style.left = item.x + '%';
      item.el.style.top = item.y + '%';
      if (item.y > 85 && item.y < 95 && Math.abs(item.x - basketX) < 10) {
        if (item.bad) { lives--; updateLives(); } else { score++; updateScore(); }
        removeItem(item);
      }
      if (item.y > 100) { if (!item.bad) { lives--; updateLives(); } removeItem(item); }
    });
    items = items.filter(i => i.el);
    if (lives <= 0) { endGame(); return; }
    animId = requestAnimationFrame(loop);
  }

  function removeItem(item) { if (item.el) item.el.remove(); item.el = null; }
  function updateScore() { const el = container.querySelector('#c-score'); if (el) el.textContent = score; }
  function updateLives() { const el = container.querySelector('#c-lives'); if (el) el.textContent = '❤️'.repeat(Math.max(0, lives)); }

  function endGame() {
    running = false; clearTimeout(spawnTimer); cancelAnimationFrame(animId);
    const msg = score >= 30 ? "GILA! Kamu hebat banget! Nabila pasti bangga! 🏆" :
      score >= 15 ? "Keren! Cinta kamu ditangkap semua! 💙" :
      score >= 5 ? "Lumayan! Coba lagi biar lebih jago! 😄" : "Yah masa gitu doang? Ayo semangat! 😂";
    container.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-score">${score}</div>
        <p style="font-size:.85rem;color:var(--text2);margin-bottom:4px">hearts ditangkap!</p>
        <p class="quiz-msg">${msg}</p>
        <button class="btn btn-primary" id="catch-retry">Main Lagi 🔄</button>
      </div>`;
    container.querySelector('#catch-retry').onclick = start;
  }

  container.innerHTML = `
    <div class="catch-start" style="padding:40px">
      <h3>💙 Tangkap Cintaku!</h3>
      <p>Klik & tahan lalu geser keranjang kiri-kanan untuk menangkap hati dan item farmasi. Hindari yang jahat! 💔</p>
      <button class="btn btn-primary" id="catch-go">Mulai Main! 🎮</button>
    </div>`;
  container.querySelector('#catch-go').onclick = start;
}
