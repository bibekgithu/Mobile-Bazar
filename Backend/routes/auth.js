// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');


// routes/auth.js
router.post('/register', async (req, res) => {
    const { username, email, password, phoneNumber } = req.body; // Include phoneNumber

    try {
        console.log("Registration request received:", username, email, password, phoneNumber); // Debugging

        // Validate required fields
        if (!username || !email || !password || !phoneNumber) { // Add phoneNumber validation
            return res.status(400).json({ message: 'All fields, including phone number, are required.' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        // Validate phone number (must be exactly 10 digits)
        if (!/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({ message: 'Please enter a valid 10-digit phone number.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Create a new user
        const user = new User({ username, email, password, phoneNumber }); // Include phoneNumber

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();
        console.log("User saved successfully:", user); // Debugging

        // Respond with success message
        res.status(201).json({ message: 'Registration successful. Please log in.' });
    } catch (error) {
        console.error('Error during registration:', error); // Log the full error
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});


// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login request received:", email, password); // Debugging

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        console.log("User found:", user); // Debugging

        // Compare passwords
        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        console.log("Password matched, generating JWT...");

        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined!");
            throw new Error('JWT_SECRET is not defined.');
        }

        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Login successful, token generated.");

        // Respond with success message and token
        res.json({ message: 'Login successful.', token });
    } catch (error) {
        console.error('Error during login:', error); // Log the full error
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

module.exports = router;