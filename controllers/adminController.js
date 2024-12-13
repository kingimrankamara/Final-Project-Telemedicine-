const db = require('../config/db');

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const [doctors] = await db.query('SELECT * FROM doctors');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new doctor
exports.addDoctor = async (req, res) => {
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;

    try {
        const [result] = await db.query(`
            INSERT INTO doctors (first_name, last_name, specialization, email, phone, schedule)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, specialization, email, phone, JSON.stringify(schedule)]
        );
        res.status(201).json({ message: 'Doctor added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a doctor's details
exports.updateDoctor = async (req, res) => {
    const doctorId = req.params.id;
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;

    try {
        const [result] = await db.query(`
            UPDATE doctors 
            SET first_name = ?, last_name = ?, specialization = ?, email = ?, phone = ?, schedule = ? 
            WHERE id = ?`,
            [first_name, last_name, specialization, email, phone, JSON.stringify(schedule), doctorId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Doctor updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
    const doctorId = req.params.id;

    try {
        const [result] = await db.query('DELETE FROM doctors WHERE id = ?', [doctorId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const [appointments] = await db.query('SELECT * FROM appointments');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const [patients] = await db.query('SELECT * FROM patients');
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new patient
exports.addPatient = async (req, res) => {
    const { first_name, last_name, email, password_hash, phone, date_of_birth, gender, address } = req.body;

    try {
        const [result] = await db.query(`
            INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address]
        );
        res.status(201).json({ message: 'Patient added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update patient details
exports.updatePatient = async (req, res) => {
    const patientId = req.params.id;
    const { first_name, last_name, email, phone, date_of_birth, gender, address } = req.body;

    try {
        const [result] = await db.query(`
            UPDATE patients 
            SET first_name = ?, last_name = ?, email = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? 
            WHERE id = ?`,
            [first_name, last_name, email, phone, date_of_birth, gender, address, patientId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    const patientId = req.params.id;

    try {
        const [result] = await db.query('DELETE FROM patients WHERE id = ?', [patientId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.dashboard = (req, res) => {
    // Render the admin dashboard view
    res.render('admin/dashboard'); // Assuming you have a view template setup
};