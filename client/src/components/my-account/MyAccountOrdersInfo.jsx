import styles from './MyAccountOrdersInfo.module.css';

export default function MyAccountOrdersInfo({ orderInfo }) {
  const dateObj = new Date(orderInfo.date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  return (
    <>
      <div className={styles.orderInfoWrap}>
        <div className={styles.orderInfo}>
          <p className={styles.orderInfoP}>Order number: {orderInfo.id}</p>
          <p className={styles.orderInfoP}>Date: {formattedDate}</p>
          <p className={styles.orderInfoP}>
            Total: ${orderInfo.total.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
}
