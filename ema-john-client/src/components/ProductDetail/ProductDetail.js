import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const selectedProduct = fakeData.find(product => product.key === productKey);
    // console.log(selectedProduct);

    return (
        <div style={{ padding: '3rem' }}>
            <h2>Product Detail</h2>
            <Product showCartBtn={false} product={selectedProduct}></Product>
        </div>
    );
};

export default ProductDetail;