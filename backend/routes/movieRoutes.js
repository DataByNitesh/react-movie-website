import express from "express";
import { getPopularMovies, getMovieDetails, searchMovies } from "../controllers/movieController.js";

const router = express.Router();

router.get("/popular", getPopularMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieDetails);

export default router;
