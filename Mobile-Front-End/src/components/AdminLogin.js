// components/AdminLogin.js
import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin-dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-5">Admin Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default AdminLogin;
