const express = require('express');
const router = express.Router();
const { roleController } = require('../controllers/index.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

router.get('/', authMiddleware, checkRole(['ADMIN']), roleController.getAll);
router.get('/:id', authMiddleware, checkRole(['ADMIN']), roleController.getById);
router.post('/', authMiddleware, checkRole(['ADMIN']), roleController.create);
router.put('/:id', authMiddleware, checkRole(['ADMIN']), roleController.update);
router.delete('/:id', authMiddleware, checkRole(['ADMIN']), roleController.remove);

module.exports = router;
