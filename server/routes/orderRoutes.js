import express from 'express';
import {
  getUserOrders,
  getOneOrder,
  getUserOrder,
  getAllOrders,
  createShippingRate,
} from '../controllers/orderController.js';
import { protect, admin } from '../controllers/userController.js';

const router = express.Router();

router.route('/shipping-rate').post(createShippingRate);

router.use(protect);
router.route('/').get(getUserOrders);
router.route('/:id').get(getUserOrder);

router.use(admin);
router.route('/admin/all').get(getAllOrders);
router.route('/admin/:id').get(getOneOrder);

export default router;
