import styles from './YouMayLike.module.css';

import ShopCakeCard from './ShopCakeCard';

export default function YouMayLike({ cakeCards, cake }) {
  const findRandomCakes = function (numRandomCakes) {
    const randomCakeNamesSet = new Set();
    let count = 0;

    while (count < numRandomCakes) {
      const num = Math.floor(Math.random() * cakeCards.length);
      const randomCakeName = cakeCards[num].name;

      if (
        !randomCakeNamesSet.has(randomCakeName) &&
        randomCakeName !== cake.name
      ) {
        randomCakeNamesSet.add(randomCakeName);
        count++;
      }
    }

    return cakeCards.filter((cakeCard) =>
      randomCakeNamesSet.has(cakeCard.name)
    );
  };

  const randomCakes = findRandomCakes(3);

  return (
    <>
      <h4 className={styles.youMayLikeHeader}>You May Also Like</h4>
      {randomCakes.map((cake, index) => (
        <ShopCakeCard key={index} src={cake.img}>
          {cake.name}
        </ShopCakeCard>
      ))}
    </>
  );
}
