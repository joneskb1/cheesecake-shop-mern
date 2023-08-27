import { NavLink } from 'react-router-dom';
import styles from './AdminNavbar.module.css';

import Logo from '../../components/navbar/Logo';

export default function AdminNavbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Logo />

        <div>
          <NavLink
            to={'/admin-products'}
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.active}`
                : `${styles.navLink}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to={'/admin-orders'}
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.active}`
                : `${styles.navLink}`
            }
          >
            Orders
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
