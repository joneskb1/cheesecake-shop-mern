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

export default function CheesecakeScreen({ cakeCards }) {
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const params = useParams();
  const paramsCakeName = params.id.split('-').join(' ');

  const cake = cakeCards.find(
    (cakeCard) => cakeCard.name.toLowerCase() === paramsCakeName
  );

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
        />
      </div>
    </>
  );
}
