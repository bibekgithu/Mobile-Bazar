// routes/buyer.js
const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');

// Fetch all products (for buyers)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'username');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;