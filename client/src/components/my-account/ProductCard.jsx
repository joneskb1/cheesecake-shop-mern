import styles from './ProductCard.module.css';

export default function ProductCard({ item }) {
  return (
    <>
      <div className={`${styles.orderContainer}`}>
        <p className={styles.header}>Product:</p>
        <p className={styles.text}>{item.name}</p>

        <p className={styles.header}>Qty:</p>
        <p className={styles.text}>{item.quantity}</p>

        <p className={styles.header}>Size:</p>
        <p className={styles.text}>{item.size}&quot;</p>

        <p className={styles.header}>Price:</p>
        <p className={styles.text}>${item.price}</p>
      </div>
      <hr className={styles.line} />
    </>
  );
}
