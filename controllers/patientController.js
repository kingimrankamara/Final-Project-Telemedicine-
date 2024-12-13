const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Register patient
exports.registerPatient = async (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    
    try {
        const [result] = await db.query(`
            INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [first_name, last_name, email, passwordHash, phone, date_of_birth, gender, address]
        );
        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Patient login
exports.loginPatient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [patient] = await db.query('SELECT * FROM patients WHERE email = ?', [email]);
        if (patient.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, patient[0].password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.patientId = patient[0].id;
        res.status(200).json({ message: 'Login successful', patient: patient[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Profile management
exports.getProfile = async (req, res) => {
    const patientId = req.session.patientId;

    try {
        const [patient] = await db.query('SELECT * FROM patients WHERE id = ?', [patientId]);
        if (patient.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};