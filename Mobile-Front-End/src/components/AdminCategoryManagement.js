import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    brand: '',
    specifications: ''
  });

  // Fetch categories on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Handle category form input
  const handleChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value
    });
  };

  // Handle new category submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/categories', newCategory)
      .then(res => {
        setCategories([...categories, res.data]);
        setNewCategory({ name: '', brand: '', specifications: '' });
      })
      .catch(err => console.error('Error adding category:', err));
  };

  return (
    <div>
      <h2>Admin - Manage Categories</h2>

      {/* Category Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newCategory.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
        />
        <input
          type="text"
          name="brand"
          value={newCategory.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />
        <input
          type="text"
          name="specifications"
          value={newCategory.specifications}
          onChange={handleChange}
          placeholder="Specifications"
          required
        />
        <button type="submit">Add Category</button>
      </form>

      {/* List Categories */}
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name} - {category.brand} - {category.specifications}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategoryManagement;
