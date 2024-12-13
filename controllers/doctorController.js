const db = require('../config/db');

// Register doctor
exports.registerDoctor = async (req, res) => {
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;

    try {
        const [result] = await db.query(`
            INSERT INTO doctors (first_name, last_name, specialization, email, phone, schedule)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, specialization, email, phone, JSON.stringify(schedule)]
        );
        res.status(201).json({ message: 'Doctor registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get doctor profile by ID
exports.getDoctorProfile = async (req, res) => {
    const doctorId = req.params.id;

    try {
        const [doctor] = await db.query('SELECT * FROM doctors WHERE id = ?', [doctorId]);
        if (doctor.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json(doctor[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const [doctors] = await db.query('SELECT * FROM doctors');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};