import styles from './CheckoutSectionHeader.module.css';

export default function CheckoutSectionHeader({ children }) {
  return (
    <div className={styles.formSectionHeaderWrap}>
      <h2 className={styles.formSectionHeader}>{children}</h2>
    </div>
  );
}
