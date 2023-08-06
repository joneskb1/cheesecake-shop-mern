import styles from "./CartHeader.module.css";

export default function CartHeader({ bg = "" }) {
  const headerStyles = {
    noBg: `${styles.bgNone}`,
  };

  return (
    <div className={`${styles.cartHeaderContainer} ${headerStyles[bg]}`}>
      <h3 className={styles.cartHeader}>Product</h3>
      <h3 className={styles.cartHeader}>Qty</h3>
      <h3 className={styles.cartHeader}>Size</h3>
      <h3 className={styles.cartHeader}>Price</h3>
      <h3 className={styles.cartHeader}>Total</h3>
    </div>
  );
}
