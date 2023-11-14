import { useSelector } from 'react-redux';
import styles from './CheckoutBtn.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function CheckoutBtn({
  children,
  setIsLoginModalOpen,
  onClick = null,
}) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const location = useLocation();
  const onCartPage = location.pathname === '/cart';

  if (!onCartPage)
    return (
      <>
        <Link to={'/cart'} className={`${styles.checkoutLink}`}>
          {children}
        </Link>
      </>
    );

  if (!isLoggedIn && onCartPage) {
    return (
      <button
        className={`${styles.checkoutLink}`}
        onClick={() => setIsLoginModalOpen(true)}
      >
        {children}
      </button>
    );
  }

  return (
    <button onClick={onClick} className={`${styles.checkoutLink}`}>
      Checkout
    </button>
  );
}
