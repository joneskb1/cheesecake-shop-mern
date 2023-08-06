import { useState } from "react";
import styles from "./CakeDetailsCard.module.css";

export default function CakeDetailsCard({ cake, setIsMiniCartOpen }) {
  const [size, setSize] = useState("small");
  const [quantity, setQuantity] = useState(1);

  const openMiniCart = function () {
    setIsMiniCartOpen(true);
  };

  const options = Array.from({ length: 10 }, (_, i) => i + 1);

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
      <p className={styles.price}>Price: ${cake.prices[size]}</p>
      <label htmlFor="size" className={styles.label}>
        Size:
      </label>
      <select
        name="size"
        id="size"
        className={styles.select}
        onChange={handleSizeChange}
        value={size}
      >
        <option value="small">6&quot;</option>
        <option value="large">12&quot;</option>
      </select>
      <br />
      <label htmlFor="quantity" className={styles.label}>
        Qty:
      </label>
      <select
        name="size"
        id="size"
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
