const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000/api";

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movies/popular?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies: " + response.status);
  }
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movies/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movie details: " + response.status);
  }
  return await response.json();
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movies/search?query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to search movies: " + response.status);
  }
  const data = await response.json();
  return data.results;
};
