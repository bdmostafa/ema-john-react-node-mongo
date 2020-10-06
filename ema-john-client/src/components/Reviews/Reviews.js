import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const Reviews = () => {
    const [cart, setCart] = useState([]);
    
    const history = useHistory();

    const handleProceedCheckout = () => {
        if(cart.length > 0) history.push('/shipment')
        else alert('You have to select one product at least to process checkout')
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

        fetch('https://cryptic-ocean-79527.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])


    

    return (
        <div className="main-container">
            <div className="product-container">
                <h2>Total Cart Items: {cart.length} </h2>
                {
                    cart.map(product => <ReviewItems key={product.key} removeProduct={removeProduct} product={product}></ReviewItems>)
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