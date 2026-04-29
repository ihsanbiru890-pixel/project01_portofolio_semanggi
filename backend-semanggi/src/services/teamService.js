const { prisma } = require('../lib/prisma.js');

const getAll = async () => {
  return prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });
};

const getById = async (id) => {
  return prisma.teamMember.findUnique({ where: { id } });
};

const create = async (data) => {
  return prisma.teamMember.create({ data });
};

const update = async (id, data) => {
  return prisma.teamMember.update({ where: { id }, data });
};

const remove = async (id) => {
  return prisma.teamMember.update({ where: { id }, data: { isActive: false } });
};

module.exports = { getAll, getById, create, update, remove };
