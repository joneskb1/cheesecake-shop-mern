import styles from "./AdminOrderPreview.module.css";
import { Link } from "react-router-dom";
import MyAccountOrdersInfo from "../MyAccount/MyAccountOrdersInfo";
import ProductCard from "../MyAccount/ProductCard";

export default function AdminOrderPreview() {
  return (
    <div className={styles.container}>
      <MyAccountOrdersInfo />
      <h3 className={styles.itemsHeader}>Items</h3>
      <hr className={styles.line} />
      <div className={styles.productWrap}>
        <ProductCard />
      </div>
      <Link className={styles.btn} to="/admin-orders/id">
        Details
      </Link>
    </div>
  );
}
