import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"

dotenv.config();
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

connectDB();

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)

app.get('/', (req, res) => {
  res.send('Backend is running successfully!');
});


//.server
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
