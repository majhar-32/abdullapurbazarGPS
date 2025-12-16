const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Hardcoded strong credentials
  const newUsername = 'admin_secure';
  const newPassword = 'School_Website_2025!';

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    // Find the existing admin user (assuming ID 1 or username 'admin')
    // We will update the first user found or specific one
    const user = await prisma.users.findFirst();

    if (user) {
      const updatedUser = await prisma.users.update({
        where: { id: user.id },
        data: {
          username: newUsername,
          password: hashedPassword
        }
      });
      console.log('Admin updated successfully.');
      console.log('Username:', newUsername);
      console.log('Password:', newPassword);
    } else {
      console.error('No user found to update.');
    }

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
