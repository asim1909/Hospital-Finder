import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AllHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/hospitals/all');
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const data = await response.json();
        setHospitals(data);
        setFilteredHospitals(data);
      } catch (err) {
        setError('Failed to fetch hospitals. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    const filtered = hospitals.filter(hospital => {
      const searchLower = searchTerm.toLowerCase();
      return (
        hospital.name.toLowerCase().includes(searchLower) ||
        hospital.city.toLowerCase().includes(searchLower)
      );
    });
    setFilteredHospitals(filtered);
  }, [searchTerm, hospitals]);

  const handleDelete = async (hospitalId) => {
    if (!window.confirm('Are you sure you want to delete this hospital?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/hospitals/${hospitalId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete hospital');
      }

      // Remove the deleted hospital from the state
      setHospitals(hospitals.filter(hospital => hospital._id !== hospitalId));
      setFilteredHospitals(filteredHospitals.filter(hospital => hospital._id !== hospitalId));
    } catch (err) {
      console.error('Error deleting hospital:', err);
      alert('Failed to delete hospital. Please try again.');
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Hospitals</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by hospital name or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hospital) => (
          <div key={hospital._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{hospital.name}</h2>
              <p className="text-gray-600 mb-2">{hospital.city}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{hospital.rating}/5</span>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-2">{hospital.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {hospital.specialities?.map((speciality, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {speciality}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>{hospital.numberOfDoctors} Doctors</p>
                  <p>{hospital.numberOfDepartments} Departments</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/hospital/${hospital._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    View
                  </Link>
                  {user?.role === 'admin' && (
                    <>
                      <button
                        onClick={() => navigate(`/edit/${hospital._id}`)}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(hospital._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllHospitals; 