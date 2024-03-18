const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true},
    description: { type: String, required: true},
    images: {
        type: [String],
        required: true, 
    },
    // image: { type: String },
    category: { type: String, required: true },
    isFeatured: { type: Boolean, default: true }, 
});


function generateProductSchema(fields) {
    const dynamicFields = {};
    fields.forEach(field => {
        dynamicFields[field.name] = {
            type: field.type,
            required: field.required || false, // Optional: Set field as required if specified in category
        };
    });

    return new mongoose.Schema(dynamicFields); // Fixed mongooseSchema to mongoose.Schema
}

const Product = mongoose.model('Product', productSchema);
module.exports = {
    Product,
    generateProductSchema
};