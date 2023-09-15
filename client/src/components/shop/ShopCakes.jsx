import styles from './ShopCakes.module.css';

import ShopCakeCard from './ShopCakeCard';
import PageLoader from '../PageLoader';

export default function ShopCakes({
  cakes,
  setCakes,
  searchInput,
  setSearchInput,
  data,
}) {
  const resetCakes = function () {
    setCakes(data.data.products);
    setSearchInput('');
  };

  if (!data) {
    return <PageLoader />;
  }

  return (
    <div className={styles.shop}>
      {cakes && cakes.length === 0 && searchInput.length > 0 && (
        <>
          <p className={styles.noResultsMsg}>
            No cakes meet that search criteria
          </p>
        </>
      )}

      {/* give 'show all results' btn when displaying less than all cakes */}
      {cakes?.length < data?.data?.products?.length && (
        <button className={styles.showAllResultsBtn} onClick={resetCakes}>
          Show All Results
        </button>
      )}

      {cakes &&
        cakes.map((cake, index) => (
          <ShopCakeCard cake={cake} key={index}>
            {cake.name}
          </ShopCakeCard>
        ))}
    </div>
  );
}
