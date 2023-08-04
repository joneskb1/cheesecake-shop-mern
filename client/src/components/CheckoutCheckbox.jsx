import styles from './CheckoutCheckbox.module.css';

export default function CheckoutCheckbox({
  isBillingSameAsAddress,
  setIsBillingSameAsAddress,
}) {
  return (
    <div className={styles.checkBoxWrap}>
      <input
        type='checkbox'
        name='billing-same-as-shipping'
        id='billing-same-as-shipping'
        className={styles.checkoutCheckbox}
        checked={isBillingSameAsAddress}
        onChange={() => setIsBillingSameAsAddress((prevState) => !prevState)}
      />
      <label
        htmlFor='billing-same-as-shipping'
        className={styles.checkoutCheckboxLabel}
      >
        Billing Address Is Same as Shipping Address
      </label>
    </div>
  );
}
