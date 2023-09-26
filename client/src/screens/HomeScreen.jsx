import styles from './HomeScreen.module.css';
import CtaCard from '../components/home/CtaCard';
import FeaturedCheesecakesHeader from '../components/home/FeaturedCheesecakesHeader';
import Carousel from '../components/carousel/Carousel';
import About from '../components/home/About';
import BendyHeader from '../components/home/BendyHeader';
import SpinnyCake from '../components/home/SpinnyCake';

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
      <SpinnyCake  />
    </div>
  );
}
