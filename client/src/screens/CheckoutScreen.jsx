import { useState } from 'react';
import styles from './CheckoutScreen.module.css';

import CheckoutCheckbox from '../components/checkout/CheckoutCheckBox';
import CheckoutSectionHeader from '../components/checkout/CheckoutSectionHeader';
import CheckoutHeader from '../components/checkout/CheckoutHeader';
import CheckoutAddressInputs from '../components/checkout/CheckoutAddressInputs';
import CheckoutBillingInputs from '../components/checkout/CheckoutBillingInputs';
import CheckoutShipping from '../components/checkout/CheckoutShipping';
import OrderCard from '../components/mini-cart/OrderCard';
import SummaryPlaceOrder from '../components/checkout/SummaryPlaceOrder';

import cakeImg from '../assets/images/desktop/checkout-cake-936w.png';

export default function CheckoutScreen() {
  // may want to keep state in screen to pass to next section in order to conditionally render it
  const [isBillingSameAsAddress, setIsBillingSameAsAddress] = useState(true);

  return (
    <div className={styles.formWrap}>
      <form className={styles.checkoutForm}>
        <div className={styles.form}>
          <CheckoutHeader />
          <CheckoutSectionHeader>Shipping Address</CheckoutSectionHeader>
          <CheckoutAddressInputs />
          <CheckoutCheckbox
            isBillingSameAsAddress={isBillingSameAsAddress}
            setIsBillingSameAsAddress={setIsBillingSameAsAddress}
          />

          {!isBillingSameAsAddress && (
            <>
              <CheckoutSectionHeader>Billing Address</CheckoutSectionHeader>
              <CheckoutBillingInputs propStyles={{ marginBottom: '1.5rem' }} />
            </>
          )}

          <CheckoutSectionHeader>Shipping Method</CheckoutSectionHeader>
          <CheckoutShipping />
          <CheckoutSectionHeader>Review Items</CheckoutSectionHeader>
          {/* map through cart items */}
          <OrderCard />
        </div>
        <SummaryPlaceOrder />
      </form>
      <img src={cakeImg} alt='large cake' className={styles.cakeImg} />
    </div>
  );
}
