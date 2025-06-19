import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { simulateLoginWithPostgres } from './benchmark/login-postgres';
import { simulateLoginWithRedis } from './benchmark/login-redis';
import { connectRedisInit } from './benchmark/login-utils';

const app = express();
const prisma = new PrismaClient();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/hello', (req: Request, res: Response) => {
  res.send('👋 Hello from Express in Docker!');
});

app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === 'user@example.com' && password === '123456') {
    res.json({ status: '✅ success' });
  } else {
    res.status(401).json({ status: '❌ invalid credentials' });
  }
});

app.get('/health', async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany(); // 確保有 User model
    res.json({ db: '✅ OK', count: result.length });
  } catch (err: any) {
    console.error('❌ Prisma 錯誤', err);
    res.status(500).json({ db: '❌ Error', error: err.message });
  }
});

app.post('/api/benchmark_postgres', async (req: Request, res: Response) => {
  try {
    const count = parseInt(req.body.count as string) || 10;
    const result = await simulateLoginWithPostgres(count);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'PostgreSQL Benchmark failed' });
  }
});

app.post('/api/benchmark_redis', async (req: Request, res: Response) => {
  try {
    await connectRedisInit();
    const count = parseInt(req.body.count as string) || 10;
    const result = await simulateLoginWithRedis(count);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Redis Benchmark failed' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
