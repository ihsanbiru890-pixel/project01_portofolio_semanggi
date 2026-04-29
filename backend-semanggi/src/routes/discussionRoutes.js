const express = require('express');
const router = express.Router();
const { discussionController } = require('../controllers/index.js');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware.js');

router.get('/', discussionController.getAll);
router.get('/:id', discussionController.getById);
router.post('/', authMiddleware, discussionController.create);
router.put('/:id', authMiddleware, discussionController.update);
router.delete('/:id', authMiddleware, discussionController.remove);

module.exports = router;
