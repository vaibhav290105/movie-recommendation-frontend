/*import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginUser = async (credentials) => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:5000/api/auth/login', credentials, {
        withCredentials: true,
      });
      const { token } = response.data;
      if (token){
        localStorage.setItem('accessToken', token);
        Navigate('/home');
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser({ email, password });
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginUser = async (credentials) => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.post('https://movie-recommendation-system-1-rer9.onrender.com/api/auth/login', credentials, {
        withCredentials: true,
      });

      // Ensure the token is available before setting it in localStorage
      const { token } = response.data;
      if (token) {
        localStorage.setItem('accessToken', token);
        // Use navigate instead of Navigate component for redirection
        navigate('/home');  // Redirect to the home page after login
      } else {
        setError('Token is missing in the response.');
      }
    } catch (error) {
      // Check for specific error message from the server response
      if (error.response) {
        setError(error.response?.data?.msg || "Login failed. Please try again.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser({ email, password });
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
