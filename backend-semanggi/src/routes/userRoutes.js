const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/index.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');
const { uploadImage } = require('../lib/cloudinary.js');

router.get('/', authMiddleware, checkRole(['ADMIN']), userController.getAll);
router.get('/admins', userController.getAdmins); // Public for Team section
router.get('/:id', userController.getById);
router.post('/', userController.create); // Registration could be open
router.put('/:id', authMiddleware, uploadImage.single('profilePic'), userController.update);
router.delete('/:id', authMiddleware, checkRole(['ADMIN']), userController.remove);

module.exports = router;
