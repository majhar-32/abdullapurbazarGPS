const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  try {
    const user = await prisma.users.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        email: 'admin@school.com',
        password: password,
        role: 'ADMIN',
        created_at: new Date(),
      },
    });
    console.log('Admin user created:', user);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
