import styles from './Qty.module.css';
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

  if (qty > cakeStock) {
    qty = cakeStock;
  }

  return (
    <>
      <div className={styles.qtyContainer}>
        <SelectInput
          options={options}
          setter={handleQtyChange}
          startingOption={qty}
          key={cake.id + cake.size}
          className={styles.label}
        >
          Qty:
        </SelectInput>
      </div>{' '}
    </>
  );
}
