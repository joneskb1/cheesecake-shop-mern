import { useUploadImageMutation } from '../../slices/productsSlice';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import styles from './BaseProductFormInputs.module.css';
import { useState } from 'react';

// import uploadIcon from '../../assets/icons/upload.svg';

export default function BaseProductFormInputs({
  setUserChangedImageFile,
  userChangedImageFile,
  formState,
  originalImg,
  fileInputRef,
}) {
  const location = useLocation();
  const [uploadImage] = useUploadImageMutation();
  const {
    productName,
    setProductName,
    productDescription,
    setProductDescription,
    productPrice,
    setProductPrice,
    productSize,
    setProductSize,
    productStock,
    setProductStock,
    error,
    setError,
    productImage,
    setProductImage,
  } = formState;

  const onCreatePage = location.pathname.startsWith('/admin-create-product');

  async function handleImageUpload(e) {
    e.preventDefault();
    if (!e.target.files[0]) {
      setProductImage(null);
      setUserChangedImageFile(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadImage(formData).unwrap();
      if (res.message === 'Image Upload') {
        setError(null);
        setProductImage(res.image);
        toast.success(res.message);
        setUserChangedImageFile(true);
      } else {
        setError(res.message);
        setProductImage(null);
      }
    } catch (error) {
      setError(error?.data?.message);
      toast.error(error?.data?.message);
      setProductImage(null);
    }
  }

  return (
    <>
      <label htmlFor='product-name' className={styles.textInputLabel}>
        Name
      </label>
      <input
        required
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
        required
        type='number'
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
        required
        type='number'
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
        required
        type='number'
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
        required
        name='product-description'
        id='product-description'
        className={styles.adminProductDescription}
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      ></textarea>
      <label htmlFor='image' className={styles.textInputLabel}>
        Image
      </label>
      {onCreatePage && productImage && (
        <img
          src={`/src/assets/uploads/original/${productImage}`}
          className={styles.img}
          alt={productName || 'image'}
        />
      )}

      {!onCreatePage && (
        <img
          src={`/src/assets/uploads/clones/small/${
            originalImg.split('.')[0]
          }-170w.${originalImg.split('.')[1]}?timestamp=${Date.now()}`}
          className={styles.img}
          alt={productName || 'image'}
        />
      )}

      {onCreatePage && productImage && (
        <label htmlFor='image' className={styles.textInputLabel}>
          Edit Image
        </label>
      )}

      {!onCreatePage && (
        <label htmlFor='image' className={styles.textInputLabel}>
          Edit Image
        </label>
      )}

      {!onCreatePage && userChangedImageFile && productImage !== null && (
        <img
          src={`/src/assets/uploads/original/${productImage}`}
          className={styles.img}
          alt={productName || 'image'}
        />
      )}

      <input
        required={onCreatePage}
        type='file'
        name='image'
        id='image'
        className={styles.imageUploadInput}
        onChange={handleImageUpload}
        ref={fileInputRef}
      />

      {/* <div id='image' className={styles.upLoadImageBtn}>
        <img
          src={uploadIcon}
          className={styles.uploadIcon}
          alt='upload image icon'
        />
      </div> */}
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
}
