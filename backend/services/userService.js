const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async ({ username, password, email }) => {
  try {
    // Check if user already exists
    console.log('Checking for existing user:', { email, username });
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      throw new Error('User with this email or username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');
    
    // Determine role based on email
    const role = email === 'admin@admin.com' ? 'admin' : 'user';
    console.log('Creating user with role:', role);
    
    // Create new user
    const user = new User({ 
      username, 
      password: hashedPassword,
      email,
      role 
    });
    
    await user.save();
    console.log('User created successfully:', { 
      id: user._id, 
      email: user.email, 
      role: user.role,
      username: user.username 
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw error;
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    console.log('Attempting login for email:', email);
    
    // Find user
    console.log('Searching for user in database...');
    const user = await User.findOne({ email });
    console.log('Database query result:', user ? {
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
      hasPassword: !!user.password
    } : 'No user found');
    
    if (!user) {
      console.log('No user found with email:', email);
      throw new Error('Invalid credentials');
    }

    // Verify password
    console.log('Verifying password...');
    console.log('Stored password hash:', user.password);
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password verification result:', isValidPassword ? 'Valid' : 'Invalid');

    if (!isValidPassword) {
      console.log('Invalid password for user:', email);
      throw new Error('Invalid credentials');
    }

    // Generate token
    console.log('Generating JWT token...');
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    console.log('Token generated successfully');

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  } catch (error) {
    console.error('Error in loginUser:', error);
    throw error;
  }
};