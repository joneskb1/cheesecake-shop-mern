import styles from './MyAccountDetails.module.css';

export default function MyAccountDetails({ details }) {
  let formattedShippingPhoneNumber;
  let formattedBillingPhoneNumber;

  if (details.shippingAddress.customerPhoneNumber) {
    let num = details.shippingAddress.customerPhoneNumber;
    formattedShippingPhoneNumber = `${num.slice(0, 3)}-${num.slice(
      3,
      6
    )}-${num.slice(6)}`;
  }

  if (details.billingAddress.billingPhoneNumber) {
    let num = details.billingAddress.billingPhoneNumber;
    formattedBillingPhoneNumber = `${num.slice(0, 3)}-${num.slice(
      3,
      6
    )}-${num.slice(6)}`;
  }

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
        {formattedShippingPhoneNumber && (
          <p className={styles.info}>{formattedShippingPhoneNumber}</p>
        )}
        <p className={styles.info}>{details.shippingAddress.address}</p>
        {details.shippingAddress.addressSecond && (
          <p className={styles.info}>{details.shippingAddress.addressSecond}</p>
        )}
        <p
          className={styles.info}
        >{`${details.shippingAddress.city}, ${details.shippingAddress.state}, ${details.shippingAddress.postalCode}`}</p>
      </div>
      <div className={styles.infoWrap}>
        <h3 className={styles.infoHeader}>Billing Address</h3>
        <p className={styles.info}>{details.billingAddress.name}</p>
        {formattedBillingPhoneNumber && (
          <p className={styles.info}>{formattedBillingPhoneNumber}</p>
        )}
        <p className={styles.info}>{details.billingAddress.address} </p>
        {details.billingAddress.addressSecond && (
          <p className={styles.info}>{details.billingAddress.addressSecond}</p>
        )}
        <p className={styles.info}>
          {`${details.billingAddress.city}, ${details.billingAddress.state}, ${details.billingAddress.postalCode}`}
        </p>
      </div>
    </div>
  );
}
