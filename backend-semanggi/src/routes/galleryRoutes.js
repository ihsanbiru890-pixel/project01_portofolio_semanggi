const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');
const { uploadImage } = require('../lib/cloudinary.js');

// Public
router.get('/', galleryController.getAll);        // GET /gallery?tag=Diskusi
router.get('/:id', galleryController.getById);

// Admin only
router.post('/', authMiddleware, uploadImage.single('image'), galleryController.create);
router.put('/:id', authMiddleware, uploadImage.single('image'), galleryController.update);
router.delete('/:id', authMiddleware, galleryController.remove);

module.exports = router;
