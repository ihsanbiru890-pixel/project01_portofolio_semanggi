const { prisma } = require('../lib/prisma.js');

const portfolioService = {
  createPortfolio: async (data, images = []) => {
    return prisma.portfolio.create({
      data: {
        ...data,
        images: {
          create: images // array of { imageUrl, description }
        }
      },
      include: { images: true }
    });
  },
  getPortfolios: async () => prisma.portfolio.findMany({ include: { user: true, category: true, images: true } }),
  getPortfolioBySlug: async (slug) => prisma.portfolio.findUnique({ 
    where: { slug },
    include: { user: true, category: true, images: true }
  }),
  updatePortfolio: async (id, data) => prisma.portfolio.update({ where: { id: parseInt(id, 10) }, data }),
  deletePortfolio: async (id) => prisma.portfolio.delete({ where: { id: parseInt(id, 10) } }),
  
  // Optional standalone image handling
  addPortfolioImage: async (portfolioId, data) => prisma.portfolioImage.create({
    data: { ...data, portfolioId: parseInt(portfolioId, 10) }
  }),
  deletePortfolioImage: async (imageId) => prisma.portfolioImage.delete({ where: { id: parseInt(imageId, 10) } })
};

module.exports = portfolioService;
