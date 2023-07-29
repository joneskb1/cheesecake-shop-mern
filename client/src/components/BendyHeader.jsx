import bendyHeaderMobile from '../assets/images/bent-text.png';
import styles from './BendyHeader.module.css';

export default function BendyHeader() {
  return (
    <>
      {/* mobile */}
      <img
        src={bendyHeaderMobile}
        alt='take the cake header'
        className={styles.header}
      />
    </>
  );
}
