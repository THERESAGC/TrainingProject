import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import ImageUploading from 'react-images-uploading';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [modelName, setModelName] = useState('');
  const [images, setImages] = useState([]); // Handle image upload state
  const [error, setError] = useState(null);

  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (images.length === 0) {
      setError('Please upload at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('companyName', companyName);
    formData.append('modelName', modelName);
    
    // Append images to formData
    images.forEach(image => {
      formData.append('images', image.file);  // Assumes each image object has a 'file' property
    });

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  return (
    <Container>
      <h2 className="mt-5">Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formCompanyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formModelName">
          <Form.Label>Model Name</Form.Label>
          <Form.Control type="text" value={modelName} onChange={(e) => setModelName(e.target.value)} />
        </Form.Group>

        {/* Image Upload Section */}
        <Form.Group controlId="formImage">
          <Form.Label>Images</Form.Label>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className="upload__image-wrapper">
                <button
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here to upload
                </button>
                <button onClick={onImageRemoveAll}>Remove all images</button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image['data_url']} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>Update</button>
                      <button onClick={() => onImageRemove(index)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Form.Group>

        {error && <div className="alert alert-danger mt-2">{error}</div>}

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProductForm;