const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema directly in this script
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://127.0.0.1:27017/hospital_db');
    console.log('Connected to MongoDB');

    // Delete existing admin user if exists
    await User.deleteMany({ email: 'admin@admin.com' });
    console.log('Cleaned up existing admin user');

    // Create new admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully');

    // Verify the user was created
    const user = await User.findOne({ email: 'admin@admin.com' });
    if (user) {
      console.log('Admin user verified:', {
        email: user.email,
        username: user.username,
        role: user.role
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdminUser(); 