const { portfolioService } = require('../services/index.js');
const { cloudinary } = require('../lib/cloudinary.js');

exports.create = async (req, res, next) => {
  try { 
    const data = { ...req.body };
    if (req.file) {
      data.coverUrl = req.file.path;
      data.coverPublicId = req.file.filename;
    }
    const result = await portfolioService.createPortfolio(data);
    res.status(201).json({ success: true, data: result }); 
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try { 
    const data = await portfolioService.getPortfolios();
    res.json({ success: true, data }); 
  } catch (err) { next(err); }
};

exports.getBySlug = async (req, res, next) => {
  try { 
    const data = await portfolioService.getPortfolioBySlug(req.params.slug);
    if (!data) return res.status(404).json({ success: false, message: 'Portfolio tidak ditemukan' });
    res.json({ success: true, data }); 
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try { 
    const data = { ...req.body };
    if (req.file) {
      data.coverUrl = req.file.path;
      data.coverPublicId = req.file.filename;
    }
    const result = await portfolioService.updatePortfolio(req.params.id, data);
    res.json({ success: true, data: result }); 
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try { 
    const portfolio = await portfolioService.getPortfolioBySlug(req.params.id); // Or getById if id is passed
    if (portfolio?.coverPublicId) {
      await cloudinary.uploader.destroy(portfolio.coverPublicId);
    }
    // Note: Ideally also delete sub-images from Cloudinary here
    await portfolioService.deletePortfolio(req.params.id);
    res.json({ success: true, message: 'Portfolio berhasil dihapus' }); 
  } catch (err) { next(err); }
};

// Image sub-operations
exports.addImage = async (req, res, next) => {
  try { 
    const data = { ...req.body };
    if (req.file) {
      data.imageUrl = req.file.path;
      data.cloudinaryPublicId = req.file.filename;
    }
    const result = await portfolioService.addPortfolioImage(req.params.id, data);
    res.status(201).json({ success: true, data: result }); 
  } catch (err) { next(err); }
};

exports.removeImage = async (req, res, next) => {
  try { 
    // In a real app, you'd fetch the image record to get the publicId first
    // For now, assuming we just delete the record. 
    // Ideally: const img = await prisma.portfolioImage.findUnique(...)
    await portfolioService.deletePortfolioImage(req.params.imageId);
    res.json({ success: true, message: 'Gambar berhasil dihapus' }); 
  } catch (err) { next(err); }
};
