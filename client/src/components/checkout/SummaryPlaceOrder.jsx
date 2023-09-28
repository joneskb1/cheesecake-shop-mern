import useCalcCart from '../../custom-hooks/useCalcCart';
import styles from './SummaryPlaceOrder.module.css';

export default function SummaryPlaceOrder() {
  const { subtotal } = useCalcCart();

  return (
    <div className={`${styles.summaryContainer}`}>
      <h2 className={`${styles.summaryHeading}`}>Summary</h2>
      <div className={`${styles.detailsContainer}`}>
        <p className={styles.left}>Subtotal</p>
        <p className={styles.right}>${subtotal}</p>
      </div>
      <button className={`${styles.placeOrderBtn}`}>Place Order</button>
    </div>
  );
}
