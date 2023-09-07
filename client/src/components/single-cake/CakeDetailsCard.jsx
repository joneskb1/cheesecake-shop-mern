import { useState } from 'react';
import styles from './CakeDetailsCard.module.css';

export default function CakeDetailsCard({ cake, setIsMiniCartOpen }) {
  const [size, setSize] = useState(cake.variant[0].size);
  const [quantity, setQuantity] = useState(1);

  const openMiniCart = function () {
    setIsMiniCartOpen(true);
  };

  const options = Array.from(
    { length: cake.variant[0].stock },
    (_, i) => i + 1
  );

  const handleSizeChange = function (e) {
    setSize(e.target.value);
  };

  const handleQtyChange = function (e) {
    setQuantity(e.target.value);
  };

  return (
    <div className={styles.cakeDetailsCard}>
      <h3 className={styles.cakeDetailsCardHeader}>{cake.name}</h3>
      <p className={styles.description}>{cake.description}</p>
      <p className={styles.price}>Price: ${cake.variant[0].price}</p>
      <label htmlFor='size' className={styles.label}>
        Size:
      </label>
      <select
        name='size'
        id='size'
        className={styles.select}
        onChange={handleSizeChange}
        value={size}
      >
        {/* loop over sizes */}
        <option value='small'>{cake.variant[0].size}&quot;</option>
      </select>
      <br />
      <label htmlFor='quantity' className={styles.label}>
        Qty:
      </label>
      <select
        name='size'
        id='size'
        className={styles.select}
        onChange={handleQtyChange}
        value={quantity}
      >
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>

      <button className={styles.addToCartBtn} onClick={openMiniCart}>
        Add To Cart
      </button>
    </div>
  );
}
