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
import { useGetProductQuery } from '../slices/productsSlice';
import PageLoader from '../components/PageLoader';

export default function CheesecakeScreen({
  cakeCards,
  isLoginModalOpen,
  setIsLoginModalOpen,
}) {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const { id } = useParams();

  // const cake = cakeCards.find(
  //   (cakeCard) => cakeCard.name.toLowerCase() === 'cherry'
  // );

  const { data, isLoading } = useGetProductQuery(id);
  console.log(isLoading);
  if (isLoading) return <PageLoader />;

  let cake = data.data.product;

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
        <YouMayLike cakeCards={cakeCards} cake={cake} />
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
