import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');

  const guestRole = await prisma.role.create({
    data: {
      id: 1,
      name: 'Guest',
      rank: 1,
    },
  });

  const userRole = await prisma.role.create({
    data: {
      id: 2,
      name: 'User',
      rank: 200,
    },
  });

  const adminRole = await prisma.role.create({
    data: {
      id: 3,
      name: 'Admin',
      rank: 300,
    },
  });

  console.log({ guestRole, userRole, adminRole });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
