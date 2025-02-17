import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      const { token } = response.data;

      // Store the token in localStorage or sessionStorage
      localStorage.setItem('authToken', token);

      // Redirect to the user dashboard after successful login
      navigate('/user-dashboard');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg); // Set error message from backend response
      } else {
        setError('An error occurred, please try again');
      }
    }
  };

  return (
    <div className="container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
