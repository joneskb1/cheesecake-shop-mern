import { useState } from 'react';
import styles from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  return (
    <form className={styles.forgotPassword}>
      <h1 className={styles.forgotPasswordHeader}>Forgot Password?</h1>
      <div className={styles.textInputWrap}>
        <label htmlFor='email' className={styles.textInputLabel}>
          Email
        </label>
        <input
          type='text'
          name='email'
          id='email'
          className={styles.textInput}
          onChange={(e) => setEmail(e.value.target)}
          value={email}
        />
      </div>
      <p className={styles.resetPwMsg}>
        A reset password link will be sent <br className={styles.break} /> to
        your email.
      </p>
      <button className={styles.forgotPwBtn}>Submit</button>
    </form>
  );
}
