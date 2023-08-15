import styles from './AdminProductsScreen.module.css';
import { Link } from 'react-router-dom';
import AdminProductHeader from '../../components/admin/AdminProductHeader';
import AdminProductPreview from '../../components/admin/AdminProductPreview';

export default function AdminProductsScreen() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headingContainer}>
        <h1 className={styles.header}>Products</h1>
        <Link className={styles.link} to='/admin/products/create'>
          Add Product
        </Link>
      </div>
      <AdminProductHeader />
      {/* map over products */}
      <AdminProductPreview />
      <AdminProductPreview />
    </div>
  );
}
