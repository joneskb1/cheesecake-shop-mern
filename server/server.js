import 'dotenv/config';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import AppError from './utils/appError.js';
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

// handle sync errors
// process.on('uncaughtException', (err) => {
//   console.log('uncaught exception, shutting down!');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

connectDB();

const app = express();

const corsOptions = {
  origin: ['https://take-the-cake.onrender.com', 'http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(hpp());
app.use(mongoSanitize());
app.use(cookieParser());

app.post(
  '/api/v1/webhook',
  express.raw({ type: 'application/json' }),
  handleOrder
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/clone', cloneRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/email', emailRoute);
app.use('/api/v1/checkout', stripeRoute);

// serve static files
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );
}

app.use(errorController);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection, shutting down!');
  // handle req then shut down
  server.close(() => {
    // 0 = success 1 = uncaught excpetion
    process.exit(1);
  });
});

// allows pending req to finish before shutting down
process.on('SIGTERM', () => {
  console.log('Gracefully shutting down');
  server.close(() => {
    console.log('process terminated');
  });
});
