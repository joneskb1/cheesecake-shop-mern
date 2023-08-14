import { NavLink, useLocation } from 'react-router-dom';

import styles from './ShopCakeCard.module.css';

export default function ShopCakeCard({ children, cake }) {
  const id = children.split(' ').join('-').toLowerCase();

  const location = useLocation();
  // if on the single cake page in youmaylike use larger img for tablet
  const youMayLike = location.pathname.startsWith('/cheesecake/');

  return (
    <div
      className={`${styles.cakeWrap} ${
        youMayLike ? styles.youMayLikeWrap : ''
      }`}
    >
      <NavLink to={`/cheesecake/${id}`} className={styles.navLinkImg}>
        <picture>
          <source media='(min-width: 1200px)' srcSet={cake.imgTablet} />
          {youMayLike && (
            <source media='(min-width: 744px)' srcSet={cake.imgTablet} />
          )}
          <img
            src={cake.img}
            alt={`${children} cake`}
            className={`${styles.cake} ${
              youMayLike ? styles.youMayLikeCard : ''
            }`}
          />
        </picture>
      </NavLink>
      <br />
      <NavLink to={`/cheesecake/${id}`} className={styles.navLink}>
        <p className={styles.cakeTitle}>{children}</p>
      </NavLink>
    </div>
  );
}
