import React from 'react';
import './Cart.css';

const Cart = (props) => {
    // console.log(props.cart);
    const cart = props.cart;
    const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    let shipping = 0;
    if (total > 99) shipping = 0;
    else if (total > 35) shipping = 4.99;
    else if (total > 0) shipping = 9.99;

    const tax = total * .12;

    const totalPrice = total + shipping + tax;

    const formatNumber = num => Number(num.toFixed(2));
    
    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <p><small>Items Total Price: {formatNumber(total)}</small></p>
            <p><small>Shipping & Handling: {formatNumber(shipping)} </small></p>
            <p><small>Total before tax: {formatNumber(totalPrice - tax)} </small></p>
            <p><small>Estimated tax: {formatNumber(tax)} </small></p>
            <p><small>Order Total: {formatNumber(totalPrice)} </small></p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;