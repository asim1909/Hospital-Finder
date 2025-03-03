const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

// Create hospital
router.post('/', auth, admin, hospitalController.createHospital);

// Get all hospitals
router.get('/all', hospitalController.getAllHospitals);

// Get hospitals by city
router.get('/city', hospitalController.getHospitalsByCity);

// Get single hospital
router.get('/:id', hospitalController.getHospital);

// Update hospital
router.put('/:id', auth, admin, hospitalController.updateHospital);

// Delete hospital
router.delete('/:id', auth, admin, hospitalController.deleteHospital);

// Add hospital details
router.post('/:id/details', auth, admin, hospitalController.addHospitalDetails);

module.exports = router;