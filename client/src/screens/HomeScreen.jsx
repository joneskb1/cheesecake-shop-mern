import { useScroll } from 'framer-motion';
import { useEffect } from 'react';

import styles from './HomeScreen.module.css';
import CtaCard from '../components/CtaCard';
import FeaturedCheesecakesHeader from '../components/FeaturedCheesecakesHeader';
import Carousel from '../components/Carousel';
import About from '../components/About';
import BendyHeader from '../components/BendyHeader';
import SpinnyCake from '../components/SpinnyCake';

export default function HomeScreen() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <div className={styles.heroContainer}>
        <CtaCard />
        <FeaturedCheesecakesHeader />
        <Carousel />
        <About />
        <BendyHeader />
        <SpinnyCake />
      </div>
    </>
  );
}
