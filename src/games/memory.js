// Memory Match Game
const pairs = [
  { emoji: '💙', label: 'Cinta' },
  { emoji: '💊', label: 'Obat' },
  { emoji: '🧪', label: 'Lab' },
  { emoji: '🌸', label: 'Bunga' },
  { emoji: '💌', label: 'Surat' },
  { emoji: '⭐', label: 'Bintang' },
  { emoji: '🔬', label: 'Mikro' },
  { emoji: '🩵', label: 'Hati' },
];

export function renderMemory(container) {
  let cards = [], flipped = [], matched = 0, moves = 0, locked = false;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function init() {
    matched = 0; moves = 0; flipped = []; locked = false;
    cards = shuffle([...pairs, ...pairs].map((p, i) => ({ ...p, id: i, found: false })));
    render();
  }

  function render() {
    container.innerHTML = `
      <div class="memory-hud">
        <span>🎯 Moves: <span id="m-moves">${moves}</span></span>
        <span>✅ Found: <span id="m-found">${matched}/${pairs.length}</span></span>
      </div>
      <div class="memory-grid">
        ${cards.map((c, i) => `
          <div class="memory-card ${c.found ? 'flipped matched' : ''}" data-idx="${i}">
            <div class="memory-front">💙</div>
            <div class="memory-back">${c.emoji}</div>
          </div>
        `).join('')}
      </div>`;
    container.querySelectorAll('.memory-card:not(.matched)').forEach(el => {
      el.onclick = () => flipCard(parseInt(el.dataset.idx));
    });
  }

  function flipCard(idx) {
    if (locked || flipped.includes(idx) || cards[idx].found) return;
    flipped.push(idx);
    const el = container.querySelectorAll('.memory-card')[idx];
    el.classList.add('flipped');

    if (flipped.length === 2) {
      moves++;
      container.querySelector('#m-moves').textContent = moves;
      locked = true;
      const [a, b] = flipped;
      if (cards[a].emoji === cards[b].emoji) {
        cards[a].found = true;
        cards[b].found = true;
        matched++;
        container.querySelector('#m-found').textContent = `${matched}/${pairs.length}`;
        setTimeout(() => {
          container.querySelectorAll('.memory-card')[a].classList.add('matched');
          container.querySelectorAll('.memory-card')[b].classList.add('matched');
          flipped = []; locked = false;
          if (matched === pairs.length) winGame();
        }, 500);
      } else {
        setTimeout(() => {
          container.querySelectorAll('.memory-card')[a].classList.remove('flipped');
          container.querySelectorAll('.memory-card')[b].classList.remove('flipped');
          flipped = []; locked = false;
        }, 900);
      }
    }
  }

  function winGame() {
    const msg = moves <= 12 ? "GENIUS! Memori kamu kayak SSD! 🧠✨" :
      moves <= 20 ? "Hebat! Kamu punya ingatan yang kuat! 💙" :
      "Selesai juga! Nabila pasti sabar nunggu kamu 😂";
    setTimeout(() => {
      container.innerHTML = `
        <div class="quiz-result">
          <div class="quiz-score">${moves} moves</div>
          <p class="quiz-msg">${msg}</p>
          <button class="btn btn-primary" id="mem-retry">Main Lagi 🔄</button>
        </div>`;
      container.querySelector('#mem-retry').onclick = init;
    }, 600);
  }

  init();
}
