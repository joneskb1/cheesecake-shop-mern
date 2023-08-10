import { useState } from 'react';

import styles from './ShopCheesecakesScreen.module.css';

import ShopBanner from '../components/shop/ShopBanner';
import ShopCheesecakesHeader from '../components/shop/ShopCheesecakesHeader';
import SearchBtn from '../components/shop/SearchBtn';
import ShopCakes from '../components/shop/ShopCakes';

export default function ShopheesecakesScreen({ cakeCards, searchMap }) {
  const [cakes, setCakes] = useState(cakeCards);
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className={styles.shopWrap}>
      <ShopBanner />
      <ShopCheesecakesHeader />
      <SearchBtn
        cakeCards={cakeCards}
        setCakes={setCakes}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchMap={searchMap}
      />
      <ShopCakes
        cakes={cakes}
        setCakes={setCakes}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        cakeCards={cakeCards}
      />
    </div>
  );
}
