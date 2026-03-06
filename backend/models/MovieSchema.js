const userMovieSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    status: {
      type: String,
      enum: ["WATCHLIST", "WATCHED"],
      default: "WATCHLIST",
    },
    personalRating: {
      type: String,
      enum: ["BAD", "TIMEPASS", "JUST_OKAY", "BETTER", "MUST_WATCH"],
    },
    review: {
      type: String,
      maxlength: 1000,
    },
    watchedDuration: {
      type: Number, // minutes
      default: 0,
    },
  },
  { timestamps: true },
);

userMovieSchema.index({ user: 1, movie: 1 }, { unique: true });

export default mongoose.model("UserMovie", userMovieSchema);
