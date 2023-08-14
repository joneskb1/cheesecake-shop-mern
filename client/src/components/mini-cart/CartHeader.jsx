import styles from './CartHeader.module.css';

export default function CartHeader({ bg = '' }) {
  const headerStyles = {
    noBg: `${styles.bgNone}`,
  };

  return (
    <div className={`${styles.cartHeaderContainer} ${headerStyles[bg]}`}>
      <h3 className={styles.cartHeader}>Items</h3>
    </div>
  );
}
