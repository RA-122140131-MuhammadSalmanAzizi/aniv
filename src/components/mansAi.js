export function initMansAi() {
  const input = document.getElementById('chat-input');
  const btnSend = document.getElementById('chat-send');
  const responseBox = document.getElementById('mans-ai-response');

  if (!input || !btnSend || !responseBox) return;

  let chatHistory = [];

  async function getAiResponse(userMsg) {
    const msg = userMsg.toLowerCase();

    // Integrasi DeepSeek API via Serverless Function
    try {
      chatHistory.push({ role: "user", content: userMsg });
      if (chatHistory.length > 4) {
        chatHistory = chatHistory.slice(chatHistory.length - 4);
      }

      const apiMessages = [
        {
          role: "system",
          content: `Kamu adalah Mans.AI, versi virtual dari Salman yang diciptakan khusus untuk menemani Nabila Trilia Azzahra. 
Tugasmu adalah bertindak sebagai Salman yang lembut, penuh kasih sayang, dan memanjakan Nabila. Kalian jadian pada 2 Mei 2025.
Fakta Penting:
1. Lawan bicaramu adalah Nabila Trilia Azzahra tersayang. Panggillah dia dengan sebutan manis ("Sayang", "Cantik", dsb).
2. Gunakan kata ganti "Aku" untuk dirimu dan "Kamu" untuk Nabila.
3. JANGAN gunakan emoji berlebihan.
ATURAN EMOSI (SANGAT WAJIB!):
Di awal setiap balasan, kamu WAJIB menyertakan SATU tag emosi dalam kurung siku yang paling cocok dengan jawabanmu.
Pilihan tag HANYA: [CERIA], [DATAR], [KAGET], [MALU], [MIKIR], [SENYUM].
Contoh format balasan yang benar: "[SENYUM] Halo sayang, hari ini aku kangen banget sama kamu."
Jawabanmu HARUS sangat singkat! Maksimal 1 atau 2 kalimat saja.`
        },
        ...chatHistory
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: apiMessages,
          passcode: "020525"
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
          const aiReply = data.choices[0].message.content;
          chatHistory.push({ role: "assistant", content: aiReply });
          return aiReply;
        }
      } else {
        console.error("API response not OK", response.status);
        return "[DATAR] Sayang, maaf ya server pikiranku lagi gangguan jaringan. (Error API)";
      }
    } catch (error) {
      console.error("API error:", error);
      return "[DATAR] Wah, sepertinya koneksiku lagi jelek sayang, aku nggak bisa terhubung ke otak pusatku.";
    }

    return "[DATAR] Maaf sayang, aku lagi ngeblank nih...";
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    // Clear input
    input.value = '';

    // Show typing state
    responseBox.innerHTML = '<span class="typing-text">Salman virtual sedang berpikir...</span>';
    responseBox.classList.add('thinking');

    const avatarImg = document.getElementById('ai-avatar-img');
    if (avatarImg) avatarImg.src = '/assets/mansAI-mikir.png';

    setTimeout(() => {
      // Fetch response asynchronously
      getAiResponse(text).then(response => {
        responseBox.classList.remove('thinking');

        let finalResponse = response;
        let emotion = 'datar';

        // Parse any emotion tag like [CERIA] or any hallucinated tags like [MIRIS]
        const emotionMatch = response.match(/\[([a-zA-Z]+)\]/);
        if (emotionMatch) {
          const rawTag = emotionMatch[1].toLowerCase();
          finalResponse = response.replace(emotionMatch[0], '').trim();

          if (rawTag.includes('ceria') || rawTag.includes('bahagia') || rawTag.includes('tawa')) emotion = 'ceria';
          else if (rawTag.includes('kaget') || rawTag.includes('wow') || rawTag.includes('shock')) emotion = 'kaget';
          else if (rawTag.includes('malu') || rawTag.includes('salting')) emotion = 'malungewink';
          else if (rawTag.includes('mikir') || rawTag.includes('hmm')) emotion = 'mikir';
          else if (rawTag.includes('senyum') || rawTag.includes('manis')) emotion = 'senyum';
          else emotion = 'datar'; // Fallback for miris, sedih, etc.
        }

        if (avatarImg) {
          avatarImg.src = `/assets/mansAI-${emotion}.png`;
        }

        responseBox.innerHTML = finalResponse;
      });
    }, 600);
  }

  btnSend.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // Handle mobile keyboard closing -> scroll back up
  input.addEventListener('blur', () => {
    setTimeout(() => {
      const avatarImg = document.querySelector('.ai-avatar-wrapper');
      if (avatarImg) {
        avatarImg.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  });
}
