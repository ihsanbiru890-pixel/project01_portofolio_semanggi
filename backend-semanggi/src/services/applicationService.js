const { prisma } = require('../lib/prisma.js');

const applicationService = {
  createApplication: async (data) => {
    return prisma.application.create({ data });
  },

  getAllApplications: async () => {
    return prisma.application.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  getApplicationById: async (id) => {
    return prisma.application.findUnique({
      where: { id: parseInt(id, 10) }
    });
  },

  updateApplication: async (id, data) => {
    return prisma.application.update({
      where: { id: parseInt(id, 10) },
      data
    });
  },

  deleteApplication: async (id) => {
    return prisma.application.delete({
      where: { id: parseInt(id, 10) }
    });
  }
};

module.exports = applicationService;
