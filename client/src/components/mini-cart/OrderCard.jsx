import styles from './OrderCard.module.css';
import MiniCakeCard from './MiniCakeCard';
import Qty from './Qty';
import Size from './Size';

export default function OrderCard() {
  return (
    <div className={styles.cardContainer}>
      <MiniCakeCard />
      <div className={styles.qtySizeWrap}>
        <Qty />
        <Size />
        <p className={styles.paragraph}>Price: $198.19</p>
      </div>
    </div>
  );
}
