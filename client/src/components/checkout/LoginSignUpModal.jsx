import { Link } from 'react-router-dom';
import closeX from '../../assets/icons/close-x.svg';
import styles from './LoginSignUpModal.module.css';

export default function LoginSignUpModal({ setIsLoginModalOpen }) {
  return (
    <>
      <div className={styles.loginSignUpModal}>
        <img
          className={styles.closeBtn}
          onClick={() => setIsLoginModalOpen(false)}
          src={closeX}
          alt='close button'
          width='15px'
          height='15px'
        />
        <p>
          Please <Link to={'/auth/login?redirect=/checkout'}>login</Link> or{' '}
          <Link to={'/auth/create-account?redirect=/checkout'}>sign up</Link> to
          checkout 🍰
        </p>
      </div>
      <div
        className={styles.loginSignUpModalOverlay}
        onClick={() => setIsLoginModalOpen(false)}
      ></div>
    </>
  );
}
