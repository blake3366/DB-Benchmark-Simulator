import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import bcrypt from 'bcryptjs';
import _ from 'lodash';
import { getRandomEmails, inputPassword, redis} from './login-utils';

const prisma = new PrismaClient();

export type RedisBenchmarkResult = {
  dbTime: number;
  cacheTime: number;
  totalTime: number;
  isHit: boolean;
};

async function simulateLogin(email: string): Promise<RedisBenchmarkResult> {
  console.log(`🔵 [${email}] 模擬登入流程開始`);
  const start = Date.now();
  let userData: any;
  const cacheStart = Date.now();
  const cache = await redis.get(email);
  let cacheEnd: any;
  let dbEnd: any;
  let isHit = false;
  if (cache) {
    userData = JSON.parse(cache);
    cacheEnd = Date.now();
    isHit = true;
    console.log(`🔵 [${email}] 使用 Redis 快取，耗時：${ cacheEnd - cacheStart }ms`)
  } else {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error(`User ${email} not found`);
    await redis.set(email, JSON.stringify(user));
    userData = user;
    dbEnd = Date.now();
    console.log(`🔵 [${email}] Redis 快取未命中，從資料庫耗時：${dbEnd - start}ms`)
  }

  const match = await bcrypt.compare(inputPassword, userData.password);
  if (!match) throw new Error(`Password mismatch for ${email}`);
  console.log(`總耗時：${Date.now() - start} ms`)
  return {
    dbTime: dbEnd ? dbEnd - cacheStart : 0,
    cacheTime: cacheEnd ? cacheEnd - cacheStart : 0,
    totalTime: Date.now() - start,
    isHit: isHit
  };
}

export async function simulateLoginWithRedis (count: number): Promise<any> {
  const emails = getRandomEmails(count, 100);
  const results = await Promise.all(emails.map(simulateLogin));
  const hitCount = results.filter(result => result.isHit).length;
  const missCount = results.length - hitCount;
  const hitRate = (hitCount / results.length) * 100;
  const totalTimes = results.map(result => result.totalTime);
  console.log(totalTimes.map((time, index) => `🔵 [${emails[index]}] 耗時：${time} ms`).join('\n'));
  const avg = totalTimes.reduce((a, b) => a + b, 0) / totalTimes.length;
  const result = {
    totalTimes: totalTimes,
    averageTime: avg,
    fastestTime: Math.min(...totalTimes),
    slowestTime: Math.max(...totalTimes),
    hitCount: hitCount,
    missCount: missCount,
    hitRate: hitRate.toFixed(2)+ '%',
  };
  return result;
}
