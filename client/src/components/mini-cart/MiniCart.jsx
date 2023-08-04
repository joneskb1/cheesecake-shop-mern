import styles from "./MiniCart.module.css";
import CartHeader from "./cartHeader";
import OrderCard from "./OrderCard";
import MiniCartFooter from "./MiniCartFooter";

// parent should be position relative and overflow hidden
// open button and state are kept in parent

export default function MiniCart({ isMiniCartOpen, setIsMiniCartOpen }) {
  const closeMiniCart = function () {
    setIsMiniCartOpen(false);
  };

  return (
    <>
      <div className={styles.miniCart} open={isMiniCartOpen}>
        <CartHeader />
        <div className={styles.orderCardContainer}>
          <OrderCard />

          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>

        <MiniCartFooter />
        {/* <button onClick={closeMiniCart}>Close Mini Cart</button> */}
      </div>

      {isMiniCartOpen && (
        <div className={styles.miniCartOverlay} onClick={closeMiniCart}></div>
      )}
    </>
  );
}
