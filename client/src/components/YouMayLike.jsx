import styles from "./YouMayLike.module.css";

import ShopCakeCard from "./ShopCakeCard";
import { useEffect, useCallback, useState } from "react";

export default function YouMayLike({ cakeCards, cake }) {
  const [theRandomCakes, setTheRandomCakes] = useState([]);

  const findRandomCakes = useCallback(
    function (numRandomCakes) {
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
    },
    [cake.name, cakeCards]
  );

  useEffect(() => {
    setTheRandomCakes(findRandomCakes(3));
  }, [cake, findRandomCakes]);

  return (
    <>
      <h4 className={styles.youMayLikeHeader}>You May Also Like</h4>
      {theRandomCakes &&
        theRandomCakes.map((cake, index) => (
          <ShopCakeCard key={index} src={cake.img}>
            {cake.name}
          </ShopCakeCard>
        ))}
    </>
  );
}
