import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitCardForm from './SplitCardForm';
import SimpleCardForm from './SimpleCardForm';
import { stripe_API } from './stripe.config';

const stripePromise = loadStripe(stripe_API);

const PaymentProcess = ({ handlePayment }) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment} />
            {/* <SplitCardForm /> */}
        </Elements>
    );
};

export default PaymentProcess;




