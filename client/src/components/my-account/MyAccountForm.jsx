import { useState } from 'react';
import styles from './MyAccountForm.module.css';

export default function MyAccountForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <div className={styles.myAccountForms}>
      <h2 className={styles.formHeader}>My Info</h2>
      <div className={styles.formsWrap}>
        <form className={styles.accountForm}>
          <label htmlFor='name' className={styles.myAccountInputLabel}>
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            className={styles.myAccountTextInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='email' className={styles.myAccountInputLabel}>
            Email
          </label>
          <input
            type='text'
            name='email'
            id='email'
            className={styles.myAccountTextInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.myAccountFormBtn}>Update Account</button>
        </form>
        <form>
          <label htmlFor='password' className={styles.myAccountInputLabel}>
            Password
          </label>
          <input
            type='text'
            name='password'
            id='password'
            className={styles.myAccountTextInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor='password-confirm'
            className={styles.myAccountInputLabel}
          >
            Confirm Password
          </label>
          <input
            type='text'
            name='password-confirm'
            id='password-confirm'
            className={styles.myAccountTextInput}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button className={styles.myAccountFormBtn}>Reset Password</button>
        </form>
      </div>
    </div>
  );
}
