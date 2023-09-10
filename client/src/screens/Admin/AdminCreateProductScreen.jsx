import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../../slices/productsSlice';
import { useCloneImageMutation } from '../../slices/productsSlice';
import styles from './AdminCreateProductScreen.module.css';

import AdminProductForm from '../../components/admin/AdminProductForm';
import AdminFormHeader from '../../components/admin/AdminFormHeader';
import BaseProductFormInputs from '../../components/admin/BaseProductFormInputs';
import AdminFormBtn from '../../components/admin/AdminFormBtn';
import AdminBackLink from '../../components/admin/AdminBackLink';
import { toast } from 'react-toastify';

export default function AdminCreateProductScreen({
  userChangedImageFile,
  setUserChangedImageFile,
}) {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productStock, setProductStock] = useState('');
  const [error, setError] = useState(null);
  const [productImage, setProductImage] = useState('');
  const [createProduct] = useCreateProductMutation();
  const [cloneImage] = useCloneImageMutation();

  const navigate = useNavigate();

  const formState = {
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
  };

  async function handleCreateProduct(e) {
    e.preventDefault();

    if (!productImage) {
      toast.error('All fields and image upload required', {
        hideProgressBar: false,
        progress: undefined,
      });

      return;
    }
    try {
      const res = await cloneImage({ productImage, productName }).unwrap();

      if (res.status === 'success') {
        toast.success('Images Created', {
          hideProgressBar: false,
          progress: undefined,
        });
        setError(null);
      } else {
        setError(res.message);
        toast.error(res.message, {
          hideProgressBar: false,
          progress: undefined,
        });
      }
    } catch (error) {
      setError(error.data.message);
      toast.error(error.data.message, {
        hideProgressBar: false,
        progress: undefined,
      });
    }

    try {
      const res = await createProduct({
        name: productName,
        description: productDescription,
        price: productPrice,
        size: productSize,
        stock: productStock,
        image: productImage,
      }).unwrap();

      if (res.status === 'success') {
        toast.success('Product Created!', {
          hideProgressBar: false,
          progress: undefined,
        });
        setError(null);
        setProductImage('');
        setProductName('');
        setProductSize('');
        setProductDescription('');
        setProductPrice('');
        setProductStock('');
        setUserChangedImageFile(false);
        navigate(`/admin-products/${res.data.product._id}`, { replace: true });
      } else {
        setError(res.message);
        toast.error(res.message, {
          hideProgressBar: false,
          progress: undefined,
        });
      }
    } catch (error) {
      setError(error.data.message);
      toast.error(error.data.message, {
        hideProgressBar: false,
        progress: undefined,
      });
    }
  }

  return (
    <AdminProductForm formHandler={handleCreateProduct}>
      <AdminBackLink to='products' />
      <AdminFormHeader>Create Product</AdminFormHeader>
      <BaseProductFormInputs
        userChangedImageFile={userChangedImageFile}
        setUserChangedImageFile={setUserChangedImageFile}
        formState={formState}
      />
      <div className={styles.btnWrap}>
        <AdminFormBtn>Create Product</AdminFormBtn>
      </div>
    </AdminProductForm>
  );
}
