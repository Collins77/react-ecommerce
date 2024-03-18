const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

// Create a new product
router.post('/create-product', productController.createProduct);

// Get all products
router.get('/get-products', productController.getAllProducts);

// Get category by ID
// router.get('/get-category/:id', categoryController.getCategoryById);

// Update category
// router.put('/update-category/:id', categoryController.updateCategory);

// Delete category
// router.delete('/delete-category/:id', categoryController.deleteCategory);

module.exports = router;

