import 'dotenv/config';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import cors from 'cors';
import errorController from './controllers/errorController.js';
import stripeRoute from './routes/stripeRoutes.js';
import { handleOrder } from './controllers/stripeController.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cloneRouter from './routes/cloneRoutes.js';
import emailRoute from './routes/emailRoutes.js';

const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOptions));

app.post(
  '/api/v1/webhook',
  express.raw({ type: 'application/json' }),
  handleOrder
);

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/clone', cloneRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/email', emailRoute);
app.use('/api/v1/checkout', stripeRoute);

app.use(errorController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
