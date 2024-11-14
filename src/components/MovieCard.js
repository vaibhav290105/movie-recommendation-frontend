
/*
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  margin: 10px;
  overflow: hidden;
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
`;

const MovieCard = ({ movie, isMovieFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(isMovieFavorite || false); 
  const [token, setToken] = useState(localStorage.getItem('accessToken')); // Initialize token state
  const [message, setMessage] = useState(''); // For feedback messages

  useEffect(() => {
    // Log token on component mount
    console.log("Token on component mount:", token);
  }, [token]);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Set API_URL

  const handleAddFavorite = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');
      
      if (!authToken) {
        console.error("Token is missing. User may not be logged in.");
        setMessage("You need to log in to add favorites.");
        return;
      }
      
      const response = await axios.post(
        `${API_URL}/favorites`, 
        { 
          movieId: movie.id, 
          movieTitle: movie.title, 
          movieImageUrl: movie.imageUrl  // Add movieImageUrl here
        }, 
        { 
          headers: { Authorization: `Bearer ${authToken}` } 
        }
      );
      console.log("Response from server:", response.data);
      setIsFavorite(true);
      setMessage("Movie added to favorites!");
    } catch (error) {
      if (error.response) {
        console.error('Failed to add favorite:', error.response.data);
        setMessage(error.response.data.msg || "Failed to add favorite.");
      } else {
        console.error('Network error:', error);
        setMessage("Network error. Please try again.");
      }
    }
  };
  
  const handleRemoveFavorite = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');
      if (!authToken) {
        console.error("Token is missing. User may not be logged in.");
        setMessage("You need to log in to remove favorites.");
        return;
      }
  
      await axios.delete(
        `${API_URL}/favorites/${movie.id}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setIsFavorite(false);
      setMessage("Movie removed from favorites.");
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      setMessage("Failed to remove favorite.");
    }
  };

  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/200';

  return (
    <CardContainer>
      <MovieImage src={imageUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      {isFavorite ? (
        <button onClick={handleRemoveFavorite}>Remove from Favorites</button>
      ) : (
        <button onClick={handleAddFavorite}>Add to Favorites</button>
      )}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </CardContainer>
  );
};

export default MovieCard;*/














import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  margin: 10px;
  overflow: hidden;
  text-align: center;
`;

const MovieImage = styled.img`
  width: 100%;
  height: auto;
`;

const Message = styled.p`
  color: ${props => (props.error ? 'red' : 'green')};
`;

const MovieCard = ({ movie, isMovieFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(isMovieFavorite || false); 
  const [message, setMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    setIsFavorite(isMovieFavorite);  // Sync isFavorite state with prop
  }, [isMovieFavorite]);

  const handleAddFavorite = async () => {
    const authToken = localStorage.getItem('accessToken');
    if (!authToken) {
      setMessage("You need to log in to add favorites.");
      return;
    }
    
    try {
      const response = await axios.post(
        `${API_URL}/favorites`, 
        { 
          movieId: movie.id, 
          movieTitle: movie.title, 
          movieImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path || ''}`  // Ensure image URL
        }, 
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      console.log("Response from server:", response.data);
      setIsFavorite(true);
      setMessage("Movie added to favorites!");
    } catch (error) {
      console.error('Failed to add favorite:', error);
      setMessage("Failed to add favorite. Please try again.");
    }
  };

  const handleRemoveFavorite = async () => {
    const authToken = localStorage.getItem('accessToken');
    if (!authToken) {
      setMessage("You need to log in to remove favorites.");
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/favorites/${movie.id}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setIsFavorite(false);
      setMessage("Movie removed from favorites.");
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      setMessage("Failed to remove favorite.");
    }
  };

  // Use movie image from TMDb or a placeholder
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/200';

  return (
    <CardContainer>
      <MovieImage src={imageUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      {isFavorite ? (
        <button onClick={handleRemoveFavorite}>Remove from Favorites</button>
      ) : (
        <button onClick={handleAddFavorite}>Add to Favorites</button>
      )}
      {message && <Message error={!isFavorite && !message.includes("added")}>{message}</Message>}
    </CardContainer>
  );
};

export default MovieCard;



