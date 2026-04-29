require('dotenv').config();
const { prisma } = require('../src/lib/prisma.js');

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      include: { role: true }
    });
    console.log(JSON.stringify(users, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
