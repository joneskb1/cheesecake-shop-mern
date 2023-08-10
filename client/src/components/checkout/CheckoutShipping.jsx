import { useState } from 'react';
import styles from './CheckoutShipping.module.css';

export default function CheckoutShipping() {
  const [shipping, setShipping] = useState('priority');

  return (
    <>
      <div className={styles.shippingInputsWrap}>
        <div className={styles.shippingInputWrap}>
          <input
            type='radio'
            name='shipping'
            id='shipping-priority'
            value='priority'
            className={styles.shippingInput}
            checked={shipping === 'priority'}
            onChange={(e) => setShipping(e.target.value)}
          />
          <label htmlFor='shipping-priority' className={styles.shippingLabel}>
            USPS Priority (2-4 Days)
          </label>
        </div>

        <div className={styles.shippingInputWrap}>
          <input
            type='radio'
            name='shipping'
            id='shipping-expedited'
            value='expedited'
            className={styles.shippingInput}
            checked={shipping === 'expedited'}
            onChange={(e) => setShipping(e.target.value)}
          />
          <label htmlFor='shipping-expedited' className={styles.shippingLabel}>
            USPS Expedited (1-2 Days)
          </label>
        </div>
      </div>
    </>
  );
}
