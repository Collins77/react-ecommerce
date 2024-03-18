const Category = require('../models/category');

const createCategory = async (req, res) => {
    try {
      const { name, fields, subcategories } = req.body;
  
      // Ensure required fields are provided
      if (!name || !fields || !Array.isArray(fields) || fields.length === 0) {
        return res.status(400).json({ message: 'Name and fields are required' });
      }
  
      // Validate field structure
      for (const field of fields) {
        if (!field.name || !field.type) {
          return res.status(400).json({ message: 'Invalid field structure' });
        }
      }
  
      // Validate subcategories structure
      if (subcategories && !Array.isArray(subcategories)) {
        return res.status(400).json({ message: 'Invalid subcategories structure' });
      }
  
      // Create category
      const category = new Category({ name, fields, subcategories });
      await category.save();
  
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, fields, subcategories } = req.body;
    const category = await Category.findByIdAndUpdate(id, { name, fields, subcategories }, { new: true });
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.json({ success: true, category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    // Fetch all categories
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getCategoryFields = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    res.json(category.fields);
  } catch (error) {
    console.error('Error fetching category fields:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error'});
  }
};

module.exports = { createCategory,getCategoryFields, getAllCategories, updateCategory, deleteCategory };