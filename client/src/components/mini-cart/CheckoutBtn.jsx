import styles from './CheckoutBtn.module.css';
import { Link } from 'react-router-dom';
export default function CheckoutBtn({ children }) {
  // add redirect to login if not logged in?
  return (
    <Link to='/checkout' className={`${styles.checkoutLink}`}>
      {children}
    </Link>
  );
}
