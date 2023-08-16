import styles from './AdminOrdersScreen.module.css';
import AdminOrderPreview from '../../components/admin/AdminOrderPreview';

export default function AdminOrdersScreen() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Orders</h1>
      <AdminOrderPreview />
    </div>
  );
}
