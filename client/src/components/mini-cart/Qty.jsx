import styles from "./Qty.module.css";
import { useState } from "react";

export default function Qty() {
  const [qty, setQty] = useState(0);
  const options = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className={styles.qtyContainer}>
      <select
        onChange={(e) => setQty(e.target.value)}
        value={qty}
        className={styles.qtySelect}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
        <option value="delete">Delete</option>
      </select>
    </div>
  );
}
