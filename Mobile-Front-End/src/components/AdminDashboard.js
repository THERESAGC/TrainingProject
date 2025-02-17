// import React, { useState } from 'react';
// import { Form, Button, Container } from 'react-bootstrap';
// import axios from 'axios';

// const AddProductForm = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [modelName, setModelName] = useState('');
//   const [image, setImage] = useState(null); // To hold image file
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       setError('Please upload an image.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('price', price);
//     formData.append('quantity', quantity);
//     formData.append('companyName', companyName);
//     formData.append('modelName', modelName);
//     formData.append('image', image); // Append the image to the form data

//     const token = localStorage.getItem('token');

//     try {
//       const response = await axios.post('http://localhost:5000/api/products/add', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert('Product added successfully');
//     } catch (error) {
//       console.error('Error adding product:', error);
//       alert('Error adding product');
//     }
//   };

//   return (
//     <Container>
//       <h2 className="mt-5">Add Product</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formName">
//           <Form.Label>Product Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="formDescription">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="formPrice">
//           <Form.Label>Price</Form.Label>
//           <Form.Control
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="formQuantity">
//           <Form.Label>Quantity</Form.Label>
//           <Form.Control
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="formCompanyName">
//           <Form.Label>Company Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="formModelName">
//           <Form.Label>Model Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={modelName}
//             onChange={(e) => setModelName(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="formImage">
//           <Form.Label>Image</Form.Label>
//           <Form.Control
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </Form.Group>

//         {error && <div className="alert alert-danger mt-2">{error}</div>}

//         <Button variant="primary" type="submit">
//           Add Product
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default AddProductForm;


import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table } from 'react-bootstrap';
import axios from 'axios';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    brand: '',
    specifications: ''
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    companyName: '',
    modelName: '',
    image: null
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch categories and products when the component mounts
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:5000/api/categories');
        setCategories(categoryResponse.data);

        const productResponse = await axios.get('http://localhost:5000/api/products');
        setProducts(productResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCategoriesAndProducts();
  }, []);

  // Handle category form input
  const handleCategoryChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  // Handle product form input
  const handleProductChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Handle adding new category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!newCategory.name || !newCategory.brand || !newCategory.specifications) {
      setError('All fields are required for category');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/categories', newCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories([...categories, response.data]);
      setNewCategory({ name: '', brand: '', specifications: '' });
      setSuccessMessage('Category added successfully');
      setError(null);
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Error adding category');
    }
  };

  // Handle adding new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.image) {
      setError('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('quantity', newProduct.quantity);
    formData.append('companyName', newProduct.companyName);
    formData.append('modelName', newProduct.modelName);
    formData.append('image', newProduct.image);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts([...products, response.data]);
      setSuccessMessage('Product added successfully');
      setNewProduct({
        name: '',
        description: '',
        price: '',
        quantity: '',
        companyName: '',
        modelName: '',
        image: null
      });
      setError(null);
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product');
    }
  };

  // Handle deleting category
  const handleDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((category) => category._id !== id));
      setSuccessMessage('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Error deleting category');
    }
  };

  return (
    <Container>
      <h2 className="mt-5">Admin Dashboard</h2>
      
      {/* Add Product Form */}
      <Form onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <Form.Group controlId="formName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleProductChange}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={newProduct.description}
            onChange={handleProductChange}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleProductChange}
          />
        </Form.Group>

        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleProductChange}
          />
        </Form.Group>

        <Form.Group controlId="formCompanyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            value={newProduct.companyName}
            onChange={handleProductChange}
          />
        </Form.Group>

        <Form.Group controlId="formModelName">
          <Form.Label>Model Name</Form.Label>
          <Form.Control
            type="text"
            name="modelName"
            value={newProduct.modelName}
            onChange={handleProductChange}
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
          />
        </Form.Group>

        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>

      <hr />

      {/* Add Category Form */}
      <Form onSubmit={handleAddCategory}>
        <h3>Add New Category</h3>
        <Form.Group controlId="formCategoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleCategoryChange}
            placeholder="Category Name"
          />
        </Form.Group>

        <Form.Group controlId="formCategoryBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={newCategory.brand}
            onChange={handleCategoryChange}
            placeholder="Brand"
          />
        </Form.Group>

        <Form.Group controlId="formCategorySpecifications">
          <Form.Label>Specifications</Form.Label>
          <Form.Control
            type="text"
            name="specifications"
            value={newCategory.specifications}
            onChange={handleCategoryChange}
            placeholder="Specifications"
          />
        </Form.Group>

        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}

        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>

      {/* Category List */}
      <h3 className="mt-5">Existing Categories</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Specifications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.brand}</td>
                <td>{category.specifications}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No categories available.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Product List */}
      <h3 className="mt-5">Existing Products</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products available.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;

