const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const checkAndCreateAdmin = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hospital_db');
    console.log('Connected to MongoDB');

    // Check for admin user
    console.log('Checking for admin user...');
    const adminUser = await User.findOne({ email: 'admin@admin.com' });
    
    if (adminUser) {
      console.log('Admin user exists:', {
        id: adminUser._id,
        email: adminUser.email,
        username: adminUser.username,
        role: adminUser.role
      });
    } else {
      console.log('Admin user not found, creating new admin user...');
      
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const newAdmin = new User({
        username: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('Admin user created successfully:', {
        id: newAdmin._id,
        email: newAdmin.email,
        username: newAdmin.username,
        role: newAdmin.role
      });
    }

    // Verify the user exists
    const verifyUser = await User.findOne({ email: 'admin@admin.com' });
    if (verifyUser) {
      console.log('Admin user verified:', {
        id: verifyUser._id,
        email: verifyUser.email,
        username: verifyUser.username,
        role: verifyUser.role
      });
    } else {
      console.error('Failed to verify admin user');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkAndCreateAdmin(); 