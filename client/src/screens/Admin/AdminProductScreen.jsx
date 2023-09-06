import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './AdminProductScreen.module.css';

import AdminFormHeader from '../../components/admin/AdminFormHeader';
import AdminProductForm from '../../components/admin/AdminProductForm';
import BaseProductFormInputs from '../../components/admin/BaseProductFormInputs';
import AdminFormBtn from '../../components/admin/AdminFormBtn';
import CreateVariantForm from '../../components/admin/CreateVariantForm';
import VariantPreview from '../../components/admin/VariantPreview';
import AdminBackLink from '../../components/admin/AdminBackLink';
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useCloneImageMutation,
  useDeleteProductMutation,
} from '../../slices/productsSlice.js';
import PageLoader from '../../components/PageLoader.jsx';

const updateBtnStyles = {
  color: 'var(--black)',
  background: 'var(--green)',
  marginBottom: '5px',
};

const createVariantBtnStyles = {
  color: 'white',
  background: 'var(--purple)',
  maxWidth: '700px',
  marginBottom: '5px',
  marginTop: '5px',
};

const deleteProductBtnStyles = {
  color: 'white',
  background: 'var(--error)',
  marginTop: '5px',
};

export default function AdminProductScreen({
  userChangedImageFile,
  setUserChangedImageFile,
}) {
  const [createVariant, setCreateVariant] = useState(false);
  const [isVariants] = useState(true);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productImage, setProductImage] = useState('');
  const [originalImg, setOriginalImg] = useState('');

  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const previousName = useRef('');
  const fileInputRef = useRef('');

  const { data, isLoading } = useGetProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [cloneImage] = useCloneImageMutation();
  const [deleteProduct] = useDeleteProductMutation();

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
    productImage,
    setProductImage,
    error,
    setError,
  };

  async function handleEditProduct(e) {
    e.preventDefault();

    if (userChangedImageFile) {
      try {
        const res = await cloneImage({ productImage, productName }).unwrap();

        if (res.status === 'success') {
          console.log('CLONE');
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
    }

    const res = await updateProduct({
      id,
      productName,
      productDescription,
      productPrice,
      productSize,
      productStock,
      productImage,
      previousName: previousName.current,
      userChangedImageFile,
    }).unwrap();
    setOriginalImg(res.data.data.image);
    setProductImage('');
    previousName.current = productName;
    setUserChangedImageFile(false);
    fileInputRef.current.value = '';
  }

  useEffect(() => {
    if (data) {
      setProductName(data.data.product.name || '');
      setProductDescription(data.data.product.description || '');
      setProductPrice(data.data.product.variant[0].price || '');
      setProductSize(data.data.product.variant[0].size || '');
      setProductStock(data.data.product.variant[0].stock || '');
      setProductImage(data.data.product.image || '');
      setOriginalImg(data.data.product.image || '');
      previousName.current = data.data.product.name;
    }
  }, [data]);

  async function handleDeleteProduct(e) {
    e.preventDefault();
    try {
      await deleteProduct({ id });
      navigate('/admin-products');
    } catch (error) {
      setError(error.data.message);
      toast.error(error.data.message, {
        hideProgressBar: false,
        progress: undefined,
      });
    }
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={styles.screen}>
      <AdminBackLink to='products' />

      <AdminProductForm formHandler={handleEditProduct}>
        <AdminFormHeader>Edit Product</AdminFormHeader>
        <BaseProductFormInputs
          fileInputRef={fileInputRef}
          originalImg={originalImg}
          userChangedImageFile={userChangedImageFile}
          setUserChangedImageFile={setUserChangedImageFile}
          formState={formState}
        />
        <AdminFormBtn propStyles={updateBtnStyles}>Update Product</AdminFormBtn>
        {!createVariant && (
          <AdminFormBtn
            onClick={() => setCreateVariant((prevState) => !prevState)}
            propStyles={createVariantBtnStyles}
          >
            Create Variant
          </AdminFormBtn>
        )}
      </AdminProductForm>
      <AdminFormBtn
        propStyles={deleteProductBtnStyles}
        onClick={handleDeleteProduct}
      >
        Delete Product
      </AdminFormBtn>

      {createVariant && (
        <CreateVariantForm setCreateVariant={setCreateVariant} />
      )}

      {isVariants && (
        <>
          <h3 className={styles.variantsHeader}>Variants</h3>
          {/* map through previews */}
          <VariantPreview />
          <VariantPreview />
          <VariantPreview />
        </>
      )}
    </div>
  );
}
