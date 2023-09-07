import { useState } from 'react';

import styles from './ShopCheesecakesScreen.module.css';
// import { useGetAllProductsQuery } from '../slices/productsSlice.js';
import ShopBanner from '../components/shop/ShopBanner';
import ShopCheesecakesHeader from '../components/shop/ShopCheesecakesHeader';
import SearchBtn from '../components/shop/SearchBtn';
import ShopCakes from '../components/shop/ShopCakes';
import SearchInput from '../components/shop/SearchInput';

export default function ShopheesecakesScreen({ cakeCards, searchMap }) {
  const [cakes, setCakes] = useState(cakeCards);
  const [searchInput, setSearchInput] = useState('');

  // const { data: products } = useGetAllProductsQuery();
  // let productArray;

  // if (products) {
  //   productArray = products.data.products;
  // }

  return (
    <div className={styles.shopWrap}>
      <ShopBanner />
      <div className={styles.headingWrap}>
        <ShopCheesecakesHeader />
        <SearchInput />
      </div>

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
