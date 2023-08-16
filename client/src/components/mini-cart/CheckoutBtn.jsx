import styles from './CheckoutBtn.module.css';
import { Link, useLocation } from 'react-router-dom';
export default function CheckoutBtn({ children }) {
  // if children are place order nagivate to order page
  const location = useLocation();
  const onCheckout = location.pathname === '/checkout';

  return (
    <Link
      to='/checkout'
      className={`${styles.checkoutLink}  ${onCheckout ? styles.largeBtn : ''}`}
    >
      {children}
    </Link>
  );
}
