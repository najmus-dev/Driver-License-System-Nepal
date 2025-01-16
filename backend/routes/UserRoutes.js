const express = require('express');
const { registerAdmin, login } = require('../controllers/userController');

const router = express.Router();

// Admin registration route
router.post('/register', registerAdmin);

// Admin login route
router.post('/login', login);

module.exports = router;
