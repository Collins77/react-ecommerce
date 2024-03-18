const express = require('express');
require('dotenv').config();
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Configure CORS middleware to allow requests from http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Register routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
