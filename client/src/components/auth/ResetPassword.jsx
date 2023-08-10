import { useState } from 'react';
import styles from './ResetPassword.module.css';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <form className={styles.resetPassword}>
      <h1 className={styles.resetPasswordHeader}>Reset Password</h1>

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

      <button className={styles.resetPasswordBtn}>Reset Password</button>
    </form>
  );
}
