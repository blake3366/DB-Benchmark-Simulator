import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

const prisma = new PrismaClient();
const redis = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });

// function getRandomEmails(count: number, total: number): string[] {
//   const indices = Array.from({ length: total }, (_, i) => i + 1);
//   const shuffled = indices.sort(() => Math.random() - 0.5);
//   const selected = shuffled.slice(0, count);
//   return selected.map(i => `user${i}@example.com`);
// }
const random_number = _.sampleSize(_.range(1, 100), 10); 
const emails = random_number.map(value => `user${value}@example.com`);


async function simulateLogin(email: string): Promise<number> {
  const start = Date.now();
  let userData: any;

  const cache = await redis.get(email);
  if (cache) {
    userData = JSON.parse(cache);
  } else {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error(`User ${email} not found`);
    await redis.set(email, JSON.stringify(user));
    userData = user;
  }

  const match = await bcrypt.compare('123456', userData.password);
  if (!match) throw new Error(`Password mismatch for ${email}`);

  return Date.now() - start;
}

async function main() {
  console.log('🚀 Redis Login Benchmark:');
  await redis.connect();
//   const emails = getRandomEmails(10, 100); // 隨機抽 10 人測試
  const results = await Promise.all(emails.map(simulateLogin));

  const avg = results.reduce((a, b) => a + b, 0) / results.length;
  console.log(`✅ 平均耗時：${avg.toFixed(2)} ms`);
  console.log(`⏱ 最快：${Math.min(...results)} ms`);
  console.log(`🐢 最慢：${Math.max(...results)} ms`);

  await redis.quit();
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
