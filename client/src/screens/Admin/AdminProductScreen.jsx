import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './AdminProductScreen.module.css';

import AdminFormHeader from '../../components/admin/AdminFormHeader';
import AdminProductForm from '../../components/admin/AdminProductForm';
import BaseProductFormInputs from '../../components/admin/BaseProductFormInputs';
import AdminFormBtn from '../../components/admin/AdminFormBtn';
import CreateVariantForm from '../../components/admin/CreateVariantForm';
import VariantPreview from '../../components/admin/VariantPreview';
import AdminBackLink from '../../components/admin/AdminBackLink';
import EditVariantForm from '../../components/admin/EditVariantForm';
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
  const [editVariant, setEditVariant] = useState(false);
  const [editingVariantId, setEditingVariantId] = useState(null);
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
      setOriginalImg(() => '');
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
          toast.error(res.message);
        }
      } catch (error) {
        setError(error.data.message);
        toast.error(error.data.message);
      }
    }

    try {
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

      if (res.status === 'success') {
        setOriginalImg(res.data.data.image);
        setProductImage('');
        previousName.current = productName;
        setUserChangedImageFile(false);
        fileInputRef.current.value = '';
        toast.success('Product updated');
        setError(null);
      } else {
        setError(res.message);
        toast.error(res.message);
      }
    } catch (error) {
      setError(error.data.message);
      toast.error(error.data.message);
    }
  }

  useEffect(() => {
    if (data) {
      setProductName(data.data.product.name || '');
      setProductDescription(data.data.product.description || '');
      setProductPrice(data.data.product.variants[0].price || '');
      setProductSize(data.data.product.variants[0].size || '');
      setProductStock(data.data.product.variants[0].stock || '');
      setProductImage(data.data.product.image || '');
      setOriginalImg(data.data.product.image || '');
      previousName.current = data.data.product.name;
    }
  }, [data]);

  async function handleDeleteProduct(e) {
    e.preventDefault();
    const confirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (!confirmed) return;
    setProductImage(() => '');

    try {
      const res = await deleteProduct({ id });
      if (res.data === null) {
        navigate('/admin-products');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      setError(error.data.message);
      toast.error(error.data.message);
    }
  }

  function handleCreateForm() {
    setCreateVariant((prevState) => !prevState);
    if (editVariant) {
      setEditVariant(false);
    }
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={styles.screen}>
      <div className={styles.linkWrap}>
        <AdminBackLink to='products' />
        <Link to='/admin-create-product' className={styles.link}>
          Add New Product
        </Link>
      </div>

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
            onClick={handleCreateForm}
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

      {editVariant && (
        <EditVariantForm
          variants={data.data.product.variants}
          setEditVariant={setEditVariant}
          editingVariantId={editingVariantId}
        />
      )}

      {data.data.product.variants.length > 1 && (
        <>
          <h3 className={styles.variantsHeader}>Variants</h3>
          {data.data.product.variants.map((variant, index) => {
            return (
              <VariantPreview
                variant={variant}
                index={index}
                key={index}
                setEditVariant={setEditVariant}
                setCreateVariant={setCreateVariant}
                setEditingVariantId={setEditingVariantId}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
