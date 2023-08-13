import { NavLink } from 'react-router-dom';

import styles from './ShopCakeCard.module.css';

export default function ShopCakeCard({ children, cake }) {
  const id = children.split(' ').join('-').toLowerCase();

  return (
    <div className={styles.cakeWrap}>
      <NavLink to={`/cheesecake/${id}`} className={styles.navLinkImg}>
        <picture>
          <source media='(min-width: 1200px)' srcSet={cake.imgTablet} />
          <img
            src={cake.img}
            alt={`${children} cake`}
            className={styles.cake}
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
