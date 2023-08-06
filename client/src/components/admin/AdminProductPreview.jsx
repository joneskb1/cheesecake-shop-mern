import styles from "./AdminProductPreview.module.css";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import AdminCakeCard from "./AdminCakeCard";
import cake from "../../assets/images/mobile-cakes-75w/blueberry-75w.jpg";

export default function AdminProductPreview() {
  return (
    <>
      <div className={styles.container}>
        <AdminCakeCard src={cake} name="Blueberry" />
        <p className={`${styles.name} ${styles.hide}`}>Blueberry</p>
        <div className={`${styles.variableContainer} ${styles.hide}`}>
          <p className={`${styles.size} ${styles.hide}`}>6&quot;</p>
          <p className={`${styles.size} ${styles.hide}`}>9&quot;</p>
        </div>
        <div className={`${styles.variableContainer} ${styles.hide}`}>
          <p className={`${styles.price} ${styles.hide}`}>$15.99</p>
          <p className={`${styles.price} ${styles.hide}`}>$19.99</p>
        </div>
        <img src={edit} alt="edit icon" />
        <img src={trash} alt="delete icon" />
      </div>
      <hr className={styles.line} />
    </>
  );
}
