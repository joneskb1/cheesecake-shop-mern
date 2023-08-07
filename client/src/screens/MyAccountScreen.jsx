import styles from "./MyAccountScreen.module.css";

import MyAccountForm from "../components/MyAccount/MyAccountForm";
import MyAccountOrders from "../components/MyAccount/MyAccountOrders";

import backgroundCake1 from "../assets/images/my-account-cheesecake-mobile-199w.png";

import backgroundCake2 from "../assets/images/cart-cake.png";

export default function MyAccountScreen() {
  return (
    <div className={styles.accountScreen}>
      <img
        src={backgroundCake1}
        alt="cheesecake"
        className={styles.backgroundCake1}
      />

      <h1 className={styles.accountHeader}>My Account</h1>

      <MyAccountForm />
      <h2 className={styles.accountHeader}>My Orders</h2>

      <MyAccountOrders />

      <img
        src={backgroundCake2}
        alt="cheesecake"
        className={styles.backgroundCake2}
      />
    </div>
  );
}
