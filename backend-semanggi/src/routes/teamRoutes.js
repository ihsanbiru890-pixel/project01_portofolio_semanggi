const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');
const { uploadImage } = require('../lib/cloudinary.js');

// Public
router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

// Admin only
router.post('/', authMiddleware, uploadImage.single('photo'), teamController.create);
router.put('/:id', authMiddleware, uploadImage.single('photo'), teamController.update);
router.delete('/:id', authMiddleware, teamController.remove);

module.exports = router;
