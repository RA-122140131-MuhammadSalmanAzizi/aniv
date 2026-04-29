// Bubble Pop Game — message appears at bubble position
const messages = [
  "Nabila cantik banget! 💙","Salman sayang Nabila!","Kamu obat rinduku 💊",
  "Aku rindu kamu!","Kamu senyumku ☀️","Kamu inspirasiku!","Jadi apotekerku ya? 🧪",
  "Kamu vitamin hatiku!","I love you Nabila!","Kamu obat paling ampuh 💙",
  "Cintaku 100% murni!","Kamu resep kebahagiaanku!","Sayang kamu infinity! ∞",
  "Kamu lebih manis dari sirup 🍯","Kamu dosis sempurna buat aku!",
];

export function renderBubbles(container) {
  let bubbles = [], popped = 0, animId;

  container.innerHTML = `
    <div class="catch-hud" style="margin-bottom:16px">
      <span>🫧 Pop: <span id="b-count">0</span>/${messages.length}</span>
      <span style="font-size:.8rem;color:var(--text3)">Klik gelembung untuk pecahkan!</span>
    </div>
    <div class="bubble-area" id="bubble-area"></div>`;

  const area = container.querySelector('#bubble-area');

  messages.forEach((msg, i) => {
    const size = Math.random() * 40 + 50;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.innerHTML = `<span class="bubble-inner-emoji">🫧</span>`;

    const data = {
      el: bubble, x: Math.random() * 80 + 10, y: Math.random() * 80 + 10,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      size, msg, popped: false
    };
    bubbles.push(data);
    area.appendChild(bubble);

    bubble.addEventListener('click', () => {
      if (data.popped) return;
      data.popped = true;
      popped++;
      container.querySelector('#b-count').textContent = popped;

      // Fade out previously revealed bubbles
      const previous = container.querySelectorAll('.bubble-revealed');
      previous.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.5s ease';
        setTimeout(() => el.remove(), 500);
      });

      // Replace bubble with message card at same position
      bubble.classList.add('popping');
      setTimeout(() => {
        bubble.classList.remove('bubble');
        bubble.classList.remove('popping');
        bubble.classList.add('bubble-revealed');
        bubble.style.width = 'auto';
        bubble.style.height = 'auto';
        bubble.style.borderRadius = 'var(--r-md)';
        bubble.style.left = Math.min(parseFloat(bubble.style.left), 70) + '%';
        bubble.innerHTML = `<div class="bubble-card-inline">${msg}</div>`;
      }, 300);

      if (popped === messages.length) {
        cancelAnimationFrame(animId);
        setTimeout(() => {
          const endDiv = document.createElement('div');
          endDiv.className = 'quiz-result';
          endDiv.style.marginTop = '20px';
          endDiv.innerHTML = `
            <div class="quiz-score">🫧 Semua pecah!</div>
            <p class="quiz-msg">Setiap gelembung berisi cinta Salman untuk Nabila! 💙</p>
            <button class="btn btn-primary" id="bub-retry">Main Lagi 🔄</button>`;
          container.appendChild(endDiv);
          endDiv.querySelector('#bub-retry').onclick = () => renderBubbles(container);
        }, 600);
      }
    });
  });

  function animate() {
    bubbles.forEach(b => {
      if (b.popped) return;
      b.x += b.vx; b.y += b.vy;
      if (b.x < 2 || b.x > 90) b.vx *= -1;
      if (b.y < 2 || b.y > 85) b.vy *= -1;
      b.el.style.left = b.x + '%';
      b.el.style.top = b.y + '%';
    });
    animId = requestAnimationFrame(animate);
  }
  animate();
}
