import "../css/Favorites.css"; // Reuse similar grid layout
import { useWatchedContext } from "../contexts/WatchedContext";
import MovieCard from "../component/moviecard";

function Watched() {
    const { watchedList, formattedWatchTime } = useWatchedContext();

    if (watchedList && watchedList.length > 0) {
        return (
            <div className="favorites">
                <div className="stats-table">
                    <h2>Your Watch Stats</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>Movies Watched</h3>
                            <p>{watchedList.length}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Time</h3>
                            <p>{formattedWatchTime}</p>
                        </div>
                    </div>
                </div>

                <h2>Watched History</h2>
                <div className="movies-grid">
                    {watchedList.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-empty">
            <h2>No Watched Movies Yet</h2>
            <p>Log movies you've seen and track your watch time here!</p>
        </div>
    );
}

export default Watched;
