import { NavLink, useLocation } from 'react-router-dom';

import styles from './ShopCakeCard.module.css';

export default function ShopCakeCard({ children, cake }) {
  const location = useLocation();
  // if on the single cake page in youmaylike use larger img for tablet
  const youMayLike = location.pathname.startsWith('/cheesecake/');

  let img;

  if (import.meta.env.MODE === 'development') {
    img = `/src/assets`;
  }

  return (
    <div
      className={`${styles.cakeWrap} ${
        youMayLike ? styles.youMayLikeWrap : ''
      }`}
    >
      <NavLink to={`/cheesecake/${cake._id}`} className={styles.navLinkImg}>
        <picture>
          <source
            media='(min-width: 1200px)'
            srcSet={
              img
                ? img +
                  `/uploads/clones/large/${cake.image.split('.')[0]}-354w.${
                    cake.image.split('.')[1]
                  }`
                : `/uploads/clones/large/${cake.image.split('.')[0]}-354w.${
                    cake.image.split('.')[1]
                  }`
            }
          />
          {youMayLike && (
            <source
              media='(min-width: 744px)'
              srcSet={
                img
                  ? img +
                    `/uploads/clones/large/${cake.image.split('.')[0]}-354w.${
                      cake.image.split('.')[1]
                    }`
                  : `/uploads/clones/large/${cake.image.split('.')[0]}-354w.${
                      cake.image.split('.')[1]
                    }`
              }
            />
          )}
          <img
            src={
              img
                ? img +
                  `/uploads/clones/medium/${cake.image.split('.')[0]}-265w.${
                    cake.image.split('.')[1]
                  }`
                : `/uploads/clones/medium/${cake.image.split('.')[0]}-265w.${
                    cake.image.split('.')[1]
                  }`
            }
            alt={`${children} cake`}
            className={`${styles.cake} ${
              youMayLike ? styles.youMayLikeCard : ''
            }`}
          />
        </picture>
      </NavLink>
      <br />
      <NavLink to={`/cheesecake/${cake._id}`} className={styles.navLink}>
        <p className={styles.cakeTitle}>{children}</p>
      </NavLink>
    </div>
  );
}
