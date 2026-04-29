const express = require('express');
const router = express.Router();
const { authController } = require('../controllers/index.js');
const validateMiddleware = require('../middlewares/validateMiddleware.js');
const { registerSchema, loginSchema } = require('../validators/authValidator.js');

router.post('/register', validateMiddleware(registerSchema), authController.register);
router.post('/login', validateMiddleware(loginSchema), authController.login);
router.post('/google', authController.googleLogin);

module.exports = router;
