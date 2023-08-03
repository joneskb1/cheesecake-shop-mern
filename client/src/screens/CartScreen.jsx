import { useState } from 'react';

import MiniCart from '../components/MiniCart';

import styles from './CartScreen.module.css';

export default function CartScreen() {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  return (
    <div className={styles.cartScreen}>
      <button onClick={() => setIsMiniCartOpen(true)}>Open Mini Cart</button>
      <MiniCart
        isMiniCartOpen={isMiniCartOpen}
        setIsMiniCartOpen={setIsMiniCartOpen}
      />
    </div>
  );
}
