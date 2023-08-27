import { useRef } from 'react';
import styles from './MobileNav.module.css';
import NavDialog from './NavDialog';
import hamburger from '../../assets/icons/hamburger.svg';

export default function MobileNav() {
  const dialogRef = useRef(null);

  return (
    <>
      <img
        src={hamburger}
        className={styles.hamburger}
        alt='navigation open icon'
        onClick={() => dialogRef.current.showModal()}
      />
      <NavDialog dialogRef={dialogRef} />
    </>
  );
}
