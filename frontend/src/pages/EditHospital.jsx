import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getHospital } from '../api';
import HospitalForm from '../components/HospitalForm';

function EditHospital() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hospital, setHospital] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchHospital = async () => {
      try {
        const response = await getHospital(id);
        const hospitalData = {
          ...response.data,
          specialities: response.data.specialities.join(','),
          images: response.data.images?.join(',') || ''
        };
        setHospital(hospitalData);
      } catch (err) {
        setError('Failed to fetch hospital details. Please try again later.');
        console.error(err);
      }
    };

    if (id) {
      fetchHospital();
    }
  }, [id, user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Hospital</h2>
        <HospitalForm hospital={hospital} />
      </div>
    </div>
  );
}

export default EditHospital;