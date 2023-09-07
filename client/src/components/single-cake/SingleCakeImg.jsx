import styles from './SingleCakeImg.module.css';

export default function SingleCakeImg({ cake }) {
  return (
    <picture>
      <source
        media='(min-width: 1440px)'
        srcSet={`/src/assets/uploads/clones/xx-large/${
          cake.image.split('.')[0]
        }-732w.${cake.image.split('.')[1]}`}
      />

      <source
        media='(min-width: 744px)'
        srcSet={`/src/assets/uploads/clones/x-large/${
          cake.image.split('.')[0]
        }-436w.${cake.image.split('.')[1]}`}
      />
      <img
        src={`/src/assets/uploads/clones/medium/${
          cake.image.split('.')[0]
        }-265w.${cake.image.split('.')[1]}`}
        alt={`${cake.name} cake image`}
        className={styles.cakeImage}
      />
    </picture>
  );
}
