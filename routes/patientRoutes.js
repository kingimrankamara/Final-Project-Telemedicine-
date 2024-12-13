const express = require('express');
const { registerPatient, loginPatient, getProfile } = require('../controllers/patientController');
const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.get('/profile', getProfile);

module.exports = router;