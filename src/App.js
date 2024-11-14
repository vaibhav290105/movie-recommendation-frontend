import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';
import Login from './components/Login';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if token exists

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login at the root path */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" replace />} /> {/* Home path */}
        <Route path="/favorites" element={isAuthenticated ? <Favorites /> : <Navigate to="/" replace />} />
        <Route path="/movie/:movieId" element={isAuthenticated ? <MovieDetails /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
