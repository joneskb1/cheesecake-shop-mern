import { selectCartState } from '../slices/cartSlice';
import { useSelector } from 'react-redux';

export default function useCalcCart() {
  const cartItems = useSelector(selectCartState);

  if (!cartItems) return;

  const subtotal = cartItems.reduce((total, current) => {
    return current.price * current.quantity + total;
  }, 0);

  let totalOz = 0;

  function calcSingleCakeWeightOz(size) {
    // 12oz is an estimate weight per 1'' of cake
    return Number.parseInt(size, 10) * 12;
  }

  cartItems.forEach((item) => {
    const oz = calcSingleCakeWeightOz(item.size);
    totalOz += oz * item.quantity;
  });

  const weightLb = totalOz / 16;
  const weightOz = totalOz % 16;

  return {
    subtotal: Number.parseFloat(subtotal, 10).toFixed(2),
    weightLb,
    weightOz,
  };
}
