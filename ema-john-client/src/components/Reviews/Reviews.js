import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Reviews = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        // setCart([]);
        // processOrder();
        // setOrderPlaced(true);
        history.push('/shipment');
    }

    // Remove a cart from saved state and local storage and update all the carts
    const removeProduct = (productKey) => {
        // console.log(productKey);
        const updateCart = cart.filter(product => product.key !== productKey);
        setCart(updateCart);
        removeFromDatabaseCart(productKey);
    }

    // Retrieve cart data from local storage and set cart from saved state
    useEffect(() => {
        const storedCart = getDatabaseCart();
        const productKeys = Object.keys(storedCart);

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: { 
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])


    // Happy image thank you when place order click event
    const thankYou = <img src={happyImg}></img>;

    return (
        <div className="main-container">
            <div className="product-container">
                <h2>Total Cart Items: {cart.length} </h2>
                {
                    cart.map(product => <ReviewItems key={product.key} removeProduct={removeProduct} product={product}></ReviewItems>)
                }
                {
                   orderPlaced && thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="order-btn"><FontAwesomeIcon icon={faShoppingCart} /> Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Reviews;