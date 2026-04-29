const { userService } = require('../services/index.js');
const { cloudinary } = require('../lib/cloudinary.js');

exports.create = async (req, res, next) => {
  try { res.status(201).json(await userService.createUser(req.body)); } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try { res.json(await userService.getUsers()); } catch (err) { next(err); }
};

exports.getAdmins = async (req, res, next) => {
  try { 
    const users = await userService.getUsers();
    const admins = users.filter(u => u.role?.name === 'ADMIN');
    res.json({ success: true, data: admins }); 
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try { res.json(await userService.getUserById(req.params.id)); } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try { 
    const data = { ...req.body };
    if (req.file) {
      data.profilePicUrl = req.file.path;
      data.profilePicPublicId = req.file.filename;
    }
    const result = await userService.updateUser(req.params.id, data);
    res.json({ success: true, data: result }); 
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try { 
    const user = await userService.getUserById(req.params.id);
    if (user?.profilePicPublicId) {
      await cloudinary.uploader.destroy(user.profilePicPublicId);
    }
    await userService.deleteUser(req.params.id);
    res.json({ success: true, message: 'Pengguna berhasil dihapus' }); 
  } catch (err) { next(err); }
};
