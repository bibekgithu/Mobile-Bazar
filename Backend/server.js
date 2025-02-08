// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const sellerRoutes = require('./routes/Seller');
const buyerRoutes = require('./routes/Buyer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/Seller', sellerRoutes); // Seller-related routes
app.use('/api/Buyer', buyerRoutes);  // Buyer-related routes


// Start Server
const PORT = process.env.PORT ||8000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));