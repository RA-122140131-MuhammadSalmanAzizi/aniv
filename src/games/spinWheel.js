// Spin the Wheel Game
const dares = [
  "Kirim voice note bilang 'Aku sayang kamu' 💙",
  "Ceritakan momen paling memalukan bareng Nabila 😂",
  "Tulis puisi 4 baris untuk Nabila SEKARANG ✍️",
  "Telepon Nabila dan bilang 'Kamu cantik banget hari ini' 📞",
  "Screenshot chat terakhir kalian dan tunjukkan! 📱",
  "Tiru gaya Nabila waktu lagi belajar farmasi 🔬",
  "Buat pantun romantis tentang farmasi 💊",
  "Peluk Nabila 10 detik kalau lagi bareng 🤗",
  "Kirim foto selfie paling jelek ke Nabila 🤳",
  "Nyanyikan lagu favorit Nabila walaupun fals 🎤",
  "Belikan Nabila snack favoritnya besok! 🍫",
  "Tulis 3 hal yang kamu syukuri tentang Nabila 🙏",
];
const colors = [
  '#89CFF0','#B8E4FF','#C4B5FD','#FDA4AF',
  '#7DD3FC','#93C5FD','#A5B4FC','#F0ABFC',
  '#5BB8E8','#67E8F9','#818CF8','#FB7185'
];

export function renderWheel(container) {
  let spinning = false, result = '';

  container.innerHTML = `
    <div class="wheel-container">
      <div class="wheel-wrapper">
        <div class="wheel-pointer">📍</div>
        <canvas id="wheel-canvas" width="300" height="300" class="wheel-canvas"></canvas>
      </div>
      <button class="btn btn-primary" id="spin-btn">Putar Roda! 🎰</button>
      <div class="wheel-result" id="wheel-result">Tekan tombol untuk memutar! 🎯</div>
    </div>`;

  const canvas = container.querySelector('#wheel-canvas');
  const ctx = canvas.getContext('2d');
  let angle = 0;

  function drawWheel() {
    const cx = 150, cy = 150, r = 140;
    const seg = (Math.PI * 2) / dares.length;
    ctx.clearRect(0, 0, 300, 300);
    dares.forEach((_, i) => {
      const start = i * seg + angle;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + seg);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = 'rgba(12,25,41,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Number
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + seg / 2);
      ctx.fillStyle = '#0c1929';
      ctx.font = 'bold 14px Outfit';
      ctx.textAlign = 'center';
      ctx.fillText(i + 1, r * 0.7, 5);
      ctx.restore();
    });
    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#0c1929';
    ctx.fill();
    ctx.strokeStyle = 'rgba(137,207,240,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#89CFF0';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('💙', 150, 156);
  }

  drawWheel();

  container.querySelector('#spin-btn').onclick = () => {
    if (spinning) return;
    spinning = true;
    const spins = Math.random() * 5 + 5;
    const targetAngle = spins * Math.PI * 2;
    const duration = 4000;
    const startTime = performance.now();
    const startAngle = angle;

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // ease out
      angle = startAngle + targetAngle * ease;
      drawWheel();
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        spinning = false;
        const seg = (Math.PI * 2) / dares.length;
        const norm = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const idx = Math.floor(((Math.PI * 2 - norm + Math.PI / 2) % (Math.PI * 2)) / seg) % dares.length;
        result = dares[idx];
        container.querySelector('#wheel-result').innerHTML = `<p>🎯 ${result}</p>`;
      }
    }
    requestAnimationFrame(animate);
  };
}
