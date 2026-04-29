const express = require('express');
const router = express.Router();
const { portfolioController } = require('../controllers/index.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');
const { uploadImage } = require('../lib/cloudinary.js');

router.get('/', portfolioController.getAll);
router.get('/slug/:slug', portfolioController.getBySlug);

// Create portfolio with cover upload
router.post('/', authMiddleware, uploadImage.single('cover'), portfolioController.create);
router.put('/:id', authMiddleware, uploadImage.single('cover'), portfolioController.update);
router.delete('/:id', authMiddleware, portfolioController.remove);

// Add image to existing portfolio
router.post('/:id/images', authMiddleware, uploadImage.single('image'), portfolioController.addImage);
router.delete('/images/:imageId', authMiddleware, portfolioController.removeImage);

module.exports = router;
