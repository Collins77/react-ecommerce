const mongoose = require('mongoose');
const Category = require('../models/category');
const { Product } = require('../models/product');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: 'dwuhl0u0b',
    api_key: '444721293814759',
    api_secret: 'YeWYjTxTs1SAllRxmx2GrF4dsQs'
});

const typeMap = {
    'text': String,
    'number': Number,
    // Add more mappings as needed for other types
};

const createProduct = async (req, res) => {
    try {
        const { name, category, description, price, isFeatured, ...productData } = req.body;

        // Retrieve uploaded images
        const images = req.files;

        // Upload images to Cloudinary
        const imageUrls = await Promise.all(images.map(async (image) => {
            const result = await cloudinary.uploader.upload(image.path, { folder: 'product_images' });
            return result.secure_url;
        }));

        // Fetch fields for the selected category
        const categoryFields = await Category.findOne({ name: category }).select('fields');
        if (!categoryFields || !categoryFields.fields || !Array.isArray(categoryFields.fields)) {
            return res.status(404).json({ message: 'Category fields not found or invalid format' });
        }

        // Map field types to Mongoose schema types
        const fieldsSchema = categoryFields.fields.reduce((acc, field) => {
            acc[field.name] = { type: typeMap[field.type] || String };
            return acc;
        }, {});

        // Include fixed fields
        fieldsSchema.name = { type: String, required: true };
        fieldsSchema.price = { type: Number, required: true };
        fieldsSchema.description = { type: String, required: true };
        fieldsSchema.isFeatured = { type: Boolean, default: false };

        // Include additional fields from productData
        Object.keys(productData).forEach(key => {
            fieldsSchema[key] = { type: String }; // Default type if not specified in category fields
        });

        // Add images field to schema as an array
        fieldsSchema.images = [{ type: String }];

        // Generate product schema based on category fields
        const productSchema = new mongoose.Schema(fieldsSchema);

        // Check if the discriminator already exists
        let ProductModel;
        if (mongoose.modelNames().includes('NewProduct')) {
            ProductModel = mongoose.model('NewProduct');
        } else {
            ProductModel = Product.discriminator('NewProduct', productSchema);
        }

        // Create a new product object
        const product = new ProductModel({
            name,
            category,
            description,
            price,
            isFeatured,
            images: imageUrls,
            ...productData,
        });  

        // Save the product to the database
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Return the products as JSON response
        res.status(200).json(products);
    } catch (error) {
        // Handle errors
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createProduct, getAllProducts };
