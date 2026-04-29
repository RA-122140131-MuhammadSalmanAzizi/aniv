// Scratch Coupon Game
const coupons = [
  { emoji: '🫂', text: 'Free Pelukan 10 Menit dari Salman!' },
  { emoji: '🍦', text: 'Traktir Es Krim Rasa Apa Aja!' },
  { emoji: '📞', text: 'Video Call Sampai Ketiduran!' },
  { emoji: '💌', text: 'Surat Cinta Tulis Tangan dari Salman!' },
  { emoji: '🎬', text: 'Nonton Film Bareng Pilihan Nabila!' },
  { emoji: '💊', text: 'Jadi Asisten Praktikum Nabila 1 Hari!' },
  { emoji: '🍕', text: 'Traktir Makan di Tempat Favorit!' },
  { emoji: '✨', text: 'Nabila Boleh Minta Apa Aja 1x!' },
  { emoji: '📸', text: 'Foto Bareng Seharian Tanpa Protes!' },
];

export function renderScratch(container) {
  container.innerHTML = `
    <p style="text-align:center;color:var(--text2);margin-bottom:20px;font-size:.9rem">
      Gosok untuk membuka kupon cinta! 💙
    </p>
    <div class="coupons-grid" id="coupon-grid"></div>`;

  const grid = container.querySelector('#coupon-grid');

  coupons.forEach((c, i) => {
    const coupon = document.createElement('div');
    coupon.className = 'coupon';
    coupon.innerHTML = `
      <div class="coupon-reveal">
        <span class="coupon-emoji">${c.emoji}</span>
        <span class="coupon-text">${c.text}</span>
      </div>
      <canvas data-idx="${i}"></canvas>`;
    grid.appendChild(coupon);

    // Setup canvas
    requestAnimationFrame(() => {
      const canvas = coupon.querySelector('canvas');
      const rect = coupon.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d');

      // Draw scratch layer
      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, '#1a2d4a');
      grad.addColorStop(1, '#0f1d33');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);
      // Text hint
      ctx.fillStyle = 'rgba(137,207,240,0.4)';
      ctx.font = '13px Outfit';
      ctx.textAlign = 'center';
      ctx.fillText('✨ Gosok di sini ✨', rect.width / 2, rect.height / 2 + 5);

      let drawing = false;
      function scratch(e) {
        if (!drawing) return;
        const r = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - r.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - r.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();
        checkReveal(canvas, ctx);
      }

      canvas.addEventListener('mousedown', () => drawing = true);
      canvas.addEventListener('mousemove', scratch);
      canvas.addEventListener('mouseup', () => drawing = false);
      canvas.addEventListener('mouseleave', () => drawing = false);
      canvas.addEventListener('touchstart', (e) => { e.preventDefault(); drawing = true; }, { passive: false });
      canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); }, { passive: false });
      canvas.addEventListener('touchend', () => drawing = false);
    });
  });

  function checkReveal(canvas, ctx) {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0, total = data.length / 4;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) cleared++;
    }
    if (cleared / total > 0.45) {
      canvas.style.transition = 'opacity .5s';
      canvas.style.opacity = '0';
      setTimeout(() => canvas.remove(), 500);
    }
  }
}
