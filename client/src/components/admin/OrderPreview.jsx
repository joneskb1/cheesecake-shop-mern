import styles from './OrderPreview.module.css';
import { Link } from 'react-router-dom';
import MyAccountOrdersInfo from '../my-account/MyAccountOrdersInfo';
import ProductCard from '../my-account/ProductCard';
import { useSelector } from 'react-redux';

export default function OrderPreview({ order }) {
  const { isAdmin } = useSelector((state) => state.auth);

  const url = isAdmin
    ? `/admin-orders/${order._id}`
    : `/my-account/order/${order._id}`;

  const orderInfo = {
    id: order._id,
    date: order.createdAt,
    total: order.total,
    // tracking missing
  };

  return (
    <div className={styles.container}>
      <MyAccountOrdersInfo orderInfo={orderInfo} />
      <h3 className={styles.itemsHeader}>Items</h3>
      <hr className={styles.line} />
      <div className={styles.productWrap}>
        {order.items.map((item, i) => {
          return <ProductCard key={i} item={item} />;
        })}
      </div>
      <Link className={styles.btn} to={url}>
        Details
      </Link>
    </div>
  );
}
