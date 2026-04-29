const express = require('express');
const router = express.Router();
const { reactionController } = require('../controllers/index.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

router.post('/', authMiddleware, reactionController.create);
router.delete('/:id', authMiddleware, reactionController.remove);

module.exports = router;
