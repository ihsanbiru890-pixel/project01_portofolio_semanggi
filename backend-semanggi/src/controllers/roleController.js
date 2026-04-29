const { roleService } = require('../services/index.js');

exports.create = async (req, res, next) => {
  try { res.status(201).json(await roleService.createRole(req.body)); } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try { res.json(await roleService.getRoles()); } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try { res.json(await roleService.getRoleById(req.params.id)); } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try { res.json(await roleService.updateRole(req.params.id, req.body)); } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try { res.json(await roleService.deleteRole(req.params.id)); } catch (err) { next(err); }
};
