import { Outlet } from 'react-router-dom';

import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import ScrollToTop from '../ScrollToTop';

export default function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
