const express = require('express');
const session = require('express-session');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware to handle sessions
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
}));

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Admin routes
app.use('/admin', adminRoutes);

// Patient routes
app.use('/patients', patientRoutes); // Route for patient-related actions

// Doctor routes
app.use('/doctors', doctorRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});