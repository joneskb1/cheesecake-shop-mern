import styles from './SearchInput.module.css';
import searchIcon from '../../assets/icons/search-icon.svg';

export default function SearchInput({
  setCakes,
  searchInput,
  setSearchInput,
  searchMap,
  data,
}) {
  const searchSubmitExp = function (e) {
    e.preventDefault();
    console.log(searchInput);
    if (searchInput === '') {
      return setCakes(data.data.products);
    }

    let results = [];

    const searchTerms = searchInput.split(' ');

    const hits = searchTerms.filter((term) => searchMap.has(term));

    hits.forEach((hit) => {
      results = [...results, ...searchMap.get(hit)];
    });

    setCakes(results);
  };

  return (
    <form className={styles.searchWrap} onSubmit={searchSubmitExp}>
      <input
        type='text'
        placeholder='Search'
        id='search'
        className={styles.searchInput}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
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
