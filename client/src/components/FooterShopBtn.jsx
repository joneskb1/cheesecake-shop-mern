import { NavLink } from 'react-router-dom';

import styles from './FooterShopBtn.module.css';

export default function FooterShopBtn() {
  const handleScrollToTop = function () {
    window.scrollTo(0, 0);
  };

  return (
    <NavLink to='/cheesecakes'>
      <button className={styles.footerShopBtn} onClick={handleScrollToTop}>
        Shop Cheesecakes
      </button>
    </NavLink>
  );
}
