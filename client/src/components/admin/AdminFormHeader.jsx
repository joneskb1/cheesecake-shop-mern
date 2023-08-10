import styles from './AdminFormHeader.module.css';

export default function AdminFormHeader({ children }) {
  return <h1 className={styles.adminFormHeader}>{children}</h1>;
}
