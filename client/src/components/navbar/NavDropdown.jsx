import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './NavDropdown.module.css';

export default function NavDropdown({ children, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useSelector((state) => state.auth);

  return (
    <>
      <div onMouseEnter={() => setIsOpen(true)} className={styles.dropdownWrap}>
        <NavLink
          to='/my-account'
          className={({ isActive }) => (isActive ? `${styles.active}` : '')}
        >
          {children}
        </NavLink>

        {isOpen && (
          <ul className={styles.dropdown}>
            <li>
              <NavLink
                to='/my-account'
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.navLink}`
                    : ` ${styles.navLink}`
                }
              >
                Account
              </NavLink>
            </li>
            {isAdmin && (
              <>
                <li>
                  <NavLink
                    to={'/admin-products'}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.active} ${styles.navLink}`
                        : ` ${styles.navLink}`
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/admin-orders'}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.active} ${styles.navLink}`
                        : ` ${styles.navLink}`
                    }
                  >
                    Orders
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <button className={styles.navBtn} onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
      {isOpen && (
        <div
          className={styles.dropdownOverlay}
          onMouseEnter={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
