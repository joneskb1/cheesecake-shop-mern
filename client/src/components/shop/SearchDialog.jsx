import styles from './SearchDialog.module.css';

import searchIcon from '../../assets/icons/search.svg';

export default function SearchDialog({
  searchDialogRef,
  cakeCards,
  setCakes,
  searchInput,
  setSearchInput,
  searchMap,
}) {
  const closeDialog = function () {
    searchDialogRef.current.close();
  };

  const searchSubmitExp = function (e) {
    e.preventDefault();

    if (!searchInput) {
      setCakes(cakeCards);
      return searchDialogRef.current.close();
    }

    let results = [];

    const searchTerms = searchInput.split(' ');

    const hits = searchTerms.filter((term) => searchMap.has(term));

    hits.forEach((hit) => {
      results = [...results, ...searchMap.get(hit)];
    });

    setCakes(results);
    searchDialogRef.current.close();
  };

  return (
    <dialog
      className={`${styles.searchDialog}`}
      ref={searchDialogRef}
      onClick={closeDialog}
    >
      <div
        className={styles.innerSearchDialog}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={searchSubmitExp} className={styles.searchWrap}>
          <label htmlFor='search' className={styles.searchLabel}>
            Search
          </label>
          <input
            type='text'
            id='search'
            value={searchInput}
            className={styles.searchInput}
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
      </div>
    </dialog>
  );
}
