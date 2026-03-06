const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`);
        if (!response.ok) throw new Error("Failed to fetch movies from TMDB");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMovieDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch movie details from TMDB");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchMovies = async (req, res) => {
    try {
        const { query, page } = req.query;
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page || 1}`
        );
        if (!response.ok) throw new Error("Failed to search movies from TMDB");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
