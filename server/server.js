import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cloneRouter from './routes/cloneRoutes.js';
import errorController from './controllers/errorController.js';
import cors from 'cors';

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;
connectDB();

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/clone', cloneRouter);
app.use('/api/v1/order', orderRouter);

// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(errorController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
