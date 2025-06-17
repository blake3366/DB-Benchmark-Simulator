import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedUsers(count = 100) {
  console.log('🧹 正在清除舊資料...');
  await prisma.user.deleteMany();
  await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
  const users = await Promise.all(
    Array.from({ length: count }, async (_, i) => {
      const hashedPassword = await bcrypt.hash('123456', 10); // 每筆都重新 hash
      return {
        email: `user${i + 1}@example.com`,
        password: hashedPassword,
      };
  }));

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log(`✅ 已建立 ${count} 筆用戶（含雜湊密碼）`);
}
