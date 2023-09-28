import express from 'express';
import {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  isLoggedIn,
  protect,
  updatePassword,
  getUser,
  updateUser,
  deleteUser,
  admin,
  adminGetAllUsers,
  adminGetUser,
  adminUpdateUserPassword,
  adminUpdateUserInfo,
  adminDeleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/create-user', createUser);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.post('/check-login', isLoggedIn);

router.use(protect);

router.route('/update-password').patch(updatePassword);

router.route('/').get(getUser).patch(updateUser).delete(deleteUser);

router.use(admin);

// No UI for admin to perform these
router.route('/admin-all-users').get(adminGetAllUsers);
router.route('/admin-get-user/:id').get(adminGetUser);
router.route('/admin-update-user-pw/:id').patch(adminUpdateUserPassword);
router.route('/admin-update-user-info/:id').patch(adminUpdateUserInfo);
router.route('/admin-delete-user/:id').delete(adminDeleteUser);

export default router;
