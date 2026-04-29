const express = require('express');
const router = express.Router();
const { categoryController } = require('../controllers/index.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

router.get('/', categoryController.getAll);
router.get('/slug/:slug', categoryController.getBySlug);
router.post('/', authMiddleware, categoryController.create);
router.put('/:id', authMiddleware, categoryController.update);
router.delete('/:id', authMiddleware, categoryController.remove);

module.exports = router;
