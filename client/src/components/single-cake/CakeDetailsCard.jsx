import { useState } from 'react';
import styles from './CakeDetailsCard.module.css';

import { addItem } from '../../slices/cartSlice';
import { useDispatch } from 'react-redux';

export default function CakeDetailsCard({ cake, setIsMiniCartOpen }) {
  const [size, setSize] = useState(cake.variants[0].size);
  const [price, setPrice] = useState(cake.variants[0].price);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(cake.variants[0].stock);

  const [options, setOptions] = useState(
    Array.from({ length: stock > 10 ? 10 : stock }, (_, i) => i + 1)
  );
  const dispatch = useDispatch();

  const handleAddItemToCart = function () {
    setIsMiniCartOpen(true);

    dispatch(
      addItem({
        id: cake._id,
        size: Number.parseInt(size),
        price: Number.parseFloat(price),
        quantity: Number.parseInt(quantity, 10),
        stock: Number.parseInt(stock, 10),
        name: cake.name,
      })
    );
  };

  const handleSizeChange = function (e) {
    setSize(e.target.value);
    const variant = cake.variants.find((el) => el.size == e.target.value);
    setOptions(
      Array.from(
        { length: variant.stock > 10 ? 10 : variant.stock },
        (_, i) => i + 1
      )
    );

    setPrice(variant.price);
    setStock(variant.stock);
  };

  const handleQtyChange = function (e) {
    setQuantity(e.target.value);
  };

  return (
    <div className={styles.cakeDetailsCard}>
      <h3 className={styles.cakeDetailsCardHeader}>{cake.name}</h3>
      <p className={styles.description}>{cake.description}</p>
      <p className={styles.price}>Price: ${price}</p>
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

      <button className={styles.addToCartBtn} onClick={handleAddItemToCart}>
        Add To Cart
      </button>
    </div>
  );
}
