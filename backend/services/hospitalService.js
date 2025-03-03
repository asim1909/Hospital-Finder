const Hospital = require('../models/hospital');

exports.getAllHospitals = async () => {
  try {
    console.log('Fetching all hospitals');
    const hospitals = await Hospital.find({});
    console.log(`Found ${hospitals.length} hospitals`);
    return hospitals;
  } catch (error) {
    console.error('Error in getAllHospitals:', error);
    throw error;
  }
};

exports.createHospital = async (data) => {
  try {
    console.log('Creating hospital with data:', data);
    const hospital = new Hospital(data);
    await hospital.save();
    console.log('Hospital created successfully:', hospital);
    return hospital;
  } catch (error) {
    console.error('Error in createHospital:', error);
    throw error;
  }
};

exports.getHospitalsByCity = async (city) => {
  try {
    console.log('Fetching hospitals for city:', city);
    const hospitals = await Hospital.find({ city });
    console.log(`Found ${hospitals.length} hospitals`);
    return hospitals;
  } catch (error) {
    console.error('Error in getHospitalsByCity:', error);
    throw error;
  }
};

exports.getHospital = async (id) => {
  try {
    console.log('Fetching hospital with ID:', id);
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      console.log('Hospital not found');
      return null;
    }
    console.log('Hospital found:', hospital);
    return hospital;
  } catch (error) {
    console.error('Error in getHospital:', error);
    throw error;
  }
};

exports.updateHospital = async (id, data) => {
  try {
    console.log('Updating hospital with ID:', id);
    const hospital = await Hospital.findByIdAndUpdate(id, data, { new: true });
    if (!hospital) {
      console.log('Hospital not found');
      return null;
    }
    console.log('Hospital updated successfully:', hospital);
    return hospital;
  } catch (error) {
    console.error('Error in updateHospital:', error);
    throw error;
  }
};

exports.deleteHospital = async (id) => {
  try {
    console.log('Deleting hospital with ID:', id);
    const hospital = await Hospital.findByIdAndDelete(id);
    if (!hospital) {
      console.log('Hospital not found');
      return null;
    }
    console.log('Hospital deleted successfully');
    return hospital;
  } catch (error) {
    console.error('Error in deleteHospital:', error);
    throw error;
  }
};

exports.addHospitalDetails = async (id, data) => {
  try {
    console.log('Adding details to hospital with ID:', id);
    const hospital = await Hospital.findByIdAndUpdate(id, data, { new: true });
    if (!hospital) {
      console.log('Hospital not found');
      return null;
    }
    console.log('Hospital details added successfully:', hospital);
    return hospital;
  } catch (error) {
    console.error('Error in addHospitalDetails:', error);
    throw error;
  }
};