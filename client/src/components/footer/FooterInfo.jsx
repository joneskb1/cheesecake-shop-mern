import styles from './FooterInfo.module.css';

export default function FooterInfo() {
  return (
    <ul className={styles.footerInfo}>
      <li className={styles.infoItem}>Hours: Mon - Fri 9am - 6pm</li>
      <li className={styles.infoItem}>Phone: 123-456-7891</li>
      <li className={styles.infoItem}>
        Address: 125 Bakery Ln, Sugar, AR 12345
      </li>
      <li className={styles.infoItem}>Email: cheesecake@cake.com</li>
    </ul>
  );
}
