const { prisma } = require('../lib/prisma.js');

const getAll = async ({ tag } = {}) => {
  const where = tag ? { tag } : {};
  return prisma.gallery.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
};

const getById = async (id) => {
  return prisma.gallery.findUnique({ where: { id } });
};

const create = async (data) => {
  return prisma.gallery.create({ data });
};

const update = async (id, data) => {
  return prisma.gallery.update({ where: { id }, data });
};

const remove = async (id) => {
  return prisma.gallery.delete({ where: { id } });
};

module.exports = { getAll, getById, create, update, remove };
