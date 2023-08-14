import styles from './BendyHeader.module.css';

import bendyHeaderMobile from '../../assets/images/mobile/bent-text.png';
import bendyHeaderLarge from '../../assets/images/tablet/bent-text-358w.png';
import bendyHeaderXL from '../../assets/images/desktop/bent-text-806w.png';

export default function BendyHeader() {
  return (
    <>
      <picture>
        <source media='(min-width: 1440px)' srcSet={bendyHeaderXL} />
        <source media='(min-width: 744px)' srcSet={bendyHeaderLarge} />
        <img
          src={bendyHeaderMobile}
          alt='take the cake header'
          className={styles.header}
        />
      </picture>
    </>
  );
}
