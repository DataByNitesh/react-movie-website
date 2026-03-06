import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useWatchedContext } from "../contexts/WatchedContext";
import { getMovieDetails } from "../services/api";
import { useState, useEffect, useRef } from "react";
import toast from 'react-hot-toast';

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites, favorites } = useMovieContext();
  const { isWatched, addToWatched, removeFromWatched } = useWatchedContext();
  const { user } = useAuthContext();
  const favorite = isFavorite(movie.id);
  const watched = isWatched(movie.id);

  // Lazy-load extended details
  const [details, setDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" } // trigger slightly before it enters screen
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !details) {
      getMovieDetails(movie.id)
        .then(data => setDetails(data))
        .catch(err => console.error("Error fetching movie details:", err));
    }
  }, [isVisible, movie.id, details]);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      if (favorites.length >= 4) {
        toast.error("You can only have up to 4 favorites. Please remove one first.");
        return;
      }
      addToFavorites(movie);
    }
  }

  function onWatchedClick(e) {
    e.preventDefault();
    if (watched) removeFromWatched(movie.id);
    else addToWatched(movie);
  }

  return (
    <div className="movie-card" ref={cardRef}>
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          {user && (
            <>
              <button
                className={`watched-btn ${watched ? "active" : ""}`}
                onClick={onWatchedClick}
                title={watched ? "Mark as unwatched" : "Mark as watched"}
              >
                {watched ? "👁️" : "✓"}
              </button>
              <button
                className={`favorite-btn ${favorite ? "active" : ""}`}
                onClick={onFavoriteClick}
              >
                ♥
              </button>
            </>
          )}
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <p className="movie-year">{movie.release_date?.split("-")[0]}</p>
          {details && (
            <>
              {details.runtime > 0 && (
                <p className="movie-duration">
                  • {details.runtime}m
                </p>
              )}
              <div className="movie-rating">
                <span className="rating-star">⭐</span>
                <span>{details.vote_average?.toFixed(1)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
