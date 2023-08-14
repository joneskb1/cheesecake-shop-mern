import styles from './FooterInfo.module.css';

export default function FooterInfo() {
  return (
    <ul className={styles.footerInfo}>
      <li className={styles.infoItem}>Hours: Mon - Fri 9am - 6pm</li>
      <li className={styles.infoItem}>Phone: 215-453-4583</li>
      <li className={styles.infoItem}>
        Address: 123 Sweet Ln, Sweet, AR 12345
      </li>
      <li className={styles.infoItem}>Email: takethecake@gmail.com</li>
    </ul>
  );
}
