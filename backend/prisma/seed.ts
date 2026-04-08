import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 12);
  
  await prisma.user.upsert({
    where: { email: 'admin@wdu.co.id' },
    update: {},
    create: {
      email: 'admin@wdu.co.id',
      name: 'Super Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Admin user created: admin@wdu.co.id / admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());