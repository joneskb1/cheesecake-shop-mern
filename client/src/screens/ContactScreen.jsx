import styles from './ContactScreen.module.css';
import ContactHeader from '../components/contact/ContactHeader';
import ContactForm from '../components/contact/ContactForm';
import topCake from '../assets/images/mobile/contact-cake-small.png';
import bottomCake from '../assets/images/mobile/contact-cake-large.png';
import topCakeLarge from '../assets/images/tablet/contact-cake-small-254w.png';
import topCakeXL from '../assets/images/desktop/contact-cake-472w.png';
import bottomCakeXL from '../assets/images/desktop/cart-cake-802w.png';

export default function ContactScreen() {
  return (
    <div className={styles.contactContainer}>
      <picture>
        <source media='(min-width: 1440px)' srcSet={topCakeXL} />

        <source media='(min-width: 744px)' srcSet={topCakeLarge} />
        <img className={styles.topCake} src={topCake} alt='blueberry cake' />
      </picture>
      <ContactHeader />
      <ContactForm />
      <picture>
        <source media='(min-width: 1440px)' srcSet={bottomCakeXL} />
        <img
          className={styles.bottomCake}
          src={bottomCake}
          alt='strawberry cake'
        />
      </picture>
    </div>
  );
}
