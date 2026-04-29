const { userService } = require('../services/index.js');

exports.create = async (req, res, next) => {
  try { res.status(201).json(await userService.createUser(req.body)); } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try { res.json(await userService.getUsers()); } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try { res.json(await userService.getUserById(req.params.id)); } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try { res.json(await userService.updateUser(req.params.id, req.body)); } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try { res.json(await userService.deleteUser(req.params.id)); } catch (err) { next(err); }
};
