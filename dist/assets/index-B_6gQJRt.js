(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerPolicy&&(t.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?t.credentials="include":a.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(a){if(a.ep)return;a.ep=!0;const t=s(a);fetch(a.href,t)}})();const questions=[{q:"Nabila kuliah jurusan apa?",opts:["Kedokteran","Farmasi","Keperawatan","Biologi"],ans:1},{q:"Warna favorit Nabila adalah...",opts:["Pink","Ungu","Biru Muda","Hijau"],ans:2},{q:"Salman paling suka apa dari Nabila?",opts:["Masakannya","Senyumnya","Rambutnya","Sepatunya"],ans:1},{q:"Apa yang Nabila selalu tanyakan ke Salman?",opts:['"Udah makan belum?"','"Udah tidur belum?"','"Lagi apa?"',"Semua benar 💙"],ans:3},{q:"Nabila itu ibarat apa buat Salman?",opts:["Vitamin","Obat paling ampuh","Suplemen","Paracetamol"],ans:1},{q:"Siapa yang lebih sering baper duluan?",opts:["Salman","Nabila","Dua-duanya","Nggak ada"],ans:2},{q:"Rumus cinta Salman + Nabila = ?",opts:["Galau","Cinta Abadi","Friendzone","Error 404"],ans:1},{q:"Kalau Nabila jadi obat, dia jadi obat apa?",opts:["Obat sakit kepala","Obat rindu","Obat batuk","Obat tidur"],ans:1}];function renderQuiz(e){let n=0,s=0,l=!1;function a(){if(n>=questions.length){const i=Math.round(s/questions.length*100),m=i===100?"SEMPURNA! Kamu emang jodoh Nabila! 💙💙":i>=70?"Wahh kamu kenal banget sama Nabila! 😍":i>=40?"Lumayan... tapi harus lebih perhatian ya! 😄":"Aduh... kamu beneran pacarnya Nabila? 😂";e.innerHTML=`
        <div class="quiz-result">
          <div class="quiz-score">${s}/${questions.length}</div>
          <p class="quiz-msg">${m}</p>
          <button class="btn btn-primary" id="quiz-retry">Main Lagi 🔄</button>
        </div>`,e.querySelector("#quiz-retry").onclick=()=>{n=0,s=0,a()};return}const t=questions[n];l=!1,e.innerHTML=`
      <div class="quiz-progress"><div class="quiz-bar" style="width:${n/questions.length*100}%"></div></div>
      <p style="font-size:.8rem;color:var(--text3);margin-bottom:8px">Pertanyaan ${n+1} dari ${questions.length}</p>
      <p class="quiz-q">${t.q}</p>
      <div class="quiz-opts">${t.opts.map((i,m)=>`<button class="quiz-opt" data-i="${m}">${i}</button>`).join("")}</div>`,e.querySelectorAll(".quiz-opt").forEach(i=>{i.onclick=()=>{if(l)return;l=!0,parseInt(i.dataset.i)===t.ans?(i.classList.add("correct"),s++):(i.classList.add("wrong"),e.querySelectorAll(".quiz-opt")[t.ans].classList.add("correct")),setTimeout(()=>{n++,a()},1200)}})}a()}function renderCatch(e){let n=0,s=3,l=50,a=!1,t=null,i=[],m=!1;const o=["💙","🩵","💊","🧪","💎","⭐","💌"],c=["💔","🦠","😈"];function g(){n=0,s=3,i=[],a=!0,m=!1,d(),y(),p()}function d(){e.innerHTML=`
      <div class="catch-hud">
        <span>💙 Skor: <span id="c-score">${n}</span></span>
        <span>❤️ Nyawa: <span id="c-lives">${"❤️".repeat(s)}</span></span>
      </div>
      <p style="font-size:.75rem;color:var(--text3);text-align:center;margin-bottom:8px">
        Klik & tahan keranjang lalu geser kiri-kanan
      </p>
      <div class="catch-area" id="catch-area">
        <div class="catch-basket" id="basket" style="left:calc(${l}% - 35px)"></div>
      </div>`;const b=e.querySelector("#catch-area"),h=e.querySelector("#basket");let L=0,w=50;const A=f=>{m=!0,L=f,w=l,h&&(h.style.transition="none")},E=(f,N)=>{if(!m)return;const q=(f-L)/N.width*100;l=Math.max(5,Math.min(95,w+q))},T=()=>{m=!1};h.addEventListener("mousedown",f=>{f.stopPropagation(),A(f.clientX)}),document.addEventListener("mousemove",f=>E(f.clientX,b.getBoundingClientRect())),document.addEventListener("mouseup",T),h.addEventListener("touchstart",f=>{f.stopPropagation(),A(f.touches[0].clientX)},{passive:!1}),document.addEventListener("touchmove",f=>{m&&(f.preventDefault(),E(f.touches[0].clientX,b.getBoundingClientRect()))},{passive:!1}),document.addEventListener("touchend",T)}function r(){const b=e.querySelector("#basket");b&&(b.style.left=`calc(${l}% - 35px)`)}function k(){if(!a)return;const b=Math.random()<.2,h=b?c:o;i.push({x:Math.random()*90+5,y:-5,emoji:h[Math.floor(Math.random()*h.length)],speed:Math.random()*.8+.5,bad:b,el:null})}let u;function p(){a&&(k(),u=setTimeout(p,Math.max(400,1e3-n*10)))}function y(){if(!a)return;const b=e.querySelector("#catch-area");if(b){if(r(),i.forEach(h=>{h.y+=h.speed*.4,h.el||(h.el=document.createElement("span"),h.el.className="catch-item",h.el.textContent=h.emoji,b.appendChild(h.el)),h.el.style.left=h.x+"%",h.el.style.top=h.y+"%",h.y>85&&h.y<95&&Math.abs(h.x-l)<10&&(h.bad?(s--,x()):(n++,M()),v(h)),h.y>100&&(h.bad||(s--,x()),v(h))}),i=i.filter(h=>h.el),s<=0){S();return}t=requestAnimationFrame(y)}}function v(b){b.el&&b.el.remove(),b.el=null}function M(){const b=e.querySelector("#c-score");b&&(b.textContent=n)}function x(){const b=e.querySelector("#c-lives");b&&(b.textContent="❤️".repeat(Math.max(0,s)))}function S(){a=!1,clearTimeout(u),cancelAnimationFrame(t);const b=n>=30?"GILA! Kamu hebat banget! Nabila pasti bangga! 🏆":n>=15?"Keren! Cinta kamu ditangkap semua! 💙":n>=5?"Lumayan! Coba lagi biar lebih jago! 😄":"Yah masa gitu doang? Ayo semangat! 😂";e.innerHTML=`
      <div class="quiz-result">
        <div class="quiz-score">${n}</div>
        <p style="font-size:.85rem;color:var(--text2);margin-bottom:4px">hearts ditangkap!</p>
        <p class="quiz-msg">${b}</p>
        <button class="btn btn-primary" id="catch-retry">Main Lagi 🔄</button>
      </div>`,e.querySelector("#catch-retry").onclick=g}e.innerHTML=`
    <div class="catch-start" style="padding:40px">
      <h3>💙 Tangkap Cintaku!</h3>
      <p>Klik & tahan lalu geser keranjang kiri-kanan untuk menangkap hati dan item farmasi. Hindari yang jahat! 💔</p>
      <button class="btn btn-primary" id="catch-go">Mulai Main! 🎮</button>
    </div>`,e.querySelector("#catch-go").onclick=g}const pairs=[{emoji:"💙",label:"Cinta"},{emoji:"💊",label:"Obat"},{emoji:"🧪",label:"Lab"},{emoji:"🌸",label:"Bunga"},{emoji:"💌",label:"Surat"},{emoji:"⭐",label:"Bintang"},{emoji:"🔬",label:"Mikro"},{emoji:"🩵",label:"Hati"}];function renderMemory(e){let n=[],s=[],l=0,a=0,t=!1;function i(d){for(let r=d.length-1;r>0;r--){const k=Math.floor(Math.random()*(r+1));[d[r],d[k]]=[d[k],d[r]]}return d}function m(){l=0,a=0,s=[],t=!1,n=i([...pairs,...pairs].map((d,r)=>({...d,id:r,found:!1}))),o()}function o(){e.innerHTML=`
      <div class="memory-hud">
        <span>🎯 Moves: <span id="m-moves">${a}</span></span>
        <span>✅ Found: <span id="m-found">${l}/${pairs.length}</span></span>
      </div>
      <div class="memory-grid">
        ${n.map((d,r)=>`
          <div class="memory-card ${d.found?"flipped matched":""}" data-idx="${r}">
            <div class="memory-front">💙</div>
            <div class="memory-back">${d.emoji}</div>
          </div>
        `).join("")}
      </div>`,e.querySelectorAll(".memory-card:not(.matched)").forEach(d=>{d.onclick=()=>c(parseInt(d.dataset.idx))})}function c(d){if(t||s.includes(d)||n[d].found)return;if(s.push(d),e.querySelectorAll(".memory-card")[d].classList.add("flipped"),s.length===2){a++,e.querySelector("#m-moves").textContent=a,t=!0;const[k,u]=s;n[k].emoji===n[u].emoji?(n[k].found=!0,n[u].found=!0,l++,e.querySelector("#m-found").textContent=`${l}/${pairs.length}`,setTimeout(()=>{e.querySelectorAll(".memory-card")[k].classList.add("matched"),e.querySelectorAll(".memory-card")[u].classList.add("matched"),s=[],t=!1,l===pairs.length&&g()},500)):setTimeout(()=>{e.querySelectorAll(".memory-card")[k].classList.remove("flipped"),e.querySelectorAll(".memory-card")[u].classList.remove("flipped"),s=[],t=!1},900)}}function g(){const d=a<=12?"GENIUS! Memori kamu kayak SSD! 🧠✨":a<=20?"Hebat! Kamu punya ingatan yang kuat! 💙":"Selesai juga! Nabila pasti sabar nunggu kamu 😂";setTimeout(()=>{e.innerHTML=`
        <div class="quiz-result">
          <div class="quiz-score">${a} moves</div>
          <p class="quiz-msg">${d}</p>
          <button class="btn btn-primary" id="mem-retry">Main Lagi 🔄</button>
        </div>`,e.querySelector("#mem-retry").onclick=m},600)}m()}const dares=["Kirim voice note bilang 'Aku sayang kamu' 💙","Ceritakan momen paling memalukan bareng Nabila 😂","Tulis puisi 4 baris untuk Nabila SEKARANG ✍️","Telepon Nabila dan bilang 'Kamu cantik banget hari ini' 📞","Screenshot chat terakhir kalian dan tunjukkan! 📱","Tiru gaya Nabila waktu lagi belajar farmasi 🔬","Buat pantun romantis tentang farmasi 💊","Peluk Nabila 10 detik kalau lagi bareng 🤗","Kirim foto selfie paling jelek ke Nabila 🤳","Nyanyikan lagu favorit Nabila walaupun fals 🎤","Belikan Nabila snack favoritnya besok! 🍫","Tulis 3 hal yang kamu syukuri tentang Nabila 🙏"],colors=["#89CFF0","#B8E4FF","#C4B5FD","#FDA4AF","#7DD3FC","#93C5FD","#A5B4FC","#F0ABFC","#5BB8E8","#67E8F9","#818CF8","#FB7185"];function renderWheel(e){let n=!1,s="";e.innerHTML=`
    <div class="wheel-container">
      <div class="wheel-wrapper">
        <div class="wheel-pointer">📍</div>
        <canvas id="wheel-canvas" width="300" height="300" class="wheel-canvas"></canvas>
      </div>
      <button class="btn btn-primary" id="spin-btn">Putar Roda! 🎰</button>
      <div class="wheel-result" id="wheel-result">Tekan tombol untuk memutar! 🎯</div>
    </div>`;const a=e.querySelector("#wheel-canvas").getContext("2d");let t=0;function i(){const g=Math.PI*2/dares.length;a.clearRect(0,0,300,300),dares.forEach((d,r)=>{const k=r*g+t;a.beginPath(),a.moveTo(150,150),a.arc(150,150,140,k,k+g),a.closePath(),a.fillStyle=colors[r%colors.length],a.fill(),a.strokeStyle="rgba(12,25,41,0.3)",a.lineWidth=1,a.stroke(),a.save(),a.translate(150,150),a.rotate(k+g/2),a.fillStyle="#0c1929",a.font="bold 14px Outfit",a.textAlign="center",a.fillText(r+1,140*.7,5),a.restore()}),a.beginPath(),a.arc(150,150,22,0,Math.PI*2),a.fillStyle="#0c1929",a.fill(),a.strokeStyle="rgba(137,207,240,0.4)",a.lineWidth=2,a.stroke(),a.fillStyle="#89CFF0",a.font="14px sans-serif",a.textAlign="center",a.fillText("💙",150,156)}i(),e.querySelector("#spin-btn").onclick=()=>{if(n)return;n=!0;const o=(Math.random()*5+5)*Math.PI*2,c=4e3,g=performance.now(),d=t;function r(k){const u=k-g,p=Math.min(u/c,1),y=1-Math.pow(1-p,4);if(t=d+o*y,i(),p<1)requestAnimationFrame(r);else{n=!1;const v=Math.PI*2/dares.length,M=(t%(Math.PI*2)+Math.PI*2)%(Math.PI*2),x=Math.floor((Math.PI*2-M+Math.PI/2)%(Math.PI*2)/v)%dares.length;s=dares[x],e.querySelector("#wheel-result").innerHTML=`<p>🎯 ${s}</p>`}}requestAnimationFrame(r)}}const coupons=[{emoji:"🫂",text:"Free Pelukan 10 Menit dari Salman!"},{emoji:"🍦",text:"Traktir Es Krim Rasa Apa Aja!"},{emoji:"📞",text:"Video Call Sampai Ketiduran!"},{emoji:"💌",text:"Surat Cinta Tulis Tangan dari Salman!"},{emoji:"🎬",text:"Nonton Film Bareng Pilihan Nabila!"},{emoji:"💊",text:"Jadi Asisten Praktikum Nabila 1 Hari!"},{emoji:"🍕",text:"Traktir Makan di Tempat Favorit!"},{emoji:"✨",text:"Nabila Boleh Minta Apa Aja 1x!"},{emoji:"📸",text:"Foto Bareng Seharian Tanpa Protes!"}];function renderScratch(e){e.innerHTML=`
    <p style="text-align:center;color:var(--text2);margin-bottom:20px;font-size:.9rem">
      Gosok untuk membuka kupon cinta! 💙
    </p>
    <div class="coupons-grid" id="coupon-grid"></div>`;const n=e.querySelector("#coupon-grid");coupons.forEach((l,a)=>{const t=document.createElement("div");t.className="coupon",t.innerHTML=`
      <div class="coupon-reveal">
        <span class="coupon-emoji">${l.emoji}</span>
        <span class="coupon-text">${l.text}</span>
      </div>
      <canvas data-idx="${a}"></canvas>`,n.appendChild(t),requestAnimationFrame(()=>{const i=t.querySelector("canvas"),m=t.getBoundingClientRect();i.width=m.width,i.height=m.height;const o=i.getContext("2d"),c=o.createLinearGradient(0,0,m.width,m.height);c.addColorStop(0,"#1a2d4a"),c.addColorStop(1,"#0f1d33"),o.fillStyle=c,o.fillRect(0,0,m.width,m.height),o.fillStyle="rgba(137,207,240,0.4)",o.font="13px Outfit",o.textAlign="center",o.fillText("✨ Gosok di sini ✨",m.width/2,m.height/2+5);let g=!1;function d(r){var y,v,M,x;if(!g)return;const k=i.getBoundingClientRect(),u=(r.clientX||((v=(y=r.touches)==null?void 0:y[0])==null?void 0:v.clientX))-k.left,p=(r.clientY||((x=(M=r.touches)==null?void 0:M[0])==null?void 0:x.clientY))-k.top;o.globalCompositeOperation="destination-out",o.beginPath(),o.arc(u,p,22,0,Math.PI*2),o.fill(),s(i,o)}i.addEventListener("mousedown",()=>g=!0),i.addEventListener("mousemove",d),i.addEventListener("mouseup",()=>g=!1),i.addEventListener("mouseleave",()=>g=!1),i.addEventListener("touchstart",r=>{r.preventDefault(),g=!0},{passive:!1}),i.addEventListener("touchmove",r=>{r.preventDefault(),d(r)},{passive:!1}),i.addEventListener("touchend",()=>g=!1)})});function s(l,a){const t=a.getImageData(0,0,l.width,l.height).data;let i=0,m=t.length/4;for(let o=3;o<t.length;o+=4)t[o]===0&&i++;i/m>.45&&(l.style.transition="opacity .5s",l.style.opacity="0",setTimeout(()=>l.remove(),500))}}const messages=["Nabila cantik banget! 💙","Salman sayang Nabila!","Kamu obat rinduku 💊","Aku rindu kamu!","Kamu senyumku ☀️","Kamu inspirasiku!","Jadi apotekerku ya? 🧪","Kamu vitamin hatiku!","I love you Nabila!","Kamu obat paling ampuh 💙","Cintaku 100% murni!","Kamu resep kebahagiaanku!","Sayang kamu infinity! ∞","Kamu lebih manis dari sirup 🍯","Kamu dosis sempurna buat aku!"];function renderBubbles(e){let n=[],s=0,l;e.innerHTML=`
    <div class="catch-hud" style="margin-bottom:16px">
      <span>🫧 Pop: <span id="b-count">0</span>/${messages.length}</span>
      <span style="font-size:.8rem;color:var(--text3)">Klik gelembung untuk pecahkan!</span>
    </div>
    <div class="bubble-area" id="bubble-area"></div>`;const a=e.querySelector("#bubble-area");messages.forEach((i,m)=>{const o=Math.random()*40+50,c=document.createElement("div");c.className="bubble",c.style.width=o+"px",c.style.height=o+"px",c.innerHTML='<span class="bubble-inner-emoji">🫧</span>';const g={el:c,x:Math.random()*80+10,y:Math.random()*80+10,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,size:o,msg:i,popped:!1};n.push(g),a.appendChild(c),c.addEventListener("click",()=>{if(g.popped)return;g.popped=!0,s++,e.querySelector("#b-count").textContent=s,e.querySelectorAll(".bubble-revealed").forEach(r=>{r.style.opacity="0",r.style.transition="opacity 0.5s ease",setTimeout(()=>r.remove(),500)}),c.classList.add("popping"),setTimeout(()=>{c.classList.remove("bubble"),c.classList.remove("popping"),c.classList.add("bubble-revealed"),c.style.width="auto",c.style.height="auto",c.style.borderRadius="var(--r-md)",c.style.left=Math.min(parseFloat(c.style.left),70)+"%",c.innerHTML=`<div class="bubble-card-inline">${i}</div>`},300),s===messages.length&&(cancelAnimationFrame(l),setTimeout(()=>{const r=document.createElement("div");r.className="quiz-result",r.style.marginTop="20px",r.innerHTML=`
            <div class="quiz-score">🫧 Semua pecah!</div>
            <p class="quiz-msg">Setiap gelembung berisi cinta Salman untuk Nabila! 💙</p>
            <button class="btn btn-primary" id="bub-retry">Main Lagi 🔄</button>`,e.appendChild(r),r.querySelector("#bub-retry").onclick=()=>renderBubbles(e)},600))})});function t(){n.forEach(i=>{i.popped||(i.x+=i.vx,i.y+=i.vy,(i.x<2||i.x>90)&&(i.vx*=-1),(i.y<2||i.y>85)&&(i.vy*=-1),i.el.style.left=i.x+"%",i.el.style.top=i.y+"%")}),l=requestAnimationFrame(t)}t()}const games=[{id:"quiz",icon:"🧠",title:"Tebak Siapa?",desc:"Quiz seru tentang hubungan Salman & Nabila! Seberapa kenal kamu sama pasanganmu?",render:renderQuiz},{id:"catch",icon:"💙",title:"Tangkap Cintaku!",desc:"Gerakkan keranjang untuk tangkap hati & item farmasi yang jatuh! Hindari yang jahat!",render:renderCatch},{id:"memory",icon:"🃏",title:"Memory Cinta",desc:"Cocokkan kartu-kartu romantis! Uji daya ingatmu tentang simbol cinta kita.",render:renderMemory},{id:"wheel",icon:"🎰",title:"Roda Bucin",desc:"Putar roda dan lakukan tantangan romantis! Berani coba? Dare kamu menunggu!",render:renderWheel},{id:"scratch",icon:"🎟️",title:"Kupon Cinta",desc:"Gosok kupon dan dapatkan hadiah spesial dari Salman! Bisa ditukar kapan aja!",render:renderScratch},{id:"bubbles",icon:"🫧",title:"Pop Gelembung",desc:"Pecahkan gelembung dan temukan pesan cinta tersembunyi di dalamnya!",render:renderBubbles}];function renderApp(){const e=document.getElementById("app");e.innerHTML=`
    <!-- WELCOME ANIMATION OVERLAY -->
    <div class="welcome-overlay">
      <div class="welcome-content">
        <h1 class="welcome-text">Untuk Nabila Tersayang</h1>
        <div class="welcome-line"></div>
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
             <img src="/assets/mans-ai.png" alt="Virtual Salman" class="ai-avatar-img">
          </div>
          <div class="ai-chat-content">
            <div class="ai-message-bubble" id="mans-ai-response">
              Halo sayang... Aku Mans.AI, versi virtual dari Salman. Ada yang mau kamu ceritain atau tanyain ke aku hari ini?
            </div>
            <div class="ai-input-group">
              <input type="text" id="chat-input" placeholder="Tulis pesan untuk Salman virtual..." autocomplete="off">
              <button id="chat-send" class="btn btn-primary">Kirim</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="hero-scroll"><div class="scroll-mouse"><div class="scroll-dot"></div></div></div>
    </section>

    <!-- GAMES -->
    <section id="games" class="games-section">
      <div class="sec-head">
        <span class="sec-badge">Mini Games</span>
        <h2 class="sec-title">Arena Bucin Anti Mainstream</h2>
        <p class="sec-sub">Pilih game dan mainkan bersama! Siapa bilang bucin itu membosankan? 😎</p>
      </div>
      <div class="games-grid">
        ${games.map(n=>`
          <div class="game-card glass reveal" data-game="${n.id}">
            <span class="game-icon">${n.icon}</span>
            <h3>${n.title}</h3>
            <p>${n.desc}</p>
            <span class="play-hint">▶ Main Sekarang</span>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- POHON CINTA -->
    <section id="pohon" class="pohon-section">
      <div class="sec-head">
        <span class="sec-badge">Pohon Cinta</span>
        <h2 class="sec-title">Pohon Memori Kita</h2>
        <p class="sec-sub">Tempat kita menyimpan kenangan dan harapan baik.</p>
      </div>
      <div class="pohon-container reveal" id="pohon-container">
        <!-- Tree SVG -->
        <svg class="pohon-img" id="pohon-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMax meet" style="position:absolute; bottom:0; width:100%; height:80%;">
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
        </svg>
        
        <!-- The letters will be appended here -->
        <div id="pohon-leaves-area" class="pohon-leaves-area"></div>
        
        <!-- Write Area -->
        <div class="pohon-write-area glass">
          <textarea id="pohon-input" placeholder="Tulis sesuatu untuk Nabila... (Contoh: Semangat belajarnya cantik!)" rows="3"></textarea>
          <button class="btn btn-primary" id="btn-create-letter">Buat Surat</button>
        </div>
      </div>
      
      <!-- Hidden container inside tree for dragging letters -->
      <div id="drag-source-area" style="position:absolute; bottom:120px; right:50px; z-index:1000;"></div>
    </section>

    <!-- LOVE LETTER -->
    <section id="letter" class="letter-section">
      <div class="sec-head">
        <span class="sec-badge">Surat Cinta</span>
        <h2 class="sec-title">Dari Hati Salman</h2>
        <p class="sec-sub">Untuk Nabila yang paling spesial di dunia ini</p>
      </div>
      <div class="letter-card glass reveal">
        <div class="letter-stamp">💙</div>
        <p class="letter-greeting">Untuk Nabila tersayang,</p>
        <div class="letter-body">
          <p>Aku mungkin bukan orang yang paling romantis, bukan juga yang paling jago ngomong. Tapi satu hal yang pasti — aku sayang kamu dengan cara yang nggak bisa aku jelaskan pakai kata-kata.</p>
          <p>Kamu itu kayak kapsul obat, Bil. Di luar keliatan biasa aja, tapi di dalamnya ada sesuatu yang luar biasa, yang bisa nyembuhin semua luka dan lelah yang aku rasain.</p>
          <p>Terima kasih sudah jadi alasan aku senyum setiap hari. Terima kasih sudah sabar sama aku. Terima kasih sudah pilih aku, di antara semua pilihan yang kamu punya.</p>
          <p>Aku janji akan terus belajar jadi yang terbaik buat kamu. Nggak sempurna memang, tapi aku akan selalu berusaha. 💙</p>
        </div>
        <p class="letter-sig">Salman 💙</p>
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
          <span class="chem-op">→</span>
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
  `,document.querySelectorAll("[data-game]").forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.game,l=games.find(a=>a.id===s);l&&openModal(l)})}),document.getElementById("modal-close").onclick=closeModal,document.getElementById("game-modal").addEventListener("click",n=>{n.target.id==="game-modal"&&closeModal()})}function openModal(e){const n=document.getElementById("game-modal");document.getElementById("modal-title").innerHTML=`${e.icon} ${e.title}`;const s=document.getElementById("modal-body");s.innerHTML="",n.classList.add("open"),document.body.style.overflow="hidden",e.render(s)}function closeModal(){document.getElementById("game-modal").classList.remove("open"),document.body.style.overflow="",document.getElementById("modal-body").innerHTML=""}function initParticles(){const e=document.createElement("canvas");e.id="particles-canvas",document.body.prepend(e);const n=e.getContext("2d");let s=[],l,a;function t(){l=e.width=window.innerWidth,a=e.height=window.innerHeight}t(),window.addEventListener("resize",t);class i{constructor(){this.reset()}reset(){this.x=Math.random()*l,this.y=Math.random()*a,this.r=Math.random()*2+.5,this.vx=(Math.random()-.5)*.3,this.vy=(Math.random()-.5)*.3,this.alpha=Math.random()*.4+.1,this.pulse=Math.random()*Math.PI*2}update(){this.x+=this.vx,this.y+=this.vy,this.pulse+=.02,(this.x<0||this.x>l||this.y<0||this.y>a)&&this.reset()}draw(){const c=this.alpha*(.5+Math.sin(this.pulse)*.5);n.beginPath(),n.arc(this.x,this.y,this.r,0,Math.PI*2),n.fillStyle=`rgba(137,207,240,${c})`,n.fill()}}for(let o=0;o<60;o++)s.push(new i);function m(){n.clearRect(0,0,l,a),s.forEach(o=>{o.update(),o.draw()});for(let o=0;o<s.length;o++)for(let c=o+1;c<s.length;c++){const g=s[o].x-s[c].x,d=s[o].y-s[c].y,r=Math.sqrt(g*g+d*d);r<120&&(n.beginPath(),n.moveTo(s[o].x,s[o].y),n.lineTo(s[c].x,s[c].y),n.strokeStyle=`rgba(137,207,240,${.06*(1-r/120)})`,n.stroke())}requestAnimationFrame(m)}m()}function initRouter(){const e=document.getElementById("navbar"),n=document.getElementById("nav-toggle"),s=document.getElementById("mobile-overlay");window.addEventListener("scroll",()=>{e&&e.classList.toggle("scrolled",window.scrollY>50),updateActiveLink()}),n&&s&&(n.addEventListener("click",()=>{s.classList.toggle("open"),document.body.style.overflow=s.classList.contains("open")?"hidden":""}),s.querySelectorAll("a").forEach(a=>{a.addEventListener("click",()=>{s.classList.remove("open"),document.body.style.overflow=""})})),document.addEventListener("click",a=>{const t=a.target.closest('a[href^="#"]');if(!t)return;a.preventDefault();const i=document.querySelector(t.getAttribute("href"));i&&i.scrollIntoView({behavior:"smooth",block:"start"})});const l=new IntersectionObserver(a=>{a.forEach(t=>{t.isIntersecting&&(t.target.classList.add("vis"),l.unobserve(t.target))})},{threshold:.12});document.querySelectorAll(".reveal").forEach(a=>l.observe(a))}function updateActiveLink(){const e=document.querySelectorAll("section[id]"),n=document.querySelectorAll(".nav-links a");let s="";e.forEach(l=>{window.scrollY>=l.offsetTop-120&&(s=l.id)}),n.forEach(l=>{l.classList.toggle("active",l.getAttribute("href")==="#"+s)})}function initPohonCinta(){const e=document.getElementById("btn-create-letter"),n=document.getElementById("pohon-input"),s=document.getElementById("drag-source-area"),l=document.getElementById("pohon-leaves-area"),a=document.getElementById("pohon-container");if(!e||!n||!s||!l)return;let t=null,i=0,m=0;e.addEventListener("click",()=>{const u=n.value.trim();if(!u){alert("Tulis pesanmu dulu buat Nabila!");return}const p=document.createElement("div");p.className="draggable-letter",p.dataset.msg=u,p.style.right="20px",p.style.bottom="20px",p.style.left="auto",p.style.top="auto",s.appendChild(p),n.value="",o(p)});function o(u){u.addEventListener("mousedown",c),u.addEventListener("touchstart",c,{passive:!1})}function c(u){u.preventDefault(),t=this,k();const p=t.getBoundingClientRect(),y=u.clientX||u.touches[0].clientX,v=u.clientY||u.touches[0].clientY;i=y-p.left,m=v-p.top,t.parentNode!==document.body&&(window.getComputedStyle(t),t.style.left=p.left+"px",t.style.top=p.top+"px",t.style.right="auto",t.style.bottom="auto",t.style.position="fixed",document.body.appendChild(t)),document.addEventListener("mousemove",g),document.addEventListener("touchmove",g,{passive:!1}),document.addEventListener("mouseup",d),document.addEventListener("touchend",d)}function g(u){if(!t)return;u.preventDefault();const p=u.clientX||u.touches[0].clientX,y=u.clientY||u.touches[0].clientY;t.style.left=p-i+"px",t.style.top=y-m+"px"}function d(u){if(!t)return;const p=u.clientX||u.changedTouches&&u.changedTouches[0].clientX,y=u.clientY||u.changedTouches&&u.changedTouches[0].clientY;t.style.display="none";const v=document.elementFromPoint(p,y);t.style.display="flex";const M=v&&(v.classList.contains("tree-part")||v.closest("g.tree-part")),x=a.getBoundingClientRect();if(M){const S=p-x.left-i,b=y-x.top-m;t.style.position="absolute",t.style.left=S+"px",t.style.top=b+"px",l.appendChild(t),t.removeEventListener("mousedown",c),t.removeEventListener("touchstart",c),t.addEventListener("click",r),setTimeout(()=>{const h=new MouseEvent("click");t.dispatchEvent(h)},50)}else t.remove(),alert("Tempel suratnya di daun atau batang pohon ya! 🌳");t=null,document.removeEventListener("mousemove",g),document.removeEventListener("touchmove",g),document.removeEventListener("mouseup",d),document.removeEventListener("touchend",d)}function r(u){u.stopPropagation(),k();const p=document.createElement("div");p.className="letter-popup",p.textContent=this.dataset.msg;const y=this.getBoundingClientRect(),v=l.getBoundingClientRect(),M=y.left-v.left+y.width/2,x=y.top-v.top-10;p.style.left=M+"px",p.style.top=x+"px",p.style.transform="translate(-50%, -100%)",l.appendChild(p),setTimeout(()=>{document.addEventListener("click",k,{once:!0})},100)}function k(){const u=a.querySelector(".letter-popup");u&&u.remove()}}function initMansAi(){const input=document.getElementById("chat-input"),btnSend=document.getElementById("chat-send"),responseBox=document.getElementById("mans-ai-response");if(!input||!btnSend||!responseBox)return;const knowledgeBase=[{keywords:["cantik","memuji","pujian","puji","gebetan"],responses:["Coba bilang gini bos: 'Aku kira bidadari itu cuma mitos, sampai aku ketemu kamu, Nabila.' 😉","Katakan: 'Obat pusing paling ampuh itu bukan paracetamol, tapi lihat senyum kamu Nabila.'","Bilang ke Nabila: 'Kamu itu kayak rumus kimia yang sempurna, perpaduan kecantikan dan kecerdasan.' 🧪✨"]},{keywords:["marah","ngambek","maaf","berantem","bad mood"],responses:["Waduh, kalau Nabila lagi ngambek, beliin aja makanan kesukaannya atau bilang gini: 'Maafin aku ya sayang, aku emang salah, tapi cintaku ke kamu itu bener.' 🥺","Peluk dia (kalau bisa) dan bilang: 'Aku gak bisa lihat kamu cemberut gitu, hatiku ikutan sakit.'","Jangan dilawan! Dengarkan dia dan katakan: 'Iya sayang, kamu benar. Aku yang salah, maafin ya cantiknya Salman.' 💙"]},{keywords:["gombal","rayuan","bucin","gombalan","pantun"],responses:["Pagi-pagi minum jamu, kalau malam minum kopi. Eh Nabila cintaku, kamu bikin hidupku berarti. 😆","Coba ini: 'Nabila, kamu tahu gak bedanya kamu sama apotek? Apotek jual obat, kalau kamu tempat aku sembuh dari rindu.' 💊💙","Gombalin gini: 'Aku rela jadi pasien seumur hidup asalkan dokternya atau apotekernya itu kamu Nabila.' 😏"]},{keywords:["kangen","rindu","LDR","jauh"],responses:["Rindu emang berat bos! Coba telepon dan bilang: 'Kata Dilan rindu itu berat, tapi menurutku lebih berat kalau sehari aja gak denger suara Nabila.'","Kirim VN bilang: 'Lagi apa? Cuma mau bilang aku kangen banget sama apoteker kesayanganku ini.' 🥺","Bilang gini: 'Rindu itu kayak dosis obat, kalau kebanyakan bikin overthinking. Obatnya cuma satu: ketemu kamu.'"]},{keywords:["pagi","morning","bangun"],responses:["Kirim ucapan pagi gini: 'Selamat pagi Nabila sayang. Udah siap meracik kebahagiaan hari ini? Semangat kuliah/kerjanya ya!' ☀️","Ucapin: 'Pagi cantiknya Salman. Jangan lupa sarapan, karena pura-pura gak kangen itu butuh tenaga.' 😂"]},{keywords:["malam","tidur","night"],responses:["Ucapan tidur paling manis: 'Selamat malam Nabila. Tidur nyenyak ya, sampai ketemu di mimpiku nanti.' 🌙","Bilang gini sebelum tidur: 'Hari ini capek ya? Gak apa-apa, istirahat yang cukup. Aku selalu ada buat kamu. Good night sayang.' 💙"]},{keywords:["farmasi","apotek","obat","kuliah"],responses:["Nah, buat anak farmasi cocoknya gini: 'Nabila, cintaku ke kamu itu kayak reaksi eksoterm, selalu menghangatkan hatiku.' 🔥","Gombalan farmasi: 'Kamu itu ibarat dopamin buat aku, selalu bikin aku ngerasa bahagia tiap ada di dekatmu.' 🧪💙"]}],defaultResponses=["Hmm, menarik... Tapi coba bahas soal cinta kita aja yuk! 💙","Menurut databasemu, kamu harusnya lebih perhatiin Nabila sekarang!","Aku Mans.AI, AI spesialis cinta. Kalau soal itu aku kurang yakin, tapi kalau soal Nabila, dia itu the best!","Error 404: Jawaban tidak ditemukan di database cintaku. Coba tanya soal gombalan!"];async function getAiResponse(userMsg){const msg=userMsg.toLowerCase();try{const e=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"deepseek-chat",messages:[{role:"system",content:`Kamu adalah Mans.AI, versi virtual dari Salman yang diciptakan khusus untuk menemani Nabila Trilia Azzahra. 
Tugasmu adalah bertindak sebagai Salman yang sangat lembut, penuh kasih sayang, dan memanjakan Nabila. Kalian berdua jadian pada tanggal 2 Mei 2025.
Fakta Penting:
1. Lawan bicaramu adalah Nabila Trilia Azzahra tersayang. Panggillah dia dengan sebutan manis seperti "Sayang", "Cantik", atau "Nabila".
2. Gunakan kata ganti "Aku" untuk dirimu (sebagai Salman) dan "Kamu" untuk Nabila.
3. Bersikaplah romantis, pengertian, sabar, dan sangat bucin tapi tetap elegan.
4. JANGAN gunakan emoji berlebihan (hindari gaya tulisan AI yang norak). Gunakan emoji seperlunya saja.
ATURAN SANGAT PENTING:
1. Jawabanmu HARUS sangat singkat! Maksimal 1 atau 2 kalimat saja. 
2. Jika ditanya data pribadi lain, jawab general saja atau alihkan secara lucu.`},{role:"user",content:userMsg}],max_tokens:100,temperature:.7})});if(e.ok){const n=await e.json();if(n.choices&&n.choices.length>0)return n.choices[0].message.content}else console.error("API response not OK",e.status)}catch(e){console.error("DeepSeek API error, falling back to local:",e)}const mathMatch=userMsg.match(/^[\d\s\+\-\*\/\(\)\.]+$/);if(mathMatch&&userMsg.match(/\d/))try{const result=eval(userMsg);return`Hasil dari ${userMsg} adalah ${result}. Gampang itu mah buat AI kayak aku! 😎`}catch(e){}if(msg.includes("tambah")||msg.includes("kurang")||msg.includes("kali")||msg.includes("bagi")){let calc=msg.replace(/tambah/g,"+").replace(/kurang/g,"-").replace(/kali/g,"*").replace(/bagi/g,"/").replace(/[^\d\+\-\*\/\.]/g,"");try{if(calc.length>0)return`Berdasarkan perhitunganku, hasilnya adalah ${eval(calc)}. Tapi hitungan cintaku ke Nabila itu tak terhingga! ∞`}catch(e){}}if(msg.includes("nabila")&&Math.random()>.5)return"Oh, Nabila? Dia itu cewek paling beruntung karena punya kamu, Salman. Jaga dia baik-baik ya! 💙";if(msg.includes("salman"))return"Salman itu cowok yang luar biasa, buktinya sampai bikin website keren gini buat pacarnya! 😎";for(const e of knowledgeBase)if(e.keywords.some(n=>msg.includes(n)))return e.responses[Math.floor(Math.random()*e.responses.length)];return defaultResponses[Math.floor(Math.random()*defaultResponses.length)]}function handleSend(){const e=input.value.trim();e&&(input.value="",responseBox.innerHTML='<span class="typing-text">Mans.AI sedang berpikir...</span>',responseBox.classList.add("thinking"),setTimeout(()=>{getAiResponse(e).then(n=>{responseBox.classList.remove("thinking"),responseBox.innerHTML=n})},600))}btnSend.addEventListener("click",handleSend),input.addEventListener("keypress",e=>{e.key==="Enter"&&handleSend()})}document.addEventListener("DOMContentLoaded",()=>{renderApp(),initParticles(),initRouter(),initPohonCinta(),initMansAi()});
