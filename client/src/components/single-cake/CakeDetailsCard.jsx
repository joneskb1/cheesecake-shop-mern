import { useState } from 'react';
import styles from './CakeDetailsCard.module.css';

export default function CakeDetailsCard({ cake, setIsMiniCartOpen }) {
  const [size, setSize] = useState(cake.variants[0].size);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState(
    Array.from(
      { length: cake.variants[0].stock > 10 ? 10 : cake.variants[0].stock },
      (_, i) => i + 1
    )
  );

  const openMiniCart = function () {
    setIsMiniCartOpen(true);
  };

  const handleSizeChange = function (e) {
    setSize(e.target.value);
    const variant = cake.variants.filter((el) => el.size == e.target.value);
    setOptions(
      Array.from(
        { length: variant[0].stock > 10 ? 10 : variant[0].stock },
        (_, i) => i + 1
      )
    );
  };

  const handleQtyChange = function (e) {
    setQuantity(e.target.value);
  };

  return (
    <div className={styles.cakeDetailsCard}>
      <h3 className={styles.cakeDetailsCardHeader}>{cake.name}</h3>
      <p className={styles.description}>{cake.description}</p>
      <p className={styles.price}>Price: ${cake.variants[0].price}</p>
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
        {cake.variants.map((variant) => {
          return (
            <option value={variant.size} key={variant._id}>
              {variant.size}&quot;
            </option>
          );
        })}
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
