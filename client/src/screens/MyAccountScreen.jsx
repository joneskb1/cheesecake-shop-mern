import styles from './MyAccountScreen.module.css';

import MyAccountForm from '../components/my-account/MyAccountForm';
import MyAccountOrders from '../components/my-account/MyAccountOrders';

import backgroundCake1 from '../assets/images/mobile/my-account-cheesecake-mobile-199w.png';
import backgroundCakeLarge from '../assets/images/tablet/account-cake-443w.png';

import backgroundCake2 from '../assets/images/mobile/cart-cake.png';

export default function MyAccountScreen() {
  return (
    <div className={styles.accountScreen}>
      <picture>
        <source media='(min-width: 744px)' srcSet={backgroundCakeLarge} />

        <img
          src={backgroundCake1}
          alt='cheesecake'
          className={styles.backgroundCake1}
        />
      </picture>

      <h1 className={styles.accountHeader}>My Account</h1>

      <div className={styles.flexWrap}>
        <MyAccountForm />
        <div>
          <h2 className={styles.orderHeader}>My Orders</h2>
          <MyAccountOrders />
        </div>
      </div>

      <img
        src={backgroundCake2}
        alt='cheesecake'
        className={styles.backgroundCake2}
      />
    </div>
  );
}
