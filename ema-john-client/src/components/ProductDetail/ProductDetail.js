import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/product/${productKey}`)
        .then(res => res.json())
        .then(data => setProduct(data[0]))
    }, [productKey])

    return (
        <div style={{ padding: '3rem' }}>
            <h2>Product Detail</h2>
            <Product showCartBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;