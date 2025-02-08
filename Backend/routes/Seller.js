/// routes/seller.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
const User = require('../Models/user'); // Assuming seller data is stored in the User model

// Get seller profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        // Fetch the seller's profile using the user ID from the token
        const seller = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found.' });
        }
        res.json(seller);
    } catch (error) {
        console.error('Error fetching seller profile:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Get seller notifications
router.get('/notifications', authMiddleware, async (req, res) => {
    try {
        // Fetch notifications for the seller (you can store notifications in a separate collection)
        const notifications = await Notification.find({ sellerId: req.user.id }); // Example schema
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

module.exports = router;