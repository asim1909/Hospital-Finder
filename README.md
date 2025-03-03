# Hospital Finder

A full-stack web application for managing and searching hospitals, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User Authentication (Admin and Regular Users)
- Hospital Management (Create, Read, Update, Delete)
- Search Hospitals by City
- Responsive Design
- Role-based Access Control

## Tech Stack

- Frontend:
  - React.js
  - Tailwind CSS
  - React Router
  - Context API for State Management

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/<your-username>/hospital-finder.git
cd hospital-finder
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the development servers:
```bash
# Start backend server (from backend directory)
npm start

# Start frontend server (from frontend directory)
npm run dev
```

## Default Admin Credentials

- Email: admin@admin.com
- Password: admin123

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user

### Hospitals
- GET /api/hospitals - Get all hospitals
- GET /api/hospitals/:city - Get hospitals by city
- GET /api/hospitals/:id - Get hospital by ID
- POST /api/hospitals - Create a new hospital (Admin only)
- PUT /api/hospitals/:id - Update hospital (Admin only)
- DELETE /api/hospitals/:id - Delete hospital (Admin only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 