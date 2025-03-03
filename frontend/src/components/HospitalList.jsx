import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getHospitals, deleteHospital } from '../api';

function HospitalList() {
  const { city } = useParams();
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setIsLoading(true);
        const response = await getHospitals(city);
        setHospitals(response.data);
      } catch (err) {
        setError('Failed to fetch hospitals. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (city) {
      fetchHospitals();
    }
  }, [city]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      try {
        await deleteHospital(id);
        setHospitals(hospitals.filter(h => h._id !== id));
      } catch (err) {
        setError('Failed to delete hospital. Please try again later.');
        console.error(err);
      }
    }
  };

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Hospitals in {city}</h2>
        {user?.role === 'admin' && (
          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add New Hospital
          </Link>
        )}
      </div>

      {hospitals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <p className="text-gray-500 text-lg">No hospitals found in this city.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map(hospital => (
            <div key={hospital._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <Link 
                  to={`/hospital/${hospital._id}`} 
                  className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                >
                  {hospital.name}
                </Link>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">Rating:</span> {hospital.rating}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Specialities:</span> {hospital.specialities.join(', ')}
                </p>
                {user?.role === 'admin' && (
                  <div className="mt-4 flex gap-2">
                    <Link 
                      to={`/edit/${hospital._id}`} 
                      className="flex-1 bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 text-center"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(hospital._id)} 
                      className="flex-1 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HospitalList;