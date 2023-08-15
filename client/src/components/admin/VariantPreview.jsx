import styles from './VariantPreview.module.css';

import editIcon from '../../assets/icons/edit.svg';
import trashIcon from '../../assets/icons/trash.svg';

export default function VariantPreview() {
  return (
    <div className={styles.variantWrap}>
      <div className={styles.variant}>
        <div className={styles.variantNum}>Var. 1</div>
        <div className={styles.variationPrice}>$14.99</div>
        <div className={styles.variationPrice}>Stock: 3</div>
        <div className={styles.variationPrice}>Size: 6&quot;</div>
        <img src={editIcon} alt='edit button' className={styles.editIcon} />
        <img src={trashIcon} alt='trash button' className={styles.trashIcon} />
      </div>
    </div>
  );
}
