import styles from './FooterInfo.module.css';

export default function FooterInfo() {
  return (
    <ul className={styles.footerInfo}>
      <li>Hours: Mon - Fri 9am - 6pm</li>
      <li>Phone: 215-453-4583</li>
      <li>Address: 123 Sweet Ln, Sweet, AR 12345</li>
      <li>Email: takethecake@gmail.com</li>
    </ul>
  );
}
