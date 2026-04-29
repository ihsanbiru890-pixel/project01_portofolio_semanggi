const { prisma } = require('../lib/prisma.js');

const videoService = {
  getAll: async (tag) => {
    const where = tag && tag !== 'Semua' ? { tag } : {};
    return prisma.video.findMany({ where, orderBy: { createdAt: 'desc' } });
  },
  getById: async (id) => prisma.video.findUnique({ where: { id: parseInt(id, 10) } }),
  create: async (data) => prisma.video.create({ data }),
  update: async (id, data) => prisma.video.update({ where: { id: parseInt(id, 10) }, data }),
  remove: async (id) => prisma.video.delete({ where: { id: parseInt(id, 10) } }),
};

module.exports = videoService;
