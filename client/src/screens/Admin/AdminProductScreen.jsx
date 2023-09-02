import styles from './AdminProductScreen.module.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AdminFormHeader from '../../components/admin/AdminFormHeader';
import AdminProductForm from '../../components/admin/AdminProductForm';
import BaseProductFormInputs from '../../components/admin/BaseProductFormInputs';
import AdminFormBtn from '../../components/admin/AdminFormBtn';
import CreateVariantForm from '../../components/admin/CreateVariantForm';
import VariantPreview from '../../components/admin/VariantPreview';
import AdminBackLink from '../../components/admin/AdminBackLink';
import { useGetProductQuery } from '../../slices/productsSlice.js';
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

export default function AdminProductScreen() {
  const [createVariant, setCreateVariant] = useState(false);
  const [isVariants] = useState(true);
  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productImage, setProductImage] = useState('');

  const [error, setError] = useState(null);

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
    console.log('submit');
  }

  useEffect(() => {
    if (data) {
      setProductName(data.data.product.name || '');
      setProductDescription(data.data.product.description || '');
      setProductPrice(data.data.product.variant[0].price || '');
      setProductSize(data.data.product.variant[0].size || '');
      setProductStock(data.data.product.variant[0].stock || '');
      setProductImage(data.data.product.image || '');
    }
  }, [data]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={styles.screen}>
      <AdminBackLink to='products' />

      <AdminProductForm formHandler={handleEditProduct}>
        <AdminFormHeader>Edit Product</AdminFormHeader>
        <BaseProductFormInputs formState={formState} />
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
      <AdminFormBtn propStyles={deleteProductBtnStyles}>
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
