import styles from './Qty.module.css';
import { useLocation } from 'react-router-dom';
import { updateQty, removeItem } from '../../slices/cartSlice';
import { useDispatch } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';

import SelectInput from '../utils/SelectInput';

export default function Qty({
  cake,
  isMiniCartOpen = null,
  setIsMiniCartOpen,
}) {
  let qty = cake.quantity;

  const dispatch = useDispatch();

  let cakeStock = cake.stock;
  let options = Array.from({ length: Number(cakeStock) }, (_, i) => i + 1);
  options.push('Delete');

  function handleQtyChange(qty) {
    // remove item from cart if they click delete
    if (qty.toLowerCase() === 'delete') {
      dispatch(
        removeItem({
          cakeId: cake.id,
          cakeSize: cake.size,
        })
      );

      // close cart if cart is empty
      const currentCart = JSON.parse(secureLocalStorage.getItem('cartItems'));

      if (isMiniCartOpen && currentCart.length < 1) {
        return setIsMiniCartOpen(false);
      }
    }

    // update quantity if they change it
    dispatch(
      updateQty({
        newQty: qty,
        cakeId: cake.id,
        cakeSize: cake.size,
        stock: cakeStock,
      })
    );
  }

  let location = useLocation();
  const onCheckout = location.pathname === '/checkout';

  if (qty > cakeStock) {
    qty = cakeStock;
  }

  return (
    <>
      <div className={styles.qtyContainer}>
        {/* <p className={`${styles.label} ${onCheckout ? styles.largeText : ''}`}>
          Qty:
        </p> */}
        {/* <select
          onChange={handleQtyChange}
          value={qty}
          className={`${styles.qtySelect} ${
            onCheckout ? styles.largeText : ''
          }`}
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
          <option value='delete'>Delete</option>
        </select>{' '} */}
        <SelectInput
          options={options}
          setter={handleQtyChange}
          startingOption={cake.quantity}
          key={cake.id + cake.size}
        >
          Qty:
        </SelectInput>
      </div>{' '}
    </>
  );
}
