const { postService } = require('../services/index.js');

exports.create = async (req, res, next) => {
  try { res.status(201).json(await postService.createPost(req.body)); } catch (err) { next(err); }
};

exports.getByDiscussionId = async (req, res, next) => {
  try { res.json(await postService.getPostsByDiscussionId(req.params.discussionId)); } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try { res.json(await postService.updatePost(req.params.id, req.body)); } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try { res.json(await postService.deletePost(req.params.id)); } catch (err) { next(err); }
};
