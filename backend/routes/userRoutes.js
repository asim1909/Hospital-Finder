const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/user');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Debug route to check user existence
router.get('/check/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json({ exists: !!user, user: user ? {
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username
    } : null });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;