const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

// Public
router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

// Admin only
router.post('/', authMiddleware, teamController.create);
router.put('/:id', authMiddleware, teamController.update);
router.delete('/:id', authMiddleware, teamController.remove);

module.exports = router;
