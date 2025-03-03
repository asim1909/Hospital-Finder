const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
  try {
    // Connect to MongoDB with options
    console.log('Attempting to connect to MongoDB...');
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hospital_db';
    console.log('Using MongoDB URI:', mongoURI);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });
    console.log('Connected to MongoDB successfully');

    // Clear any existing admin users first
    console.log('Clearing any existing admin users...');
    await User.deleteMany({ email: 'admin@admin.com' });
    console.log('Cleared existing admin users');

    // Create admin user
    console.log('Creating new admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log('Password hashed successfully');

    const adminUser = new User({
      username: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('Attempting to save admin user...');
    await adminUser.save();
    console.log('Admin user saved successfully');

    // Verify the user was created
    const verifyUser = await User.findOne({ email: 'admin@admin.com' });
    if (verifyUser) {
      console.log('Admin user verified:', {
        email: verifyUser.email,
        username: verifyUser.username,
        role: verifyUser.role,
        id: verifyUser._id
      });
    } else {
      console.error('Failed to verify admin user creation');
    }

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    if (error.code === 11000) {
      console.error('Duplicate key error - User might already exist');
    }
    if (error.name === 'MongoServerSelectionError') {
      console.error('Could not connect to MongoDB. Make sure MongoDB is running.');
    }
    process.exit(1);
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error closing database connection:', err);
    process.exit(1);
  }
});

createAdminUser(); 