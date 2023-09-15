import styles from './MiniCartDetails.module.css';

import useCalcCart from '../../custom-hooks/useCalcCart';

export default function MiniCartDetails({ color = 'white' }) {
  const { subtotal, tax, totalBeforeShipping } = useCalcCart();

  return (
    <div className={styles.detailsContainer} style={{ color: color }}>
      <p className={styles.label}>Subtotal</p>
      <p className={styles.number}>${subtotal}</p>
      <p className={styles.label}>Tax</p>
      <p className={styles.number}>${tax}</p>
      <p className={styles.label}>Total (before shipping)</p>
      <p className={styles.number}>${totalBeforeShipping}</p>
    </div>
  );
}
