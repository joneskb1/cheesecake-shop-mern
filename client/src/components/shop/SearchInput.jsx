import styles from './SearchInput.module.css';
import searchIcon from '../../assets/icons/search-icon.svg';

export default function SearchInput() {
  return (
    <form className={styles.searchWrap}>
      <input
        type='text'
        placeholder='Search'
        id='search'
        className={styles.searchInput}
      />
      <button className={styles.submitSearchBtn}>
        <img
          src={searchIcon}
          alt='submit button'
          className={styles.searchIcon}
        />
      </button>
    </form>
  );
}
