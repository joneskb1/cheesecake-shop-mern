import { useParams } from 'react-router-dom';
import PreviousPageArrowLink from '../components/PreviousPageArrowLink';

import styles from './CheesecakeScreen.module.css';

export default function CheesecakeScreen({ cakeCards }) {
  const params = useParams();
  const cakeName = params.id.split('-').join(' ');

  const cake = cakeCards.find(
    (cakeCard) => cakeCard.name.toLowerCase() === cakeName
  );

  return (
    <>
      <PreviousPageArrowLink />
      <h1 className={styles.cakeHeader}>{cake.name}</h1>
    </>
  );
}
