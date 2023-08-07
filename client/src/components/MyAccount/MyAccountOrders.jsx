import styles from "./MyAccountOrders.module.css";

import MyAccountOrdersInfo from "./MyAccountOrdersInfo";
import MyAccountDetails from "./MyAccountDetails";
import SummaryPlaceOrder from "../SummaryPlaceOrder";
import ProductCard from "./ProductCard";

export default function MyAccountOrders() {
  return (
    <section className={styles.section}>
      <MyAccountOrdersInfo />
      <div className={styles.orderSummaryContainer}>
        <h2 className={styles.header}>Items</h2>
        <hr></hr>
        <ProductCard />
        <SummaryPlaceOrder placeOrderBtn={false} />
      </div>
      <MyAccountDetails />
    </section>
  );
}

// Order number: 12346872
// Date: 7-9-23
// Tracking: 98746512356456
// Total: 59.22
