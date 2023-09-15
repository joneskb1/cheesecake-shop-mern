import { useEffect, useState } from 'react';
import styles from './CheckoutShipping.module.css';
import { useDispatch } from 'react-redux';
import { updateShipping } from '../../slices/cartSlice';

export default function CheckoutShipping() {
  const [shipping, setShipping] = useState('priority');

  const dispatch = useDispatch();

  useEffect(() => {
    const cost = shipping === 'priority' ? 12.9 : 24.9;
    dispatch(updateShipping({ cost: cost.toFixed(2), type: shipping }));
  }, [dispatch, shipping]);

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
          <p className={styles.price}>$12.90</p>
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
          <p className={styles.price}>$24.90</p>
        </div>
      </div>
    </>
  );
}
