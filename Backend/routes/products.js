// routes/product.js
const express = require('express');
const router = express.Router();
const Product = require('./Models/product'); // Import the Product model

// Add a new product
router.post('/add', async (req, res) => {
    const { name, price, description, category } = req.body;

    try {
        // Validate required fields
        if (!name || !price || !description || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new product
        const product = new Product({
            name,
            price,
            description,
            category,
        });

        // Save the product to the database
        await product.save();

        // Respond with success message
        res.status(201).json({ message: 'Product added successfully.', product });
    } catch (error) {
        console.error('Error adding product:', error); // Log the full error
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;