import express from 'express';
import { protect } from '../controllers/userController.js';
import { createCheckoutSession } from '../controllers/stripeController.js';

const router = express.Router();

router.use(protect);
router.route('/session').post(createCheckoutSession);

export default router;
