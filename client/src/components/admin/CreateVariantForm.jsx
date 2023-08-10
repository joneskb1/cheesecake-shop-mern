import { useState } from 'react';
import styles from './CreateVariantForm.module.css';

import AdminFormBtn from '../../components/admin/AdminFormBtn';

const createVariantBtnStyles = {
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

export default function CreateVariantForm({ setCreateVariant }) {
  const [variantPrice, setVariantPrice] = useState('');
  const [variantSize, setVariantSize] = useState('');
  const [variantStock, setVariantStock] = useState('');
  return (
    <form className={styles.createVariantForm}>
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
      <AdminFormBtn propStyles={createVariantBtnStyles}>
        Create Variant
      </AdminFormBtn>
      <AdminFormBtn
        onClick={() => setCreateVariant((prevState) => !prevState)}
        propStyles={cancelVariantBtnStyles}
      >
        Cancel Variant
      </AdminFormBtn>
    </form>
  );
}
