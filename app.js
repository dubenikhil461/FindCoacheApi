import express from "express";
import cors from "cors";
import user from './src/routes/user.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api',user)

export default app;
