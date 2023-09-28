import styles from './SpinnyCake.module.css';
import { useEffect, useState, useRef } from 'react';
import spinnyCake from '../../assets/images/mobile/spinny-cake-260w.png';
import spinnyCakeLarge from '../../assets/images/tablet/spinny-cake-478w.png';
import spinnyCakeXL from '../../assets/images/desktop/spinny-cake-1099w.png';

export default function SpinnyCake() {
  const [deg, setDeg] = useState(0);
  const refDef = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > refDef.current) {
        setDeg((prev) => prev + 1);
      } else {
        setDeg((prev) => prev - 1);
      }
      refDef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <picture className={styles.spinCakeWrap}>
      <source media='(min-width: 1440px)' srcSet={spinnyCakeXL} />
      <source media='(min-width: 744px)' srcSet={spinnyCakeLarge} />
      <img
        src={spinnyCake}
        alt='cake that spins'
        className={styles.spinnyCake}
        style={{ transform: `rotate(${deg}deg)` }}
      />
    </picture>
  );
}
