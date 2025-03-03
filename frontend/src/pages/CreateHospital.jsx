import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HospitalForm from '../components/HospitalForm';

function CreateHospital() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect if not logged in or not admin
  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Hospital</h1>
      <HospitalForm />
    </div>
  );
}

export default CreateHospital;