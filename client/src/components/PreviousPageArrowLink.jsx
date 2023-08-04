import { Link } from 'react-router-dom';
import styles from './PreviousPageArrowLink.module.css';

import returnArrow from '../assets/icons/return-arrow.svg';

export default function PreviousPageArrowLink() {
  return (
    <Link to='/cheesecakes' className={styles.backArrowLink}>
      <div className={styles.previousPageArrowWrap}>
        <img
          src={returnArrow}
          className={styles.previousPageArrow}
          alt='return to previous page'
        />
        <p className={styles.previousPageArrowText}>Back To Cheesecakes</p>
      </div>
    </Link>
  );
}
