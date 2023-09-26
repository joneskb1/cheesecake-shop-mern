import { NavLink } from 'react-router-dom';
import { useDeleteProductMutation } from '../../slices/productsSlice';
import { toast } from 'react-toastify';

import styles from './AdminProductPreview.module.css';
import edit from '../../assets/icons/edit.svg';
import trash from '../../assets/icons/trash.svg';
import AdminCakeCard from './AdminCakeCard';

export default function AdminProductPreview({ product }) {
  const [deleteProduct] = useDeleteProductMutation();

  async function handleProductDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (!confirmed) return;
    try {
      await deleteProduct({ id: product._id });
      toast.success(`${product.name} succesfully deleted`);
    } catch (error) {
      toast.error(`Could not delete product`);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <AdminCakeCard
          src={`src/assets/uploads/clones/x-small/${
            product.image.split('.')[0]
          }-75w.${product.image.split('.')[1]}`}
          name={product.name}
        />
        <p className={`${styles.name} ${styles.hide}`}>{product.name}</p>
        <div className={`${styles.variableContainer} ${styles.hide}`}>
          {product.variants.map((variant) => {
            return (
              <p className={`${styles.size} ${styles.hide}`} key={variant._id}>
                {variant.size}&quot;
              </p>
            );
          })}
        </div>
        <div className={`${styles.variableContainer} ${styles.hide}`}>
          {product.variants.map((variant) => {
            return (
              <p className={`${styles.size} ${styles.hide}`} key={variant._id}>
                ${variant.price}
              </p>
            );
          })}
        </div>
        <div className={`${styles.variableContainer} ${styles.hide}`}>
          {product.variants.map((variant) => {
            return (
              <p className={`${styles.stock} ${styles.hide}`} key={variant._id}>
                {variant.stock}
              </p>
            );
          })}
        </div>
        <NavLink
          to={`/admin-products/${product._id}`}
          className={styles.iconEdit}
        >
          <img src={edit} alt='edit icon' />
        </NavLink>
        <img
          src={trash}
          className={styles.iconTrash}
          alt='delete icon'
          onClick={handleProductDelete}
        />
      </div>
      <hr className={styles.line} />
    </>
  );
}
