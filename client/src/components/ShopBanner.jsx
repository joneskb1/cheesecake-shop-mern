import styles from './ShopBanner.module.css';

import smallCake from '../assets/images/banner-small-cake-99w.png';
import largeCake from '../assets/images/banner-large-cake-139w.png';

export default function ShopBanner() {
  return (
    <>
      <div className={styles.banner}>
        <h3 className={styles.bannerText}>Divine Decadence Awaits</h3>
        <img
          src={smallCake}
          alt='small cake'
          className={`${styles.bannerCake} ${styles.smallCake}`}
        />
        <img
          src={largeCake}
          alt='large cake'
          className={`${styles.bannerCake} ${styles.largeCake}`}
        />
      </div>
    </>
  );
}
