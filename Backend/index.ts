import express, {Application} from 'express';
import dotenv from 'dotenv'
dotenv.config()
const app:Application = express();
import connectDB from './db/dbConnection';
import userRouter from './routes/userRouter';
import cookieParser from 'cookie-parser'
import courseRouter from './routes/courseRouter';
import cors from 'cors'
import cartRouter from './routes/cartRouter'
import enrollRouter from './routes/enrollRouter';


app.use(cors({ origin: ["http://localhost:5173", "https://guided-edu.onrender.com"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/enroll',enrollRouter);
app.use('/api',cartRouter);
app.use('/api',userRouter);
app.use('/api/course',courseRouter);
const port: number = parseInt(process.env.PORT || '3000',10);

app.listen(port, (): void => {
    connectDB();
    console.log(`Listening on port ${port}`);
});

