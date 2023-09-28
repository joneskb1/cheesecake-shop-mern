import styles from './CartScreen.module.css';
import { NavLink } from 'react-router-dom';
import cake1 from '../assets/images/mobile/cart-cake.png';
import cake2 from '../assets/images/mobile/cart-cake-2.png';
import SummaryCart from '../components/cart/SummaryCart';
import CartHeader from '../components/mini-cart/CartHeader';
import OrderCard from '../components/mini-cart/OrderCard';
import cakeLarge from '../assets/images/desktop/cart-cake-802w.png';
import { useEffect, useState } from 'react';
import LoginSignUpModal from '../components/checkout/LoginSignUpModal';
import { selectCartState } from '../slices/cartSlice';
import { useSelector } from 'react-redux';
import { useCreateSessionMutation } from '../slices/stripeSlice';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUB_KEY } from '../utils/constants';
import { useGetUserQuery } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import useCalcCart from '../custom-hooks/useCalcCart.js';
import { useGetShippingRateMutation } from '../slices/orderApiSlice';

export default function CartScreen({ isLoginModalOpen, setIsLoginModalOpen }) {
  const [createSession] = useCreateSessionMutation();
  const [zipCode, setZipCode] = useState('');
  const [shipRate, setShipRate] = useState('');

  const { data } = useGetUserQuery();
  const cartItems = useSelector(selectCartState);
  const { weightLb, weightOz } = useCalcCart();

  const [getShippingRate] = useGetShippingRateMutation();

  async function handleShippingCal(e) {
    e.preventDefault();

    try {
      const res = await getShippingRate({
        zipDest: zipCode,
        weightLb,
        weightOz,
      });

      if (res.data?.status === 'success') {
        setShipRate(res.data.data.rate);
        toast.success('Shipping calculated!');
      } else {
        toast.error('Invalid Zip');
      }
    } catch (err) {
      toast.error(err.data.message);
    }
  }

  //reset shippping if they edit cart
  useEffect(() => {
    setZipCode('');
    setShipRate('');
  }, [cartItems]);

  async function handlePlaceOrder(e) {
    e.preventDefault();

    if (!shipRate) return toast.error('Please enter zipcode');

    try {
      const orderDetails = {
        cartItems: JSON.stringify(cartItems),
        user: data.data.user._id,
        shipRate,
      };

      const session = await createSession({
        cart: cartItems,
        metadata: orderDetails,
      }).unwrap();

      const stripe = await loadStripe(STRIPE_PUB_KEY);

      await stripe.redirectToCheckout({
        sessionId: session.session.id,
      });
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <div className={styles.cartScreen}>
      <picture>
        <source media='(min-width: 1440px)' srcSet={cakeLarge} />
        <img className={styles.topCake} src={cake1} alt='berry cheesecake' />
      </picture>
      <h1 className={styles.cartHeader}>Cart</h1>
      {cartItems.length < 1 && (
        <div className={styles.noItemsContainer}>
          {' '}
          <p className={styles.noItemsText}>
            You do not have any items in your cart 😢
          </p>
          <NavLink className={`${styles.shopLink}`} to='/cheesecakes'>
            Shop
          </NavLink>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className={styles.summaryOrderContainer}>
          <div className={styles.summaryContainer}>
            <SummaryCart
              shipRate={shipRate}
              onClick={handlePlaceOrder}
              isLoginModalOpen={isLoginModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
            <form className={styles.zipWrap} onSubmit={handleShippingCal}>
              <label htmlFor='zip-code' className={styles.checkoutTextLabel}>
                Enter zip code for shipping rate
              </label>
              <input
                required
                type='text'
                id='zip-code'
                value={zipCode}
                className={styles.checkoutTextInput}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <button className={styles.zipBtn}>Submit</button>
            </form>
          </div>
          <div className={styles.ordersContainer}>
            <CartHeader />
            {cartItems.map((item, index) => {
              return <OrderCard key={index} cake={item} />;
            })}
          </div>
        </div>
      )}
      <img className={styles.bottomCake} src={cake2} alt='berry cheesecake' />
      {isLoginModalOpen && (
        <LoginSignUpModal
          setIsLoginModalOpen={setIsLoginModalOpen}
        ></LoginSignUpModal>
      )}
    </div>
  );
}
