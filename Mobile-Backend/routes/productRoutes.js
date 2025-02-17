const express = require('express');
const multer = require('multer');
const Product = require('../models/product'); // Assuming Product model is in models/Product.js
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/'; // Folder where images will be saved
    // Check if the uploads folder exists, create it if not
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Ensure the filename is unique
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to add product with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  const { name, description, price, quantity, companyName, modelName } = req.body;
  const image = req.file ? req.file.path : null;

  if (!name || !description || !price || !quantity || !companyName || !modelName || !image) {
    return res.status(400).json({ message: 'All fields are required, including the image' });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      companyName,
      modelName,
      image,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Route to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;
