import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import backgroundImage from '../img/image.png';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return (
      <div className="min-h-screen">
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src={backgroundImage}
              alt="Hospital Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              Welcome, {user.username}!
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mb-8">
              {user.role === 'admin' 
                ? 'Manage hospitals and their information from your dashboard.'
                : 'View and search for hospitals in your area.'}
            </p>
            {user.role === 'admin' && (
              <button 
                onClick={() => navigate('/hospitals')}
                className="bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg font-semibold"
              >
                Move to Hospitals
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Hospital Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Find Hospitals Near You
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mb-8">
            View and search for hospitals in your area. Get detailed information about their services, ratings, and more.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg font-semibold"
          >
            Login to View Hospitals
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;