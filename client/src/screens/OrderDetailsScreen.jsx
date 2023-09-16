import MyAccountOrders from '../components/my-account/MyAccountOrders';
import { useGetUserOrderQuery } from '../slices/orderApiSlice';
import PageLoader from '../components/PageLoader';
import { useParams } from 'react-router-dom';
import styles from './OrderDetailsScreen.module.css';
import PreviousPageArrowLink from '../components/single-cake/PreviousPageArrowLink';
export default function OrderDetailsScreen() {
  const { id } = useParams();
  const { data: order, isLoading } = useGetUserOrderQuery({ id });

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className={styles.container}>
      <PreviousPageArrowLink link={'/my-account'}>
        Back to My Account
      </PreviousPageArrowLink>
      <h1 className={styles.heading}>Order Details</h1>
      <MyAccountOrders user={order.data.user} order={order.data.data} />;
    </div>
  );
}
