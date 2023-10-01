import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginGlobalState, logoutGlobalState } from '../slices/authSlice';
import { useVerifyLoggedInMutation } from '../slices/userApiSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import ScrollToTop from '../ScrollToTop';

const protectedPaths = [
  'my-account',
  'admin-products',
  'admin-create-product',
  'admin-orders',
];
const protectedPathsSet = new Set();
protectedPaths.forEach((path) => protectedPathsSet.add(path));

export default function AppLayout() {
  const [verifyLoggedIn] = useVerifyLoggedInMutation();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await verifyLoggedIn().unwrap();
        if (res.status === 'success') {
          dispatch(loginGlobalState(res.currentUser.isAdmin));
        } else {
          dispatch(logoutGlobalState());
        }
      } catch (error) {
        dispatch(logoutGlobalState());
      }
    }

    const path = location.pathname.split('/')[1];

    if (protectedPathsSet.has(path)) {
      checkLogin();
    }
  }, [verifyLoggedIn, dispatch, location]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        theme='light'
      />
      <Outlet />
      <Footer />
    </>
  );
}
