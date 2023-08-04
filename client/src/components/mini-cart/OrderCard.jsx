import styles from "./OrderCard.module.css";
import MiniCakeCard from "./MiniCakeCard";
import Qty from "./Qty";
import Size from "./Size";

export default function OrderCard() {
  return (
    <div className={styles.cardContainer}>
      <MiniCakeCard />
      <Qty />
      <Size />
      <p className={styles.paragraph}>$18.19</p>
      <p className={styles.paragraph}>$18.19</p>
    </div>
  );
}
