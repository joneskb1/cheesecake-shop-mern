import { NavLink } from "react-router-dom";

import styles from "./FooterShopBtn.module.css";

export default function FooterShopBtn() {
  return (
    <NavLink to="/cheesecakes">
      <button className={styles.footerShopBtn}>Shop Cheesecakes</button>
    </NavLink>
  );
}
