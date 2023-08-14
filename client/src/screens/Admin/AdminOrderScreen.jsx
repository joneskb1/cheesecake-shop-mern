import styles from './AdminOrderScreen.module.css';
import MyAccountOrders from '../../components/my-account/MyAccountOrders';
export default function AdminOrderScreen() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Order Details</h1>
      <MyAccountOrders />
    </div>
  );
}
