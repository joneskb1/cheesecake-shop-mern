import styles from './OrderCard.module.css';
import { useLocation } from 'react-router-dom';

import MiniCakeCard from './MiniCakeCard';
import Qty from './Qty';

export default function OrderCard({ cake, isMiniCartOpen, setIsMiniCartOpen }) {
  let location = useLocation();
  const onCheckout = location.pathname === '/checkout';

  const totalPrice =
    Number.parseFloat(cake.price, 10) * Number.parseInt(cake.quantity, 10);

  return (
    <div className={styles.cardContainer}>
      <MiniCakeCard cakeId={cake.id} />
      <div className={styles.qtySizeWrap}>
        <Qty
          cake={cake}
          isMiniCartOpen={isMiniCartOpen}
          setIsMiniCartOpen={setIsMiniCartOpen}
        />
        <p
          className={`${styles.paragraph} ${
            onCheckout ? styles.largeText : ''
          }`}
        >
          Size: {cake.size}&quot;
        </p>

        <p
          className={`${styles.paragraph} ${
            onCheckout ? styles.largeText : ''
          }`}
        >
          Price: ${totalPrice.toFixed(2)}
        </p>
      </div>
      {cake.stock <= cake.quantity && (
        <p className={styles.maxQtyMessage}>Max stock is {cake.stock}</p>
      )}
    </div>
  );
}
