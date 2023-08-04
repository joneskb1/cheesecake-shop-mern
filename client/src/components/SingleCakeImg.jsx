import styles from './SingleCakeImg.module.css';

export default function SingleCakeImg({ cake }) {
  return (
    <img
      src={cake.img}
      alt={`${cake.name} cake image`}
      className={styles.cakeImage}
    />
  );
}
