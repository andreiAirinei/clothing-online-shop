import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

// STRIPE FAKE TEST CREDIT CARD
// 4242 4242 4242 4242 - Exp: 01/20 - CW: 123

const StripeCheckoutButton = ({ price }) => {
  // Stripe needs values in CENTS
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_yZ7lFFzCbx6ezkqLBDNN6YtR00MXYx2lg1';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      // On success callback, triggers when we submit
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
