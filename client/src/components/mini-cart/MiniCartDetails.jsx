import styles from './MiniCartDetails.module.css';

import useCalcCart from '../../custom-hooks/useCalcCart';

export default function MiniCartDetails({ color = 'white', shipRate }) {
  const { subtotal } = useCalcCart();
  let total;
  if (shipRate) {
    total = Number.parseFloat(shipRate, 10) + Number.parseFloat(subtotal, 10);
  }
  return (
    <div className={styles.detailsContainer} style={{ color: color }}>
      <p className={styles.label}>Subtotal</p>
      <p className={styles.number}>${subtotal}</p>{' '}
      {shipRate && (
        <>
          <p className={styles.label}>Shipping</p>
          <p className={styles.number}>${shipRate}</p>
          <p className={styles.label}>Total</p>
          <p className={styles.number}>${total.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}
