import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seed/user-data';

const prisma = new PrismaClient();

async function main() {
  const type = process.argv[2] || 'all';

  switch (type) {
    case 'users':
      await seedUsers();
      break;

    case 'all':
      await seedUsers();
      // await seedPosts();
      // await seedAdmins();
      break;

    default:
      console.log(`❌ 不支援的 seed 類型: ${type}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ 種子資料失敗:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
