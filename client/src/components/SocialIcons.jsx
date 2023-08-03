import styles from './SocialIcons.module.css';

import twitterIcon from '../assets/icons/twitter.svg';
import pinterestIcon from '../assets/icons/pinterest.svg';
import instagramIcon from '../assets/icons/instagram.svg';

export default function SocialIcons() {
  return (
    <ul className={styles.socialIcons}>
      <li>
        <img src={twitterIcon} alt='' />
      </li>
      <li>
        <img src={instagramIcon} alt='' />
      </li>
      <li>
        <img src={pinterestIcon} alt='' />
      </li>
    </ul>
  );
}
