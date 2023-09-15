import { selectCartState, selectShipping } from '../slices/cartSlice';
import { useSelector } from 'react-redux';

export default function useCalcCart() {
  const cartItems = useSelector(selectCartState);
  const { cost: shippingCost, type } = useSelector(selectShipping);

  const subtotal = cartItems.reduce((total, current) => {
    return current.price * current.quantity + total;
  }, 0);

  const tax = subtotal * 0.1;
  const totalBeforeShipping =
    Number.parseFloat(tax, 10) + Number.parseFloat(subtotal, 10);

  const orderTotal =
    Number.parseFloat(subtotal, 10) +
    Number.parseFloat(tax, 10) +
    Number.parseFloat(shippingCost, 10);

  return {
    subtotal: Number.parseFloat(subtotal, 10).toFixed(2),
    tax: Number.parseFloat(tax, 10).toFixed(2),
    totalBeforeShipping: Number.parseFloat(totalBeforeShipping, 10).toFixed(2),
    shippingCost: Number.parseFloat(shippingCost, 10).toFixed(2),
    orderTotal: Number.parseFloat(orderTotal, 10).toFixed(2),
    shippingType: type,
  };
}
