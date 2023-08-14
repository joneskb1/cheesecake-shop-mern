import { Link } from 'react-router-dom';
import styles from './SocialIcons.module.css';

import twitterIcon from '../../assets/icons/twitter.svg';
import pinterestIcon from '../../assets/icons/pinterest.svg';
import instagramIcon from '../../assets/icons/instagram.svg';

export default function SocialIcons() {
  return (
    <ul className={styles.socialIcons}>
      <li>
        <Link className={styles.iconLink}>
          <img
            src={twitterIcon}
            alt='twitter link icon'
            className={styles.twitterIcon}
          />
        </Link>
      </li>
      <li>
        <Link className={styles.iconLink}>
          <img
            src={instagramIcon}
            alt='instagram link icon'
            className={styles.instagramIcon}
          />
        </Link>
      </li>
      <li>
        <Link className={styles.iconLink}>
          <img
            src={pinterestIcon}
            alt='pinterest link icon'
            className={styles.pinterestIcon}
          />
        </Link>
      </li>
    </ul>
  );
}
