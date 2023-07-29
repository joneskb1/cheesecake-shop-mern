import { NavLink } from 'react-router-dom';
import logo from '../assets/icons/logo-172w.svg';

export default function Logo() {
  return (
    <NavLink to='/'>
      <img src={logo} alt='logo' />
    </NavLink>
  );
}
