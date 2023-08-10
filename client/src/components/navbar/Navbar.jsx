import styles from './Navbar.module.css';

import Logo from './Logo';
import MobileNav from './MobileNav';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <MobileNav />
    </nav>
  );
}
