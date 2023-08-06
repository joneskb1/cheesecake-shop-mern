import styles from "./AdminProductHeader.module.css";

export default function AdminProductHeader() {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Item</h3>

      <h3 className={`${styles.heading} ${styles.hide}`}>Name</h3>
      <h3 className={`${styles.heading} ${styles.hide}`}>Size</h3>
      <h3 className={`${styles.heading} ${styles.hide}`}>Price</h3>

      <h3 className={styles.heading}>Edit</h3>
      <h3 className={styles.heading}>Delete</h3>
    </div>
  );
}
