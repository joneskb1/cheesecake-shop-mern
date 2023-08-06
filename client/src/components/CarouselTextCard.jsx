import styles from "./CarouselTextCard.module.css";
import { Link } from "react-router-dom";

export default function CarouselTextCard({ name, description }) {
  const path = name.toLowerCase().replace(" ", "-");

  return (
    <div className={styles.carouselTextContainer}>
      <h3 className={styles.carouselHeading}>{name}</h3>
      <p className={styles.carouselDescription}> {description}</p>
      <Link to={`cheesecake/${path}`}>
        <button className={styles.carouselCartBtn}>See Details</button>
      </Link>
    </div>
  );
}
