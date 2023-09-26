import { useState } from 'react';
import styles from './ForgotPassword.module.css';
import { useForgotPasswordMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const [forgotPassword] = useForgotPasswordMutation();

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const res = await forgotPassword({ email });

      if (res.data.status === 'success') {
        toast.success('email sent!');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <form className={styles.forgotPassword} onSubmit={handleFormSubmit}>
      <h1 className={styles.forgotPasswordHeader}>Forgot Password?</h1>
      <div className={styles.textInputWrap}>
        <label htmlFor='email' className={styles.textInputLabel}>
          Email
        </label>
        <input
          required
          type='text'
          name='email'
          id='email'
          className={styles.textInput}
          onChange={(e) => setEmail(e.target.value)}
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
