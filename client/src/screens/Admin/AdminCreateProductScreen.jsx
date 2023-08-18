import AdminProductForm from '../../components/admin/AdminProductForm';
import AdminFormHeader from '../../components/admin/AdminFormHeader';
import BaseProductFormInputs from '../../components/admin/BaseProductFormInputs';
import AdminFormBtn from '../../components/admin/AdminFormBtn';
import AdminBackLink from '../../components/admin/AdminBackLink';

export default function AdminCreateProductScreen() {
  return (
    <AdminProductForm>
      <AdminBackLink to='products' />
      <AdminFormHeader>Create Product</AdminFormHeader>
      <BaseProductFormInputs />
      <AdminFormBtn>Create Product</AdminFormBtn>
    </AdminProductForm>
  );
}
