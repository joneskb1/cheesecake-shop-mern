import styles from './OrderCard.module.css';
import { useLocation } from 'react-router-dom';

import MiniCakeCard from './MiniCakeCard';
import Qty from './Qty';
import Size from './Size';

export default function OrderCard() {
  let location = useLocation();
  const onCheckout = location.pathname === '/checkout';
  return (
    <div className={styles.cardContainer}>
      <MiniCakeCard />
      <div className={styles.qtySizeWrap}>
        <Qty />
        <Size />
        <p
          className={`${styles.paragraph} ${
            onCheckout ? styles.largeText : ''
          }`}
        >
          Price: $198.19
        </p>
      </div>
    </div>
  );
}
