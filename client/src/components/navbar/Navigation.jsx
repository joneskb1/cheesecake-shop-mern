import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutGlobalState } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/userApiSlice';
import styles from './Navigation.module.css';

// client/src/assets/icons/account-27w.svg
// client\src\assets\icons\cart-33w.svg

import NavDropdown from './NavDropdown';

import accountIcon from '../../assets/icons/account-27w.svg';
import cartIcon from '../../assets/icons/cart-33w.svg';

export default function Navigation() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    try {
      const res = await logout().unwrap();
      if (res.status === 'success') {
        dispatch(logoutGlobalState());
        // navigate to home
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.navigation}>
      <ul className={styles.navItems}>
        <li>
          <NavLink
            to='/cheesecakes'
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
            }
          >
            Cheesecakes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
            }
          >
            Contact
          </NavLink>
        </li>

        {isLoggedIn && (
          <li>
            <NavDropdown onLogout={handleLogout}>
              <img
                src={accountIcon}
                alt='account button'
                className={`${styles.accountIcon} ${styles.link}`}
              />
            </NavDropdown>
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <NavLink
              to='/auth/login'
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
              }
            >
              Login
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to='/cart'
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
            }
          >
            <img src={cartIcon} alt='cart button' className={styles.cartIcon} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
