import styles from './FeaturedCheesecakesHeader.module.css';
import chef from '../assets/icons/chef-icon-31w.png';

export default function FeaturedCheesecakesHeader() {
  return (
    <>
      <div className={styles.featuredHeaderContainer}>
        <img className={styles.chefIcon} src={chef} alt='chef icon' />
        <h2 className={styles.featuredText}>Featured Cheesecakes</h2>
      </div>
    </>
  );
}
