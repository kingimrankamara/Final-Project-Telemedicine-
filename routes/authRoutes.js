const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const router = express.Router();

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'telemedicine'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Registration route
router.post('/register', (req, res) => {
    const {
        first_name,
        last_name,
        username,
        email,
        password,
        date_of_birth,
        gender,
        address,
        country
    } = req.body;

    if (!first_name || !last_name || !username || !email || !password || !date_of_birth || !gender || !address || !country) {
        return res.status(400).send({ error: "All fields are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (first_name, last_name, username, email, password, date_of_birth, gender, address, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, username, email, hashedPassword, date_of_birth, gender, address, country], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ error: "Failed to register user" });
        }
        res.status(200).send({ message: "User registered successfully" });
    });
});

module.exports = router;
