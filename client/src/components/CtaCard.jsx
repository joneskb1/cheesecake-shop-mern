import { NavLink } from 'react-router-dom';
import styles from './CtaCard.module.css';

export default function CtaCard() {
  return (
    <div className={styles.ctaCard}>
      <h1 className={`${styles.ctaText}`}>
        Savor the moment,<br></br> taste the cake.
      </h1>
      <NavLink to='/cheesecakes'>
        <button className={styles.ctaBtn}>Shop</button>
      </NavLink>
    </div>
  );
}
