const teamService = require('../services/teamService.js');

const getAll = async (req, res, next) => {
  try {
    const data = await teamService.getAll();
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const data = await teamService.getById(Number(req.params.id));
    if (!data) return res.status(404).json({ success: false, message: 'Anggota tidak ditemukan' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = await teamService.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const data = await teamService.update(Number(req.params.id), req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await teamService.remove(Number(req.params.id));
    res.json({ success: true, message: 'Anggota dinonaktifkan' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
