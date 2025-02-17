// components/AdminRegistration.js
import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password });
      alert('Admin registered successfully');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-5">Admin Registration</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default AdminRegistration;
