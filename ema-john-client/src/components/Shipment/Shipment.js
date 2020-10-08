import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'
import happyImg from '../../images/giphy.gif';
import PaymentProcess from '../PaymentProcess/PaymentProcess';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [shippingData, setShippingData] = useState(null);

    document.title = "Product Shipment | EmaJohn"

    const { name, email } = loggedInUser;

    const onSubmit = data => {
        setShippingData(data);
    };

    const handlePaymentSuccess = paymentId => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser, 
            products: savedCart, 
            shipment: shippingData, 
            paymentId,
            orderTime: new Date() 
        }

        fetch('https://cryptic-ocean-79527.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    setOrderPlaced(true);
                }
            })
    }

    // Happy image thank you when place order click event
    const thankYou = <img align="center" src={happyImg}></img>;

    return (
        <div className="row container ml-auto mr-auto">
            {
                orderPlaced
                    ? thankYou
                    : <>
                        <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">
                            <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
                                <input name="name" defaultValue={name} ref={register({ required: true })} placeholder="Your Name" />
                                {errors.name && <span className="error">This field is required</span>}

                                <input name="email" defaultValue={email} ref={register({ required: true })} placeholder="Your Email" />
                                {errors.email && <span className="error">This field is required</span>}

                                <input name="address" ref={register({ required: true })} placeholder="Your Adress" />
                                {errors.address && <span className="error">This field is required</span>}

                                <input name="phone" ref={register({ required: true })} placeholder="Your Phone" />
                                {errors.phone && <span className="error">This field is required</span>}

                                <input type="submit" />
                            </form>
                        </div>
                        <div style={{display: shippingData ? 'block' : 'none'}} className="col-md-6">
                            <h2>Pay for cart items</h2>
                            <PaymentProcess handlePayment={handlePaymentSuccess} />
                        </div>
                    </>
            }
        </div>
    );
};

export default Shipment;