const { reactionService } = require('../services/index.js');

exports.create = async (req, res, next) => {
  try { res.status(201).json(await reactionService.createReaction(req.body)); } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try { res.json(await reactionService.deleteReaction(req.params.id)); } catch (err) { next(err); }
};
