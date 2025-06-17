import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import _ from 'lodash';


const random_number = _.sampleSize(_.range(1, 100), 10); 
const emails = random_number.map(value => `user${value}@example.com`);

const prisma = new PrismaClient();
const inputPassword = '123456';

async function simulateLoginVerbose(email: string): Promise<number> {
  const start = Date.now();

  console.log(`🟡 [${email}] 開始登入流程`);

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

  return total;
}

async function main() {
  console.log('🚀 PostgreSQL Login Benchmark (詳細過程):');
  const results = await Promise.all(emails.map(simulateLoginVerbose));

  const avg = results.reduce((a, b) => a + b, 0) / results.length;
  console.log(`\n✅ 平均耗時：${avg.toFixed(2)} ms`);
  console.log(`⏱ 最快：${Math.min(...results)} ms`);
  console.log(`🐢 最慢：${Math.max(...results)} ms`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ 發生錯誤：', e);
  process.exit(1);
});
