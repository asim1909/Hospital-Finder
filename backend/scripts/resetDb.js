const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const resetDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hospital_db');
    console.log('Connected to MongoDB');

    // Drop all collections
    console.log('Dropping all collections...');
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.drop();
    }
    console.log('All collections dropped');

    // Create admin user
    console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('Admin user created successfully:', {
      id: adminUser._id,
      email: adminUser.email,
      username: adminUser.username,
      role: adminUser.role
    });

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

resetDatabase(); 