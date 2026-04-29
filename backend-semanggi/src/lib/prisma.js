const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

// Initialize the PostgreSQL connection pool
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);

// Pass adapter to Prisma Client constructor
const prisma = new PrismaClient({
  adapter,
  log: ['info', 'warn', 'error'],
});

module.exports = { prisma };
