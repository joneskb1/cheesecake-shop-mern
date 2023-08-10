import { useState } from 'react';
import styles from './BaseProductFormInputs.module.css';

import uploadIcon from '../../assets/icons/upload.svg';

export default function BaseProductFormInputs() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productStock, setProductStock] = useState('');

  return (
    <>
      <label htmlFor='product-name' className={styles.textInputLabel}>
        Name
      </label>
      <input
        type='text'
        name='product-name'
        id='product-name'
        className={styles.textInput}
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <label htmlFor='product-price' className={styles.textInputLabel}>
        Price
      </label>
      <input
        type='text'
        name='product-price'
        id='product-price'
        className={styles.textInput}
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <label htmlFor='product-size' className={styles.textInputLabel}>
        Size
      </label>
      <input
        type='text'
        name='product-size'
        id='product-size'
        className={styles.textInput}
        value={productSize}
        onChange={(e) => setProductSize(e.target.value)}
      />
      <label htmlFor='product-stock' className={styles.textInputLabel}>
        Stock
      </label>
      <input
        type='text'
        name='product-stock'
        id='product-stock'
        className={styles.textInput}
        value={productStock}
        onChange={(e) => setProductStock(e.target.value)}
      />
      <label htmlFor='product-description' className={styles.textInputLabel}>
        Description
      </label>
      <textarea
        name='product-description'
        id='product-description'
        className={styles.adminProductDescription}
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      ></textarea>
      <label htmlFor='image' className={styles.textInputLabel}>
        Image
      </label>
      <div id='image' className={styles.upLoadImageBtn}>
        <img
          src={uploadIcon}
          className={styles.uploadIcon}
          alt='upload image icon'
        />
      </div>
    </>
  );
}
