import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterUserMutation } from '../../slices/userApiSlice';
import { loginGlobalState, logoutGlobalState } from '../../slices/authSlice';

import styles from './CreateAccount.module.css';

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect')
    ? searchParams.get('redirect')
    : '/';

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirect);
    }
  }, [isLoggedIn, navigate, redirect]);

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser({
        name,
        email,
        password,
        passwordConfirm,
      }).unwrap();

      if (res.status === 'success') {
        dispatch(loginGlobalState());
        setError(null);
      } else {
        setError(res.message);
        dispatch(logoutGlobalState());
      }
    } catch (error) {
      dispatch(logoutGlobalState());
      setError(error.data.message);
    }
  };

  return (
    <form className={styles.createAccount} onSubmit={handleRegisterUser}>
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
          onChange={(e) => setName(e.target.value)}
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
      <div className={styles.textInputWrap}>
        <label htmlFor='password-confirm' className={styles.textInputLabel}>
          Password Confirm
        </label>
        <input
          type='text'
          name='password-confirm'
          id='password-confirm'
          className={styles.textInput}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.loginText}>Already a customer?</p>
      <Link to={'/auth/login'} className={styles.loginLink}>
        Login
      </Link>

      <button className={styles.createAccountBtn}>Create Account</button>
    </form>
  );
}
