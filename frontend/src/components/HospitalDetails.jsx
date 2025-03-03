import { useState } from 'react';
import { FaStar, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';

const HospitalDetails = ({ hospital, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    onAddReview(hospital._id, { rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-8">
        <h1 className="text-3xl font-bold mb-4">{hospital.name}</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <p className="text-gray-600">{hospital.address.street}</p>
          <p className="text-gray-600">
            {hospital.address.city}, {hospital.address.state} {hospital.address.zipCode}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <div className="space-y-2">
            <p className="flex items-center text-gray-600">
              <FaPhone className="mr-2" />
              {hospital.contact.phone}
            </p>
            <p className="flex items-center text-gray-600">
              <FaEnvelope className="mr-2" />
              {hospital.contact.email}
            </p>
            <p className="flex items-center text-gray-600">
              <FaGlobe className="mr-2" />
              {hospital.contact.website}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Specialties</h2>
          <div className="flex flex-wrap gap-2">
            {hospital.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Facilities</h2>
          <ul className="list-disc list-inside text-gray-600">
            {hospital.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hospital.doctors.map((doctor, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialization}</p>
                <p className="text-gray-600">{doctor.experience} years of experience</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rating & Reviews</h2>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < Math.round(hospital.rating) ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">({hospital.reviews.length} reviews)</span>
          </div>

          <div className="space-y-4">
            {hospital.reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>

          {onAddReview && (
            <form onSubmit={handleSubmitReview} className="mt-6">
              <h3 className="text-lg font-medium mb-2">Add a Review</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl focus:outline-none"
                    >
                      <FaStar
                        className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="input"
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails; 