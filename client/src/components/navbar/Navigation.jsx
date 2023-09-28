import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutGlobalState } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/userApiSlice';
import styles from './Navigation.module.css';
import NavDropdown from './NavDropdown';
import { toast } from 'react-toastify';
import accountIcon from '../../assets/icons/account-27w.svg';
import cartIcon from '../../assets/icons/cart-33w.svg';
import { clearCart } from '../../slices/cartSlice';

export default function Navigation() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [logout] = useLogoutMutation();

  const numItemsInCart = cartItems.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  async function handleLogout() {
    try {
      const res = await logout().unwrap();
      if (res.status === 'success') {
        dispatch(logoutGlobalState());
        dispatch(clearCart());
      } else {
        toast.error(res.message || 'error logging out');
      }
    } catch (error) {
      toast.error(error.data.message || 'error logging out');
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
        {numItemsInCart && (
          <div className={styles.numCart}>
            <p>{numItemsInCart}</p>
          </div>
        )}
      </ul>
    </div>
  );
}
