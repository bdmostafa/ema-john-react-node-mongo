import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51HZnnCGEVOGm2sOALIGlD5pvadMIVHOUNzG6Sjh7Ur3Y6RjXBXDRfuZRTmpZYXAuzhnBEWjA5DESxDlyE1KKS6Hs00tenH1Gr5');

const PaymentProcess = ({ handlePayment }) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment} />
            {/* <SplitCardForm /> */}
        </Elements>
    );
};

export default PaymentProcess;




