import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHospital } from '../api';

function Hospital() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await getHospital(id);
        setHospital(response.data);
      } catch (err) {
        setError('Failed to fetch hospital details. Please try again later.');
        console.error(err);
      }
    };

    if (id) {
      fetchHospital();
    }
  }, [id]);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
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
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src={hospital.image} 
          alt={hospital.name} 
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{hospital.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><span className="font-semibold">City:</span> {hospital.city}</p>
              <p className="text-gray-600"><span className="font-semibold">Rating:</span> {hospital.rating}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Specialities:</span> {hospital.specialities.join(', ')}
              </p>
            </div>
            <div>
              {hospital.numberOfDoctors && (
                <p className="text-gray-600">
                  <span className="font-semibold">Doctors:</span> {hospital.numberOfDoctors}
                </p>
              )}
              {hospital.numberOfDepartments && (
                <p className="text-gray-600">
                  <span className="font-semibold">Departments:</span> {hospital.numberOfDepartments}
                </p>
              )}
            </div>
          </div>
          
          {hospital.description && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{hospital.description}</p>
            </div>
          )}

          {hospital.images?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hospital.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`Hospital ${idx + 1}`} 
                    className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hospital;