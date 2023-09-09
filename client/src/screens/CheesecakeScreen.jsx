import { useParams } from 'react-router-dom';
import { useState } from 'react';

import styles from './CheesecakeScreen.module.css';

import PreviousPageArrowLink from '../components/single-cake/PreviousPageArrowLink';
import SingleCakeHeader from '../components/single-cake/SingleCakeHeader';
import SingleCakeImg from '../components/single-cake/SingleCakeImg';
import CakeDetailsCard from '../components/single-cake/CakeDetailsCard';
import CakeIconsMarquee from '../components/single-cake/CakeIconsMarquee';
import YouMayLike from '../components/single-cake/YouMayLike';
import MiniCart from '../components/mini-cart/MiniCart';
import LoginSignUpModal from '../components/checkout/LoginSignUpModal';
import PageLoader from '../components/PageLoader';
import { useSelector } from 'react-redux';

export default function CheesecakeScreen({
  isLoginModalOpen,
  setIsLoginModalOpen,
}) {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const { id } = useParams();

  const data = useSelector((state) => state.products);

  let cake;

  if (data) {
    const item = data.filter((cake) => {
      return cake._id === id;
    });
    cake = item[0];
  }

  if (data.length === 0) return <PageLoader />;

  return (
    <>
      <div className={styles.container}>
        <PreviousPageArrowLink />
        <SingleCakeHeader name={cake.name} />
        <div className={styles.cakeImgDetailWrap}>
          <SingleCakeImg cake={cake} />
          <CakeDetailsCard
            cake={cake}
            isMiniCartOpen={isMiniCartOpen}
            setIsMiniCartOpen={setIsMiniCartOpen}
          />
        </div>

        <CakeIconsMarquee />
        <YouMayLike cake={cake} />
        <MiniCart
          isMiniCartOpen={isMiniCartOpen}
          setIsMiniCartOpen={setIsMiniCartOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
        {isLoginModalOpen && (
          <LoginSignUpModal
            setIsLoginModalOpen={setIsLoginModalOpen}
          ></LoginSignUpModal>
        )}
      </div>
    </>
  );
}
