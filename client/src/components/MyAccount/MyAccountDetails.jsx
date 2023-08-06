import styles from './MyAccountDetails.module.css';

export default function MyAccountDetails() {
  return (
    <div className={styles.orderDetails}>
      <h3 className={styles.orderDetailsHeader}>Details</h3>
      <div className={styles.infoWrap}>
        <h3 className={styles.infoHeader}>Customer</h3>
        <p className={styles.info}>Tiny Stir</p>
        <p className={styles.info}>stirItUp@stir.com</p>
        <p className={styles.info}>555-555-5555</p>
      </div>
      <div className={styles.infoWrap}>
        <h3 className={styles.infoHeader}>Shipping</h3>
        <p className={styles.info}>USPS Priority</p>
      </div>
      <div className={styles.infoWrap}>
        <h3 className={styles.infoHeader}>Shipping Address</h3>
        <p className={styles.info}>Stirley Whirley</p>
        <p className={styles.info}>123 Stir Ln, </p>
        <p className={styles.info}>Deep Saw, AR 72757</p>
      </div>
      <div className={styles.infoWrap}>
        <h3 className={styles.infoHeader}>Billing Address</h3>
        <p className={styles.info}>Stirley Whirley</p>
        <p className={styles.info}>123 Stir Ln, </p>
        <p className={styles.info}>Deep Saw, AR 72757</p>
      </div>
    </div>
  );
}
