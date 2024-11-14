import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecommendations } from '../api';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
      const data = await getRecommendations(movieId, token);
      setRecommendations(data);
    };
    fetchRecommendations();
  }, [movieId]);

  return (
    <div>
      <h2>Recommendations for Movie ID: {movieId}</h2>
      <div>
        {recommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
