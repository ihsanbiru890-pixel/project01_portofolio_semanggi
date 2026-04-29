const videoService = require('../services/videoService.js');
const { cloudinary } = require('../lib/cloudinary.js');

exports.getAll = async (req, res, next) => {
  try {
    const { tag } = req.query;
    const videos = await videoService.getAll(tag);
    res.json({ success: true, data: videos });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const video = await videoService.getById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video tidak ditemukan' });
    res.json({ success: true, data: video });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    // req.files contains video and thumbnail (from multer fields)
    const videoUrl = req.files?.video?.[0]?.path || req.body.videoUrl;
    const thumbnailUrl = req.files?.thumbnail?.[0]?.path || req.body.thumbnailUrl;
    const videoPublicId = req.files?.video?.[0]?.filename || null;
    const thumbnailPublicId = req.files?.thumbnail?.[0]?.filename || null;

    const video = await videoService.create({
      ...req.body,
      videoUrl,
      thumbnailUrl,
      videoPublicId,
      thumbnailPublicId,
    });
    res.status(201).json({ success: true, data: video });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const video = await videoService.update(req.params.id, req.body);
    res.json({ success: true, data: video });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    // Get item first to retrieve Cloudinary public_ids for deletion
    const item = await videoService.getById(req.params.id);
    if (item?.videoPublicId) {
      await cloudinary.uploader.destroy(item.videoPublicId, { resource_type: 'video' });
    }
    if (item?.thumbnailPublicId) {
      await cloudinary.uploader.destroy(item.thumbnailPublicId);
    }
    await videoService.remove(req.params.id);
    res.json({ success: true, message: 'Video berhasil dihapus' });
  } catch (err) { next(err); }
};
