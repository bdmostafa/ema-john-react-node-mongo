import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0, 10);
    // console.log(first10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    // get the product info from localStorage and match the same product with database and set the product quantity
    useEffect(() => {
        const storedCart = getDatabaseCart();
        // console.log(storedCart);
        const productKeys = Object.keys(storedCart);
        const cartProducts = productKeys.map(existingKey => {
            const product = fakeData.find(product => product.key === existingKey);
            product.quantity = storedCart[existingKey];
            // console.log(key, storedCart[key]);
            return product;
        })
        setCart(cartProducts);
    }, [])

    // Adding quantity when add to cart click event executes
    const handleAddToCart = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(product => product.key === toBeAddedKey)
        let newCart;
        let count = 1;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const otherProducts = cart.filter(product => product.key !== toBeAddedKey);
            newCart = [...otherProducts, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product]
        }

        setCart(newCart);

        addToDatabaseCart(product.key, count)
    }

    return (
        <div className="main-container">
            <div className="product-container">
                {
                    products.map(product => <Product
                        key={product.key}
                        showCartBtn={true}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    >
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/reviews">
                        <button className="order-btn"><FontAwesomeIcon icon={faShoppingCart} /> Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;