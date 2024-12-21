const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');                        
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate a random token
function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}

// Send password reset email
async function sendResetEmail(email, token) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        to: email,
        from: process.env.EMAIL,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process:\n\n
               http://${process.env.HOST}/reset/${token}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);
}

// Handle password reset request
router.post('/reset_password', async (req, res) => {
    const { email } = req.body;
    const token = generateToken();
    const expiration = Date.now() + 3600000; // 1 hour

    const sql = `UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?`;
    pool.execute(sql, [token, expiration, email], async (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).send('An error occurred during password reset');
        }
        await sendResetEmail(email, token);
        res.status(200).send('Password reset link sent');
    });
});



router.post('/register', async (req, res) => {
    console.log(req.body); // Log the request body for debugging
    try {
        const { first_name, last_name, username, email, password, confirm_password, phone, date_of_birth, gender, address, country, terms } = req.body;

        // Check for undefined values
        if (!first_name || !last_name || !username || !email || !password || !confirm_password || !phone || !date_of_birth || !gender || !address || !country || !terms) {
            return res.status(400).send('All fields are required');
        }

        // Check if passwords match
        if (password !== confirm_password) {
            return res.status(400).send('Passwords do not match');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (first_name, last_name, username, email, password, phone, date_of_birth, gender, address, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        // Execute the SQL query
        pool.execute(sql, [first_name, last_name, username, email, hashedPassword, phone, date_of_birth, gender, address, country], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('An error occurred during registration');
            }
            res.status(200).send('Registration successful');
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send('An internal server error occurred');
    }
});

module.exports = router;

