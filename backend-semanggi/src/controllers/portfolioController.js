const { portfolioService } = require('../services/index.js');

exports.create = async (req, res, next) => {
  try { 
    const { images, ...data } = req.body;
    res.status(201).json(await portfolioService.createPortfolio(data, images)); 
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try { res.json(await portfolioService.getPortfolios()); } catch (err) { next(err); }
};

exports.getBySlug = async (req, res, next) => {
  try { res.json(await portfolioService.getPortfolioBySlug(req.params.slug)); } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try { res.json(await portfolioService.updatePortfolio(req.params.id, req.body)); } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try { res.json(await portfolioService.deletePortfolio(req.params.id)); } catch (err) { next(err); }
};

// Image sub-operations
exports.addImage = async (req, res, next) => {
  try { res.status(201).json(await portfolioService.addPortfolioImage(req.params.id, req.body)); } catch (err) { next(err); }
};

exports.removeImage = async (req, res, next) => {
  try { res.json(await portfolioService.deletePortfolioImage(req.params.imageId)); } catch (err) { next(err); }
};
