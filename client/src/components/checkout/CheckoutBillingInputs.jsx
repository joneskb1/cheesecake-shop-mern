import { useState } from 'react';
import styles from './CheckoutTextInputs.module.css';

export default function CheckoutBillingInputs({ propStyles = {} }) {
  const [billingName, setBillingName] = useState('');
  const [billingPhoneNumber, setBillingPhoneNumber] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingSecondAddress, setBillingSecondAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZipCode, setBillingZipCode] = useState('');

  return (
    <div style={propStyles}>
      <label htmlFor='name' className={styles.checkoutTextLabel}>
        Full Name
      </label>
      <input
        type='text'
        id='name'
        value={billingName}
        className={styles.checkoutTextInput}
        onChange={(e) => setBillingName(e.target.value)}
      />
      <label htmlFor='phone-number' className={styles.checkoutTextLabel}>
        Phone Number
      </label>
      <input
        type='text'
        id='phone-number'
        value={billingPhoneNumber}
        className={styles.checkoutTextInput}
        onChange={(e) => setBillingPhoneNumber(e.target.value)}
      />
      <label htmlFor='address' className={styles.checkoutTextLabel}>
        Street Address
      </label>
      <input
        type='text'
        id='address'
        value={billingAddress}
        className={styles.checkoutTextInput}
        onChange={(e) => setBillingAddress(e.target.value)}
      />
      <label htmlFor='second-address' className={styles.checkoutTextLabel}>
        2nd Address
      </label>
      <input
        type='text'
        id='second-address'
        value={billingSecondAddress}
        className={styles.checkoutTextInput}
        onChange={(e) => setBillingSecondAddress(e.target.value)}
      />
      <label htmlFor='city' className={styles.checkoutTextLabel}>
        City
      </label>
      <input
        type='text'
        id='city'
        value={billingCity}
        className={styles.checkoutTextInput}
        onChange={(e) => setBillingCity(e.target.value)}
      />

      <div className={styles.stateAndZipWrap}>
        <div className={styles.stateWrap}>
          <label htmlFor='state' className={styles.checkoutTextLabel}>
            State
          </label>
          <input
            type='text'
            id='state'
            value={billingState}
            className={styles.checkoutTextInput}
            onChange={(e) => setBillingState(e.target.value)}
          />
        </div>

        <div className={styles.zipWrap}>
          <label htmlFor='zip-code' className={styles.checkoutTextLabel}>
            Zip Code
          </label>
          <input
            type='text'
            id='zip-code'
            value={billingZipCode}
            className={styles.checkoutTextInput}
            onChange={(e) => setBillingZipCode(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
