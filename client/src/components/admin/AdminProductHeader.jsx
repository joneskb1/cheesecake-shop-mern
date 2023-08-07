import styles from './AdminProductHeader.module.css';

export default function AdminProductHeader() {
  return (
    <div className={styles.container}>
      <h3 className={`${styles.heading} ${styles.item}`}>Item</h3>

      <h3 className={`${styles.heading} ${styles.hide}`}>Name</h3>
      <h3 className={`${styles.heading} ${styles.hide}`}>Size</h3>
      <h3 className={`${styles.heading} ${styles.hide}`}>Price</h3>
      <h3 className={`${styles.heading} ${styles.hide}`}>Stock</h3>
      <h3 className={`${styles.heading} ${styles.edit}`}>Edit</h3>
      <h3 className={`${styles.heading} ${styles.delete}`}>Delete</h3>
    </div>
  );
}
