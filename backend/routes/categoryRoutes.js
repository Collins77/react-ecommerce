const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

// Create a new category
router.post('/create-category', categoryController.createCategory);

// Get all categories
router.get('/get-categories', categoryController.getAllCategories);

// Get category by ID
// router.get('/get-category/:id', categoryController.getCategoryById);

// get category fields
router.get('/:id/fields', categoryController.getCategoryFields);

// Update category
router.put('/update-category/:id', categoryController.updateCategory);

// Delete category
router.delete('/delete-category/:id', categoryController.deleteCategory);

module.exports = router;