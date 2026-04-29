export default async function handler(req, res) {
  const allowedOrigins = [
    'https://aniv.vercel.app',
    'http://localhost:5174',
    'http://localhost:5173'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, passcode } = req.body;

  if (passcode !== process.env.ANNIVERSARY_PASSCODE) {
    return res.status(401).json({ error: 'Unauthorized: Invalid passcode' });
  }

  try {
    // ⚠️ Pastikan endpoint benar (cek docs terbaru)
    const deepseekResponse = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat', // atau 'deepseek-reasoner' untuk thinking
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await deepseekResponse.json();

    // ✅ Tambahan: handle error dari DeepSeek
    if (!deepseekResponse.ok) {
      console.error('DeepSeek API Error:', data);
      return res.status(deepseekResponse.status).json({
        error: data.error?.message || 'DeepSeek API Error'
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}