import express from 'express';
import {
  getAllProducts,
  createProduct,
  getProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../controllers/userController.js';

const router = express.Router();

router.use(protect, admin);
router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProduct);

export default router;
