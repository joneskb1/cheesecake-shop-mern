import styles from './AdminCakeCard.module.css';
export default function AdminCakeCard({ src, name }) {
  return (
    <div className={styles.cakeCardContainer}>
      <img
        src={src}
        alt={`small image of ${name} cake`}
        className={styles.cakeImg}
      />
      <p className={styles.cakeName}>{name}</p>
    </div>
  );
}
