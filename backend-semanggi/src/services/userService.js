const { prisma } = require('../lib/prisma.js');

const userService = {
  createUser: async (data) => prisma.user.create({ data }),
  getUsers: async () => prisma.user.findMany({ include: { role: true } }),
  getUserById: async (id) => prisma.user.findUnique({ 
    where: { id: parseInt(id, 10) },
    include: { role: true, portfolios: true, discussions: true }
  }),
  getUserByEmail: async (email) => prisma.user.findUnique({ 
    where: { email },
    include: { role: true }
  }),
  updateUser: async (id, data) => prisma.user.update({ where: { id: parseInt(id, 10) }, data }),
  deleteUser: async (id) => prisma.user.delete({ where: { id: parseInt(id, 10) } })
};

module.exports = userService;
