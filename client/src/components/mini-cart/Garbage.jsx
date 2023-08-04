import garbage from "../../assets/icons/trash.svg";
import styles from "./Garbage.module.css";
export default function Garbage() {
  return (
    <div>
      <img className={styles.garbage} src={garbage} alt="garbage icon"></img>
    </div>
  );
}
