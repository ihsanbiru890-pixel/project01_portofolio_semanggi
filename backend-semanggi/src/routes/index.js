const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes.js'));
router.use('/roles', require('./roleRoutes.js'));
router.use('/users', require('./userRoutes.js'));
router.use('/categories', require('./categoryRoutes.js'));
router.use('/discussions', require('./discussionRoutes.js'));
router.use('/posts', require('./postRoutes.js'));
router.use('/comments', require('./commentRoutes.js'));
router.use('/reactions', require('./reactionRoutes.js'));
router.use('/portfolios', require('./portfolioRoutes.js'));
router.use('/gallery', require('./galleryRoutes.js'));
router.use('/team', require('./teamRoutes.js'));
router.use('/applications', require('./applicationRoutes.js'));

module.exports = router;
