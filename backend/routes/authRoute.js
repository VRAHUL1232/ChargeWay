const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/logout',authMiddleware.authenticate, authController.logout);

router.get('/userauth',authMiddleware.isVerified);

router.get('/getUserId', authController.getUserId)

module.exports = router;