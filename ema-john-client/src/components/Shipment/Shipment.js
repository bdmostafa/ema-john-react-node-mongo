import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'
import happyImg from '../../images/giphy.gif';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const { name, email } = loggedInUser;

    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() }
        fetch('http://localhost:5000/addOrder', {
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

    };

    console.log(watch("example")); // watch input value by passing the name of it

    // Happy image thank you when place order click event
    const thankYou = <img src={happyImg}></img>;

    return (
        <>

            {
                orderPlaced
                    ? thankYou
                    : <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
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
            }
        </>


    );
};

export default Shipment;