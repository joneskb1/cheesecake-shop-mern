import { useRef } from 'react';

import shopScreenStyles from '../../screens/ShopCheesecakesScreen.module.css';
import styles from './SearchBtn.module.css';

import searchIcon from '../../assets/icons/search.svg';
import SearchDialog from './SearchDialog';

export default function SearchBtn({
  setCakes,
  // cakeCards,
  searchInput,
  setSearchInput,
  searchMap,
  data,
}) {
  const searchDialogRef = useRef(null);

  const openSearchDialog = function () {
    searchDialogRef.current.showModal();
  };

  return (
    <>
      <button className={shopScreenStyles.searchBtn}>
        <img
          src={searchIcon}
          alt='search btn'
          className={`${shopScreenStyles.searchIcon} ${styles.searchIcon}`}
          onClick={openSearchDialog}
        />
      </button>

      <SearchDialog
        searchDialogRef={searchDialogRef}
        // cakeCards={cakeCards}
        data={data}
        setCakes={setCakes}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchMap={searchMap}
      />
    </>
  );
}
