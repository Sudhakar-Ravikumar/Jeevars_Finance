import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import specific styles for Login

axios.defaults.baseURL = 'https://localhost:7292'; // Set the backend base URL
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        passwordHash: password,
      });
      navigate('/home', { state: { username: response.data.username } });
    } catch (error) {
      console.error(error.response?.data || 'Login failed.');
      alert(error.response?.data || 'Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account?  <a href="/register">Register</a>
      </p>
     
    </form>
  );
};

export default Login;
