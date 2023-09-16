import styles from './MyAccountOrders.module.css';

import MyAccountOrdersInfo from './MyAccountOrdersInfo';
import MyAccountDetails from './MyAccountDetails';
import SummaryPlaceOrder from '../checkout/SummaryPlaceOrder';
import ProductCard from './ProductCard';

export default function MyAccountOrders({ order, user }) {
  const orderInfo = {
    id: order._id,
    date: order.createdAt,
    total: order.total,
    // tracking missing
  };

  const details = {
    shippingAddress: order.shippingAddress,
    billingAddress: order.billingAddress,
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
        <SummaryPlaceOrder placeOrderBtn={false} smallText={true} />
      </div>
      <MyAccountDetails details={details} />
    </section>
  );
}
