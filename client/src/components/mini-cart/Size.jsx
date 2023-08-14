import styles from './Size.module.css';
import { useState } from 'react';

export default function Size() {
  const [size, setSize] = useState(6);

  return (
    <div className={styles.sizeContainer}>
      <p className={styles.label}>Size:</p>

      <select
        onChange={(e) => setSize(e.target.value)}
        value={size}
        className={styles.sizeSelect}
      >
        <option value='6'>6&quot;</option>
        <option value='9'>9&quot;</option>
      </select>
    </div>
  );
}
