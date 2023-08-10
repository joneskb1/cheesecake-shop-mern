import styles from './AdminFormBtn.module.css';

export default function AdminFormBtn({ propStyles = {}, onClick, children }) {
  return (
    <button
      className={styles.adminFormBtn}
      style={propStyles}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
