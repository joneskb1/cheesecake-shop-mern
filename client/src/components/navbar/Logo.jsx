import { NavLink } from 'react-router-dom';
import logo from '../../assets/icons/logo-172w.svg';
import logoLarge from '../../assets/icons/logo-223w.svg';

export default function Logo() {
  return (
    <NavLink to='/'>
      <picture>
        <source srcSet={logoLarge} media='(min-width: 1400px)' />
        <img src={logo} alt='logo' />
      </picture>
    </NavLink>
  );
}
