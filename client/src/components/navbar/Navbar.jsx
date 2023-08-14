import styles from './Navbar.module.css';

import Logo from './Logo';
import MobileNav from './MobileNav';
import Navigation from './Navigation';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Logo />
        <MobileNav />
        <Navigation />
      </nav>
    </header>
  );
}
