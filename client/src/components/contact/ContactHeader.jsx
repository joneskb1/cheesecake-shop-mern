import styles from "./ContactHeader.module.css";

export default function ContactHeader() {
  return (
    <div className={styles.contactTextContainer}>
      <h1 className={styles.contactHeader}>Get in Touch</h1>
      <p className={styles.contactText}>Phone: 123-456-7891</p>
      <p className={styles.contactText}>Email: cheesecake@gmail.com</p>
      <p className={styles.contactText}>
        Address: 125 Bakery Ln, Cakey, AR 69157
      </p>
    </div>
  );
}
