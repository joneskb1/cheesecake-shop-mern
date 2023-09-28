import styles from './CheckoutTextInputs.module.css';

export default function CheckoutAddressInputs({ propStyles = {}, formState }) {
  const {
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    secondAddress,
    setSecondAddress,
    city,
    setCity,
    state,
    setState,
    zipCode,
    setZipCode,
  } = formState;

  return (
    <div style={propStyles}>
      <label htmlFor='name' className={styles.checkoutTextLabel}>
        Full Name
      </label>
      <input
        type='text'
        id='name'
        required
        value={name}
        className={styles.checkoutTextInput}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='phone-number' className={styles.checkoutTextLabel}>
        Phone Number
      </label>
      <input
        type='tel'
        id='phone-number'
        value={phoneNumber}
        className={styles.checkoutTextInput}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <label htmlFor='address' className={styles.checkoutTextLabel}>
        Street Address
      </label>
      <input
        type='text'
        id='address'
        required
        value={address}
        className={styles.checkoutTextInput}
        onChange={(e) => setAddress(e.target.value)}
      />
      <label htmlFor='second-address' className={styles.checkoutTextLabel}>
        2nd Address
      </label>
      <input
        type='text'
        id='second-address'
        value={secondAddress}
        className={styles.checkoutTextInput}
        onChange={(e) => setSecondAddress(e.target.value)}
      />
      <label htmlFor='city' className={styles.checkoutTextLabel}>
        City
      </label>
      <input
        required
        type='text'
        id='city'
        value={city}
        className={styles.checkoutTextInput}
        onChange={(e) => setCity(e.target.value)}
      />

      <div className={styles.stateAndZipWrap}>
        <div className={styles.stateWrap}>
          <label htmlFor='state' className={styles.checkoutTextLabel}>
            State
          </label>
          <input
            required
            type='text'
            id='state'
            value={state}
            className={styles.checkoutTextInput}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className={styles.zipWrap}>
          <label htmlFor='zip-code' className={styles.checkoutTextLabel}>
            Zip Code
          </label>
          <input
            required
            type='text'
            id='zip-code'
            value={zipCode}
            className={styles.checkoutTextInput}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
