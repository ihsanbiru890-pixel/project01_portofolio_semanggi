const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

// Public
router.get('/', galleryController.getAll);        // GET /gallery?tag=Diskusi
router.get('/:id', galleryController.getById);

// Admin only
router.post('/', authMiddleware, galleryController.create);
router.put('/:id', authMiddleware, galleryController.update);
router.delete('/:id', authMiddleware, galleryController.remove);

module.exports = router;
