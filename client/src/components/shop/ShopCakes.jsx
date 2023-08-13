import styles from './ShopCakes.module.css';

import ShopCakeCard from './ShopCakeCard';

export default function ShopCakes({
  cakes,
  setCakes,
  searchInput,
  cakeCards,
  setSearchInput,
}) {
  const resetCakes = function () {
    setCakes(cakeCards);
    setSearchInput('');
  };

  return (
    <div className={styles.shop}>
      {cakes && cakes.length === 0 && searchInput.length > 0 && (
        <>
          <p className={styles.noResultsMsg}>
            No cakes meet that search criteria
          </p>
        </>
      )}

      {searchInput.length > 0 && (
        <button className={styles.showAllResultsBtn} onClick={resetCakes}>
          Show All Results
        </button>
      )}

      {cakes &&
        cakes.map((card, index) => (
          <ShopCakeCard cake={card} key={index}>
            {card.name}
          </ShopCakeCard>
        ))}
    </div>
  );
}
