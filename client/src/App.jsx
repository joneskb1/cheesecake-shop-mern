import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppLayout from './components/AppLayout';
import TestScreen from './screens/TestScreen';
import './App.css';

import ShopCheesecakesScreen from './screens/ShopCheesecakesScreen';
import CheesecakeScreen from './screens/CheesecakeScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ContactScreen from './screens/ContactScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import CreateAccount from './components/auth/CreateAccount';
import ResetPassword from './components/auth/ResetPassword';
import AdminProductsScreen from './screens/Admin/AdminProductsScreen';
import AdminProductScreen from './screens/Admin/AdminProductScreen';
import AdminOrderScreen from './screens/Admin/AdminOrderScreen';
import AdminCreateProductScreen from './screens/Admin/AdminCreateProductScreen';
import AdminOrdersScreen from './screens/Admin/AdminOrdersScreen';

import { useState } from 'react';
import OrderDetailsScreen from './screens/OrderDetailsScreen';

function App() {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userChangedImageFile, setUserChangedImageFile] = useState(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { path: 'testy', element: <TestScreen /> },
        {
          path: 'cheesecakes',
          element: <ShopCheesecakesScreen />,
        },
        { path: '', element: <HomeScreen /> },
        {
          path: 'cheesecakes',
          element: <ShopCheesecakesScreen />,
        },
        {
          path: 'cheesecake/:id',
          element: (
            <CheesecakeScreen
              isLoginModalOpen={isLoginModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          ),
        },
        {
          path: 'cart',
          element: (
            <CartScreen
              isLoginModalOpen={isLoginModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          ),
        },
        {
          path: 'checkout',
          element: <CheckoutScreen />,
        },
        {
          path: 'contact',
          element: <ContactScreen />,
        },
        {
          path: 'my-account',
          element: isLoggedIn ? (
            <MyAccountScreen />
          ) : (
            <Navigate to={'/auth/login'} replace />
          ),
        },
        {
          path: 'my-account/order/:id',
          element: isLoggedIn ? (
            <OrderDetailsScreen />
          ) : (
            <Navigate to={'/auth/login'} replace />
          ),
        },
        {
          path: 'admin-products',
          element:
            isLoggedIn && isAdmin ? (
              <AdminProductsScreen />
            ) : (
              <Navigate to={'/auth/login'} replace />
            ),
        },
        {
          path: 'admin-products/:id',
          element:
            isLoggedIn && isAdmin ? (
              <AdminProductScreen
                userChangedImageFile={userChangedImageFile}
                setUserChangedImageFile={setUserChangedImageFile}
              />
            ) : (
              <Navigate to={'/auth/login'} replace />
            ),
        },
        {
          path: 'admin-create-product',
          element:
            isLoggedIn && isAdmin ? (
              <AdminCreateProductScreen
                userChangedImageFile={userChangedImageFile}
                setUserChangedImageFile={setUserChangedImageFile}
              />
            ) : (
              <Navigate to={'/auth/login'} replace />
            ),
        },
        {
          path: 'admin-orders',
          element:
            isLoggedIn && isAdmin ? (
              <AdminOrdersScreen />
            ) : (
              <Navigate to={'/auth/login'} replace />
            ),
        },
        {
          path: 'admin-orders/:id',
          element:
            isLoggedIn && isAdmin ? (
              <AdminOrderScreen />
            ) : (
              <Navigate to={'/auth/login'} replace />
            ),
        },
        {
          path: 'auth',
          element: <AuthScreen />,
          children: [
            { path: 'login', element: <Login /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: 'create-account', element: <CreateAccount /> },
            { path: 'reset-password/:token', element: <ResetPassword /> },
          ],
        },
        { path: '*', element: <Navigate to='/' replace /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
