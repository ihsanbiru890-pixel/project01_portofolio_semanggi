const { prisma } = require('../lib/prisma.js');

const postService = {
  createPost: async (data) => prisma.post.create({ data }),
  getPostsByDiscussionId: async (discussionId) => prisma.post.findMany({ 
    where: { discussionId: parseInt(discussionId, 10) },
    include: { user: true, replies: true, reactions: true }
  }),
  updatePost: async (id, data) => prisma.post.update({ where: { id: parseInt(id, 10) }, data }),
  deletePost: async (id) => prisma.post.delete({ where: { id: parseInt(id, 10) } })
};

module.exports = postService;
