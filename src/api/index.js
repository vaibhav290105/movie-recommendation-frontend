import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to handle API requests with error handling
const handleRequest = async (request) => {
  try {
    const response = await request();
    console.log(response.data)
    return response.data; // Return response data
  } catch (error) {
    if (error.response) {
      // Log the error response data and status
      console.error('API call error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Log if no response was received
      console.error('API call error: No response received:', error.request);
    } else {
      // Log any other errors, such as setup errors
      console.error('API call error:', error.message);
    }
    throw error; // Re-throw the error after logging
  }
};

// Helper function to retrieve token from localStorage with logging
const getToken = () => {
  const token = localStorage.getItem('accessToken');
  console.log("Retrieved token:", token); // Log the token for debugging purposes
  if (!token) {
    console.error("Token is missing! Ensure you are logged in.");
    throw new Error("Token is missing!");
  }
  return token;
};

// Function to add a favorite movie
export const addFavorite = async (movieData) => {
  const token = getToken();
  console.log("Token:", token); // Log token for debugging
  return handleRequest(() =>
    axios.post(`${API_URL}/favorites`, movieData, {
      headers: { Authorization: `Bearer ${token}` }, // Ensure Bearer format
    })
  );
};



// Function to search for movies
export const searchMovies = async (query) => {
  return handleRequest(() =>
    axios.get(`${API_URL}/movies/search`, { params: { query } })
  );
};

// Function to get movie recommendations
export const getRecommendations = async (movieId) => {
  const token = getToken();
  return handleRequest(() =>
    axios.get(`${API_URL}/movies/${movieId}/recommendations`, {
      headers: { 'x-auth-token': token },
    })
  );
};

// Function to remove a favorite movie
export const removeFavorite = async (movieId) => {
  const token = getToken();
  return handleRequest(() =>
    axios.delete(`${API_URL}/favorites/${movieId}`, {
      headers: { 'x-auth-token': token },
    })
  );
};

// Function to get all favorite movies
export const getFavorites = async () => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No token found, please log in.');
  }
  return handleRequest(() =>
    axios.get(`${API_URL}/favorites`, {
      headers: { 'x-auth-token': token },
    })
  );
};
