import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../slices/userApiSlice';
import { loginGlobalState, logoutGlobalState } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await login({
        email,
        password,
      }).unwrap();
      if (res.status === 'success') {
        dispatch(loginGlobalState(res.data.user.isAdmin));
        setError(null);
      } else {
        setError(res.message);
        dispatch(logoutGlobalState());
      }
    } catch (error) {
      setError(error.data.message);
      dispatch(logoutGlobalState());
    }
  }

  return (
    <form className={styles.login} onSubmit={handleLogin}>
      <h1 className={styles.loginHeader}>Login</h1>
      <div className={styles.textInputWrap}>
        <label htmlFor='email' className={styles.textInputLabel}>
          Email
        </label>
        <input
          type='text'
          name='email'
          id='email'
          className={styles.textInput}
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.signUpText}>New customer?</p>
      <Link to={'/auth/create-account'} className={styles.signUpLink}>
        Sign Up
      </Link>
      <button className={styles.loginBtn}>Login</button>
    </form>
  );
}
