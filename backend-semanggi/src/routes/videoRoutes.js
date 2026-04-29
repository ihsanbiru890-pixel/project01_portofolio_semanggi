const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');
const { uploadVideo } = require('../lib/cloudinary.js');

router.get('/', videoController.getAll);
router.get('/:id', videoController.getById);

const videoUploads = uploadVideo.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

router.post('/', authMiddleware, videoUploads, videoController.create);
router.put('/:id', authMiddleware, videoUploads, videoController.update);
router.delete('/:id', authMiddleware, videoController.remove);

module.exports = router;
