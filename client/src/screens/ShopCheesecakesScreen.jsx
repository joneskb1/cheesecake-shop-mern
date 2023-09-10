import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ShopCheesecakesScreen.module.css';
import {
  useGetAllProductsQuery,
  setProducts,
} from '../slices/productsSlice.js';
import ShopBanner from '../components/shop/ShopBanner';
import ShopCheesecakesHeader from '../components/shop/ShopCheesecakesHeader';
import SearchBtn from '../components/shop/SearchBtn';
import ShopCakes from '../components/shop/ShopCakes';
import SearchInput from '../components/shop/SearchInput';
import PageLoader from '../components/PageLoader';

export default function ShopheesecakesScreen({ cakeCards, searchMap }) {
  const [cakes, setCakes] = useState(cakeCards);
  const [searchInput, setSearchInput] = useState('');

  const { data: products, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products.data.products));
    }
  }, [products, dispatch]);

  if (isLoading) return <PageLoader />;

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
