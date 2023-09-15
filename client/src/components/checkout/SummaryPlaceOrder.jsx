import useCalcCart from '../../custom-hooks/useCalcCart';
import styles from './SummaryPlaceOrder.module.css';

export default function SummaryPlaceOrder({ placeOrderBtn = true, smallText }) {
  const { subtotal, tax, orderTotal, shippingCost } = useCalcCart();

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
        <p className={styles.right}>${subtotal}</p>
        <p className={styles.left}>Tax</p>
        <p className={styles.right}>${tax}</p>
        <p className={styles.left}>Shipping</p>
        <p className={styles.right}>${shippingCost}</p>
        <p className={`${styles.left} ${styles.gap}`}>Order Total</p>
        <p className={`${styles.right} ${styles.gap}`}>${orderTotal}</p>
        <p className={styles.left}>Payment Method</p>
        <p className={styles.right}>Paypal</p>
      </div>
      {placeOrderBtn && (
        <button className={`${styles.placeOrderBtn}`}>Place Order</button>
      )}
    </div>
  );
}
