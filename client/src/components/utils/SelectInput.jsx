import { useEffect, useRef, useState } from 'react';
import styles from './SelectInput.module.css';

export default function SelectInput({ options }) {
  const [currentOption, setCurrentOption] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const optionsArr = Array.from({ length: options }, (_, i) => i + 1);

  function handleSelectOption(e) {
    setCurrentOption(e.target.innerHTML);
    setDropdownOpen(false);
  }

  function handleClickOutside(e) {
    if (!dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  }

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div ref={dropdownRef} className={styles.selectInputContainer}>
      {!dropdownOpen && (
        <div className={styles.currentOptionWindow}>{currentOption}</div>
      )}

      {dropdownOpen && (
        <div className={styles.dropDownWindow}>
          <ul>
            {optionsArr.map((option, index) => {
              return (
                <li
                  key={index}
                  className={styles.option}
                  onClick={handleSelectOption}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        className={styles.selectBtn}
        onClick={() => setDropdownOpen((prevState) => !prevState)}
      >
        select
      </button>
    </div>
  );
}
