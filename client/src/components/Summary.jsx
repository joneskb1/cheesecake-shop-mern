import styles from "./Summary.module.css";
import CheckoutBtn from "../components/mini-cart/CheckoutBtn";
import MiniCartDetails from "../components/mini-cart/MiniCartDetails";

export default function Summary() {
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.summaryHeading}>Summary</h2>
      <MiniCartDetails color={"black"} />
      <CheckoutBtn />
      <p className={styles.shipping}>Shipping calculated at checkout.</p>
    </div>
  );
}
