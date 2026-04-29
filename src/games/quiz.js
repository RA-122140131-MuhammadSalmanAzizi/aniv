// Love Quiz Game
const questions = [
  { q: "Nabila kuliah jurusan apa?", opts: ["Kedokteran","Farmasi","Keperawatan","Biologi"], ans: 1 },
  { q: "Warna favorit Nabila adalah...", opts: ["Pink","Ungu","Biru Muda","Hijau"], ans: 2 },
  { q: "Salman paling suka apa dari Nabila?", opts: ["Masakannya","Senyumnya","Rambutnya","Sepatunya"], ans: 1 },
  { q: "Apa yang Nabila selalu tanyakan ke Salman?", opts: ["\"Udah makan belum?\"","\"Udah tidur belum?\"","\"Lagi apa?\"","Semua benar 💙"], ans: 3 },
  { q: "Nabila itu ibarat apa buat Salman?", opts: ["Vitamin","Obat paling ampuh","Suplemen","Paracetamol"], ans: 1 },
  { q: "Siapa yang lebih sering baper duluan?", opts: ["Salman","Nabila","Dua-duanya","Nggak ada"], ans: 2 },
  { q: "Rumus cinta Salman + Nabila = ?", opts: ["Galau","Cinta Abadi","Friendzone","Error 404"], ans: 1 },
  { q: "Kalau Nabila jadi obat, dia jadi obat apa?", opts: ["Obat sakit kepala","Obat rindu","Obat batuk","Obat tidur"], ans: 1 },
];

export function renderQuiz(container) {
  let idx = 0, score = 0, answered = false;

  function render() {
    if (idx >= questions.length) {
      const pct = Math.round((score / questions.length) * 100);
      const msgs = pct === 100 ? "SEMPURNA! Kamu emang jodoh Nabila! 💙💙" :
        pct >= 70 ? "Wahh kamu kenal banget sama Nabila! 😍" :
        pct >= 40 ? "Lumayan... tapi harus lebih perhatian ya! 😄" :
        "Aduh... kamu beneran pacarnya Nabila? 😂";
      container.innerHTML = `
        <div class="quiz-result">
          <div class="quiz-score">${score}/${questions.length}</div>
          <p class="quiz-msg">${msgs}</p>
          <button class="btn btn-primary" id="quiz-retry">Main Lagi 🔄</button>
        </div>`;
      container.querySelector('#quiz-retry').onclick = () => { idx = 0; score = 0; render(); };
      return;
    }
    const q = questions[idx];
    answered = false;
    container.innerHTML = `
      <div class="quiz-progress"><div class="quiz-bar" style="width:${(idx/questions.length)*100}%"></div></div>
      <p style="font-size:.8rem;color:var(--text3);margin-bottom:8px">Pertanyaan ${idx+1} dari ${questions.length}</p>
      <p class="quiz-q">${q.q}</p>
      <div class="quiz-opts">${q.opts.map((o,i) =>
        `<button class="quiz-opt" data-i="${i}">${o}</button>`).join('')}</div>`;
    container.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.onclick = () => {
        if (answered) return;
        answered = true;
        const chosen = parseInt(btn.dataset.i);
        if (chosen === q.ans) { btn.classList.add('correct'); score++; }
        else {
          btn.classList.add('wrong');
          container.querySelectorAll('.quiz-opt')[q.ans].classList.add('correct');
        }
        setTimeout(() => { idx++; render(); }, 1200);
      };
    });
  }
  render();
}
