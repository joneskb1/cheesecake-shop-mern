import styles from './MyAccountOrders.module.css';
import MyAccountOrdersInfo from './MyAccountOrdersInfo';
import MyAccountDetails from './MyAccountDetails';
import ProductCard from './ProductCard';

export default function MyAccountOrders({ order, user }) {
  const orderInfo = {
    id: order._id,
    date: order.createdAt,
    total: order.total,
  };

  const details = {
    shippingAddress: order.shippingAddress,
    shippingOption: order.shippingOption,
    userDetails: {
      name: user.name,
      email: user.email,
    },
  };

  return (
    <section className={styles.section}>
      <MyAccountOrdersInfo orderInfo={orderInfo} />
      <div className={styles.orderSummaryContainer}>
        <h3 className={styles.header}>Items</h3>
        <hr></hr>
        {order.items.map((item, i) => {
          return <ProductCard key={i} item={item} />;
        })}{' '}
        <div className={`${styles.summaryContainer}`}>
          <h2 className={`${styles.summaryHeading} ${styles.smallHeadingText}`}>
            Summary
          </h2>
          <div
            className={`${styles.detailsContainer} ${styles.smallDetailsText}`}
          >
            <p className={styles.left}>Items</p>
            <p className={styles.right}>${order.itemsPrice.toFixed(2)}</p>
            <p className={styles.left}>Tax</p>
            <p className={styles.right}>${order.taxPrice.toFixed(2)}</p>
            <p className={styles.left}>Shipping</p>
            <p className={styles.right}>
              ${order.shippingOption.cost.toFixed(2)}
            </p>
            <p className={`${styles.left} ${styles.gap}`}>Total</p>
            <p className={`${styles.right} ${styles.gap}`}>
              ${order.total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <MyAccountDetails details={details} />
    </section>
  );
}
