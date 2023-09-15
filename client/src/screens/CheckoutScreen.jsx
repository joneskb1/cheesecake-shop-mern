import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartState } from '../slices/cartSlice';
import { usePlaceOrderMutation } from '../slices/orderApiSlice';

import useCalcCart from '../custom-hooks/useCalcCart';

import styles from './CheckoutScreen.module.css';
import { toast } from 'react-toastify';
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
  const cartItems = useSelector(selectCartState);
  const [placeOrder] = usePlaceOrderMutation();

  // shipping address state
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [secondAddress, setSecondAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const { subtotal, tax, orderTotal, shippingCost, shippingType } =
    useCalcCart();

  const shippingAddressFormState = {
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
  };

  // billing address state
  const [billingName, setBillingName] = useState('');
  const [billingPhoneNumber, setBillingPhoneNumber] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingSecondAddress, setBillingSecondAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZipCode, setBillingZipCode] = useState('');

  const billingAddressFormState = {
    billingName,
    setBillingName,
    billingPhoneNumber,
    setBillingPhoneNumber,
    billingAddress,
    setBillingAddress,
    billingSecondAddress,
    setBillingSecondAddress,
    billingCity,
    setBillingCity,
    billingState,
    setBillingState,
    billingZipCode,
    setBillingZipCode,
  };

  async function handlePlaceOrder(e) {
    e.preventDefault();

    const addressTel = orderState.shippingAddress.phoneNumber;
    const billingTel = orderState.billingAddress.billingPhoneNumber;
    const phonePattern = /^[0-9]{10}$/;
    if (addressTel !== '' && !phonePattern.test(addressTel)) {
      return toast.error('not a valid shipping phone number');
    }
    if (billingTel !== '' && !phonePattern.test(billingTel)) {
      return toast.error('not a valid billing phone number');
    }

    try {
      const res = await placeOrder({
        orderState,
        subtotal,
        tax,
        orderTotal,
        shippingCost,
        shippingType,
        cartItems,
      }).unwrap();
      if (res.status === 'success') {
        toast.success(`Order Placed!`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  }

  const orderState = {
    shippingAddress: {
      name,
      phoneNumber,
      address,
      secondAddress,
      city,
      state,
      zipCode,
    },
    billingAddress: {
      billingName,
      billingPhoneNumber,
      billingAddress,
      billingSecondAddress,
      billingCity,
      billingState,
      billingZipCode,
    },
    isBillingSameAsAddress,
  };

  if (cartItems.length < 1) {
    return <p>Go shopping! You do not have any items in your cart. </p>;
  }

  return (
    <div className={styles.formWrap}>
      <CheckoutHeader />
      <form className={styles.checkoutForm} onSubmit={handlePlaceOrder}>
        <div className={styles.form}>
          <CheckoutSectionHeader>Shipping Address</CheckoutSectionHeader>
          <CheckoutAddressInputs formState={shippingAddressFormState} />
          <CheckoutCheckbox
            isBillingSameAsAddress={isBillingSameAsAddress}
            setIsBillingSameAsAddress={setIsBillingSameAsAddress}
          />

          {!isBillingSameAsAddress && (
            <>
              <CheckoutSectionHeader>Billing Address</CheckoutSectionHeader>
              <CheckoutBillingInputs
                propStyles={{ marginBottom: '1.5rem' }}
                formState={billingAddressFormState}
              />
            </>
          )}

          <CheckoutSectionHeader>Shipping Method</CheckoutSectionHeader>
          <CheckoutShipping />
          <CheckoutSectionHeader>Review Items</CheckoutSectionHeader>
          {/* map through cart items */}
          {cartItems &&
            cartItems.map((product, i) => {
              return <OrderCard cake={product} key={i} />;
            })}
        </div>
        <div className={styles.summaryWrap}>
          <SummaryPlaceOrder />
        </div>
      </form>
      <img src={cakeImg} alt='large cake' className={styles.cakeImg} />
    </div>
  );
}
