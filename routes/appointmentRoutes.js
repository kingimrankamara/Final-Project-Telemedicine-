const express = require('express');
const { bookAppointment, getAppointmentsForDoctor, getAppointmentsForPatient, cancelAppointment } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/book', bookAppointment); // Book an appointment
router.get('/doctor/:doctorId', getAppointmentsForDoctor); // Get appointments for a specific doctor
router.get('/patient/:patientId', getAppointmentsForPatient); // Get appointments for a specific patient
router.delete('/:appointmentId/cancel', cancelAppointment); // Cancel an appointment

module.exports = router;