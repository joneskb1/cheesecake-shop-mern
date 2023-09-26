import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.css';
import CarouselImg from './CarouselImg';
import CarouselTextCard from './CarouselTextCard';
import cherry from '../../assets/images/mobile/carousel-cherry-335w.jpg';
import chocolate from '../../assets/images/mobile/carousel-chocolate-335w.jpg';
import redVelvet from '../../assets/images/mobile/carousel-red-velvet-335w.jpg';
import cherryLarge from '../../assets/images/tablet/carousel-cherry-550w.jpg';
import chocolateLarge from '../../assets/images/tablet/carousel-chocolate-550w.jpg';
import redVelvetLarge from '../../assets/images/tablet/carousel-red-velvet-550w.jpg';
import cherryXL from '../../assets/images/desktop/carousel-cherry-816w.jpg';
import chocolateXL from '../../assets/images/desktop/carousel-chocolate-816w.jpg';
import redVelvetXL from '../../assets/images/desktop/carousel-red-velvet-816w.jpg';
import arrowLeftMobile from '../../assets/icons/carousel-arrow-left-mobile.svg';
import arrowRightMobile from '../../assets/icons/carousel-arrow-right-mobile.svg';

const carouselCards = [
  {
    img: redVelvet,
    imgLarge: redVelvetLarge,
    imgXL: redVelvetXL,
    name: 'Red Velvet',
    id: '64f8ff2f6c4edd65c886f743',
    description:
      'This red velvet cheesecake showcases a sumptuous, cocoa-infused crimson base, topped with a silky smooth cream cheese layer',
  },
  {
    img: cherry,
    imgLarge: cherryLarge,
    imgXL: cherryXL,
    id: '64f8fec16c4edd65c886f6fd',
    name: 'Cherry',
    description:
      'This luscious cherry cheesecake tantalized taste buds with its creamy texture, crowned with a vibrant layer of ruby-red cherry compote.',
  },
  {
    img: chocolate,
    imgLarge: chocolateLarge,
    imgXL: chocolateXL,
    id: '64f8fed86c4edd65c886f70d',
    name: 'Chocolate Oreo',
    description:
      'This decadent dessert combines the rich, velvety texture of classic cheesecake with the irresistible crunch and indulgent flavor of Oreo cookies.',
  },
  {
    img: redVelvet,
    imgLarge: redVelvetLarge,
    imgXL: redVelvetXL,
    id: '64f8ff2f6c4edd65c886f743',
    name: 'Red Velvet',
    description:
      'This red velvet cheesecake showcases a sumptuous, cocoa-infused crimson base, topped with a silky smooth cream cheese layer',
  },
  {
    img: cherry,
    imgLarge: cherryLarge,
    imgXL: cherryXL,
    id: '64f8fec16c4edd65c886f6fd',
    name: 'Cherry',
    description:
      'This luscious cherry cheesecake tantalized taste buds with its creamy texture, crowned with a vibrant layer of ruby-red cherry compote.',
  },
];

export default function Carousel({
  numSlides = 3,
  transitionTime = 1500,
  slideTime = 5000,
}) {
  const [carouselWidth, setCarouselWidth] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [inMotion, setInMotion] = useState(null);
  const [isAuto, setIsAuto] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const slidesRef = useRef([]);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  const totalSlides = numSlides + 2;

  const pushRef = (slide) => {
    if (slide && slidesRef.current.length < totalSlides) {
      slidesRef.current.push(slide);
    }
  };

  const handleAutoOff = function () {
    if (isAuto) setIsAuto(false);
  };

  const transitionOn = useCallback(() => {
    trackRef.current.style.transition = `transform ${
      transitionTime / 1000
    }s ease-in-out`;
  }, [transitionTime]);

  const changeSlideRight = useCallback(() => {
    setInMotion(true);
    transitionOn();
    setCurrentSlide((prevSlide) => prevSlide + 1);
  }, [transitionOn]);

  const changeSlideLeft = () => {
    setInMotion(true);
    transitionOn();
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const handleSlide = function (direction) {
    if (inMotion) return;

    if (direction === 'right') {
      changeSlideRight();
    }

    if (direction === 'left') {
      changeSlideLeft();
    }
  };

  const handleCloneSlides = () => {
    // when you land on a clone, we move to the original copy without a transition so the user doesn't notice
    if (currentSlide === 0) {
      trackRef.current.style.transition = 'none';
      setCurrentSlide(totalSlides - 2);
    }

    if (currentSlide === totalSlides - 1) {
      trackRef.current.style.transition = 'none';
      setCurrentSlide(1);
    }

    setInMotion(false);
  };

  useEffect(() => {
    // listen for window resize and if carouselRef width changes update carousel width state
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    if (carouselRef.current) {
      if (carouselRef.current.offsetWidth !== carouselWidth) {
        setCarouselWidth(carouselRef.current.offsetWidth);
        // if width changes, we reset carousel and it's smoother with no transition
        trackRef.current.style.transition = 'none';
        setCurrentSlide(1);
      }
    }

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowWidth, carouselWidth]);

  useEffect(() => {
    // positions slides absolutely to create a 'track'
    if (slidesRef.current.length > 0) {
      slidesRef.current.forEach((slide) => {
        const slideNum = Number(slide.dataset.slideNum.split('-')[1]);
        const distance = carouselWidth * slideNum;
        slide.style.left = distance.toString() + 'px';
      });
    }
  }, [slidesRef, carouselWidth]);

  useEffect(() => {
    // guards against currentSlide going past the last slide when users leave page
    if (currentSlide > totalSlides - 1) {
      trackRef.current.style.transition = 'none';
      setCurrentSlide(1);
    } else {
      // regular slide
      const distance = (carouselWidth * currentSlide).toString() + 'px';
      trackRef.current.style.transform = `translateX(-${distance})`;
    }
  }, [currentSlide, carouselWidth, totalSlides]);

  useEffect(() => {
    let id;
    if (isAuto) {
      if (currentSlide > totalSlides - 1) {
        trackRef.current.style.transition = 'none';
        setCurrentSlide(1);
      } else {
        id = setTimeout(
          () => {
            changeSlideRight();
          },
          currentSlide === 1 ? slideTime - transitionTime : slideTime
        );
      }
    }

    return () => {
      clearTimeout(id);
    };
  }, [
    changeSlideRight,
    currentSlide,
    totalSlides,
    transitionTime,
    slideTime,
    isAuto,
  ]);

  return (
    <section
      ref={carouselRef}
      className={styles.carousel}
      onClick={handleAutoOff}
    >
      <button
        className={styles.changeSlideBtn}
        onClick={() => handleSlide('left')}
        onFocus={handleAutoOff}
      >
        <img src={arrowLeftMobile} alt='change carousel button left' />
      </button>
      <button
        className={`${styles.changeSlideBtn} ${styles.changeSlideBtnRight}`}
        onClick={() => handleSlide('right')}
        onFocus={handleAutoOff}
      >
        <img src={arrowRightMobile} alt='change carousel button right' />
      </button>
      <ul
        ref={trackRef}
        onTransitionEnd={handleCloneSlides}
        className={styles.track}
      >
        {carouselCards.map((card, index) => {
          return (
            <li
              key={index}
              ref={pushRef}
              className={styles.slide}
              data-slide-num={`slide-${index}`}
            >
              <div className={styles.carouselCardContentWrap}>
                <CarouselImg
                  srcSmall={card.img}
                  srcLarge={card.imgLarge}
                  srcXL={card.imgXL}
                />
                <CarouselTextCard
                  name={card.name}
                  id={card.id}
                  description={card.description}
                  tabIndex={inMotion || index !== currentSlide ? -1 : 0}
                  onFocus={handleAutoOff}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
