const { prisma } = require('../lib/prisma.js');

const reactionService = {
  createReaction: async (data) => prisma.reaction.create({ data }),
  deleteReaction: async (id) => prisma.reaction.delete({ where: { id: parseInt(id, 10) } })
};

module.exports = reactionService;
