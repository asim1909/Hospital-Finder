const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const hospitalRoutes = require('./routes/hospitalRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
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

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  next();
});

// Root route handler
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Hospital Finder API',
    status: 'ok',
    endpoints: {
      health: '/api/health',
      hospitals: '/api/hospitals',
      users: '/api/users'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'ok', message: 'Server is running' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hospital_db', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ 
    message: 'Route not found',
    availableEndpoints: {
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available routes:');
  console.log('- GET /');
  console.log('- GET /api/health');
  console.log('- POST /api/hospitals');
  console.log('- GET /api/hospitals');
  console.log('- GET /api/hospitals/:id');
  console.log('- PUT /api/hospitals/:id');
  console.log('- DELETE /api/hospitals/:id');
  console.log('- POST /api/users/login');
  console.log('- POST /api/users/register');
});