const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
  try {
    console.log('Registration request body:', req.body);
    const { token, user } = await userService.registerUser(req.body);
    console.log('Registration successful:', { user, token: '***' });
    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { token, user } = await userService.loginUser(req.body);
    console.log('Login successful:', { user, token: '***' });
    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: error.message });
  }
};