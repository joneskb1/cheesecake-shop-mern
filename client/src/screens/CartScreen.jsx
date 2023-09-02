import styles from './CartScreen.module.css';
import { NavLink } from 'react-router-dom';
import cake1 from '../assets/images/mobile/cart-cake.png';
import cake2 from '../assets/images/mobile/cart-cake-2.png';
import SummaryCart from '../components/cart/SummaryCart';
import CartHeader from '../components/mini-cart/CartHeader';
import OrderCard from '../components/mini-cart/OrderCard';
import cakeLarge from '../assets/images/desktop/cart-cake-802w.png';

import LoginSignUpModal from '../components/checkout/LoginSignUpModal';

export default function CartScreen({ isLoginModalOpen, setIsLoginModalOpen }) {
  const items = true;

  return (
    <div className={styles.cartScreen}>
      <picture>
        <source media='(min-width: 1440px)' srcSet={cakeLarge} />
        <img className={styles.topCake} src={cake1} alt='berry cheesecake' />
      </picture>
      <h1 className={styles.cartHeader}>Cart</h1>
      {!items && (
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
      {items && (
        <div className={styles.summaryOrderContainer}>
          <SummaryCart
            isLoginModalOpen={isLoginModalOpen}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
          <div className={styles.OrdersContainer}>
            <CartHeader />
            <OrderCard />
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
