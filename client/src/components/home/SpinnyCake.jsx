import styles from './SpinnyCake.module.css';

import spinnyCake from '../../assets/images/mobile/spinny-cake-260w.png';
import spinnyCakeLarge from '../../assets/images/tablet/spinny-cake-478w.png';
import spinnyCakeXL from '../../assets/images/desktop/spinny-cake-1099w.png';

export default function SpinnyCake({ deg }) {
  return (
    <picture>
      <source media='(min-width: 1440px)' srcSet={spinnyCakeXL} />
      <source media='(min-width: 744px)' srcSet={spinnyCakeLarge} />
      <img
        src={spinnyCake}
        alt='cake that spins'
        className={styles.spinnyCake}
      />
    </picture>
  );
}
