import styles from './CarouselTextCard.module.css';
import { Link } from 'react-router-dom';

export default function CarouselTextCard({
  name,
  description,
  tabIndex,
  onFocus,
  id,
}) {
  return (
    <div className={styles.carouselTextContainer}>
      <h3 className={styles.carouselHeading}>{name}</h3>
      <p className={styles.carouselDescription}> {description}</p>
      <Link
        tabIndex={tabIndex}
        to={`cheesecake/${id}`}
        className={styles.carouselCartBtn}
        onFocus={onFocus}
      >
        See Details
      </Link>
    </div>
  );
}
