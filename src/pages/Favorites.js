/*import React, { useEffect, useState } from 'react';
import { getFavorites } from '../api';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      // Check if user is logged in by verifying token
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('You need to log in to view favorites.');
        setLoading(false);
        return;
      }

      try {
        const favoritesData = await getFavorites(); // Assuming this returns an array of favorite movies
        console.log("Favorites Data:", favoritesData);
        if (Array.isArray(favoritesData.favorites)) {
          setFavorites(favoritesData.favorites);
        } else {
          setError('Favorites data is not in the expected format.');
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('You need to log in to view favorites.');
          localStorage.removeItem('accessToken'); // Clear token if needed
        } else {
          setError('Failed to fetch favorites. Please try again later.');
        }
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  return (
    <div>
      <h2>Your Favorites</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.movieId}>
              <h3>{fav.movieTitle}</h3>
             
              {fav.posterPath && <img src={fav.posterPath} alt={fav.movieTitle} width="100" />}
             
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage; */








import React, { useEffect, useState } from 'react';
import { getFavorites } from '../api';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null); 

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('You need to log in to view favorites.');
        setLoading(false);
        return;
      }

      try {
        const favoritesData = await getFavorites();
        console.log("Favorites Data:", favoritesData);
        
        if (Array.isArray(favoritesData.favorites)) {
          setFavorites(favoritesData.favorites);
        } else {
          setError('Favorites data is not in the expected format.');
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('You need to log in to view favorites.');
          localStorage.removeItem('accessToken');
        } else {
          setError('Failed to fetch favorites. Please try again later.');
        }
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Favorites</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.movieId}>
              <h3>{fav.movieTitle}</h3>
              {fav.movieImageUrl ? (
                <img src={fav.movieImageUrl} alt={fav.movieTitle} width="100" />
              ) : (
                <img src="https://via.placeholder.com/100" alt="No Image Available" width="100" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;

