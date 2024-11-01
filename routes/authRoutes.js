const express = require('express');
const { signup, login, logout, verifySession } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', verifySession);

module.exports = router; 