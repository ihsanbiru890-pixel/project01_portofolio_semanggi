const express = require('express');
const router = express.Router();
const { portfolioController } = require('../controllers/index.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

router.get('/', portfolioController.getAll);
router.get('/slug/:slug', portfolioController.getBySlug);
router.post('/', authMiddleware, portfolioController.create);
router.put('/:id', authMiddleware, portfolioController.update);
router.delete('/:id', authMiddleware, portfolioController.remove);

router.post('/:id/images', authMiddleware, portfolioController.addImage);
router.delete('/images/:imageId', authMiddleware, portfolioController.removeImage);

module.exports = router;
