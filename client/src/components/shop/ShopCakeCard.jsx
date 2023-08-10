import { NavLink } from "react-router-dom";

import styles from "./ShopCakeCard.module.css";

export default function ShopCakeCard({ src, children }) {
  const id = children.split(" ").join("-").toLowerCase();

  return (
    <div className={styles.cakeWrap}>
      <NavLink to={`/cheesecake/${id}`} className={styles.navLinkImg}>
        <img src={src} alt={`${children} cake`} className={styles.cake} />
      </NavLink>
      <br />
      <NavLink to={`/cheesecake/${id}`} className={styles.navLink}>
        <p className={styles.cakeTitle}>{children}</p>
      </NavLink>
    </div>
  );
}
