import styles from './AdminProductForm.module.css';

export default function AdminProductForm({ children, formHandler }) {
  return (
    <form className={styles.adminProductForm} onSubmit={formHandler}>
      {children}
    </form>
  );
}
