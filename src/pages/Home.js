import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../api';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await searchMovies(query);
      console.log(results); // Log results for debugging
      setMovies(results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      // Optionally, set an error state to display a message to the user
    }
  };

  return (
    <HomeContainer>
      <h2>Search for Movies</h2>
      <form onSubmit={handleSearch}>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title..."
        />
        <button type="submit">Search</button>
      </form>
      <MovieList>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found. Please try a different search.</p>
        )}
      </MovieList>
    </HomeContainer>
  );
};

export default Home;
