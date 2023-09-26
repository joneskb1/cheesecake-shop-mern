import styles from './SummaryCart.module.css';
import CheckoutBtn from '../mini-cart/CheckoutBtn';
import MiniCartDetails from '../mini-cart/MiniCartDetails';

export default function SummaryCart({
  isLoginModalOpen,
  setIsLoginModalOpen,
  onClick,
  shipRate,
}) {
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.summaryHeading}>Summary</h2>
      <MiniCartDetails color={'black'} shipRate={shipRate} />
      <CheckoutBtn
        onClick={onClick}
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      >
        {' '}
        Checkout{' '}
      </CheckoutBtn>
      <p className={styles.shipping}>tax is calculated at checkout.</p>
    </div>
  );
}
