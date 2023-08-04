import styles from "./MiniCakeCard.module.css";
import cake from "../../assets/images/mobile-cakes-38w/red-velvet-38w.jpg";

export default function MiniCakeCard() {
  return (
    <div className={styles.miniCakeCardContainer}>
      <img
        src={cake}
        alt="small image of cake"
        className={styles.miniCakeCardImg}
      />
      <p className={styles.miniCakeCardName}>Red Velvet</p>
    </div>
  );
}
