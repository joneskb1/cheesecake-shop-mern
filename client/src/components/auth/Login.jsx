import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/userApiSlice';
import { loginGlobalState, logoutGlobalState } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { search } = useLocation();

  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { isLoggedIn } = useSelector((state) => state.auth);

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

  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect')
    ? searchParams.get('redirect')
    : '/cheesecakes';

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirect);
    }
  }, [isLoggedIn, navigate, redirect]);

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
      <Link
        to={`/auth/create-account?redirect=${redirect}`}
        className={styles.signUpLink}
      >
        Sign Up
      </Link>
      <button className={styles.loginBtn}>Login</button>
    </form>
  );
}
