import styles from './Footer.module.css';

import FooterShopBtn from './FooterShopBtn';
import FooterNav from './FooterNav';
import FooterInfo from './FooterInfo';
import SocialIcons from './SocialIcons';

export default function Footer() {
  return (
    <div className={styles.footerWrap}>
      <div className={styles.innerFooterWrap}>
        <FooterShopBtn />
        <FooterNav />
        <FooterInfo />
        <SocialIcons />
      </div>
    </div>
  );
}
