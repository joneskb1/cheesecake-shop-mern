import styles from './ContactForm.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSendMailMutation } from '../../slices/emailApiSlice';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [sendMail] = useSendMailMutation();

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      const res = await sendMail({ name, email, phone, message });

      if (res.data.status === 'success') {
        toast.success(`message sent!`);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label className={styles.label} htmlFor='name'>
          Full Name
        </label>
        <input
          id='name'
          required
          name='name'
          className={styles.input}
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className={styles.label} htmlFor='email'>
          Email
        </label>
        <input
          required
          id='email'
          name='email'
          className={styles.input}
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className={styles.label} htmlFor='phone'>
          Phone
        </label>
        <input
          id='phone'
          name='phone'
          className={styles.input}
          type='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label className={styles.label} htmlFor='message'>
          Message
        </label>
        <textarea
          required
          id='message'
          name='message'
          rows='6'
          cols='30'
          className={`${styles.input} ${styles.message}`}
          type='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className={styles.btn}>Send Message</button>
      </form>
    </div>
  );
}
