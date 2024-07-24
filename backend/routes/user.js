// routes/user.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyUser } = require('../controllers/userController');
const verifyFunction = require("../middleware/auth")

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/verify", verifyFunction, verifyUser)

module.exports = router;
