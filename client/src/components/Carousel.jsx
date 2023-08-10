import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import styles from './Carousel.module.css';
import CarouselImg from './CarouselImg';
import CarouselTextCard from './CarouselTextCard';
import cherry from '../assets/images/mobile/carousel-cherry-335w.jpg';
import chocolate from '../assets/images/mobile/carousel-chocolate-335w.jpg';
import redVelvet from '../assets/images/mobile/carousel-red-velvet-335w.jpg';
import arrowLeftMobile from '../assets/icons/carousel-arrow-left-mobile.svg';
import arrowRightMobile from '../assets/icons/carousel-arrow-right-mobile.svg';

const carouselCards = [
  {
    img: redVelvet,
    name: 'Red Velvet',
    description:
      'This red velvet cheesecake showcases a sumptuous, cocoa-infused crimson base, topped with a silky smooth cream cheese layer',
  },
  {
    img: cherry,
    name: 'Cherry',
    description:
      'This luscious cherry cheesecake tantalized taste buds with its creamy texture, crowned with a vibrant layer of ruby-red cherry compote.',
  },
  {
    img: chocolate,
    name: 'Chocolate Oreo',
    description:
      'This decadent dessert combines the rich, velvety texture of classic cheesecake with the irresistible crunch and indulgent flavor of Oreo cookies.',
  },
  {
    img: redVelvet,
    name: 'Red Velvet',
    description:
      'This red velvet cheesecake showcases a sumptuous, cocoa-infused crimson base, topped with a silky smooth cream cheese layer',
  },
  {
    img: cherry,
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
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isAuto, setIsAuto] = useState(true);

  const slidesRef = useRef([]);
  const carouselRef = useRef(0);
  const trackRef = useRef(null);
  const btnLeftRef = useRef(null);
  const btnRightRef = useRef(null);
  const btnFocusRef = useRef(null);

  // const timerRef = useRef(null);

  const totalSlides = numSlides + 2;

  const pushRef = (slide) => {
    if (slide && slidesRef.current.length < totalSlides) {
      slidesRef.current.push(slide);
    }
  };

  const transition = useCallback(() => {
    trackRef.current.style.transition = `transform ${
      transitionTime / 1000
    }s ease-in-out`;
  }, [transitionTime]);

  const changeSlideRight = useCallback(
    (e) => {
      if (e) {
        setIsBtnDisabled(true);
      }

      if (e && isAuto) {
        setIsAuto(false);
      }

      if (currentSlide < totalSlides - 1) {
        transition();
        setCurrentSlide((prevSlide) => prevSlide + 1);
      }
    },

    [currentSlide, totalSlides, transition, isAuto]
  );

  const changeSlideLeft = (e) => {
    if (e) {
      setIsBtnDisabled(true);
    }

    if (e && isAuto) {
      setIsAuto(false);
    }

    if (currentSlide > 0) {
      transition();
      setCurrentSlide((prevSlide) => prevSlide - 1);
    }
  };

  const handleCloneSlides = () => {
    transition();
    // clearTimeout(timerRef.current);
    if (currentSlide === 0) {
      trackRef.current.style.transition = 'none';
      setCurrentSlide(totalSlides - 2);
    }

    if (currentSlide === totalSlides - 1) {
      trackRef.current.style.transition = 'none';
      setCurrentSlide(1);
    }

    setIsBtnDisabled(false);
  };

  const focusBtn = (e) => {
    if (e.keyCode === 13) {
      btnFocusRef.current = e.target;
    } else {
      btnFocusRef.current = null;
    }
  };

  useLayoutEffect(() => {
    if (slidesRef.current.length > 0) {
      slidesRef.current.forEach((slide) => {
        // const slideNum = Number(slide.classList[1].split('-')[1]);
        const slideNum = Number(slide.dataset.slideNum.split('-')[1]);
        const distance = carouselWidth * slideNum;
        slide.style.left = distance.toString() + 'px';
      });
    }
  }, [slidesRef, carouselWidth]);

  useLayoutEffect(() => {
    const distance = (carouselWidth * currentSlide).toString() + 'px';
    trackRef.current.style.transform = `translateX(-${distance})`;
  }, [currentSlide, carouselWidth]);

  useEffect(() => {
    setCarouselWidth(carouselRef.current.offsetWidth);
  }, [carouselWidth, carouselRef]);

  useEffect(() => {
    let id;
    if (isAuto) {
      id = setTimeout(
        () => {
          // timerRef.current = id;
          changeSlideRight();
        },
        currentSlide === 1 ? slideTime - transitionTime : slideTime
      );
    } else {
      clearTimeout(id);
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

  useEffect(() => {
    if (isBtnDisabled || !btnFocusRef.current) return;
    btnFocusRef.current.focus();
    btnFocusRef.current = null;
  }, [isBtnDisabled]);

  return (
    <section ref={carouselRef} className={styles.carousel}>
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
              <CarouselImg src={card.img} />
              <CarouselTextCard
                name={card.name}
                description={card.description}
              />
            </li>
          );
        })}
      </ul>
      <button
        className={styles.changeSlideBtn}
        onClick={changeSlideLeft}
        disabled={isBtnDisabled}
        ref={btnLeftRef}
        onKeyDown={focusBtn}
      >
        <img src={arrowLeftMobile} alt='change carousel button left' />
      </button>
      <button
        className={`${styles.changeSlideBtn} ${styles.changeSlideBtnRight}`}
        onClick={changeSlideRight}
        disabled={isBtnDisabled}
        ref={btnRightRef}
        onKeyDown={focusBtn}
      >
        <img src={arrowRightMobile} alt='change carousel button right' />
      </button>
    </section>
  );
}
