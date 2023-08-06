import styles from "./CheckoutBtn.module.css";
import { Link } from "react-router-dom";
export default function CheckoutBtn({ children }) {
  // if children are place order nagivate to order page

  return (
    <Link to="/checkout" className={styles.checkoutLink}>
      {children}
    </Link>
  );
}
