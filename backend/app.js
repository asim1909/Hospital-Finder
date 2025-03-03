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
  origin: 'http://localhost:3001', // Frontend URL
  credentials: true
}));

app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'ok', message: 'Server is running' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital_db', { 
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
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server with port fallback
const startServer = async () => {
  const ports = [5000, 5001, 5002, 5003];
  let serverStarted = false;

  for (const port of ports) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port)
          .once('listening', () => {
            console.log(`Server running on port ${port}`);
            console.log('Available routes:');
            console.log('- GET /api/health');
            console.log('- POST /api/hospitals');
            console.log('- GET /api/hospitals');
            console.log('- GET /api/hospitals/:id');
            console.log('- PUT /api/hospitals/:id');
            console.log('- DELETE /api/hospitals/:id');
            console.log('- POST /api/users/login');
            console.log('- POST /api/users/register');
            serverStarted = true;
            resolve();
          })
          .once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
              console.log(`Port ${port} is busy, trying next port...`);
              reject(err);
            } else {
              reject(err);
            }
          });
      });
      break; // If we get here, server started successfully
    } catch (err) {
      if (port === ports[ports.length - 1]) {
        console.error('Could not start server on any port');
        process.exit(1);
      }
    }
  }
};

startServer();