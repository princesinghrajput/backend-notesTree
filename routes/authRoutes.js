const express = require('express');
const { signup, login, logout, verifySession, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.use(protect); // Apply protection middleware to routes below
router.post('/logout', logout);
router.get('/verify', verifySession);
router.get('/profile', getProfile);

module.exports = router; 