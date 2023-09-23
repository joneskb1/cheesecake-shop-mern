import { useState, useEffect, useMemo } from 'react';
import styles from './ShopCheesecakesScreen.module.css';
import { useGetAllProductsQuery } from '../slices/productsSlice.js';
import ShopBanner from '../components/shop/ShopBanner';
import ShopCheesecakesHeader from '../components/shop/ShopCheesecakesHeader';
import SearchBtn from '../components/shop/SearchBtn';
import ShopCakes from '../components/shop/ShopCakes';
import SearchInput from '../components/shop/SearchInput';
import PageLoader from '../components/PageLoader';

export default function ShopCheesecakesScreen() {
  const [cakes, setCakes] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading, error } = useGetAllProductsQuery();

  if (error) console.log(error);

  useEffect(() => {
    if (data) {
      setCakes(data.data.products);
    }
  }, [data]);

  const searchMap = useMemo(() => {
    const newSearchMap = new Map();
    const allHitTerms = [];

    if (data) {
      data.data.products.forEach((cake) => {
        const terms = cake.name.split(' ');
        terms.forEach((term) => {
          allHitTerms.push(term.toLowerCase());
        });
      });

      allHitTerms.forEach((term) => {
        const hits = [];
        data.data.products.forEach((cake) => {
          if (cake.name.toLowerCase().includes(term)) {
            hits.push(cake);
          }
        });
        newSearchMap.set(term, hits);
      });
    }

    return newSearchMap;
  }, [data]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={styles.shopWrap}>
      <ShopBanner />
      <div className={styles.headingWrap}>
        <ShopCheesecakesHeader />
        <SearchInput
          data={data}
          setCakes={setCakes}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchMap={searchMap}
        />
      </div>

      <SearchBtn
        data={data}
        setCakes={setCakes}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchMap={searchMap}
      />
      <ShopCakes
        cakes={cakes}
        setCakes={setCakes}
        data={data}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}
