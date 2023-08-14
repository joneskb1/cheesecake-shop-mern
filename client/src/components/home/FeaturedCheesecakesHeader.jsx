import styles from './FeaturedCheesecakesHeader.module.css';
import chef from '../../assets/icons/chef-icon-31w.png';
import chefLarge from '../../assets/icons/chef-icon-60w.png';

export default function FeaturedCheesecakesHeader() {
  return (
    <>
      <div className={styles.featuredHeaderContainer}>
        <h2 className={styles.featuredText}>Featured Cheesecakes</h2>
        <picture>
          <source media='(min-width: 744px)' srcSet={chefLarge} />
          <img className={styles.chefIcon} src={chef} alt='chef icon' />
        </picture>
      </div>
    </>
  );
}
