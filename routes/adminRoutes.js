const express = require('express');
const router = express.Router();

const ensureAdmin = require('../middleware/auth');
const {
    getAllDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    getAllAppointments,
    getAllPatients,
    addPatient,
    updatePatient,
    deletePatient,
    dashboard
} = require('../controllers/adminController');

// Admin dashboard route
router.get('/dashboard', ensureAdmin, (req, res) => {
    res.sendFile(__dirname + '/../public/dashboard.html'); // Serve the dashboard HTML
});

// Doctor routes
router.get('/doctors', getAllDoctors); // Get all doctors
router.post('/doctors', addDoctor); // Add a new doctor
router.put('/doctors/:id', updateDoctor); // Update a doctor
router.delete('/doctors/:id', deleteDoctor); // Delete a doctor

// Appointment routes
router.get('/appointments', getAllAppointments); // Get all appointments

// Patient routes
router.get('/patients', getAllPatients); // Get all patients
router.post('/patients', addPatient); // Add a new patient
router.put('/patients/:id', updatePatient); // Update a patient
router.delete('/patients/:id', deletePatient); // Delete a patient

module.exports = router;
