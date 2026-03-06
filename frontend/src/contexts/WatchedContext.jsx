import { createContext, useState, useContext, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { getMovieDetails } from "../services/api";

const WatchedContext = createContext();

export const useWatchedContext = () => useContext(WatchedContext);

export const WatchedProvider = ({ children }) => {
    const [watchedList, setWatchedList] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        if (user) {
            const storedWatched = localStorage.getItem(`watched_${user.email}`);
            if (storedWatched) {
                setWatchedList(JSON.parse(storedWatched));
            } else {
                setWatchedList([]);
            }
        } else {
            setWatchedList([]);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(`watched_${user.email}`, JSON.stringify(watchedList));
        }
    }, [watchedList, user]);

    const addToWatched = async (movie) => {
        // Only fetch if we don't already have the runtime
        if (movie.runtime === undefined) {
            try {
                const details = await getMovieDetails(movie.id);
                const movieWithRuntime = { ...movie, runtime: details.runtime || 0 };
                setWatchedList((prev) => [...prev, movieWithRuntime]);
            } catch (err) {
                console.error("Failed to fetch movie runtime", err);
                setWatchedList((prev) => [...prev, { ...movie, runtime: 0 }]); // Fallback
            }
        } else {
            setWatchedList((prev) => [...prev, movie]);
        }
    };

    const removeFromWatched = (movieId) => {
        setWatchedList((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    const isWatched = (movieId) => {
        return watchedList.some((movie) => movie.id === movieId);
    };

    // Calculate total runtime in minutes
    const totalWatchTime = watchedList.reduce((acc, curr) => acc + (curr.runtime || 0), 0);

    const formatWatchTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const value = {
        watchedList,
        addToWatched,
        removeFromWatched,
        isWatched,
        totalWatchTime,
        formattedWatchTime: formatWatchTime(totalWatchTime),
    };

    return (
        <WatchedContext.Provider value={value}>{children}</WatchedContext.Provider>
    );
};

export default WatchedProvider;
