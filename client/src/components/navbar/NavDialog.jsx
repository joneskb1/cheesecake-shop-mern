import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutGlobalState } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { clearCart } from '../../slices/cartSlice';
import styles from './NavDialog.module.css';
import closeX from '../../assets/icons/close-x.svg';
import { toast } from 'react-toastify';

export default function NavDialog({ dialogRef }) {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleCloseDialog = function () {
    dialogRef.current.close();
  };

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
    handleCloseDialog();
  }

  return (
    <dialog
      className={styles.dialog}
      onClick={handleCloseDialog}
      ref={dialogRef}
    >
      <div className={styles.innerDialog} onClick={(e) => e.stopPropagation()}>
        <img
          src={closeX}
          alt='close dialog button'
          className={styles.closeX}
          onClick={handleCloseDialog}
        />

        <ul className={styles.ul}>
          <li className={styles.li}>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.active}`
                  : `${styles.navLink}`
              }
              onClick={handleCloseDialog}
            >
              Home
            </NavLink>
          </li>
          <br />
          <li className={styles.li}>
            <NavLink
              to={'/cheesecakes'}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.active}`
                  : `${styles.navLink}`
              }
              onClick={handleCloseDialog}
            >
              Cheesecakes
            </NavLink>
          </li>
          <br />
          <li className={styles.li}>
            <NavLink
              to={'/contact'}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.active}`
                  : `${styles.navLink}`
              }
              onClick={handleCloseDialog}
            >
              Contact
            </NavLink>
          </li>
          <br />

          <li className={styles.li}>
            <NavLink
              to={'/cart'}
              onClick={handleCloseDialog}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.active}`
                  : `${styles.navLink}`
              }
            >
              Cart
            </NavLink>
          </li>
          <br />
          {isLoggedIn && isAdmin && (
            <>
              <li className={styles.li}>
                <NavLink
                  to={'/admin-products'}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : `${styles.navLink}`
                  }
                  onClick={handleCloseDialog}
                >
                  Products
                </NavLink>
              </li>
              <br />
              <li className={styles.li}>
                <NavLink
                  to={'/admin-orders'}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : `${styles.navLink}`
                  }
                  onClick={handleCloseDialog}
                >
                  Orders
                </NavLink>
              </li>
              <br />
            </>
          )}
          {isLoggedIn && (
            <>
              <li className={styles.li}>
                <NavLink
                  to={'/my-account'}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : `${styles.navLink}`
                  }
                  onClick={handleCloseDialog}
                >
                  Account
                </NavLink>
              </li>
              <br />
              <li className={styles.li}>
                <NavLink
                  to={'/'}
                  className={styles.navLink}
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>
              <br />
            </>
          )}

          {!isLoggedIn && (
            <li className={styles.li}>
              <NavLink
                to={'/auth/login'}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : `${styles.navLink}`
                }
                onClick={handleCloseDialog}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </dialog>
  );
}
