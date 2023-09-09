import styles from './ShopCakes.module.css';

import ShopCakeCard from './ShopCakeCard';
import PageLoader from '../PageLoader';
import { useSelector } from 'react-redux';

export default function ShopCakes({
  cakes,
  setCakes,
  searchInput,
  cakeCards,
  setSearchInput,
}) {
  const data = useSelector((state) => state.products);

  const resetCakes = function () {
    setCakes(cakeCards);
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

      {searchInput.length > 0 && (
        <button className={styles.showAllResultsBtn} onClick={resetCakes}>
          Show All Results
        </button>
      )}

      {data &&
        data.map((cake, index) => (
          <ShopCakeCard cake={cake} key={index}>
            {cake.name}
          </ShopCakeCard>
        ))}
    </div>
  );
}
