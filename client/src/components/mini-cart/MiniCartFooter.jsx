import styles from './MiniCartFooter.module.css';
import MiniCartDetails from './MiniCartDetails';
import CheckoutBtn from './CheckoutBtn';

export default function MiniCartFooter({ closeMiniCart, setIsLoginModalOpen }) {
  return (
    <div className={styles.footerContainer}>
      <MiniCartDetails />
      <CheckoutBtn setIsLoginModalOpen={setIsLoginModalOpen}>
        {' '}
        Checkout{' '}
      </CheckoutBtn>
      <p className={styles.shipping}>
        Shipping and tax calculated at checkout.
      </p>
      <button className={styles.closeBtn} onClick={closeMiniCart}>
        Close Cart
      </button>
    </div>
  );
}
