import { useLocation } from 'react-router-dom';
import styles from './MiniCakeCard.module.css';

import { useGetProductQuery } from '../../slices/productsSlice';

export default function MiniCakeCard({ cakeId }) {
  const { data, isLoading, error } = useGetProductQuery(cakeId);

  if (error) console.log(error);

  let cakeSrcXSmall;
  let cakeSrcXXSmall;

  if (data) {
    let image = data.data.product.image;

    // cakeSrcXSmall = `/src/assets/uploads/clones/x-small/${
    //   image.split('.')[0]
    // }-75w.${image.split('.')[1]}`;
    // cakeSrcXXSmall = `/src/assets/uploads/clones/xx-small/${
    //   image.split('.')[0]
    // }-38w.${image.split('.')[1]}`;

    cakeSrcXSmall = `/uploads/clones/x-small/${image.split('.')[0]}-75w.${
      image.split('.')[1]
    }`;
    cakeSrcXXSmall = `/uploads/clones/xx-small/${image.split('.')[0]}-38w.${
      image.split('.')[1]
    }`;
  }

  let location = useLocation();
  const onCheckout = location.pathname === '/checkout';

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.miniCakeCardContainer}>
      <picture>
        <source media='(min-width: 744px)' srcSet={cakeSrcXSmall} />
        <img
          src={cakeSrcXXSmall}
          alt='cake'
          className={styles.miniCakeCardImg}
        />
      </picture>

      <p
        className={`${styles.miniCakeCardName} ${
          onCheckout ? styles.largeText : ''
        } `}
      >
        {data.data.product.name}{' '}
      </p>
    </div>
  );
}
