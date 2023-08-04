import { useParams } from 'react-router-dom';

// import styles from './CheesecakeScreen.module.css';

import PreviousPageArrowLink from '../components/PreviousPageArrowLink';
import SingleCakeHeader from '../components/SingleCakeHeader';
import SingleCakeImg from '../components/SingleCakeImg';
import CakeDetailsCard from '../components/CakeDetailsCard';
import CakeIconsMarquee from '../components/CakeIconsMarquee';
import YouMayLike from '../components/YouMayLike';

export default function CheesecakeScreen({ cakeCards }) {
  const params = useParams();
  const paramsCakeName = params.id.split('-').join(' ');

  const cake = cakeCards.find(
    (cakeCard) => cakeCard.name.toLowerCase() === paramsCakeName
  );

  return (
    <>
      <PreviousPageArrowLink />
      <SingleCakeHeader name={cake.name} />
      <SingleCakeImg cake={cake} />
      <CakeDetailsCard cake={cake} />
      <CakeIconsMarquee />
      <YouMayLike cakeCards={cakeCards} cake={cake} />
    </>
  );
}
