import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getOneOrder,
  getUserOrder,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../controllers/userController.js';

const router = express.Router();

router.use(protect);
router.route('/').post(placeOrder).get(getUserOrders);
router.route('/:id').get(getUserOrder);

router.use(admin);
router.route('/admin/all').get(getAllOrders);
router.route('/admin/:id').get(getOneOrder);

export default router;
