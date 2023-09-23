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
import { useGetProductQuery } from '../slices/productsSlice.js';

export default function CheesecakeScreen({
  isLoginModalOpen,
  setIsLoginModalOpen,
}) {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const { id } = useParams();
  let cake;

  const { data, isLoading, error } = useGetProductQuery(id);
  if (error) console.log(error);

  if (isLoading) return <PageLoader />;

  if (data) {
    cake = data.data.product;
  }

  return (
    <>
      <div className={styles.container}>
        <PreviousPageArrowLink link={'/cheesecakes'}>
          Back To Cheesecakes
        </PreviousPageArrowLink>
        <SingleCakeHeader name={cake.name} />
        <div className={styles.cakeImgDetailWrap}>
          <SingleCakeImg cake={cake} />
          <CakeDetailsCard
            key={cake._id}
            cake={cake}
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
        {/* 
        {isMiniCartOpen && (
          <MiniCart
            isMiniCartOpen={isMiniCartOpen}
            setIsMiniCartOpen={setIsMiniCartOpen}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />
        )} */}

        {isLoginModalOpen && (
          <LoginSignUpModal
            setIsLoginModalOpen={setIsLoginModalOpen}
          ></LoginSignUpModal>
        )}
      </div>
    </>
  );
}
