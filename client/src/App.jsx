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
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import CreateAccount from './components/CreateAccount';
import ResetPassword from './components/ResetPassword';

import blueberry from './assets/images/mobile-cakes-265w/blueberry-265w.jpg';
import caramelCookie from './assets/images/mobile-cakes-265w/caramel-cookie-265w.jpg';
import caramelTurtle from './assets/images/mobile-cakes-265w/caramel-turtle-265w.jpg';
import cherry from './assets/images/mobile-cakes-265w/cherry-265w.jpg';
import chocolate from './assets/images/mobile-cakes-265w/chocolate-265w.jpg';
import lemon from './assets/images/mobile-cakes-265w/lemon-265w.jpg';
import raspberry from './assets/images/mobile-cakes-265w/raspberry-265w.jpg';
import redVelvet from './assets/images/mobile-cakes-265w/red-velvet-265w.jpg';
import strawberry from './assets/images/mobile-cakes-265w/strawberry-265w.jpg';

const cakeCards = [
  {
    img: blueberry,
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

console.log(searchMap);

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
