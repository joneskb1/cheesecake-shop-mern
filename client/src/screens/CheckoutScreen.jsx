import { useState } from 'react';
import styles from './CheckoutScreen.module.css';

import CheckoutCheckbox from '../components/CheckoutCheckBox';
import CheckoutSectionHeader from '../components/CheckoutSectionHeader';
import CheckoutHeader from '../components/CheckoutHeader';
import CheckoutAddressInputs from '../components/CheckoutAddressInputs';
import CheckoutBillingInputs from '../components/CheckoutBillingInputs';
import CheckoutShipping from '../components/CheckoutShipping';

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
    </form>
  );
}
