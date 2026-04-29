const { prisma } = require('../lib/prisma.js');

const roleService = {
  createRole: async (data) => prisma.role.create({ data }),
  getRoles: async () => prisma.role.findMany(),
  getRoleById: async (id) => prisma.role.findUnique({ where: { id: parseInt(id, 10) } }),
  updateRole: async (id, data) => prisma.role.update({ where: { id: parseInt(id, 10) }, data }),
  deleteRole: async (id) => prisma.role.delete({ where: { id: parseInt(id, 10) } })
};

module.exports = roleService;
