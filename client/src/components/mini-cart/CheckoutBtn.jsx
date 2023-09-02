import { useSelector } from 'react-redux';
import styles from './CheckoutBtn.module.css';
import { Link } from 'react-router-dom';

export default function CheckoutBtn({ children, setIsLoginModalOpen }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn)
    return (
      <>
        <button
          className={`${styles.checkoutLink}`}
          onClick={() => setIsLoginModalOpen(true)}
        >
          Checkout
        </button>
      </>
    );

  if (isLoggedIn) {
    return (
      <Link to={'/checkout'} className={`${styles.checkoutLink}`}>
        {children}
      </Link>
    );
  }
}
