import styles from "./ContactForm.module.css";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} action="">
        <label className={styles.label} htmlFor="name">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className={styles.label} htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          className={styles.input}
          type="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label className={styles.label} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="6"
          cols="30"
          className={`${styles.input} ${styles.message}`}
          type="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className={styles.btn}>Send Message</button>
      </form>
    </div>
  );
}
