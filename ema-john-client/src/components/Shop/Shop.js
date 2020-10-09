import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    // Load data from database server
    useEffect(() => {
        fetch(`https://cryptic-ocean-79527.herokuapp.com/products?search=${search}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [search])

    document.title = "Shop Home Page | EmaJohn"

    // get the product info from localStorage and match the same product with database and set the product quantity
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

    console.log(search)

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
                <input
                    placeholder="Search your product"
                    type="text"
                    onBlur={(e) => setSearch(e.target.value)}
                    className="product-search"
                /> <br />
                {
                    products.length === 0
                    && <Button className="mt-5" variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                            Loading...
                        </Button>
                }
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