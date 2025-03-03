import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHospital, updateHospital } from '../api';

function HospitalForm({ hospital }) {
  const [formData, setFormData] = useState(hospital || {
    name: '', city: '', image: '', specialities: '', rating: '',
    description: '', images: '', numberOfDoctors: '', numberOfDepartments: ''
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const data = {
      ...formData,
      specialities: formData.specialities.split(',').map(s => s.trim()),
      images: formData.images ? formData.images.split(',').map(i => i.trim()) : [],
      numberOfDoctors: formData.numberOfDoctors ? Number(formData.numberOfDoctors) : undefined,
      numberOfDepartments: formData.numberOfDepartments ? Number(formData.numberOfDepartments) : undefined,
    };

    try {
      if (hospital) {
        await updateHospital(hospital._id, data);
      } else {
        await createHospital(data);
      }
      navigate(`/hospitals/${formData.city}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save hospital. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Hospital Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
              placeholder="Enter hospital name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700">City</label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
              placeholder="Enter city name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Main Image URL</label>
            <input
              id="image"
              type="text"
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
              placeholder="Enter image URL"
              required={!hospital}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="rating" className="block text-sm font-semibold text-gray-700">Rating (0-5)</label>
            <input
              id="rating"
              type="number"
              value={formData.rating}
              onChange={e => setFormData({ ...formData, rating: e.target.value })}
              min="0"
              max="5"
              step="0.1"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
              placeholder="Enter rating"
              required={!hospital}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="specialities" className="block text-sm font-semibold text-gray-700">Specialities</label>
          <input
            id="specialities"
            type="text"
            value={formData.specialities}
            onChange={e => setFormData({ ...formData, specialities: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
            placeholder="Enter specialities (comma-separated)"
            required={!hospital}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            rows="4"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
            placeholder="Enter hospital description"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="images" className="block text-sm font-semibold text-gray-700">Additional Images</label>
          <input
            id="images"
            type="text"
            value={formData.images}
            onChange={e => setFormData({ ...formData, images: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
            placeholder="Enter additional image URLs (comma-separated)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="numberOfDoctors" className="block text-sm font-semibold text-gray-700">Number of Doctors</label>
            <input
              id="numberOfDoctors"
              type="number"
              value={formData.numberOfDoctors}
              onChange={e => setFormData({ ...formData, numberOfDoctors: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
              placeholder="Enter number of doctors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="numberOfDepartments" className="block text-sm font-semibold text-gray-700">Number of Departments</label>
            <input
              id="numberOfDepartments"
              type="number"
              value={formData.numberOfDepartments}
              onChange={e => setFormData({ ...formData, numberOfDepartments: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
              placeholder="Enter number of departments"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/hospitals')}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Saving...' : (hospital ? 'Update' : 'Create') + ' Hospital'}
        </button>
      </div>
    </form>
  );
}

export default HospitalForm;