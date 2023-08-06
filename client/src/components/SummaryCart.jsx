import styles from "./SummaryCart.module.css";
import CheckoutBtn from "./mini-cart/CheckoutBtn";
import MiniCartDetails from "./mini-cart/MiniCartDetails";

export default function SummaryCart() {
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.summaryHeading}>Summary</h2>
      <MiniCartDetails color={"black"} />
      <CheckoutBtn> Checkout </CheckoutBtn>
      <p className={styles.shipping}>Shipping calculated at checkout.</p>
    </div>
  );
}
