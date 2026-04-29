const { prisma } = require('../lib/prisma.js');

const categoryService = {
  createCategory: async (data) => prisma.category.create({ data }),
  getCategories: async () => prisma.category.findMany(),
  getCategoryBySlug: async (slug) => prisma.category.findUnique({ where: { slug }, include: { discussions: true, portfolios: true } }),
  updateCategory: async (id, data) => prisma.category.update({ where: { id: parseInt(id, 10) }, data }),
  deleteCategory: async (id, data) => prisma.category.delete({ where })
};

module.exports = categoryService;
