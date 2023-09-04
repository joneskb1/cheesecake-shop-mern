import express from 'express';
import {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../controllers/userController.js';

const router = express.Router();

router.use(protect, admin);
router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProduct).patch(updateProduct);

export default router;
