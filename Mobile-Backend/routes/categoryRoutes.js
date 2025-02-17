const express = require('express');
const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// 1. GET /categories - Retrieve all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// 2. POST /categories - Add a new category
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Category name is required'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('specifications').notEmpty().withMessage('Specifications are required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, brand, specifications } = req.body;

    try {
      // Create a new category
      const newCategory = new Category({
        name,
        brand,
        specifications,
      });

      // Save the category to the database
      await newCategory.save();

      res.json(newCategory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// 3. PUT /categories/:id - Update category
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Category name is required'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('specifications').notEmpty().withMessage('Specifications are required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, brand, specifications } = req.body;

    try {
      let category = await Category.findById(req.params.id);

      if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
      }

      // Update category fields
      category.name = name || category.name;
      category.brand = brand || category.brand;
      category.specifications = specifications || category.specifications;

      // Save the updated category
      await category.save();

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// 4. DELETE /categories/:id - Remove category
router.delete('/:id', async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    // Remove category from DB
    await category.remove();

    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
