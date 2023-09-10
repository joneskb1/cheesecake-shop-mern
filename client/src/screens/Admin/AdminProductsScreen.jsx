import { Link } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../slices/productsSlice';
import styles from './AdminProductsScreen.module.css';

import AdminProductHeader from '../../components/admin/AdminProductHeader';
import AdminProductPreview from '../../components/admin/AdminProductPreview';
import PageLoader from '../../components/PageLoader';

export default function AdminProductsScreen() {
  const { data, isLoading } = useGetAllProductsQuery();

  if (isLoading) return <PageLoader />;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headingContainer}>
        <h1 className={styles.header}>Products</h1>
        <Link className={styles.link} to='/admin-create-product'>
          Add Product
        </Link>
      </div>
      <AdminProductHeader />
      {data &&
        data?.data?.products?.map((product) => {
          return <AdminProductPreview key={product._id} product={product} />;
        })}
    </div>
  );
}
