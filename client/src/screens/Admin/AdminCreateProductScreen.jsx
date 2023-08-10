import styles from './AdminCreateProductScreen.module.css';

import AdminProductForm from '../../components/admin/AdminProductForm';
import AdminFormHeader from '../../components/admin/AdminFormHeader';
import BaseProductFormInputs from '../../components/admin/BaseProductFormInputs';
import AdminFormBtn from '../../components/admin/AdminFormBtn';

export default function AdminCreateProductScreen() {
  return (
    <AdminProductForm>
      <AdminFormHeader>Create Product</AdminFormHeader>
      <BaseProductFormInputs />
      <AdminFormBtn>Create Product</AdminFormBtn>
    </AdminProductForm>
  );
}
