import styles from "./MiniCartDetails.module.css";

export default function MiniCartDetails({ color = "white" }) {
  return (
    <div className={styles.detailsContainer} style={{ color: color }}>
      <p className={styles.label}>Items</p>
      <p className={styles.number}>$18.19</p>
      <p className={styles.label}>Tax</p>
      <p className={styles.number}>$3.99</p>
      <p className={styles.label}>Subtotal</p>
      <p className={styles.number}>$22.18</p>
    </div>
  );
}
