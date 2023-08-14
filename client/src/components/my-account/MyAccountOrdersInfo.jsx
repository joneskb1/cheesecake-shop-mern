import styles from "./MyAccountOrdersInfo.module.css";

export default function MyAccountOrdersInfo() {
  return (
    <>
      <div className={styles.orderInfoWrap}>
        <div className={styles.orderInfo}>
          <p className={styles.orderInfoP}>Order number: 12346872</p>
          <p className={styles.orderInfoP}>Date: 7-9-23</p>
          <p className={styles.orderInfoP}>Tracking: 98746512356456</p>
          <p className={styles.orderInfoP}>Total: 59.22</p>
        </div>
      </div>
    </>
  );
}
