import styles from './About.module.css';
import cake from '../../assets/images/mobile/about-cake-245w.jpg';
import cakeLarge from '../../assets/images/tablet/about-cake-362w.jpg';
import cakeXL from '../../assets/images/desktop/about-cake-387w.jpg';

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.aboutHeading}>
        About Take The Cake <br className={styles.break}></br>Cheesecake Company
      </h2>

      <div className={styles.aboutContentWrap}>
        <picture>
          <source media='(min-width: 1440px)' srcSet={cakeXL} />
          <source media='(min-width: 744px)' srcSet={cakeLarge} />
          <img className={styles.aboutImg} src={cake} alt='cheesecake' />
        </picture>
        <div className={styles.aboutTextContainer}>
          <p className={styles.aboutParagraph}>
            Welcome to Take The Cake, your premier online destination for
            heavenly cheesecakes that will satisfy your sweet tooth and elevate
            any occasion. Our team of skilled bakers and pastry chefs pour their
            passion and expertise into each cheesecake, using time-honored
            recipes and innovative techniques to achieve the perfect balance of
            creaminess, richness, and velvety smooth texture. We prioritize
            quality and strive for excellence in every aspect of our
            cheesecake-making process, from the sourcing of ingredients to the
            packaging and delivery of your order.
          </p>
        </div>
      </div>
    </div>
  );
}
