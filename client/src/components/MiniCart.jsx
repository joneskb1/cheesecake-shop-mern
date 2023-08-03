import styles from './MiniCart.module.css';

// parent should be position relative and overflow hidden
// open button and state are kept in parent

export default function MiniCart({ isMiniCartOpen, setIsMiniCartOpen }) {
  const closeMiniCart = function () {
    setIsMiniCartOpen(false);
  };

  return (
    <>
      <div className={styles.miniCart} open={isMiniCartOpen}>
        <button onClick={closeMiniCart}>Close Mini Cart</button>
        <p>I&apos;ll be a real mini cart some day!</p>
      </div>

      {isMiniCartOpen && (
        <div className={styles.miniCartOverlay} onClick={closeMiniCart}></div>
      )}
    </>
  );
}
