import styles from './VariantPreview.module.css';

import editIcon from '../../assets/icons/edit.svg';
import trashIcon from '../../assets/icons/trash.svg';
import { useDeleteVariantMutation } from '../../slices/productsSlice.js';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function VariantPreview({
  variant,
  index,
  setEditVariant,
  setCreateVariant,
  setEditingVariantId,
}) {
  const [deleteVariant] = useDeleteVariantMutation();
  const { id } = useParams();

  function handleEditVariantForm(e) {
    setEditVariant(true);
    setCreateVariant(false);
    setEditingVariantId(e.target.dataset.id);
  }

  async function handleDeleteVariant() {
    try {
      const res = await deleteVariant({ id, variantId: variant._id });
      toast.success('Variant deleted');
    } catch (error) {
      toast.error(error.data.message || 'Variant not deleted');
    }
  }

  if (index === 0) return null;
  return (
    <div className={styles.variantWrap}>
      <div className={styles.variant}>
        <div className={styles.variantNum}>Var. {index}</div>
        <div className={styles.variationPrice}>${variant.price}</div>
        <div className={styles.variationPrice}>Stock: {variant.stock}</div>
        <div className={styles.variationPrice}>Size: {variant.size}&quot;</div>
        <img
          src={editIcon}
          alt='edit button'
          className={styles.editIcon}
          onClick={handleEditVariantForm}
          data-id={variant._id}
        />
        <img
          src={trashIcon}
          onClick={handleDeleteVariant}
          alt='trash button'
          className={styles.trashIcon}
        />
      </div>
    </div>
  );
}
