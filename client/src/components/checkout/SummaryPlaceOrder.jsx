import styles from './SummaryPlaceOrder.module.css';
// import CheckoutBtn from '../mini-cart/CheckoutBtn';
import { Link } from 'react-router-dom';

export default function SummaryPlaceOrder({ placeOrderBtn = true, smallText }) {
  return (
    <div className={`${styles.summaryContainer}`}>
      <h2
        className={`${styles.summaryHeading} ${
          smallText ? styles.smallHeadingText : ''
        }`}
      >
        Summary
      </h2>
      <div
        className={`${styles.detailsContainer} ${
          smallText ? styles.smallDetailsText : ''
        }`}
      >
        <p className={styles.left}>Items</p>
        <p className={styles.right}>$18.19</p>
        <p className={styles.left}>Tax</p>
        <p className={styles.right}>$3.99</p>
        <p className={styles.left}>Shipping</p>
        <p className={styles.right}>$10.00</p>
        <p className={`${styles.left} ${styles.gap}`}>Order Total</p>
        <p className={`${styles.right} ${styles.gap}`}>$50.00</p>
        <p className={styles.left}>Payment Method</p>
        <p className={styles.right}>Paypal</p>
      </div>
      {/* {placeOrderBtn && <CheckoutBtn>Place Order</CheckoutBtn>} */}
      {placeOrderBtn && (
        <Link to='/my-account' className={`${styles.placeOrderLink}`}>
          Place Order
        </Link>
      )}
    </div>
  );
}
