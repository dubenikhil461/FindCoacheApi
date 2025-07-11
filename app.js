import express from "express";
import user from './src/routes/user.js'
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import connectDB from './src/config/db.js'
connectDB();
const corsOptions = {
    origin: "http://localhost:2611", //  frontend's origin
    credentials: true, // allow credentials (cookies, etc.)
  };
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',user)

export default app;
