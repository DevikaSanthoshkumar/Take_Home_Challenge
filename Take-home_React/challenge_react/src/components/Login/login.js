// Login.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      navigate('/list'); // Redirect to the authenticated page
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/login', { username, password })
      .then((response) => {
        const token = response.data.token;
        const userId = response.data.id;
        login(token, userId);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        navigate('/list');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setError('Invalid username or password.');
        setPassword('');
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='login-btn' type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
