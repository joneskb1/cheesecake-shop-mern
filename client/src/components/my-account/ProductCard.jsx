import styles from './ProductCard.module.css';

export default function ProductCard({ item }) {
  const totalPrice =
    Number.parseFloat(item.price, 10) * Number.parseInt(item.quantity, 10);

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
        <p className={styles.text}>${totalPrice.toFixed(2)}</p>
      </div>
      <hr className={styles.line} />
    </>
  );
}
