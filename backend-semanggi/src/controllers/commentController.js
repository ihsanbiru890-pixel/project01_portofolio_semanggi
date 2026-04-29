const { commentService } = require('../services/index.js');

exports.create = async (req, res, next) => {
  try { res.status(201).json(await commentService.createComment(req.body)); } catch (err) { next(err); }
};

exports.getByDiscussionId = async (req, res, next) => {
  try { res.json(await commentService.getCommentsByDiscussionId(req.params.discussionId)); } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try { res.json(await commentService.updateComment(req.params.id, req.body)); } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try { res.json(await commentService.deleteComment(req.params.id)); } catch (err) { next(err); }
};
