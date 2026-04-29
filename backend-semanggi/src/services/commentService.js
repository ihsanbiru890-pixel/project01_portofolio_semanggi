const { prisma } = require('../lib/prisma.js');

const commentService = {
  createComment: async (data) => prisma.comment.create({ data }),
  getCommentsByDiscussionId: async (discussionId) => prisma.comment.findMany({ 
    where: { discussionId: parseInt(discussionId, 10) },
    include: { user: true }
  }),
  updateComment: async (id, data) => prisma.comment.update({ where: { id: parseInt(id, 10) }, data }),
  deleteComment: async (id) => prisma.comment.delete({ where: { id: parseInt(id, 10) } })
};

module.exports = commentService;
