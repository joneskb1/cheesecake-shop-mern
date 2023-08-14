import styles from "./ProductCard.module.css";

export default function ProductCard() {
  return (
    <>
      <div className={`${styles.orderContainer}`}>
        <p className={styles.header}>Product:</p>
        <p className={styles.text}>Chocolate Marshmallow</p>

        <p className={styles.header}>Qty:</p>
        <p className={styles.text}>10</p>

        <p className={styles.header}>Size:</p>
        <p className={styles.text}>6&quot;</p>

        <p className={styles.header}>Price:</p>
        <p className={styles.text}>$14.99</p>

        <p className={styles.header}>Total:</p>
        <p className={styles.text}>$145.99</p>
      </div>
      <hr className={styles.line} />
    </>
  );
}
