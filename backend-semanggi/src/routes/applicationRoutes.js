const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

// Public can submit application
router.post('/', applicationController.create);

// Admin can manage applications
router.get('/', authMiddleware, checkRole(['ADMIN']), applicationController.getAll);
router.get('/:id', authMiddleware, checkRole(['ADMIN']), applicationController.getById);
router.put('/:id', authMiddleware, checkRole(['ADMIN']), applicationController.update);
router.delete('/:id', authMiddleware, checkRole(['ADMIN']), applicationController.remove);

module.exports = router;
