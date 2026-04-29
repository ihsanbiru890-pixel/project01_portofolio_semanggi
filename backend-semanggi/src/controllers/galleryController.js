const galleryService = require('../services/galleryService.js');

const getAll = async (req, res, next) => {
  try {
    const { tag } = req.query;
    const data = await galleryService.getAll({ tag });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const data = await galleryService.getById(Number(req.params.id));
    if (!data) return res.status(404).json({ success: false, message: 'Foto tidak ditemukan' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const data = await galleryService.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const data = await galleryService.update(Number(req.params.id), req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await galleryService.remove(Number(req.params.id));
    res.json({ success: true, message: 'Foto berhasil dihapus' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
