const express = require('express');
const { registerDoctor, getDoctorProfile, getAllDoctors } = require('../controllers/doctorController');
const router = express.Router();

router.post('/register', registerDoctor); // Register a doctor
router.get('/:id', getDoctorProfile); // Get doctor profile by ID
router.get('/', getAllDoctors); // Get list of all doctors

module.exports = router;