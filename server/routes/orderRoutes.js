import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
import { protect } from '../controllers/userController.js';

const router = express.Router();

router.use(protect);

router.route('/').post(placeOrder);

export default router;
