import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    // Destructuring props
    const {
        product,
        showCartBtn,
        handleAddToCart,
        // Nested destructuring props.product
        product: {
            key,
            img,
            name,
            seller,
            price,
            stock
        }
    } = props;
    // const { key, img, name, seller, price, stock } = product;
    return (
        <div className="product">
            <div>
                <Link to={`/product/${key}`}><img src={img} alt="" /></Link>
            </div>
            <div className="">
                <h4> <Link to={`/product/${key}`}>{name}</Link> </h4>
                <p><small>By: </small>{seller}</p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order soon!</small></p>
                {
                    showCartBtn
                    && <button
                        className="cart-btn"
                        onClick={() => handleAddToCart(product)}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                    </button>
                }
            </div>
        </div>
    );
};

export default Product;