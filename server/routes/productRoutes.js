import express from 'express';
import {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createVariant,
  editVariant,
  deleteVariant,
} from '../controllers/productController.js';
import { admin, protect } from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/:id').get(getProduct);
router.use(protect, admin);
router.route('/').post(createProduct);
router.route('/:id').patch(updateProduct).delete(deleteProduct);
router.patch('/create-variant/:id', createVariant);
router.patch('/edit-variant/:id', editVariant);
router.delete('/delete-variant/:id', deleteVariant);

export default router;
