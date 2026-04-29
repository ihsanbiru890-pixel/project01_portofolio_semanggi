const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/index.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

router.get('/', authMiddleware, checkRole(['ADMIN']), userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create); // Registration could be open
router.put('/:id', authMiddleware, userController.update);
router.delete('/:id', authMiddleware, checkRole(['ADMIN']), userController.remove);

module.exports = router;
