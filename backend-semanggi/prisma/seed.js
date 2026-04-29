require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

// Use the same adapter logic as src/lib/prisma.js
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding roles...');
  
  const roles = [
    { id: 1, name: 'USER', description: 'Standard user access' },
    { id: 2, name: 'ADMIN', description: 'Full administrative access' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: { name: role.name },
      create: role,
    });
  }

  console.log('Seeding categories...');
  const categories = [
    { id: 1, name: 'Web Dev', slug: 'web-dev', description: 'Web development discussions' },
    { id: 2, name: 'Design', slug: 'design', description: 'UI/UX and Graphic Design' },
    { id: 3, name: 'Game Dev', slug: 'game-dev', description: 'Game development' },
    { id: 4, name: 'Lainnya', slug: 'lainnya', description: 'Diskusi topik lainnya' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: cat,
    });
  }

  console.log('Seeding team members...');
  const teamMembers = [
    { id: 1, name: 'Ferta', role: 'Founder', bio: 'Visionary and lead strategist.', order: 1 },
    { id: 2, name: 'Andi', role: 'UI/UX Designer', bio: 'Creative mind behind the interface.', order: 2 },
    { id: 3, name: 'Siti', role: 'Fullstack Developer', bio: 'Building the core engine.', order: 3 },
    { id: 4, name: 'Budi', role: 'Content Creator', bio: 'Telling our story to the world.', order: 4 },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: {},
      create: member,
    });
  }

  const bcrypt = require('bcryptjs');
  const adminPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@semanggi.id' },
    update: { password: adminPassword, roleId: 2 },
    create: {
      email: 'admin@semanggi.id',
      username: 'admin',
      password: adminPassword,
      roleId: 2
    }
  });

  const portfolios = [
    {
      id: 1,
      userId: adminUser.id,
      categoryId: 1, // Web Dev
      title: 'Website SMGGI',
      slug: 'website-smggi',
      description: 'Website resmi komunitas Semanggi. Dibangun sebagai wajah digital komunitas dan portal informasi kolaborasi.',
      projectUrl: 'https://semanggi.id',
      coverUrl: '/assets/logoresmi.png',
    },
    {
      id: 2,
      userId: adminUser.id,
      categoryId: 2, // Design
      title: 'The Rest Area',
      slug: 'the-rest-area',
      description: 'Video cinematic seorang mahasiswa yang menjalani kehidupan sehari-harinya — tantangan, harapan, dan tekad untuk terus maju.',
      projectUrl: 'https://youtube.com',
      coverUrl: '/assets/therest.jpeg',
    }
  ];

  for (const p of portfolios) {
    await prisma.portfolio.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }

  console.log('Seeding discussions...');
  const discussions = [
    {
      id: 1,
      userId: adminUser.id,
      categoryId: 1, // Web Dev
      title: 'Bagaimana memulai kolaborasi di Semanggi?',
      content: 'Halo semuanya! Saya baru bergabung dan tertarik untuk berkolaborasi dalam project web development. Apa langkah awalnya?',
    },
    {
      id: 2,
      userId: adminUser.id,
      categoryId: 3, // Game Dev
      title: 'Diskusi: Tren Game Engine 2026',
      content: 'Menurut kalian apakah Unreal Engine 5 akan tetap mendominasi atau Unity akan bangkit kembali?',
    }
  ];

  for (const d of discussions) {
    await prisma.discussion.upsert({
      where: { id: d.id },
      update: {},
      create: d,
    });
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
