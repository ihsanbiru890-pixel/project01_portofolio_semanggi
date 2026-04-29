const { discussionService } = require('../services/index.js');

exports.create = async (req, res, next) => {
  try { res.status(201).json(await discussionService.createDiscussion(req.body)); } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try { res.json(await discussionService.getDiscussions()); } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try { res.json(await discussionService.getDiscussionById(req.params.id)); } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try { res.json(await discussionService.updateDiscussion(req.params.id, req.body)); } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try { res.json(await discussionService.deleteDiscussion(req.params.id)); } catch (err) { next(err); }
};
