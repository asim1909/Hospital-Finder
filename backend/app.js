const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const hospitalRoutes = require('./routes/hospitalRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set');
  process.exit(1);
}

const app = express();

// Enable CORS
app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://localhost:5173',
    'https://hospital-finder.netlify.app',
    'https://hospital-finder-asim.netlify.app',
    'https://precious-shortbread-fc5616.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Log all requests with full URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log('Request Headers:', req.headers);
  next();
});

// Base router for all routes including root
const baseRouter = express.Router();

// Root route handler
baseRouter.get('/', (req, res) => {
  console.log('Root route accessed');
  res.json({ 
    message: 'Welcome to Hospital Finder API',
    status: 'ok',
    version: '1.0.0',
    endpoints: {
      api: '/api',
      health: '/api/health',
      hospitals: '/api/hospitals',
      users: '/api/users'
    }
  });
});

// API Routes
const apiRouter = express.Router();

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'ok', message: 'Server is running' });
});

// Mount API routes
apiRouter.use('/hospitals', hospitalRoutes);
apiRouter.use('/users', userRoutes);

// Mount all routes
app.use('/', baseRouter);
app.use('/api', apiRouter);

// Serve favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// MongoDB connection with retry logic
const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`MongoDB connection attempt ${i + 1} of ${retries}`);
      console.log('Connecting to:', process.env.MONGODB_URI.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://***:***@'));
      
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      
      console.log('MongoDB connected successfully');
      return true;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) {
        console.error('All MongoDB connection attempts failed');
        throw err;
      }
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Connect to MongoDB
connectDB()
  .catch(err => {
    console.error('Fatal: MongoDB connection error:', err);
    process.exit(1);
  });

// 404 handler - Must be after all other routes
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.originalUrl);
  res.status(404).json({ 
    message: 'Route not found',
    availableEndpoints: {
      root: '/',
      api: '/api',
      health: '/api/health',
      hospitals: '/api/hospitals',
      users: '/api/users'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available routes:');
  console.log('- GET /');
  console.log('- GET /api');
  console.log('- GET /api/health');
  console.log('- POST /api/hospitals');
  console.log('- GET /api/hospitals');
  console.log('- GET /api/hospitals/:id');
  console.log('- PUT /api/hospitals/:id');
  console.log('- DELETE /api/hospitals/:id');
  console.log('- POST /api/users/login');
  console.log('- POST /api/users/register');
});