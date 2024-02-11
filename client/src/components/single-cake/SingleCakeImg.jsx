import styles from './SingleCakeImg.module.css';

export default function SingleCakeImg({ cake }) {
  let img;

  if (import.meta.env.MODE === 'development') {
    img = `/src/assets`;
  }

  return (
    <picture>
      <source
        media='(min-width: 1440px)'
        srcSet={
          img
            ? img +
              `/uploads/clones/xx-large/${cake.image.split('.')[0]}-732w.${
                cake.image.split('.')[1]
              }`
            : `/uploads/clones/xx-large/${cake.image.split('.')[0]}-732w.${
                cake.image.split('.')[1]
              }`
        }
      />

      <source
        media='(min-width: 744px)'
        srcSet={
          img
            ? img +
              `/uploads/clones/x-large/${cake.image.split('.')[0]}-436w.${
                cake.image.split('.')[1]
              }`
            : `/uploads/clones/x-large/${cake.image.split('.')[0]}-436w.${
                cake.image.split('.')[1]
              }`
        }
      />
      <img
        src={
          img
            ? img +
              `/uploads/clones/medium/${cake.image.split('.')[0]}-265w.${
                cake.image.split('.')[1]
              }`
            : `/uploads/clones/medium/${cake.image.split('.')[0]}-265w.${
                cake.image.split('.')[1]
              }`
        }
        alt={`${cake.name} cake image`}
        className={styles.cakeImage}
      />
    </picture>
  );
}
