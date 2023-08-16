import { Link } from 'react-router-dom';
import styles from './AdminBackLink.module.css';
import returnArrow from '../../assets/icons/return-arrow.svg';

export default function AdminBackLink({ to }) {
  return (
    <Link to={`/admin-${to}`} className={styles.backArrowLink}>
      <img
        src={returnArrow}
        className={styles.previousPageArrow}
        alt='return to previous page'
      />
      <p className={styles.previousPageArrowText}>
        Back to {to[0].toUpperCase() + to.slice(1)}
      </p>
    </Link>
  );
}
