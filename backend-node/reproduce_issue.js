const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Checking environment variables...');
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL is missing');
  } else {
    console.log('DATABASE_URL is set');
  }

  if (!process.env.JWT_SECRET) {
    console.error('ERROR: JWT_SECRET is missing');
  } else {
    console.log('JWT_SECRET is set');
  }

  console.log('Attempting to connect to database...');
  try {
    const user = await prisma.users.findFirst();
    console.log('Database connection successful. Found user:', user ? 'Yes' : 'No');
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
