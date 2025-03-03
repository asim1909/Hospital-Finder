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

const fixDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hospital_db';
    console.log('Using MongoDB URI:', mongoURI);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log('Connected to MongoDB successfully');

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // Check if users collection exists
    const usersCollection = collections.find(c => c.name === 'users');
    if (!usersCollection) {
      console.log('Users collection not found, creating...');
      await mongoose.connection.createCollection('users');
      console.log('Users collection created');
    }

    // Delete any existing admin users
    console.log('Removing existing admin users...');
    await User.deleteMany({ email: 'admin@admin.com' });
    console.log('Existing admin users removed');

    // Create new admin user
    console.log('Creating new admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log('Password hashed:', hashedPassword);

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

      // Test password verification
      const isValidPassword = await bcrypt.compare('admin123', verifyUser.password);
      console.log('Password verification test:', isValidPassword ? 'Success' : 'Failed');
    } else {
      console.error('Failed to verify admin user');
    }

    // List all users in the database
    const allUsers = await User.find({});
    console.log('All users in database:', allUsers.map(u => ({
      email: u.email,
      username: u.username,
      role: u.role
    })));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    if (error.name === 'MongoServerSelectionError') {
      console.error('Could not connect to MongoDB. Make sure MongoDB is running.');
    }
    process.exit(1);
  }
};

fixDatabase(); 