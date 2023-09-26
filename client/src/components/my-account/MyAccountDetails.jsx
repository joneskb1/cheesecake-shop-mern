import styles from './MyAccountDetails.module.css';

export default function MyAccountDetails({ details }) {
  return (
    <div className={styles.orderDetails}>
      <h3 className={styles.orderDetailsHeader}>Details</h3>
      <div className={styles.infoWrap}>
        <h3 className={styles.infoHeader}>Customer</h3>
        <p className={styles.info}>{details.userDetails.name}</p>
        <p className={styles.info}>{details.userDetails.email}</p>
      </div>
      <div className={styles.infoWrap}>
        <h3 className={styles.infoHeader}>Shipping</h3>
        <p className={styles.info}>{details.shippingOption.option}</p>
      </div>
      <div className={styles.infoWrap}>
        <h3 className={styles.infoHeader}>Shipping Address</h3>
        <p className={styles.info}>{details.shippingAddress.name}</p>
        <p className={styles.info}>{details.shippingAddress.address}</p>
        {details.shippingAddress.addressSecond && (
          <p className={styles.info}>{details.shippingAddress.addressSecond}</p>
        )}
        <p
          className={styles.info}
        >{`${details.shippingAddress.city}, ${details.shippingAddress.state}, ${details.shippingAddress.postalCode}`}</p>
      </div>
    </div>
  );
}
