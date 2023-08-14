import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout';
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

import blueberry from './assets/images/mobile/mobile-cakes-265w/blueberry-265w.jpg';
import caramelCookie from './assets/images/mobile/mobile-cakes-265w/caramel-cookie-265w.jpg';
import caramelTurtle from './assets/images/mobile/mobile-cakes-265w/caramel-turtle-265w.jpg';
import cherry from './assets/images/mobile/mobile-cakes-265w/cherry-265w.jpg';
import chocolate from './assets/images/mobile/mobile-cakes-265w/chocolate-265w.jpg';
import lemon from './assets/images/mobile/mobile-cakes-265w/lemon-265w.jpg';
import raspberry from './assets/images/mobile/mobile-cakes-265w/raspberry-265w.jpg';
import redVelvet from './assets/images/mobile/mobile-cakes-265w/red-velvet-265w.jpg';
import strawberry from './assets/images/mobile/mobile-cakes-265w/strawberry-265w.jpg';

import blueberryTablet from './assets/images/tablet/cakes-354w/blueberry-354w.jpg';
import caramelCookieTablet from './assets/images/tablet/cakes-354w/caramel-cookie-354w.jpg';
import caramelTurtleTablet from './assets/images/tablet/cakes-354w/caramel-turtle-354w.jpg';
import cherryTablet from './assets/images/tablet/cakes-354w/cherry-354w.jpg';
import chocolateTablet from './assets/images/tablet/cakes-354w/chocolate-354w.jpg';
import lemonTablet from './assets/images/tablet/cakes-354w/lemon-354w.jpg';
import raspberryTablet from './assets/images/tablet/cakes-354w/raspberry-354w.jpg';
import redVelvetTablet from './assets/images/tablet/cakes-354w/red-velvet-354w.jpg';
import strawberryTablet from './assets/images/tablet/cakes-354w/strawberry-354w.jpg';

import blueberryTabletLarge from './assets/images/tablet/cakes-436w/blueberry-436w.jpg';
import caramelCookieTabletLarge from './assets/images/tablet/cakes-436w/caramel-cookie-436w.jpg';
import caramelTurtleTabletLarge from './assets/images/tablet/cakes-436w/caramel-turtle-436w.jpg';
import cherryTabletLarge from './assets/images/tablet/cakes-436w/cherry-436w.jpg';
import chocolateTabletLarge from './assets/images/tablet/cakes-436w/chocolate-436w.jpg';
import lemonTabletLarge from './assets/images/tablet/cakes-436w/lemon-436w.jpg';
import raspberryTabletLarge from './assets/images/tablet/cakes-436w/raspberry-436w.jpg';
import redVelvetTabletLarge from './assets/images/tablet/cakes-436w/red-velvet-436w.jpg';
import strawberryTabletLarge from './assets/images/tablet/cakes-436w/strawberry-436w.jpg';

import blueberryDesktop from './assets/images/desktop/cakes-732w/blueberry-732w.jpg';
import caramelCookieDesktop from './assets/images/desktop/cakes-732w/caramel-cookie-732w.jpg';
import caramelTurtleDesktop from './assets/images/desktop/cakes-732w/caramel-turtle-732w.jpg';
import cherryDesktop from './assets/images/desktop/cakes-732w/cherry-732w.jpg';
import chocolateDesktop from './assets/images/desktop/cakes-732w/chocolate-732w.jpg';
import lemonDesktop from './assets/images/desktop/cakes-732w/lemon-732w.jpg';
import raspberryDesktop from './assets/images/desktop/cakes-732w/raspberry-732w.jpg';
import redVelvetDesktop from './assets/images/desktop/cakes-732w/red-velvet-732w.jpg';
import strawberryDesktop from './assets/images/desktop/cakes-732w/strawberry-732w.jpg';

const cakeCards = [
  {
    img: blueberry,
    imgTablet: blueberryTablet,
    imgTabletLarge: blueberryTabletLarge,
    imgDesktop: blueberryDesktop,
    name: 'Blueberry',
    description:
      'A delectable combination of smooth, creamy cheesecake complemented by the burst of juicy, ripe blueberries for a perfect balance of sweet and tangy flavors.',
    prices: {
      small: 12.99,
      large: 16.99,
    },
  },
  {
    img: caramelTurtle,
    imgTablet: caramelTurtleTablet,
    imgTabletLarge: caramelTurtleTabletLarge,
    imgDesktop: caramelTurtleDesktop,

    name: 'Caramel Turtle',
    description:
      'Dive into layers of rich caramel, toasted pecans, and velvety chocolate ganache atop a velvety cheesecake, creating a heavenly turtle-inspired treat.',
    prices: {
      small: 13.99,
      large: 18.19,
    },
  },
  {
    img: caramelCookie,
    imgTablet: caramelCookieTablet,
    imgTabletLarge: caramelCookieTabletLarge,
    imgDesktop: caramelCookieDesktop,

    name: 'Caramel Cookie',
    description:
      'Immerse yourself in velvety cheesecake infused with rich caramel swirls and crushed cookie pieces that add a delightful crunch to every heavenly bite.',
    prices: {
      small: 14.99,
      large: 19.49,
    },
  },
  {
    img: cherry,
    imgTablet: cherryTablet,
    imgTabletLarge: cherryTabletLarge,
    imgDesktop: cherryDesktop,

    name: 'Cherry',
    description:
      'Indulge in a luscious cheesecake crowned with a layer of sweet, succulent cherries, providing a delightful contrast of creamy and fruity goodness.',
    prices: {
      small: 12.99,
      large: 16.99,
    },
  },
  {
    img: chocolate,
    imgTablet: chocolateTablet,
    imgTabletLarge: chocolateTabletLarge,
    imgDesktop: chocolateDesktop,

    name: 'Chocolate',
    description:
      "Embark on a chocolate lover's dream with a velvety, chocolaty oreo cheesecake that will satisfy even the most intense cocoa cravings.",
    prices: {
      small: 14.99,
      large: 19.49,
    },
  },
  {
    img: lemon,
    imgTablet: lemonTablet,
    imgTabletLarge: lemonTabletLarge,
    imgDesktop: lemonDesktop,

    name: 'Lemon',
    prices: {
      small: 12.99,
      large: 16.99,
    },
    description:
      'Delight your taste buds with a zesty lemon-infused cheesecake, a refreshing twist on the classic dessert, delivering a burst of citrusy brightness.',
  },
  {
    img: raspberry,
    imgTablet: raspberryTablet,
    imgTabletLarge: raspberryTabletLarge,
    imgDesktop: raspberryDesktop,

    name: 'Raspberry',
    description:
      'Revel in the sweet and tart allure of ripe raspberries topping a velvety cheesecake, offering a delightful symphony of fruity and creamy flavors.',
    prices: {
      small: 13.99,
      large: 18.19,
    },
  },

  {
    img: redVelvet,
    imgTablet: redVelvetTablet,
    imgTabletLarge: redVelvetTabletLarge,
    imgDesktop: redVelvetDesktop,

    name: 'Red Velvet',
    description:
      'Experience the ultimate indulgence with a sumptuous, red velvet-inspired cheesecake, boasting a velvety texture and a hint of cocoa richness.',
    prices: {
      small: 14.99,
      large: 19.49,
    },
  },
  {
    img: strawberry,
    imgTablet: strawberryTablet,
    imgTabletLarge: strawberryTabletLarge,
    imgDesktop: strawberryDesktop,

    name: 'Strawberry',
    description:
      'Savor the taste of summer with a creamy cheesecake adorned with plump, juicy strawberries, the sweetest match made in dessert heaven.',
    prices: {
      small: 13.99,
      large: 18.19,
    },
  },
];

const searchMap = new Map();
const allHitTerms = [];

cakeCards.forEach((cake) => {
  const terms = cake.name.split(' ');
  terms.forEach((term) => {
    allHitTerms.push(term.toLowerCase());
  });
});

allHitTerms.forEach((term) => {
  const hits = [];
  cakeCards.forEach((cake) => {
    if (cake.name.toLowerCase().includes(term)) {
      hits.push(cake);
    }
  });
  searchMap.set(term, hits);
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <HomeScreen /> },

      {
        path: 'cheesecakes',
        element: (
          <ShopCheesecakesScreen cakeCards={cakeCards} searchMap={searchMap} />
        ),
      },
      {
        path: 'cheesecake/:id',
        element: <CheesecakeScreen cakeCards={cakeCards} />,
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
        path: 'admin-products',
        element: <AdminProductsScreen />,
      },
      {
        path: 'admin-products/:id',
        element: <AdminProductScreen />,
      },
      {
        path: 'admin-create-product',
        element: <AdminCreateProductScreen />,
      },
      {
        path: 'admin-orders',
        element: <AdminOrdersScreen />,
      },
      {
        path: 'admin-orders/:id',
        element: <AdminOrderScreen />,
      },
      {
        path: 'auth',
        element: <AuthScreen />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
          { path: 'create-account', element: <CreateAccount /> },
          { path: 'reset-password', element: <ResetPassword /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
