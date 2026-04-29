const teamService = require('../services/teamService.js');
const { cloudinary } = require('../lib/cloudinary.js');

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
    const data = { ...req.body };
    if (req.file) {
      data.photoUrl = req.file.path;
      data.photoPublicId = req.file.filename;
    }
    const result = await teamService.create(data);
    res.status(201).json({ success: true, data: result });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.photoUrl = req.file.path;
      data.photoPublicId = req.file.filename;
    }
    const result = await teamService.update(Number(req.params.id), data);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const member = await teamService.getById(Number(req.params.id));
    if (member?.photoPublicId) {
      await cloudinary.uploader.destroy(member.photoPublicId);
    }
    await teamService.remove(Number(req.params.id));
    res.json({ success: true, message: 'Anggota berhasil dihapus' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
