const { prisma } = require('../lib/prisma.js');

const discussionService = {
  createDiscussion: async (data) => prisma.discussion.create({ data }),
  getDiscussions: async () => prisma.discussion.findMany({ include: { user: true, category: true } }),
  getDiscussionById: async (id) => prisma.discussion.findUnique({ 
    where: { id: parseInt(id, 10) },
    include: { posts: true, comments: true, user: true, category: true }
  }),
  updateDiscussion: async (id, data) => prisma.discussion.update({ where: { id: parseInt(id, 10) }, data }),
  deleteDiscussion: async (id) => prisma.discussion.delete({ where: { id: parseInt(id, 10) } })
};

module.exports = discussionService;
