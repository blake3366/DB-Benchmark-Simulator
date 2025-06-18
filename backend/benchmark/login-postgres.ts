import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import _ from 'lodash';
import { getRandomEmails, inputPassword } from './login-utils';

const prisma = new PrismaClient();

async function simulateLoginVerbose(email: string): Promise<number> {
  const start = Date.now();
  const dbStart = Date.now();
  const user = await prisma.user.findUnique({ where: { email } });
  const dbEnd = Date.now();

  if (!user) throw new Error(`User ${email} not found`);

  const hashStart = Date.now();
  const match = await bcrypt.compare(inputPassword, user.password);
  const hashEnd = Date.now();

  if (!match) throw new Error(`Password mismatch for ${email}`);

  const total = Date.now() - start;

  console.log(`🟢 [${email}] ✅ 登入成功`);
  console.log(`    ├─ 查資料庫時間：${dbEnd - dbStart} ms`);
  console.log(`    ├─ 密碼比對時間：${hashEnd - hashStart} ms`);
  console.log(`    └─ 總耗時：${total} ms`);

  return {
    dbTime: dbEnd - dbStart,
    hashTime: hashEnd - hashStart,
    totalTime: total
  };
}

export async function simulateLoginWithPostgres (count: number): Promise<any> {
  const emails = getRandomEmails(count, 100);
  const results = await Promise.all(emails.map(simulateLoginVerbose));
  const totalTimes = results.map(result => result.totalTime);
  console.log(totalTimes.map((time, index) => `🔵 [${emails[index]}] 耗時：${time} ms`).join('\n'));
  const avg = totalTimes.reduce((a, b) => a + b, 0) / totalTimes.length;
  const result = {
    totalTimes: totalTimes,
    averageTime: avg,
    fastestTime: Math.min(...totalTimes),
    slowestTime: Math.max(...totalTimes)
  };
  await prisma.$disconnect();
  return result;
}