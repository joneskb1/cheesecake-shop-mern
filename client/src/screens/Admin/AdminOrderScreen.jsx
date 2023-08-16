import styles from './AdminOrderScreen.module.css';
import MyAccountOrders from '../../components/my-account/MyAccountOrders';
import AdminBackLink from '../../components/admin/AdminBackLink';

export default function AdminOrderScreen() {
  return (
    <div className={styles.container}>
      <AdminBackLink to='orders' />
      <h1 className={styles.heading}>Order Details</h1>
      <MyAccountOrders />
    </div>
  );
}
