const hospitalService = require('../services/hospitalService');

exports.createHospital = async (req, res) => {
  try {
    console.log('Creating hospital with data:', req.body);
    const hospital = await hospitalService.createHospital(req.body);
    console.log('Hospital created successfully:', hospital);
    res.status(201).json(hospital);
  } catch (error) {
    console.error('Error creating hospital:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getAllHospitals = async (req, res) => {
  try {
    console.log('Fetching all hospitals');
    const hospitals = await hospitalService.getAllHospitals();
    console.log(`Found ${hospitals.length} hospitals`);
    res.json(hospitals);
  } catch (error) {
    console.error('Error fetching all hospitals:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getHospitalsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ message: 'City is required' });
    console.log('Fetching hospitals for city:', city);
    const hospitals = await hospitalService.getHospitalsByCity(city);
    console.log(`Found ${hospitals.length} hospitals`);
    res.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getHospital = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching hospital with ID:', id);
    const hospital = await hospitalService.getHospital(id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json(hospital);
  } catch (error) {
    console.error('Error fetching hospital:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Updating hospital with ID:', id);
    const hospital = await hospitalService.updateHospital(id, req.body);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    console.log('Hospital updated successfully:', hospital);
    res.json(hospital);
  } catch (error) {
    console.error('Error updating hospital:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting hospital with ID:', id);
    await hospitalService.deleteHospital(id);
    console.log('Hospital deleted successfully');
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting hospital:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.addHospitalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Adding details to hospital with ID:', id);
    const hospital = await hospitalService.addHospitalDetails(id, req.body);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    console.log('Hospital details added successfully:', hospital);
    res.json(hospital);
  } catch (error) {
    console.error('Error adding hospital details:', error);
    res.status(400).json({ message: error.message });
  }
};