import styles from './AdminOrdersScreen.module.css';
import OrderPreview from '../../components/admin/OrderPreview';
import { useGetAllOrdersAdminQuery } from '../../slices/orderApiSlice';
import PageLoader from '../../components/PageLoader';

export default function AdminOrdersScreen() {
  const { data, isLoading } = useGetAllOrdersAdminQuery();

  let reversedOrders;

  if (data?.data?.data) {
    reversedOrders = data.data.data.slice().reverse();
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Orders</h1>
      {reversedOrders.map((order) => {
        return <OrderPreview key={order._id} order={order} />;
      })}
    </div>
  );
}
