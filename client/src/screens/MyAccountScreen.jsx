import styles from './MyAccountScreen.module.css';
import MyAccountForm from '../components/my-account/MyAccountForm';
import { useGetUserOrdersQuery } from '../slices/orderApiSlice';
import backgroundCake1 from '../assets/images/mobile/my-account-cheesecake-mobile-199w.png';
import backgroundCakeLarge from '../assets/images/tablet/account-cake-443w.png';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { clearCart } from '../slices/cartSlice';
import backgroundCake2 from '../assets/images/mobile/cart-cake.png';
import OrderPreview from '../components/admin/OrderPreview';
import { useLocation } from 'react-router-dom';
import PageLoader from '../components/PageLoader.jsx';
export default function MyAccountScreen() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const orderComplete = search.split('=')[1];

  const { data: orders, isLoading } = useGetUserOrdersQuery();
  let reversedOrders;

  if (orders?.data?.data) {
    reversedOrders = orders.data.data.slice().reverse();
  }
  if (orders && orderComplete) {
    toast.success(`Order Complete!`);
    dispatch(clearCart());
  }

  if (isLoading) {
    return <PageLoader />;
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
