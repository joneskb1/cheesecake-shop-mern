import styles from "./CheckoutBtn.module.css";
import { Link } from "react-router-dom";
export default function CheckoutBtn() {
  return (
    <Link to="/checkout" className={styles.checkoutLink}>
      Checkout
    </Link>
  );
}
