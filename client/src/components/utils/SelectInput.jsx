import { useEffect, useRef, useState } from 'react';
import downArrow from '../../assets/icons/drop-down.svg';
import styles from './SelectInput.module.css';

// path prop should only be passed in if we need our select options to be selected from object property

export default function SelectInput({
  options = null,
  setter = null,
  path = null,
  style = null,
  startingOption = null,
  children,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);
  const dropdownRef = useRef(null);

  // pathArray will only be assigned if a path prop is passed in, meaning we need to access option from object
  let pathArray;
  let initialOption;

  // if options is an array, use it as options, else create array from options
  const optionsArr = Array.isArray(options)
    ? options
    : Array.from({ length: options }, (_, i) => i + 1);

  // if startingOption prop is present that will be the intitial option
  if (startingOption) {
    initialOption = startingOption;
  } else if (path) {
    // if no startingOption and path exists create array so we can extract initial option from object with reducer function
    pathArray = path.split('.');
    initialOption = pathArray.reduce(
      (obj, key) => obj && obj[key],
      optionsArr[0]
    );
  } else {
    // if no path set initial option to first option
    initialOption = optionsArr[0];
  }

  function handleSelectOption(e) {
    e.preventDefault();
    setDropdownOpen(false);
    setCurrentOption(e.target.innerHTML);
    if (setter) {
      setter(e.target.innerHTML);
    }
  }

  function handleClickOutside(e) {
    // close modal when clicking outside it
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
    <div
      style={style}
      className={styles.labelInputWrap}
      onClick={() => setDropdownOpen((prevState) => !prevState)}
    >
      {/* children are label if provided */}
      {children && <label htmlFor='dropdown'>{children}</label>}
      <div
        ref={dropdownRef}
        id='dropdown'
        className={styles.selectInputContainer}
      >
        <div className={styles.currentOptionWindow}>
          {/* before an option is clicked we show the initial option (bc currentOption is null)and after we show currentOption */}
          {currentOption || initialOption}
        </div>

        {dropdownOpen && (
          <div
            className={styles.dropDownWindow}
            onClick={() => setDropdownOpen((prevState) => !prevState)}
          >
            <ul>
              {optionsArr.map((option, index) => {
                // if we have a path we extract option from object and assign to output else we just set output to option
                let output;

                if (path) {
                  output = pathArray.reduce(
                    (obj, key) => obj && obj[key],
                    option
                  );
                } else {
                  output = option;
                }

                return (
                  <li
                    key={index}
                    className={styles.option}
                    onClick={handleSelectOption}
                  >
                    {output}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <button className={styles.selectBtn}>
          <img
            src={downArrow}
            alt='down arrow for drop down'
            className={styles.dropdownIcon}
          />
        </button>
      </div>
    </div>
  );
}
