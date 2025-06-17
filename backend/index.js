const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const app = express();
const prisma = new PrismaClient();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('👋 Hello from Express in Docker!');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'user@example.com' && password === '123456') {
    res.json({ status: '✅ success' });
  } else {
    res.status(401).json({ status: '❌ invalid credentials' });
  }
});

app.get('/health', async (req, res) => {
  try {
    const result = await prisma.user.findMany(); // 假設你有 User model
    res.json({ db: '✅ OK', count: result.length });
  } catch (err) {
    console.error('❌ Prisma 錯誤', err);
    res.status(500).json({ db: '❌ Error', error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});