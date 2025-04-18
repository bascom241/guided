import express, { Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app: Application = express();

import cors from 'cors'; 
app.use(cors({
  origin: "https://guided-edu.onrender.com",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

import connectDB from './db/dbConnection';
import userRouter from './routes/userRouter';
import courseRouter from './routes/courseRouter';
import cartRouter from './routes/cartRouter';
import enrollRouter from './routes/enrollRouter';

// All routes AFTER middleware
app.use('/api/enroll', enrollRouter);
app.use('/api', cartRouter);
app.use('/api', userRouter);
app.use('/api/course', courseRouter);

const port: number = parseInt(process.env.PORT || '3000', 10);

app.listen(port, (): void => {
  connectDB();
  console.log(`Listening on port ${port}`);
});
