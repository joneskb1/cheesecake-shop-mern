import styles from './AdminOrderScreen.module.css';
import MyAccountOrders from '../../components/my-account/MyAccountOrders';
import AdminBackLink from '../../components/admin/AdminBackLink';
import { useParams } from 'react-router-dom';
import { useGetOrderAdminQuery } from '../../slices/orderApiSlice';
import PageLoader from '../../components/PageLoader';

export default function AdminOrderScreen() {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderAdminQuery({ id });

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.linkWrap}>
        <AdminBackLink to='orders' />
      </div>
      <h1 className={styles.heading}>Order Details</h1>
      <MyAccountOrders user={data.data.data.user} order={data.data.data} />
    </div>
  );
}
