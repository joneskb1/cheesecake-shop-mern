import { useState } from 'react';
import styles from './CheckoutScreen.module.css';

import CheckoutCheckbox from '../components/checkout/CheckoutCheckBox';
import CheckoutSectionHeader from '../components/checkout/CheckoutSectionHeader';
import CheckoutHeader from '../components/checkout/CheckoutHeader';
import CheckoutAddressInputs from '../components/checkout/CheckoutAddressInputs';
import CheckoutBillingInputs from '../components/checkout/CheckoutBillingInputs';
import CheckoutShipping from '../components/checkout/CheckoutShipping';
import CartHeader from '../components/mini-cart/CartHeader';
import OrderCard from '../components/mini-cart/OrderCard';
import SummaryPlaceOrder from '../components/checkout/SummaryPlaceOrder';

export default function CheckoutScreen() {
  // may want to keep state in screen to pass to next section in order to conditionally render it
  const [isBillingSameAsAddress, setIsBillingSameAsAddress] = useState(true);

  return (
    <form className={styles.checkoutForm}>
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
      <CheckoutSectionHeader>Review</CheckoutSectionHeader>
      <CartHeader bg='noBg' />
      {/* map through cart items */}
      <OrderCard />
      <SummaryPlaceOrder />
    </form>
  );
}
