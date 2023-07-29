import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import './App.css';

import CheesecakesScreen from './screens/CheesecakesScreen';
import CheesecakeScreen from './screens/CheesecakeScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ContactScreen from './screens/ContactScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/HomeScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <HomeScreen /> },

      { path: 'cheesecakes', element: <CheesecakesScreen /> },
      {
        path: 'cheesecake/:id',
        element: <CheesecakeScreen />,
      },
      {
        path: 'cart',
        element: <CartScreen />,
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
        element: <MyAccountScreen />,
      },
      {
        path: 'login',
        element: <LoginScreen />,
      },
      {
        path: 'sign-up',
        element: <SignUpScreen />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordScreen />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordScreen />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
