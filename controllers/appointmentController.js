const db = require('../config/db');

// Book appointment
exports.bookAppointment = async (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

    try {
        const [result] = await db.query(`
            INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time)
            VALUES (?, ?, ?, ?)`, 
            [patient_id, doctor_id, appointment_date, appointment_time]
        );
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get appointments for a specific doctor
exports.getAppointmentsForDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;

    try {
        const [appointments] = await db.query('SELECT * FROM appointments WHERE doctor_id = ?', [doctorId]);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get appointments for a specific patient
exports.getAppointmentsForPatient = async (req, res) => {
    const patientId = req.params.patientId;

    try {
        const [appointments] = await db.query('SELECT * FROM appointments WHERE patient_id = ?', [patientId]);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;

    try {
        const [result] = await db.query('DELETE FROM appointments WHERE id = ?', [appointmentId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};