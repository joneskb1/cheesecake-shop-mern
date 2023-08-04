import styles from "./ContactScreen.module.css";
import ContactHeader from "../components/contact/ContactHeader";
import ContactForm from "../components/contact/ContactForm";
import topCake from "../assets/images/contact-cake-small.png";
import bottomCake from "../assets/images/contact-cake-large.png";

export default function ContactScreen() {
  return (
    <div className={styles.contactContainer}>
      <img className={styles.topCake} src={topCake} alt="blueberry cake" />
      <ContactHeader />
      <ContactForm />
      <img
        className={styles.bottomCake}
        src={bottomCake}
        alt="strawberry cake"
      />
    </div>
  );
}
