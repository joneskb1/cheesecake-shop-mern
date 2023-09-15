import styles from './OrderCard.module.css';
import { useLocation } from 'react-router-dom';

import MiniCakeCard from './MiniCakeCard';
import Qty from './Qty';
// import Size from './Size';

export default function OrderCard({ cake, isMiniCartOpen, setIsMiniCartOpen }) {
  let location = useLocation();
  const onCheckout = location.pathname === '/checkout';

  return (
    <div className={styles.cardContainer}>
      <MiniCakeCard cakeId={cake.id} />
      <div className={styles.qtySizeWrap}>
        <Qty
          cake={cake}
          isMiniCartOpen={isMiniCartOpen}
          setIsMiniCartOpen={setIsMiniCartOpen}
        />
        {/* <Size size={cake.size} /> */}
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
          Price: ${cake.price}
        </p>
      </div>
      {cake.stock <= cake.quantity && (
        <p className={styles.maxQtyMessage}>Max stock is {cake.stock}</p>
      )}
    </div>
  );
}
