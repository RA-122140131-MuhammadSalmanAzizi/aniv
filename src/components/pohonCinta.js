export function initPohonCinta() {
  const btnCreate = document.getElementById('btn-create-letter');
  const btnClear = document.getElementById('btn-clear-letters');
  const input = document.getElementById('pohon-input');
  const leavesArea = document.getElementById('pohon-letters-group');
  const container = document.getElementById('pohon-container');
  
  if (!btnCreate || !input || !leavesArea) return;

  btnCreate.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) {
      alert("Tulis pesanmu dulu buat Nabila!");
      return;
    }
    
    // Create foreignObject element
    const fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    fo.setAttribute('width', '50');
    fo.setAttribute('height', '50');
    fo.style.overflow = 'visible';
    
    const letter = document.createElement('div');
    letter.className = 'draggable-letter'; // Using same CSS class for the envelope icon
    letter.dataset.msg = text;
    
    // Random position strictly inside one of the leaf circles
    const leafCircles = [
      {cx: 400, cy: 150, r: 140}, {cx: 280, cy: 220, r: 110}, {cx: 520, cy: 220, r: 110},
      {cx: 220, cy: 320, r: 90}, {cx: 580, cy: 320, r: 90}, {cx: 340, cy: 360, r: 100},
      {cx: 460, cy: 360, r: 100}, {cx: 300, cy: 120, r: 80}, {cx: 500, cy: 120, r: 80},
      {cx: 400, cy: 80, r: 90}
    ];
    const circle = leafCircles[Math.floor(Math.random() * leafCircles.length)];
    
    // Random angle and radius (using sqrt for uniform distribution, -20 padding)
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.sqrt(Math.random()) * Math.max(0, circle.r - 20);
    
    const x = circle.cx + radius * Math.cos(angle);
    const y = circle.cy + radius * Math.sin(angle);
    
    fo.setAttribute('x', x - 25); // Center the 50x50 foreignObject
    fo.setAttribute('y', y - 20);
    
    letter.style.position = 'relative';
    letter.style.width = '45px';
    letter.style.height = '40px';
    letter.style.animation = 'fadeInText 0.5s ease-out';
    
    fo.appendChild(letter);
    leavesArea.appendChild(fo);
    
    // Clear input
    input.value = '';
    
    // Click to view
    letter.addEventListener('click', showPopup);
    
    // Show popup immediately upon creation for feedback
    const clickEvent = new MouseEvent('click');
    letter.dispatchEvent(clickEvent);
  });

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      leavesArea.innerHTML = '';
      closePopup();
    });
  }

  function showPopup(e) {
    e.stopPropagation();
    closePopup();
    
    // Create Backdrop
    const overlay = document.createElement('div');
    overlay.className = 'letter-popup-overlay';
    document.body.appendChild(overlay);

    // Create Modal
    const popup = document.createElement('div');
    popup.className = 'letter-popup';
    popup.innerHTML = `
      <div style="font-weight:bold; margin-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:8px; font-size:1rem; color:var(--blue-light);">💌 Pesan Cinta</div>
      <div style="font-size:1.1rem; line-height:1.6; word-wrap:break-word; max-height: 60vh; overflow-y: auto; padding: 10px 0;">${this.dataset.msg}</div>
      <button class="btn btn-primary" style="margin-top:15px; width:100%;" id="close-letter-btn">Tutup</button>
    `;
    
    document.body.appendChild(popup);
    
    // Close events
    const closeFn = () => closePopup();
    overlay.addEventListener('click', closeFn);
    popup.querySelector('#close-letter-btn').addEventListener('click', closeFn);
  }

  function closePopup() {
    const overlay = document.querySelector('.letter-popup-overlay');
    const popup = document.querySelector('.letter-popup');
    if (overlay) overlay.remove();
    if (popup) popup.remove();
  }
}
