import useCalcCart from '../../custom-hooks/useCalcCart';
import styles from './SummaryPlaceOrder.module.css';

export default function SummaryPlaceOrder() {
  const { subtotal, tax, orderTotal, totalBeforeShipping, shippingCost } =
    useCalcCart();

  return (
    <div className={`${styles.summaryContainer}`}>
      <h2 className={`${styles.summaryHeading}`}>Summary</h2>
      <div className={`${styles.detailsContainer}`}>
        <p className={styles.left}>Items</p>
        <p className={styles.right}>${subtotal}</p>
        <p className={styles.left}>Tax</p>
        <p className={styles.right}>${tax}</p>
        {/* <p className={styles.left}>Shipping</p>
        <p className={styles.right}>${shippingCost}</p> */}
        <p className={`${styles.left} ${styles.gap}`}>
          Total (before shipping)
        </p>
        <p className={`${styles.right} ${styles.gap}`}>
          ${totalBeforeShipping}
        </p>
        <p className={styles.left}>Payment Method</p>
        <p className={styles.right}>Paypal</p>
      </div>
      <button className={`${styles.placeOrderBtn}`}>Place Order</button>
    </div>
  );
}
