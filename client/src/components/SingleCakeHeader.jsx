import styles from './SingleCakeHeader.module.css';

export default function SingleCakeHeader({ name }) {
  return <h1 className={styles.cakeHeader}>{name}</h1>;
}
