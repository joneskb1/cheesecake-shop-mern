import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CreateVariantForm.module.css';

import AdminFormBtn from '../../components/admin/AdminFormBtn';
import { useEditVariantMutation } from '../../slices/productsSlice';
import { toast } from 'react-toastify';

const editVariantBtnStyles = {
  color: 'white',
  background: 'var(--purple)',
  maxWidth: '700px',
  marginBottom: '5px',
  marginTop: '5px',
};
const cancelVariantBtnStyles = {
  color: 'white',
  background: 'var(--blue)',
  maxWidth: '700px',
};

export default function EditVariantForm({
  setEditVariant,
  editingVariantId,
  variants,
}) {
  const currentVariant = variants.filter((el) => el._id == editingVariantId)[0];

  const [variantPrice, setVariantPrice] = useState(currentVariant.price);
  const [variantSize, setVariantSize] = useState(currentVariant.size);
  const [variantStock, setVariantStock] = useState(currentVariant.stock);
  const { id } = useParams();

  const [editVariant] = useEditVariantMutation();

  async function handleEditVariant(e) {
    e.preventDefault();

    try {
      const res = await editVariant({
        id: id,
        variant: {
          price: variantPrice,
          size: variantSize,
          stock: variantStock,
          id: editingVariantId,
        },
      }).unwrap();
      toast.success('Variant edited');
      setEditVariant(false);
    } catch (error) {
      toast.error(error.data.message || 'Variant could not be edited');
    }
  }

  return (
    <form className={styles.createVariantForm} onSubmit={handleEditVariant}>
      <label htmlFor='product-name' className={styles.textInputLabel}>
        Price
      </label>
      <input
        type='text'
        name='product-name'
        id='product-name'
        className={styles.textInput}
        value={variantPrice}
        onChange={(e) => setVariantPrice(e.target.value)}
      />
      <label htmlFor='product-name' className={styles.textInputLabel}>
        Size
      </label>
      <input
        type='text'
        name='product-name'
        id='product-name'
        className={styles.textInput}
        value={variantSize}
        onChange={(e) => setVariantSize(e.target.value)}
      />
      <label htmlFor='product-name' className={styles.textInputLabel}>
        Stock
      </label>
      <input
        type='text'
        name='product-name'
        id='product-name'
        className={styles.textInput}
        value={variantStock}
        onChange={(e) => setVariantStock(e.target.value)}
      />
      <AdminFormBtn propStyles={editVariantBtnStyles}>
        Edit Variant
      </AdminFormBtn>
      <AdminFormBtn
        onClick={() => setEditVariant((prevState) => !prevState)}
        propStyles={cancelVariantBtnStyles}
      >
        Cancel Edit
      </AdminFormBtn>
    </form>
  );
}
