import { useState } from 'react';
import styles from './ResetPassword.module.css';
import { useResetPasswordMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [resetPassword] = useResetPasswordMutation();
  const location = useLocation();
  const naviagte = useNavigate();
  const token = location.pathname.split('/')[3];

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const res = await resetPassword({ token, password, passwordConfirm });
      if (res.data.status === 'success') {
        toast.success('password reset!');
        naviagte('/auth/login');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <form className={styles.resetPassword} onSubmit={handleFormSubmit}>
      <h1 className={styles.resetPasswordHeader}>Reset Password</h1>

      <div className={styles.textInputWrap}>
        <label htmlFor='password' className={styles.textInputLabel}>
          Password
        </label>
        <input
          required
          type='text'
          name='password'
          id='password'
          className={styles.textInput}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className={styles.textInputWrap}>
        <label htmlFor='password-confirm' className={styles.textInputLabel}>
          Password Confirm
        </label>
        <input
          required
          type='text'
          name='password-confirm'
          id='password-confirm'
          className={styles.textInput}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />
      </div>

      <button className={styles.resetPasswordBtn}>Reset Password</button>
    </form>
  );
}
