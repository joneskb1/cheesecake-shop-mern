import spinnyCake from '../assets/images/mobile/spinny-cake-260w.png';
import styles from './SpinnyCake.module.css';

export default function SpinnyCake({ deg }) {
  return (
    <img
      src={spinnyCake}
      alt='cake that spins'
      className={styles.spinnyCake}
      style={{
        transform: `rotate(${deg})`,
        transition: 'all 10s ease-in-out',
      }}
    />
  );
}
