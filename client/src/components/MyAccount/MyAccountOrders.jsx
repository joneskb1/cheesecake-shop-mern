import styles from './MyAccountOrders.module.css';

import MyAccountOrdersInfo from './MyAccountOrdersInfo';
import MyAccountDetails from './MyAccountDetails';

export default function MyAccountOrders() {
  return (
    <section className={styles.section}>
      <MyAccountOrdersInfo />
      <MyAccountDetails />
    </section>
  );
}

// Order number: 12346872
// Date: 7-9-23
// Tracking: 98746512356456
// Total: 59.22
