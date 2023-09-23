import styles from './MiniCart.module.css';
import CartHeader from './CartHeader';
import OrderCard from './OrderCard';
import MiniCartFooter from './MiniCartFooter';

import { selectCartState } from '../../slices/cartSlice';
import { useSelector } from 'react-redux';

// parent should be position relative and overflow hidden
// open button and state are kept in parent
export default function MiniCart({
  isMiniCartOpen,
  setIsMiniCartOpen,
  setIsLoginModalOpen,
}) {
  const cartItems = useSelector(selectCartState);

  const closeMiniCart = function () {
    setIsMiniCartOpen(false);
  };

  return (
    <>
      <div className={styles.miniCart} open={isMiniCartOpen}>
        <CartHeader />
        <div className={styles.orderCardContainer}>
          {cartItems &&
            cartItems.map((item, index) => {
              return (
                <OrderCard
                  key={index}
                  cake={item}
                  setIsMiniCartOpen={setIsMiniCartOpen}
                  isMiniCartOpen={isMiniCartOpen}
                />
              );
            })}
        </div>

        <MiniCartFooter
          closeMiniCart={closeMiniCart}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
      </div>

      {isMiniCartOpen && (
        <div className={styles.miniCartOverlay} onClick={closeMiniCart}></div>
      )}
    </>
  );
}
