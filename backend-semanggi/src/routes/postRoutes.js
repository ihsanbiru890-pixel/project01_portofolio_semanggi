const express = require('express');
const router = express.Router();
const { postController } = require('../controllers/index.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

router.get('/discussion/:discussionId', postController.getByDiscussionId);
router.post('/', authMiddleware, postController.create);
router.put('/:id', authMiddleware, postController.update);
router.delete('/:id', authMiddleware, postController.remove);

module.exports = router;
