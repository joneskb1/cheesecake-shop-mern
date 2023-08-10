import Marquee from 'react-fast-marquee';
import styles from './CakeIconsMarquee.module.css';

import purpleCakeIcon from '../../assets/icons/purple-cake.svg';
import pinkCakeIcon from '../../assets/icons/pink-cake.svg';
import greenCakeIcon from '../../assets/icons/green-cake.svg';
import magentaCakeIcon from '../../assets/icons/magenta-cake.svg';
import blueCakeIcon from '../../assets/icons/blue-cake.svg';

export default function CakeIconsMarquee() {
  return (
    <Marquee
      autoFill={true}
      speed={10}
      loop={0}
      style={{
        background: 'var(--light-purple)',
        height: '75px',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginBottom: '3rem',
      }}
    >
      <div className={styles.marqueeItemWrap}>
        <img
          src={pinkCakeIcon}
          alt='pink cake'
          className={`${styles.marqueeIcon} ${styles.pinkCakeIcon}`}
        />
      </div>
      <div className={styles.marqueeItemWrap}>
        <img
          src={greenCakeIcon}
          alt='green cake'
          className={`${styles.marqueeIcon} ${styles.greenCakeIcon}`}
        />
      </div>
      <div className={styles.marqueeItemWrap}>
        <img
          src={magentaCakeIcon}
          alt='magenta cake'
          className={`${styles.marqueeIcon} ${styles.magentaCakeIcon}`}
        />
      </div>

      <div className={styles.marqueeItemWrap}>
        <img
          src={purpleCakeIcon}
          alt='magenta cake'
          className={`${styles.marqueeIcon} ${styles.purpleCakeIcon}`}
        />
      </div>
      <div className={styles.marqueeItemWrap}>
        <img
          src={blueCakeIcon}
          alt='blue cake'
          className={`${styles.marqueeIcon} ${styles.blueCakeIcon}`}
        />
      </div>
    </Marquee>
  );
}
