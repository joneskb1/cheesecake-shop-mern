import styles from './HomeScreen.module.css';
import CtaCard from '../components/CtaCard';
import FeaturedCheesecakesHeader from '../components/FeaturedCheesecakesHeader';
import Carousel from '../components/Carousel';
import About from '../components/About';
import BendyHeader from '../components/BendyHeader';
import SpinnyCake from '../components/SpinnyCake';

export default function HomeScreen() {
  return (
    <div className={styles.homeScreenWrap}>
      <div className={styles.heroContainer}>
        <CtaCard />
      </div>
      <FeaturedCheesecakesHeader />
      <Carousel />
      <About />
      <BendyHeader />
      <SpinnyCake />
    </div>
  );
}
