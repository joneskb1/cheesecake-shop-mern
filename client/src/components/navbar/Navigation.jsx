import { Link } from 'react-router-dom';

import styles from './Navigation.module.css';

// client/src/assets/icons/account-27w.svg
// client\src\assets\icons\cart-33w.svg

import accountIcon from '../../assets/icons/account-27w.svg';
import cartIcon from '../../assets/icons/cart-33w.svg';

export default function Navigation() {
  return (
    <div className={styles.navigation}>
      <ul className={styles.navItems}>
        <li>
          <Link to='/cheesecakes' className={styles.link}>
            Cheesecakes
          </Link>
        </li>
        <li>
          <Link to='/contact' className={styles.link}>
            Contact
          </Link>
        </li>
        <li>
          <Link to='/my-account' className={styles.link}>
            <img
              src={accountIcon}
              alt='account button'
              className={styles.accountIcon}
            />
          </Link>
        </li>
        <li>
          <Link to='/cart' className={styles.link}>
            <img src={cartIcon} alt='cart button' className={styles.cartIcon} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
