
const mongoose = require('mongoose');

// Define the schema for mobile categories
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  specifications: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
