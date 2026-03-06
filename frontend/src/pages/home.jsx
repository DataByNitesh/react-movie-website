import MovieCard from "../component/moviecard";
import { useState, useEffect, useRef, useCallback } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Handle immediate search input state
  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  }

  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Debounced search effect
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let newMovies = [];
        if (searchQuery.trim()) {
          newMovies = await searchMovies(searchQuery, page);
        } else {
          newMovies = await getPopularMovies(page);
        }

        if (newMovies.length === 0) {
          setHasMore(false);
        } else {
          setMovies(prevMovies => page === 1 ? newMovies : [...prevMovies, ...newMovies]);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchMovies();
    }, 500); // 500ms delay for debouncing

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, page]);

  // Reset page when search query changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Now handled smoothly by the debounced useEffect, 
    // but we keep the preventDefault for enter key presses.
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={handleInput}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading && page === 1 ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {(movies || []).map((movie, index) => {
            if (movies.length === index + 1) {
              return <div ref={lastMovieElementRef} key={`${movie.id}-${index}`}><MovieCard movie={movie} /></div>
            } else {
              return <MovieCard movie={movie} key={`${movie.id}-${index}`} />
            }
          })}
        </div>
      )}
      {loading && page > 1 && <div className="loading-more">Loading more...</div>}
    </div>
  );
}

export default Home;
