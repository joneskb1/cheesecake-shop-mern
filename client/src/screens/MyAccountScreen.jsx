import styles from './MyAccountScreen.module.css';

import MyAccountForm from '../components/my-account/MyAccountForm';
import { useGetUserOrdersQuery } from '../slices/orderApiSlice';
import backgroundCake1 from '../assets/images/mobile/my-account-cheesecake-mobile-199w.png';
import backgroundCakeLarge from '../assets/images/tablet/account-cake-443w.png';

import backgroundCake2 from '../assets/images/mobile/cart-cake.png';
import OrderPreview from '../components/admin/OrderPreview';

export default function MyAccountScreen() {
  const { data: orders, isLoading } = useGetUserOrdersQuery();
  let reversedOrders;

  if (orders?.data?.data) {
    reversedOrders = orders.data.data.slice().reverse();
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
          {reversedOrders &&
            reversedOrders.map((order) => {
              return <OrderPreview order={order} key={order._id} />;
            })}
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
