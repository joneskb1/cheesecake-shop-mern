import styles from './Size.module.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Size() {
  const [size, setSize] = useState(6);
  let location = useLocation();
  const onCheckout = location.pathname === '/checkout';
  return (
    <div className={styles.sizeContainer}>
      <p className={`${styles.label} ${onCheckout ? styles.largeText : ''}`}>
        Size:
      </p>

      <select
        onChange={(e) => setSize(e.target.value)}
        value={size}
        className={`${styles.sizeSelect} ${onCheckout ? styles.largeText : ''}`}
      >
        <option value='6'>6&quot;</option>
        <option value='9'>9&quot;</option>
      </select>
    </div>
  );
}
