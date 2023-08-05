import { Outlet } from 'react-router-dom';
import styles from './AuthScreen.module.css';

export default function AuthScreen() {
  return (
    <div className={styles.auth}>
      <Outlet />
    </div>
  );
}
