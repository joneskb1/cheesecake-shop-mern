import styles from './CarouselImg.module.css';

export default function CarouselImg({ srcSmall, srcLarge, srcXL }) {
  return (
    <picture>
      <source media='(min-width: 1440px)' srcSet={srcXL} />
      <source media='(min-width: 744px)' srcSet={srcLarge} />
      <img src={srcSmall} alt='cheesecake image' className={styles.img} />
    </picture>
  );
}
