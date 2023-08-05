import { useState } from 'react';
import styles from './CreateAccount.module.css';

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <form className={styles.createAccount}>
      <h1 className={styles.createAccountHeader}>Create Account</h1>
      <div className={styles.textInputWrap}>
        <label htmlFor='name' className={styles.textInputLabel}>
          Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          className={styles.textInput}
          onChange={(e) => setName(e.value.target)}
          value={name}
        />
      </div>
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
      <div className={styles.textInputWrap}>
        <label htmlFor='password' className={styles.textInputLabel}>
          Password
        </label>
        <input
          type='text'
          name='password'
          id='password'
          className={styles.textInput}
          onChange={(e) => setPassword(e.value.target)}
          value={password}
        />
      </div>
      <div className={styles.textInputWrap}>
        <label htmlFor='password-confirm' className={styles.textInputLabel}>
          Password Confirm
        </label>
        <input
          type='text'
          name='password-confirm'
          id='password-confirm'
          className={styles.textInput}
          onChange={(e) => setPasswordConfirm(e.value.target)}
          value={passwordConfirm}
        />
      </div>

      <button className={styles.createAccountBtn}>Create Account</button>
    </form>
  );
}
