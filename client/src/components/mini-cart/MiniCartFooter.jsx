import styles from "./MiniCartFooter.module.css";
import MiniCartDetails from "./MiniCartDetails";
import CheckoutBtn from "./CheckoutBtn";

export default function MiniCartFooter() {
  return (
    <div className={styles.footerContainer}>
      <MiniCartDetails />
      <CheckoutBtn />
      <p className={styles.shipping}>Shipping calculated at checkout.</p>
    </div>
  );
}
