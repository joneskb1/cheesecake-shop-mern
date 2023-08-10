import styles from './AdminProductForm.module.css';

export default function AdminProductForm({ children }) {
  return <form className={styles.adminProductForm}>{children}</form>;
}
