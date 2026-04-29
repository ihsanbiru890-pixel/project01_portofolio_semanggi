const express = require('express');
const router = express.Router();
const { commentController } = require('../controllers/index.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

router.get('/discussion/:discussionId', commentController.getByDiscussionId);
router.post('/', authMiddleware, commentController.create);
router.put('/:id', authMiddleware, commentController.update);
router.delete('/:id', authMiddleware, commentController.remove);

module.exports = router;
