import styles from './SingleCakeImg.module.css';

export default function SingleCakeImg({ cake }) {
  return (
    <picture>
      <source media='(min-width: 1440px)' srcSet={cake.imgDesktop} />

      <source media='(min-width: 744px)' srcSet={cake.imgTabletLarge} />
      <img
        src={cake.img}
        alt={`${cake.name} cake image`}
        className={styles.cakeImage}
      />
    </picture>
  );
}
