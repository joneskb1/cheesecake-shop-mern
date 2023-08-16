import styles from './Qty.module.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Qty() {
  const [qty, setQty] = useState(0);
  const options = Array.from({ length: 10 }, (_, i) => i + 1);

  let location = useLocation();
  const onCheckout = location.pathname === '/checkout';
  return (
    <div className={styles.qtyContainer}>
      <p className={`${styles.label} ${onCheckout ? styles.largeText : ''}`}>
        Qty:
      </p>

      <select
        onChange={(e) => setQty(e.target.value)}
        value={qty}
        className={`${styles.qtySelect} ${onCheckout ? styles.largeText : ''}`}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
        <option value='delete'>Delete</option>
      </select>
    </div>
  );
}
