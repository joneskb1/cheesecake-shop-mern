import { NavLink } from 'react-router-dom';

import styles from './NavDialog.module.css';
import closeX from '../../assets/icons/close-x.svg';

export default function NavDialog({ dialogRef }) {
  const handleCloseDialog = function () {
    dialogRef.current.close();
  };

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
              {/* <ChefIcon /> */}
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
              to={'/cart'}
              onClick={handleCloseDialog}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.active}`
                  : `${styles.navLink}`
              }
            >
              Shopping Cart
            </NavLink>
          </li>
        </ul>
      </div>
    </dialog>
  );
}
