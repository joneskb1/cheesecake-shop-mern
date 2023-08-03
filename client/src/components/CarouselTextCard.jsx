import styles from './CarouselTextCard.module.css';

export default function CarouselTextCard({ name, description }) {
  return (
    <div className={styles.carouselTextContainer}>
      <h3 className={styles.carouselHeading}>{name}</h3>
      <p className={styles.carouselDescription}> {description}</p>
      <button className={styles.carouselCartBtn}>See Details</button>
    </div>
  );
}
